import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Grid } from "@mui/material";
import { Add as AddIcon, Done as DoneIcon } from "@mui/icons-material";
import QuestionInput from "./QuestionInput";
import QuestionList from "./QuestionList";
import axios from "axios"; // Import axios

const AddExamPage = () => {
  // 1. Update state to include all fields required by the database
  const [examDetails, setExamDetails] = useState({
    title: "",
    course_name: "",
    department: "",
    year: "",
    semester: "",
  });
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  // These functions remain the same
  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // 2. Update the submit handler to make an API call
  const handleSubmitExam = async () => {
    // Combine all data into the format the backend expects
    const examData = {
      ...examDetails,
      questions: questions, // Pass the array of question objects
    };

    setIsSubmitting(true); // Disable button

    try {
      // Use axios to send a POST request
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/exams`,
        examData
      );

      console.log("Server Response:", response.data);
      alert(response.data.message);

      // Reset state after successful submission
      setExamDetails({
        title: "",
        course_name: "",
        department: "",
        year: "",
        semester: "",
      });
      setQuestions([]);
    } catch (error) {
      console.error("Error submitting exam:", error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred. Please try again.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  // Helper function for state changes
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Create New Exam
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Exam Details
        </Typography>
        <Grid container spacing={2}>
          {/* 3. Add all the new form fields */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Exam Title (e.g., Final Exam 2025)"
              name="title"
              value={examDetails.title}
              onChange={handleDetailsChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Course Name (e.g., Calculus II)"
              name="course_name"
              value={examDetails.course_name}
              onChange={handleDetailsChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department (e.g., Mathematics)"
              name="department"
              value={examDetails.department}
              onChange={handleDetailsChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Year (e.g., 2025)"
              type="number"
              name="year"
              value={examDetails.year}
              onChange={handleDetailsChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Semester (e.g., Spring)"
              name="semester"
              value={examDetails.semester}
              onChange={handleDetailsChange}
            />
          </Grid>
        </Grid>
      </Paper>

      <QuestionList questions={questions} onRemove={handleRemoveQuestion} />
      <QuestionInput onAdd={handleAddQuestion} />

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DoneIcon />}
          onClick={handleSubmitExam}
          disabled={
            !examDetails.title || questions.length === 0 || isSubmitting
          }
        >
          {isSubmitting ? "Submitting..." : "Finish & Submit Exam"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddExamPage;
