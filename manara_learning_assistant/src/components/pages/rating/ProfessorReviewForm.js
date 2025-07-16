import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
  Box,
} from "@mui/material";
import axios from "axios";
import InfoModal from "../../common/InfoModal"; // Import the new modal

const ProfessorReviewForm = ({
  professorName,
  professorDepartment,
  onReviewSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: professorName || "",
    department: professorDepartment || "",
    professionalism: "",
    specialization: "",
    course_taken: "",
    grade: "",
    would_take_again: "Yes",
    difficulty: "Medium",
    teaching_style: "Good",
    overall_rating: 3,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    open: false,
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (e, newValue) => {
    setFormData((prev) => ({ ...prev, overall_rating: newValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/professors`,
        formData
      );
      setModalInfo({
        open: true,
        title: "Success!",
        message: response.data.message,
      });

      if (onReviewSubmitSuccess) {
        onReviewSubmitSuccess(formData);
      }
      // Reset form
      setFormData({
        name: professorName || "",
        department: professorDepartment || "",
        professionalism: "",
        specialization: "",
        course_taken: "",
        grade: "",
        would_take_again: "Yes",
        difficulty: "Medium",
        teaching_style: "Good",
        overall_rating: 3,
      });
    } catch (error) {
      setModalInfo({
        open: true,
        title: "Error",
        message: error.response?.data?.message || "Failed to submit review.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ open: false, title: "", message: "" });
  };

  return (
    <>
      <InfoModal
        open={modalInfo.open}
        onClose={handleCloseModal}
        title={modalInfo.title}
        message={modalInfo.message}
      />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {!professorName && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Professor's Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Course You Took"
              name="course_taken"
              value={formData.course_taken}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Your Grade"
              name="grade"
              helperText="e.g., A, B+, C"
              value={formData.grade}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl required>
              <FormLabel>Your Overall Rating for This Course</FormLabel>
              <Rating
                name="overall_rating"
                value={Number(formData.overall_rating)}
                onChange={handleRatingChange}
                precision={0.5}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl>
              <FormLabel>Teaching Style</FormLabel>
              <RadioGroup
                row
                name="teaching_style"
                value={formData.teaching_style}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Excellent"
                  control={<Radio />}
                  label="Excellent"
                />
                <FormControlLabel
                  value="Good"
                  control={<Radio />}
                  label="Good"
                />
                <FormControlLabel
                  value="Poor"
                  control={<Radio />}
                  label="Poor"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl>
              <FormLabel>Take Again?</FormLabel>
              <RadioGroup
                row
                name="would_take_again"
                value={formData.would_take_again}
                onChange={handleChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl>
              <FormLabel>Exam Difficulty</FormLabel>
              <RadioGroup
                row
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Easy"
                  control={<Radio />}
                  label="Easy"
                />
                <FormControlLabel
                  value="Medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="Hard"
                  control={<Radio />}
                  label="Hard"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Rating"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfessorReviewForm;
