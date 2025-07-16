import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import QuestionListComponent from "./QuestionListComponent";
import DiscussionTab from "./DiscussionTab";

const ProblemDetailPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { examId } = useParams();
  console.log("Exam ID from URL:", examId);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/exams/${examId}`
        );
        setExam(response.data);
        console.log("Exam Details:", response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load exam details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      fetchExamDetails();
    }
  }, [examId]); // Re-run this effect if the examId changes

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Button
        component={Link}
        to="/exams"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Exams
      </Button>

      <Typography variant="h4" gutterBottom>
        {exam.title}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Questions" />
          <Tab label="Discussion" />
        </Tabs>
      </Box>
      {tabIndex === 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <QuestionListComponent questions={exam.questions} />
        </Paper>
      )}
      {tabIndex === 1 && <DiscussionTab examId={examId} />}
    </Box>
  );
};

export default ProblemDetailPage;
