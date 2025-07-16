import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  TextField,
  Link,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import AuthLayout from "../../layout/AuthLayout";
import PrimaryButton from "../../common/PrimaryButton";
import styles from "./auth.module.css"; // Make sure this is a .module.css file

// Import Firebase auth functions
import { auth } from "../../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const RecoverPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(
        "Password reset instructions sent! Please check your email inbox."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Recover access"
      subtitle="Enter your email address to start"
    >
      <Box component="form" onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2, width: "100%" }}>
            {success}
          </Alert>
        )}

        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <PrimaryButton
          type="submit"
          disabled={loading}
          sx={{
            py: 1.5,
            mb: 3,
            mt: 2,
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 550,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Send Instructions"
          )}
        </PrimaryButton>

        <Typography variant="body2" align="center">
          Recalled your password?{" "}
          <Link component={RouterLink} to="/signin">
            Sign in
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default RecoverPasswordPage;
