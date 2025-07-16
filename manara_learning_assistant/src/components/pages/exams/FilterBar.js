import React, { useState, useEffect } from "react";
import { Paper, InputBase, Box, Select, MenuItem } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import styles from "../home/HomePage.module.css"; // Adjust the path as necessary
const FilterBar = ({ onFilterChange }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce effect for search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange("search", searchTerm);
    }, 500); // Wait 500ms after the user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onFilterChange]);

  const handleFilterSelect = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <Box>
      {/* Search Bar */}

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
          placeholder={t("examsPage.searchPlaceholder")}
          className={styles.searchInput}
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

      {/* <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
          mb: 2,
        }}
      >
        <SearchIcon sx={{ p: "10px", color: "text.secondary" }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("examsPage.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper> */}

      {/* Filter Dropdowns */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Select
          name="year"
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
            <em>{t("examsPage.filterYear")}</em>
          </MenuItem>
          {["2025", "2024", "2023"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Select
          name="semester"
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
            <em>{t("examsPage.filterSemester")}</em>
          </MenuItem>
          {["Spring", "Fall", "Summer", "Winter"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Select
          name="department"
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
            <em>{t("examsPage.filterDepartment")}</em>
          </MenuItem>
          {["Computer Science", "Mathematics", "Physics"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <Select
          name="course_name"
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
            <em>{t("examsPage.filterCourse")}</em>
          </MenuItem>
          {["Calculus II", "Intro to Programming"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default FilterBar;
