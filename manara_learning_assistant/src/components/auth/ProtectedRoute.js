import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Box, CircularProgress } from "@mui/material";

const ProtectedRoute = ({ proRequired, adminRequired }) => {
  const { currentUser, subscription, isAdmin, loading } = useAuth();

  // 1. Show a loading spinner while the auth context is initializing
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 2. If not logged in, redirect to the sign-in page
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  // 3. If the route requires admin but the user is not an admin, redirect
  if (adminRequired && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  // 4. If the route requires pro but the user is not pro (and not an admin), redirect
  if (proRequired && subscription?.plan !== "pro" && !isAdmin) {
    return <Navigate to="/subscription" replace />;
  }

  // 5. If all checks pass, render the child route
  return <Outlet />;
};

export default ProtectedRoute;
