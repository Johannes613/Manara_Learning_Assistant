import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

// A generic style for modals
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
};

const InfoModal = ({ open, onClose, title, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{message}</Typography>
        <Button variant="contained" onClick={onClose} sx={{ mt: 3 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default InfoModal;
