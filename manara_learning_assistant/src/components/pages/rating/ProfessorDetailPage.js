import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Rating,
  Divider,
  Button,
  CircularProgress,
  Collapse,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCommentIcon from "@mui/icons-material/AddComment";
import axios from "axios";
import ProfessorReviewForm from "./ProfessorReviewForm";

const ProfessorDetailPage = () => {
  const { professorId } = useParams();
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchProfessor = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/professors/${professorId}`
      );
      setProfessor(response.data);
    } catch (error) {
      console.error("Failed to fetch professor details", error);
      setProfessor(null);
    } finally {
      setLoading(false);
    }
  }, [professorId]);

  useEffect(() => {
    fetchProfessor();
  }, [fetchProfessor]);

  const handleReviewSubmitSuccess = () => {
    setShowReviewForm(false);
    fetchProfessor();
  };

  // --- THIS IS THE FIX ---
  // Convert review.overall_rating to a number before adding.
  const overallRating =
    professor?.reviews.reduce(
      (acc, review) => acc + Number(review.overall_rating),
      0
    ) / (professor?.reviews.length || 1);
  // --- END OF FIX ---

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!professor) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        Professor not found.
      </Typography>
    );
  }

  return (
    <Box>
      <Button
        component={Link}
        to="/rating"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Ratings
      </Button>
      <Paper sx={{ p: 3 }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4">{professor.name}</Typography>
            <Typography variant="h6" color="text.secondary">
              {professor.department}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
              <Rating value={overallRating || 0} readOnly precision={0.1} />
              <Typography sx={{ ml: 1 }}>
                {overallRating.toFixed(1)} overall rating (
                {professor.reviews.length} reviews)
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<AddCommentIcon />}
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Leave Your Rating
            </Button>
          </Grid>
        </Grid>

        <Collapse in={showReviewForm}>
          <ProfessorReviewForm
            professorName={professor.name}
            professorDepartment={professor.department}
            onReviewSubmitSuccess={handleReviewSubmitSuccess}
          />
        </Collapse>

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Student Reviews
        </Typography>
        {professor.reviews.map((review) => (
          <Paper key={review.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3}>
                <Typography>
                  <strong>Overall Rating:</strong>{" "}
                  <Rating
                    size="small"
                    value={Number(review.overall_rating)}
                    readOnly
                  />
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography>
                  <strong>Grade Received:</strong> {review.grade || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography>
                  <strong>Difficulty:</strong> {review.difficulty || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography>
                  <strong>Teaching:</strong> {review.teaching_style || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography>
                  <strong>Take Again:</strong>{" "}
                  {review.would_take_again || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
};

export default ProfessorDetailPage;
