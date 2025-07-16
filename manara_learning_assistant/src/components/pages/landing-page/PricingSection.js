import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import styles from "./LandingPage.module.css";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const tiers = [
  {
    titleKey: "pricing.basic.title",
    price: "0",
    descriptionKey: "pricing.basic.description",
    featureKeys: [
      "pricing.basic.features.0",
      "pricing.basic.features.1",
      "pricing.basic.features.2",
    ],
    buttonTextKey: "pricing.basic.buttonText",
    buttonVariant: "outlined",
  },
  {
    titleKey: "pricing.pro.title",
    price: "50",
    descriptionKey: "pricing.pro.description",
    featureKeys: [
      "pricing.pro.features.0",
      "pricing.pro.features.1",
      "pricing.pro.features.2",
      "pricing.pro.features.3",
    ],
    buttonTextKey: "pricing.pro.buttonText",
    buttonVariant: "contained",
    popular: true,
  },
  {
    titleKey: "pricing.premium.title",
    price: "75",
    descriptionKey: "pricing.premium.description",
    featureKeys: [
      "pricing.premium.features.0",
      "pricing.premium.features.1",
      "pricing.premium.features.2",
      "pricing.premium.features.3",
    ],
    buttonTextKey: "pricing.premium.buttonText",
    buttonVariant: "outlined",
  },
];

const PricingSection = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoPro = async () => {
    if (!currentUser) {
      navigate("/signin");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/payments/create-checkout-session`,
        {
          firebase_uid: currentUser.uid,
        }
      );
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session", error);
      alert(t("pricing.paymentError"));
    }
  };

  /**
   * Navigates to the home page if user is signed in,
   * otherwise navigates to the signup page.
   */
  const handleFreeSignUp = () => {
    if (currentUser) {
      navigate("/home");
    } else {
      navigate("/signup");
    }
  };

  return (
    <Box
      id="pricing"
      className={styles.section}
      sx={{ py: { xs: 8, md: 12 } }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          {t("pricing.mainTitle")}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ textAlign: "center", mb: 6 }}
        >
          {t("pricing.subTitle")}
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          {tiers.map((tier) => (
            <Grid item key={tier.titleKey} xs={12} sm={6} md={4}>
              <Card
                className={`${styles.pricingCard} ${
                  tier.popular ? styles.pricingCardPopular : ""
                }`}
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {t(tier.titleKey)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: "bold" }}
                    >
                      {/* Changed currency back to AED */}
                      AED {tier.price}
                    </Typography>
                    <Typography
                      component="span"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {t("pricing.perMonth")}
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 2 }}
                  >
                    {t(tier.descriptionKey)}
                  </Typography>

                  <List sx={{ px: 2 }}>
                    {tier.featureKeys.map((key) => (
                      <ListItem key={key} disableGutters sx={{ mb: 1 }}>
                        <ListItemIcon sx={{ minWidth: "32px" }}>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={t(key)} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <Box sx={{ px: 3, pb: 3 }}>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                    size="large"
                    sx={{
                      borderRadius: "30px",
                      fontWeight: 600,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      py: 1.5,
                    }}
                    // Updated onClick to handle conditional navigation
                    onClick={
                      tier.titleKey === "pricing.basic.title"
                        ? handleFreeSignUp
                        : tier.titleKey === "pricing.pro.title"
                        ? handleGoPro
                        : null
                    }
                  >
                    {t(tier.buttonTextKey)}
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingSection;