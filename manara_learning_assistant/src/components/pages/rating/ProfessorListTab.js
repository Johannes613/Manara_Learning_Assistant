import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Box,
  Paper,
  InputBase,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import ProfessorCard from "./ProfessorCard";

const ProfessorListTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const professorsPerPage = 6;

  const fetchProfessors = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ search: searchTerm });
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/api/professors?${params.toString()}`
      );
      setProfessors(response.data);
    } catch (error) {
      console.error("Failed to fetch professors", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProfessors();
    }, 500); // Debounce search
    return () => clearTimeout(delayDebounceFn);
  }, [fetchProfessors]);

  const paginatedProfessors = professors.slice(
    (page - 1) * professorsPerPage,
    page * professorsPerPage
  );
  const handlePageChange = (event, value) => setPage(value);

  return (
    <Box>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          mb: 3,
          maxWidth: "500px",
        }}
      >
        <SearchIcon sx={{ p: "10px", color: "text.secondary" }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Professors by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {paginatedProfessors.length > 0 ? (
            paginatedProfessors.map((prof) => (
              <Grid item xs={12} sm={6} md={4} key={prof.id}>
                <ProfessorCard professor={prof} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ p: 3, width: "100%", textAlign: "center" }}>
              No professors found.
            </Typography>
          )}
        </Grid>
      )}

      {professors.length > professorsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(professors.length / professorsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProfessorListTab;
