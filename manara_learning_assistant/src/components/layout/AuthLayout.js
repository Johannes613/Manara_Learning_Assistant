import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // Or your own logo

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <Container component="main" maxWidth="xs" sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SchoolIcon color="primary" sx={{ m: 1, fontSize: '3rem' }} />
        <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          {subtitle}
        </Typography>
        {children}
      </Box>
    </Container>
  );
};

export default AuthLayout;
