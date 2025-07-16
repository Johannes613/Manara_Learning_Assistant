import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
} from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import styles from "./LandingPage.module.css";

const HeroSection = () => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  return (
    <Box
      id="hero"
      className={styles.heroBackground}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url("https://images.unsplash.com/photo-1640163561346-7778a2edf353?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0")`,
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />

      {/* Text Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.5)",
              fontSize: { xs: "2rem", sm: "2.75rem", md: "3rem" },
            }}
          >
            {t("hero.title")}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              mb: 4,
              fontWeight: 400,
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
              lineHeight: 1.6,
            }}
          >
            {t("hero.subtitle.line1")} <br />
            {t("hero.subtitle.line2")}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to={currentUser ? "/home" : "/signup"}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: "0.875rem", sm: "1rem" },
                borderRadius: "30px",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {currentUser ? t("hero.dashboard") : t("hero.cta")}
            </Button>

            <ScrollLink to="about" smooth duration={500} offset={-70}>
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  px: { xs: 5, sm: 4 },
                  py: { xs: 1.2, sm: 1.5 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  borderRadius: "30px",
                  width: { xs: "100%", sm: "auto" },
                  borderColor: "rgba(255,255,255,0.8)",
                  color: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {t("hero.learnMore")}
              </Button>
            </ScrollLink>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroSection;
