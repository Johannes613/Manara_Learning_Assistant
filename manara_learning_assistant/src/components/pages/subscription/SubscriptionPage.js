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
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Load your Stripe public key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const tiers = [
  {
    title: "Basic",
    price: "0",
    currency: "AED",
    description: "Get started and explore basic features",
    features: [
      "Browse all exams & courses",
      "Limited AI explanations",
      "Community discussion access",
    ],
    buttonText: "You are on this plan",
    buttonVariant: "outlined",
    disabled: true,
  },
  {
    title: "Pro",
    price: "50",
    currency: "AED",
    description: "The complete toolkit for success",
    features: [
      "Unlimited AI explanations",
      "View all answers",
      "Full access to courses",
      "Rate professors",
    ],
    buttonText: "Go Pro",
    buttonVariant: "contained",
  },
];

const SubscriptionPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleGoPro = async () => {
    if (!currentUser) {
      navigate("/signin"); // Redirect to sign in if not logged in
      return;
    }
    try {
      // 1. Create a checkout session on your backend
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/payments/create-checkout-session`,
        {
          firebase_uid: currentUser.uid,
        }
      );
      const { url } = response.data;
      // 2. Redirect to Stripe's secure checkout page
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session", error);
      alert("Could not initiate payment. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={6} md={5}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  align="center"
                  fontWeight="bold"
                >
                  {tier.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h3" component="span" fontWeight="bold">
                    {tier.price}
                  </Typography>
                  <Typography
                    component="span"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {tier.currency}/month
                  </Typography>
                </Box>
                <List>
                  {tier.features.map((line) => (
                    <ListItem key={line} disableGutters>
                      <ListItemIcon sx={{ minWidth: "32px" }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={line} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Box sx={{ p: 3 }}>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  color="primary"
                  size="large"
                  disabled={tier.disabled}
                  onClick={tier.title === "Pro" ? handleGoPro : null}
                >
                  {tier.buttonText}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubscriptionPage;
