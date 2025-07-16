import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useAuth } from "../../../contexts/AuthContext"; // Import the useAuth hook
import MarkdownRenderer from "../../common/MarkdownRenderer";
import UpgradeModal from "../../common/UpgradeModal"; // Import the modal

const QuestionItem = ({ question }) => {
  // Get both subscription and admin status from the context
  const { subscription, isAdmin } = useAuth();
  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [errorAI, setErrorAI] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // State for the upgrade modal

  const handleShowAnswer = () => {
    // Check if the user is a pro member OR an admin
    if (subscription?.plan === "pro" || isAdmin) {
      setAnswerVisible(!isAnswerVisible);
    } else {
      // If not, open the upgrade modal
      setModalOpen(true);
    }
  };

  const handleExplainWithAI = async () => {
    // Check for pro subscription OR admin status before making the API call
    if (subscription?.plan !== "pro" && !isAdmin) {
      setModalOpen(true);
      return;
    }

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    if (!apiKey) {
      setErrorAI(
        "API Key is missing. Please configure it in your environment variables."
      );
      return;
    }

    setIsLoadingAI(true);
    setErrorAI("");
    setAiExplanation("");

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
      });
      const prompt = `Explain the solution for the following question in a clear, step-by-step manner. Use markdown for formatting, including for any mathematical formulas or code snippets. Question: ${question.question_body}`;
      const result = await model.generateContentStream(prompt);

      let text = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        setAiExplanation(text);
      }
    } catch (err) {
      console.error("Error fetching AI explanation:", err);
      setErrorAI("Failed to get explanation from AI. Please try again.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <Box>
      {/* Add the modal to the component, controlled by modalOpen state */}
      <UpgradeModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      <MarkdownRenderer>
        {`${question.question_number}. ${question.question_body}`}
      </MarkdownRenderer>

      {isAnswerVisible && (
        <Box
          sx={{
            p: 2,
            border: "1px dashed",
            borderColor: "grey.400",
            borderRadius: 1,
            my: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
            Answer:
          </Typography>
          <MarkdownRenderer>{question.answer_body}</MarkdownRenderer>
        </Box>
      )}

      {isLoadingAI && !aiExplanation && (
        <CircularProgress size={24} sx={{ my: 2 }} />
      )}

      {aiExplanation && (
        <Box
          sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 1, my: 2 }}
        >
          <MarkdownRenderer>{aiExplanation}</MarkdownRenderer>
        </Box>
      )}

      {errorAI && (
        <Typography color="error" sx={{ my: 2 }}>
          {errorAI}
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        {/* Update onClick to use the new handler */}
        <Button variant="outlined" size="small" onClick={handleShowAnswer}>
          {isAnswerVisible ? "Hide Answer" : "Show Answer"}
        </Button>
        {/* Update onClick to use the new handler */}
        <Button
          variant="contained"
          size="small"
          onClick={handleExplainWithAI}
          disabled={isLoadingAI}
        >
          Explain with AI
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionItem;
