import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
};

const UpgradeModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleUpgradeClick = () => {
    navigate("/subscription");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          Upgrade to Pro
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Unlock all features, including answers, AI explanations, courses, and
          professor ratings for just
        </Typography>
        <Typography variant="h4" color="primary" sx={{ my: 2 }}>
          50 AED / month
        </Typography>
        <Button onClick={handleUpgradeClick} variant="contained" size="large">
          Upgrade Now
        </Button>
      </Box>
    </Modal>
  );
};

export default UpgradeModal;
