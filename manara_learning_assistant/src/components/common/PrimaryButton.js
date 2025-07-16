import React from 'react';
import { Button } from '@mui/material';

const PrimaryButton = ({ children, ...props }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      sx={{
        mt: 2,
        mb: 2,
        py: 1.5,
        borderRadius: '50px', // This creates the pill shape
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#1a1a1a' // Dark text on the bright button for contrast
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
