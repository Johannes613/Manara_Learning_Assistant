import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, CircularProgress, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import QuestionItem from '../../pages/problems/QuestionItem'; // Reusing existing component

const ChapterPracticePage = () => {
  const { courseId, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapterQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/courses/${courseId}/chapters/${chapterId}`);
        setChapter(response.data);
      } catch (error) {
        console.error("Failed to fetch chapter questions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChapterQuestions();
  }, [courseId, chapterId]);

  if (loading) return <CircularProgress />;
  if (!chapter) return <Typography>Chapter not found.</Typography>;

  return (
    <Box>
      <Button component={Link} to={`/courses/${courseId}`} startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        Back to Chapters
      </Button>
      <Typography variant="h4" gutterBottom>Chapter {chapter.chapter_number}: {chapter.chapter_title}</Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        {chapter.questions.map((question, index) => (
          <React.Fragment key={question.id}>
            <QuestionItem question={question} />
            {index < chapter.questions.length - 1 && <Divider sx={{ my: 4 }} />}
          </React.Fragment>
        ))}
      </Paper>
    </Box>
  );
};

export default ChapterPracticePage;