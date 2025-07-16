import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const QuestionInput = ({ onAdd }) => {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");

  const handleAddClick = () => {
    if (!questionText.trim() || !answerText.trim()) {
      alert("Please fill in both the question and the answer.");
      return;
    }
    onAdd({ text: questionText, answer: answerText });
    setQuestionText("");
    setAnswerText("");
  };

  return (
    <Paper sx={{ p: 3, mt: 3, backgroundColor: "action.hover" }}>
      <Typography variant="h6" gutterBottom>
        Add New Question
      </Typography>
      <Typography
        variant="caption"
        display="block"
        color="text.secondary"
        gutterBottom
      >
        Tip: For math formulas, use LaTeX syntax like `$s = ut + \\frac{1}
        {2}at^2$`. For images, use Markdown `![alt](url)`.
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Question Text"
        variant="filled"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        multiline
        rows={2}
        label="Answer Text"
        variant="filled"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Question to Exam
        </Button>
      </Box>
    </Paper>
  );
};

export default QuestionInput;
