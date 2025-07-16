import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Link,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AuthLayout from "../../layout/AuthLayout";
import PrimaryButton from "../../common/PrimaryButton";
import styles from "./auth.module.css";

import { auth } from '../../../config/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/home'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Sign in using your Manara credentials"
    >
      {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
      
      <Box className={styles.socialIconsContainer}>
       <IconButton 
  aria-label="google-signin" 
  onClick={handleGoogleSignIn} 
  disabled={loading}
  sx={{
    bgcolor: 'background.paper',         // theme-aware light background
    color: 'text.primary',               // icon remains visible in both themes
    border: '1px solid',
    borderColor: 'divider',
    width: 56,
    height: 56,
    '&:hover': {
      bgcolor: 'action.hover',
    },
  }}
>
  <GoogleIcon />
</IconButton>

      </Box>

      <Divider sx={{ my: 2, width: '100%' }}>Or</Divider>

      <Box component="form" onSubmit={handleEmailSubmit} className={styles.form}>
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          variant="filled"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Keep me logged in"
          sx={{ mt: 1, color: "text.secondary" }}
        />
        <PrimaryButton type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </PrimaryButton>
      </Box>

      <Box className={styles.linksContainer}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup" variant="body2" color="primary">
            Sign up
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Forgot password?{" "}
          <Link component={RouterLink} to="/recover" variant="body2" color="primary">
            Recover
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default SignInPage;
