import React from 'react';
import { Button } from '@mui/material';

const SocialButton = ({ provider, icon, onClick }) => {
  // The onClick function will be passed down from the parent page (e.g., SignInPage)
  // This is where you'll trigger the actual social login logic (e.g., with Supabase or Firebase)

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={icon}
      onClick={onClick} // Use the passed-in onClick handler
      sx={{ 
        mb: 1, 
        justifyContent: 'flex-start', // Align icon and text to the left
        textTransform: 'none',       // Prevent uppercase text
        fontSize: '1rem',
        padding: '10px 16px',
        color: 'text.secondary',     // Use theme's secondary text color
        borderColor: 'rgba(0, 0, 0, 0.23)', // Standard MUI outline color
        '&:hover': {
          borderColor: 'text.primary',
          backgroundColor: 'action.hover'
        }
      }}
    >
      Continue with {provider}
    </Button>
  );
};

export default SocialButton;
