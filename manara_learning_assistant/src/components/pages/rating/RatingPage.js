import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import ProfessorListTab from "./ProfessorListTab";
import AddProfessorTab from "./AddProfessorTab";

const RatingPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Professor Ratings
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Professors" />
          <Tab label="Add / Rate Professor" />
        </Tabs>
      </Box>

      {tabIndex === 0 && <ProfessorListTab />}
      {tabIndex === 1 && <AddProfessorTab />}
    </Box>
  );
};

export default RatingPage;
