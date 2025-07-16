import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Pagination,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Make sure to import this if not already
import FilterBar from "./FilterBar";
import ExamCard from "./ExamCard";

const ExamsPage = () => {
  const { t } = useTranslation();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const examsPerPage = 6;

  // State to hold all filter values
  const [filters, setFilters] = useState({
    year: "",
    semester: "",
    department: "",
    course_name: "",
    search: "",
  });

  // This effect will run whenever the `filters` state changes
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        // Build query parameters from the filters object
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            // Only add non-empty filters to the query
            params.append(key, value);
          }
        });

        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/exams?${params.toString()}`
        );
        setExams(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch exams. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, [filters]); // Dependency array includes filters

  // Callback function to be passed down to the FilterBar
  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedExams = exams.slice(
    (page - 1) * examsPerPage,
    page * examsPerPage
  );

  // ... (rest of the component's return statement remains the same)

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        {t("examsPage.title")}
      </Typography>

      {/* Pass the handler function to the FilterBar */}
      <FilterBar onFilterChange={handleFilterChange} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {paginatedExams.length > 0 ? (
              paginatedExams.map((exam) => (
                <Grid item xs={12} sm={6} md={4} key={exam.id}>
                  <ExamCard exam={exam} />
                </Grid>
              ))
            ) : (
              <Typography sx={{ p: 3, width: "100%", textAlign: "center" }}>
                No exams found matching your criteria.
              </Typography>
            )}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(exams.length / examsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ExamsPage;
