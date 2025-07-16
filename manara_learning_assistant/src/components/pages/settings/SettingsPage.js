import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import ConfirmationModal from "../../common/ConfirmationModal"; // Import the new modal

const SettingsPage = () => {
  const { currentUser, subscription, isAdmin, refetchSubscription } = useAuth();
  const navigate = useNavigate();
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for the modal

  const handleOpenConfirmModal = () => {
    setError(""); // Clear previous errors when opening
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  // This function is now called only when the user confirms in the modal
  const handleConfirmCancellation = async () => {
    handleCloseConfirmModal(); // Close the modal
    setIsCancelling(true);
    setError("");
    try {
      const config = { headers: { "x-user-uid": currentUser.uid } };
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/cancel-subscription`,
        {},
        config
      );

      // Give the webhook a moment to process, then refetch status
      setTimeout(() => {
        refetchSubscription();
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while cancelling."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  if (!currentUser) {
    return <Typography>Please log in to view your settings.</Typography>;
  }

  const isPro = subscription?.plan === "pro";
  const subscriptionEndDate = subscription?.endDate
    ? new Date(subscription.endDate).toLocaleDateString()
    : "N/A";

  return (
    <Box>
      {/* Render the confirmation modal */}
      <ConfirmationModal
        open={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmCancellation}
        title="Confirm Subscription Cancellation"
        description="Are you sure? You will lose access to all Pro features at the end of your current billing period."
        confirmText="Yes, Cancel Subscription"
        cancelText="No, Keep Plan"
      />

      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        Settings
      </Typography>

      {/* Profile Information */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography fontWeight="bold">Display Name:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{currentUser.displayName || "Not set"}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="bold">Email:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{currentUser.email}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="bold">User Role:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{isAdmin ? "Admin" : "User"}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Subscription Management */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Subscription Management
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography fontWeight="bold">Current Plan:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ textTransform: "capitalize" }}>
              {subscription.plan}
            </Typography>
          </Grid>

          {isPro && (
            <>
              <Grid item xs={4}>
                <Typography fontWeight="bold">Renews On:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{subscriptionEndDate}</Typography>
              </Grid>
            </>
          )}

          <Grid item xs={12} sx={{ mt: 2 }}>
            {isPro ? (
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenConfirmModal} // This now opens the modal
                disabled={isCancelling}
              >
                {isCancelling ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Cancel Subscription"
                )}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/subscription")}
              >
                Upgrade to Pro
              </Button>
            )}
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
