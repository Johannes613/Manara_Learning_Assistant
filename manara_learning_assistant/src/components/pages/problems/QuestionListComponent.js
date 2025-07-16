import React from "react";
import { Box, Divider } from "@mui/material";
import QuestionItem from "./QuestionItem";

const QuestionListComponent = ({ questions }) => {
  console.log("Questions in QuestionListComponent:", questions);
  return (
    <Box>
      {questions.map((q, index) => (
        <React.Fragment key={q.id}>
          <QuestionItem question={q} />
          {index < questions.length - 1 && <Divider sx={{ my: 4 }} />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default QuestionListComponent;
