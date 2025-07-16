import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ProjectsFilterBar from "./ProjectsFilterBar";
import ProjectCard from "./ProjectCard";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  const projectsPerPage = 6;

  const [filters, setFilters] = useState({
    course: "",
    instructor_name: "",
    tag: "",
    search: "",
  });

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/api/projects?${params.toString()}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedProjects = projects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        {t("Previous Projects")}
      </Typography>

      <ProjectsFilterBar onFilterChange={handleFilterChange} />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {paginatedProjects.length > 0 ? (
            paginatedProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ p: 3, width: "100%", textAlign: "center" }}>
              No projects found matching your criteria.
            </Typography>
          )}
        </Grid>
      )}

      {projects.length > projectsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(projects.length / projectsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProjectsPage;
