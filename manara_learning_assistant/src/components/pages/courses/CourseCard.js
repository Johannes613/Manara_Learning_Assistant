import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => (
  <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" component="div">
        {course.course_name}
      </Typography>
      <Typography color="text.secondary">{course.department}</Typography>
    </CardContent>
    <Box sx={{ p: 2, pt: 0 }}>
      <Button
        component={Link}
        to={`/courses/${course.id}`}
        variant="contained"
        fullWidth
      >
        Practice Now
      </Button>
    </Box>
  </Card>
);

export default CourseCard;
