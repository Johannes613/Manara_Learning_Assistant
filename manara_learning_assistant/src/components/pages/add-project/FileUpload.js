import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { UploadFile as UploadFileIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const FileUpload = ({ title, acceptedFiles, onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file); // Pass the selected file up to the parent
    }
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        textAlign: 'center',
        borderColor: selectedFile ? 'primary.main' : 'divider',
        borderStyle: 'dashed',
        borderWidth: 2,
        backgroundColor: 'action.hover'
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <Button
        variant="contained"
        component="label" // This makes the button trigger the file input
        startIcon={selectedFile ? <CheckCircleIcon /> : <UploadFileIcon />}
        color={selectedFile ? "success" : "primary"}
      >
        {selectedFile ? "File Selected" : "Choose File"}
        <input
          type="file"
          hidden
          accept={acceptedFiles}
          onChange={handleFileChange}
        />
      </Button>
      {selectedFile && (
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {selectedFile.name}
        </Typography>
      )}
    </Paper>
  );
};

export default FileUpload;
