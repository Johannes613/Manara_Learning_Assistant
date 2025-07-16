import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

// A generic style for modals
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 450 },
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{description}</Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 4, justifyContent: "flex-end" }}
        >
          <Button variant="outlined" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            {confirmText}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
