import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, Paper, CircularProgress, Alert } from '@mui/material';
import styles from './HomePage.module.css';
import axios from 'axios';

const RightSidebar = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecentCourses = async () => {
      try {
        // Fetch data from your backend endpoint
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/courses`);
        // Assuming the endpoint returns the newest courses first,
        // we can take the first few items if needed, e.g., response.data.slice(0, 6)
        setCourses(response.data);

      } catch (err) {
        console.error("Failed to fetch recent courses:", err);
        setError("Couldn't load recent courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentCourses();
  }, []);

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Recently Added Courses
      </Typography>
      
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
      {error && <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>}
      
      {!loading && !error && (
        <ul className={styles.problemList}>
          {courses.map(course => (
            <li key={course.id} className={styles.problemItem}>
              <Box sx={{
                bgcolor: 'action.hover',
                color: 'text.secondary',
                p: '4px 8px',
                borderRadius: 1.5,
                mr: 1.5,
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                minWidth: '50px',
                textAlign: 'center'
              }}>
                {course.department}
              </Box>
              <Link href={`/courses/${course.id}`} underline="hover" color="text.primary" sx={{ fontSize: '0.9rem' }}>
                {course.course_name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Paper>
  );
};

export default RightSidebar;
