import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "./LandingPage.module.css";

const FeaturesSection = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const features = [
    {
      icon: "https://placehold.co/60x60/FFFFFF/0ABAB5?text=AI",
      title: t("features.ai.title"),
      description: t("features.ai.description"),
    },
    {
      icon: "https://placehold.co/60x60/FFFFFF/0ABAB5?text=DB",
      title: t("features.db.title"),
      description: t("features.db.description"),
    },
    {
      icon: "https://placehold.co/60x60/FFFFFF/0ABAB5?text=UP",
      title: t("features.upload.title"),
      description: t("features.upload.description"),
    },
    {
      icon: "https://placehold.co/60x60/FFFFFF/0ABAB5?text=24/7",
      title: t("features.availability.title"),
      description: t("features.availability.description"),
    },
  ];

  return (
    <Box id="features" className={styles.section} sx={{ py: { xs: 8, md: 10 } }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {t("features.heading")}{" "}
          <span className={styles.gradientText}>{t("features.highlight")}</span>
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{
            mb: 6,
            maxWidth: 700,
            mx: "auto",
            fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
          }}
        >
          {t("features.subheading")}
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 4,
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  textAlign: "center",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardContent sx={{ px: 3, py: 5 }}>
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      mb: 3,
                      mx: "auto",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #0ABAB5 0%,rgb(8, 185, 170) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={feature.icon}
                      alt={feature.title}
                      sx={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.2 }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
