import React from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import MarkdownRenderer from "../../common/MarkdownRenderer";

const QuestionList = ({ questions, onRemove }) => {
  if (questions.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Current Questions ({questions.length})
      </Typography>
      {questions.map((q, index) => (
        <Paper
          key={q.id}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            "& > div": {
              // Target the div inside the Paper
              width: "calc(100% - 48px)", // Ensure content wraps properly
              wordBreak: "break-word",
            },
          }}
        >
          {/* Use the new MarkdownRenderer for both question and answer */}
          <div>
            <MarkdownRenderer>{`**Q${index + 1}:** ${
              q.text
            }`}</MarkdownRenderer>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
              Answer:
            </Typography>
            {/* Use the new renderer for the answer */}
            <MarkdownRenderer>{q.answer}</MarkdownRenderer>
          </div>

          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onRemove(q.id)}
            sx={{ ml: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
};

export default QuestionList;
