import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const ChapterCard = ({ chapter, courseId }) => (
  <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Box>
      <Typography variant="subtitle1" color="text.secondary">Chapter {chapter.chapter_number}</Typography>
      <Typography variant="h6">{chapter.chapter_title}</Typography>
    </Box>
    <Button component={Link} to={`/courses/${courseId}/chapters/${chapter.id}`} variant="outlined">
      Start Practice
    </Button>
  </Paper>
);

export default ChapterCard;