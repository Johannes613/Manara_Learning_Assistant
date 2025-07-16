import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Done as DoneIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const AddProjectPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    course: "",
    instructor_name: "",
    description: "",
    tags: "",
    download_url: "", // Field for download URL
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitProject = async () => {
    // Updated validation to no longer check for thumbnail_url
    if (
      !projectDetails.title ||
      !projectDetails.download_url
    ) {
      setError("Please fill in all required fields, including the download URL.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      // Prepare payload for your Express backend
      const payload = {
        ...projectDetails,
        tags: projectDetails.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        author: currentUser?.displayName || "Anonymous",
        authorId: currentUser?.uid,
      };

      // Send project metadata to your Express/MySQL backend
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/projects`,
        payload
      );

      alert("Project submitted successfully!");
      navigate("/projects");
    } catch (err) {
      console.error("Error submitting project:", err);
      setError(
        err.response?.data?.message || "An error occurred during submission."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Add New Project
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Project Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Project Title"
              name="title"
              value={projectDetails.title}
              onChange={handleDetailsChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Course (e.g., CSE-450)"
              name="course"
              value={projectDetails.course}
              onChange={handleDetailsChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Instructor Name"
              name="instructor_name"
              value={projectDetails.instructor_name}
              onChange={handleDetailsChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tags (comma-separated, e.g., React, Firebase)"
              name="tags"
              value={projectDetails.tags}
              onChange={handleDetailsChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Project Description"
              name="description"
              value={projectDetails.description}
              onChange={handleDetailsChange}
            />
          </Grid>

          {/* Thumbnail URL input has been removed */}
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Project Download URL (.zip, .rar, etc.)"
              name="download_url"
              value={projectDetails.download_url}
              onChange={handleDetailsChange}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={
            isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <DoneIcon />
            )
          }
          onClick={handleSubmitProject}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Finish & Submit Project"}
        </Button>
      </Box>
    </Box>
  );
};

export default AddProjectPage;
