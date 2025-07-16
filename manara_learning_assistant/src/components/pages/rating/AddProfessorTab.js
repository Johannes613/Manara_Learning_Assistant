import React from "react";
import { Paper, Typography } from "@mui/material";
import ProfessorReviewForm from "./ProfessorReviewForm"; // Import the new reusable form

const AddProfessorTab = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Submit a Rating
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        If the professor is not in our system, a new profile will be created
        automatically.
      </Typography>
      <ProfessorReviewForm />
    </Paper>
  );
};

export default AddProfessorTab;
