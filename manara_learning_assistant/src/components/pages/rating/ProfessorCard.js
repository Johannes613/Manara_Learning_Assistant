import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProfessorCard = ({ professor }) => {
  if (!professor) {
    return null;
  }

  // Split the courses string into an array, handle null or empty string
  const courseList = professor.courses ? professor.courses.split(", ") : [];

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div">
          {professor.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {professor.department}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Rating
            name={`rating-${professor.id}`}
            value={professor.overallRating || 0}
            precision={0.1}
            readOnly
          />
          <Typography sx={{ ml: 1 }}>
            ({professor.reviewCount} reviews)
          </Typography>
        </Box>

        {/* New section to display courses as Chips */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            minHeight: "32px",
          }}
        >
          {courseList.map((course) => (
            <Chip key={course} label={course} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>
      <Button
        component={Link}
        to={`/professors/${professor.id}`}
        sx={{ mt: "auto", mx: 2, mb: 2 }}
      >
        View Details & Reviews
      </Button>
    </Card>
  );
};

export default ProfessorCard;
