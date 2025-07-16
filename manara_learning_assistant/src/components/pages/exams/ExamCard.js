import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { CalendarToday, AddCircleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ExamCard = ({ exam }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            mb: 1,
          }}
        >
          <CalendarToday sx={{ fontSize: 16, mr: 1 }} />
          <Typography variant="body2">{`${exam.semester} ${exam.year}`}</Typography>
        </Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {exam.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {exam.course_name}
        </Typography>

        <Button
          component={Link}
          to={`/exams/${exam.id}`}
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutline />}
          sx={{ mt: 2, textTransform: "none" }}
        >
          {t("examsPage.practiceNow")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExamCard;
