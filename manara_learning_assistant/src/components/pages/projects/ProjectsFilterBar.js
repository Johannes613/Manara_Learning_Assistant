import React, { useState, useEffect } from "react";
import { Paper, InputBase, Box, Select, MenuItem } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import styles from "../home/HomePage.module.css"; // Adjust the path as necessary

const ProjectsFilterBar = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange("search", searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onFilterChange]);

  const handleFilterSelect = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <Box>
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
          placeholder={t("Enter key project keyword")}
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
    

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Select
          name="course"
          defaultValue=""
          displayEmpty
          onChange={handleFilterSelect}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 150,
            backgroundColor: "background.paper",
            borderRadius: 2,
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
        >
          <MenuItem value="">
            <em>Filter by Course</em>
          </MenuItem>
          {["CSE-450", "EEE-380", "ART-210"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Select
          name="tag"
          defaultValue=""
          displayEmpty
          onChange={handleFilterSelect}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 150,
            backgroundColor: "background.paper",
            borderRadius: 2,
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
        >
          <MenuItem value="">
            <em>Filter by Tag</em>
          </MenuItem>
          {["React", "Python", "Firebase", "Arduino"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Select
          name="instructor_name"
          defaultValue=""
          displayEmpty
          onChange={handleFilterSelect}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 150,
            backgroundColor: "background.paper",
            borderRadius: 2,
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
          }}
        >
          <MenuItem value="">
            <em>Filter by Instructor</em>
          </MenuItem>
          {["Dr. Evelyn Reed", "Prof. Ben Carter"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default ProjectsFilterBar;
