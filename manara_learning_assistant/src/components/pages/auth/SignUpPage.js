import React, { useState } from "react";
import {
  Box,
  TextField,
  Link,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import PrimaryButton from "../../common/PrimaryButton";
import { auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign Up" subtitle="Create your Manara account">
      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleEmailSubmit}
        sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
      >
        <TextField
          fullWidth
          required
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          margin="dense"
          disabled={loading}
          variant="filled"
          sx={{ "& .MuiFilledInput-root": { borderRadius: 3 } }}
        />
        <TextField
          fullWidth
          required
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="dense"
          disabled={loading}
          variant="filled"
          sx={{ "& .MuiFilledInput-root": { borderRadius: 3 } }}
        />
        <TextField
          fullWidth
          required
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="dense"
          disabled={loading}
          variant="filled"
          sx={{ "& .MuiFilledInput-root": { borderRadius: 3 } }}
        />
        <TextField
          fullWidth
          required
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="dense"
          disabled={loading}
          variant="filled"
          sx={{ "& .MuiFilledInput-root": { borderRadius: 3 } }}
        />

        <FormControlLabel
          control={<Checkbox required color="primary" />}
          sx={{ mt: 1 }}
          label={
            <Typography variant="body2">
              By signing up you agree to our{" "}
              <Link component={RouterLink} to="/terms" underline="hover">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link component={RouterLink} to="/terms" underline="hover">
                Privacy Policy
              </Link>
              .
            </Typography>
          }
        />
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </PrimaryButton>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/signin" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default SignUpPage;
