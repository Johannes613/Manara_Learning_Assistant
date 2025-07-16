import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  InputBase,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import CourseCard from "./CourseCard";
import styles from "../home/HomePage.module.css"; // Adjust the path as necessary

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search: searchTerm });
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/courses?${params.toString()}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCourses();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchCourses]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Courses
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: "8px 16px",
          display: "flex",
          alignItems: "center",
          mb: 3,
          borderRadius: 2,
          bgcolor: "action.hover",
        }}
      >
        <SearchIcon sx={{ color: "text.secondary" }} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Courses by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            marginLeft: "8px",
            flex: 1,
            fontSize: "1rem",
          }}
        />
      </Paper>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CoursesPage;
