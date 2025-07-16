import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

/**
 * Generates a fixed thumbnail URL using a constant background color.
 */
const getStaticThumbnail = (project) => {
  // Use the course code for the text, or "Project" as a fallback
  const text = encodeURIComponent(project.course || "Project");
  const bgColor = "81cbc7"; // Fixed color
  return `https://placehold.co/600x400/${bgColor}/FFF?text=${text}`;
};

const ProjectCard = ({ project }) => {
  // Split the tags string into an array, handle null or empty string
  const tagList = project.tags ? project.tags.split(", ") : [];

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : project.technologies
    ? project.technologies.split(",").map((t) => t.trim())
    : [];

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="180"
        // Updated to always use the dynamically generated thumbnail
        image={getStaticThumbnail(project)}
        alt={project.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.course} - by {project.instructor_name}
        </Typography>
        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {tagList.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
       <Button
          component="a"
          href={project.download_url}
          target="_blank"
          rel="noopener noreferrer"
          // Changed variant to "outlined" for a transparent background with a border
          variant="outlined" 
          color="primary"
          startIcon={<DownloadIcon />}
          fullWidth
          sx={{ textTransform: "none" }}
        >
          {("Download")}
        </Button>
      </Box>
    </Card>
  );
};

export default ProjectCard;
