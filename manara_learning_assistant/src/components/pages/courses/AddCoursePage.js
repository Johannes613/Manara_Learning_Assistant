import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import MarkdownRenderer from "../../common/MarkdownRenderer";

// --- UPDATED QuestionForm ---
// It now receives the chapterId directly as a prop.
const QuestionForm = ({ chapterId, onAdd }) => {
  const [body, setBody] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAdd = () => {
    if (body.trim() && answer.trim()) {
      // Pass the chapterId back up along with the new question data.
      onAdd(chapterId, { question_body: body, answer_body: answer });
      setBody("");
      setAnswer("");
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle2">Add New Question</Typography>
      <TextField
        fullWidth
        multiline
        rows={2}
        label="Question Body (Markdown/LaTeX)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        sx={{ my: 1 }}
      />
      <TextField
        fullWidth
        multiline
        rows={2}
        label="Answer Body (Markdown/LaTeX)"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        sx={{ mb: 1 }}
      />
      <Button onClick={handleAdd} size="small" startIcon={<AddIcon />}>
        Add Question
      </Button>
    </Paper>
  );
};

const AddCoursePage = () => {
  const [courseDetails, setCourseDetails] = useState({
    course_name: "",
    department: "",
    description: "",
  });
  const [chapters, setChapters] = useState([]);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("--- Chapters state updated ---");
    console.log(JSON.stringify(chapters, null, 2));
    console.log("----------------------------");
  }, [chapters]);

  const handleCourseChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const handleAddChapter = () => {
    if (newChapterTitle.trim()) {
      const newChapter = {
        id: Date.now(),
        chapter_title: newChapterTitle,
        chapter_number: chapters.length + 1,
        questions: [],
      };
      setChapters([...chapters, newChapter]);
      setNewChapterTitle("");
    }
  };

  const handleRemoveChapter = (chapterId) => {
    setChapters(chapters.filter((ch) => ch.id !== chapterId));
  };

  // --- UPDATED FUNCTION ---
  // This function is now wrapped in useCallback to ensure it's stable
  // and not recreated on every render.
  const handleAddQuestion = useCallback((chapterId, newQuestion) => {
    setChapters((currentChapters) =>
      currentChapters.map((chapter) => {
        if (chapter.id === chapterId) {
          const newQ = {
            ...newQuestion,
            question_number: chapter.questions.length + 1,
          };
          return {
            ...chapter,
            questions: [...chapter.questions, newQ],
          };
        }
        return chapter;
      })
    );
  }, []); // Empty dependency array means the function is created only once.

  const handleRemoveQuestion = (chapterId, questionIndex) => {
    setChapters(
      chapters.map((ch) => {
        if (ch.id === chapterId) {
          return {
            ...ch,
            questions: ch.questions.filter((_, idx) => idx !== questionIndex),
          };
        }
        return ch;
      })
    );
  };

  const handleSubmitCourse = async () => {
    setIsSubmitting(true);
    const payload = { ...courseDetails, chapters };

    console.log("--- Submitting this payload to backend ---");
    console.log(JSON.stringify(payload, null, 2));
    console.log("------------------------------------------");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/courses`,
        payload
      );
      alert(response.data.message);
      setCourseDetails({ course_name: "", department: "", description: "" });
      setChapters([]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Create New Course
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Course Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Course Name"
              name="course_name"
              value={courseDetails.course_name}
              onChange={handleCourseChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Department"
              name="department"
              value={courseDetails.department}
              onChange={handleCourseChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Course Description (optional)"
              name="description"
              value={courseDetails.description}
              onChange={handleCourseChange}
            />
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Chapters
      </Typography>
      {chapters.map((chapter) => (
        <Accordion key={chapter.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ flexGrow: 1 }}>
              Ch. {chapter.chapter_number}: {chapter.chapter_title}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveChapter(chapter.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            {chapter.questions.map((q, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{ p: 2, mb: 1, position: "relative" }}
              >
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 4, right: 4 }}
                  onClick={() => handleRemoveQuestion(chapter.id, index)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <MarkdownRenderer>{`**Q${q.question_number}:** ${q.question_body}`}</MarkdownRenderer>
                <Divider sx={{ my: 1 }} />
                <MarkdownRenderer>{`**Ans:** ${q.answer_body}`}</MarkdownRenderer>
              </Paper>
            ))}
            {/* Pass the stable handler and the chapterId to the form */}
            <QuestionForm chapterId={chapter.id} onAdd={handleAddQuestion} />
          </AccordionDetails>
        </Accordion>
      ))}

      <Paper sx={{ p: 2, mt: 2, display: "flex", gap: 2 }}>
        <TextField
          fullWidth
          label="New Chapter Title"
          value={newChapterTitle}
          onChange={(e) => setNewChapterTitle(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddChapter}
          startIcon={<AddIcon />}
        >
          Add Chapter
        </Button>
      </Paper>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DoneIcon />}
          onClick={handleSubmitCourse}
          disabled={
            isSubmitting || !courseDetails.course_name || chapters.length === 0
          }
        >
          {isSubmitting ? "Submitting..." : "Submit Entire Course"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddCoursePage;
