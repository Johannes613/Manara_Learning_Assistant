import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  InputBase,
  Grid,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import ChapterCard from "./ChapterCard";
import MarkdownRenderer from "../../common/MarkdownRenderer"; // Import the renderer

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/courses/${courseId}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Failed to fetch course details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const filteredChapters = useMemo(() => {
    if (!course || !course.chapters) return [];
    if (!searchTerm) return course.chapters;
    return course.chapters.filter((ch) =>
      ch.chapter_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [course, searchTerm]);

  if (loading) return <CircularProgress />;
  if (!course) return <Typography>Course not found.</Typography>;

  return (
    <Box>
      <Button
        component={Link}
        to="/courses"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Courses
      </Button>
      <Typography variant="h4" gutterBottom>
        {course.course_name}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {course.department}
      </Typography>

      {/* Use MarkdownRenderer for the course description */}
      {course.description && (
        <Box sx={{ my: 2 }}>
          <MarkdownRenderer>{course.description}</MarkdownRenderer>
        </Box>
      )}

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          my: 3,
          maxWidth: "500px",
        }}
      >
        <SearchIcon sx={{ p: "10px", color: "text.secondary" }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Chapters..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>
      <Grid container spacing={2}>
        {filteredChapters.map((chapter) => (
          <Grid item xs={12} md={6} key={chapter.id}>
            <ChapterCard chapter={chapter} courseId={course.id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseDetailPage;
