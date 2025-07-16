import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Done as DoneIcon, UploadFile as UploadFileIcon } from '@mui/icons-material';
import { useAuth } from '../../../contexts/AuthContext'; 

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/duxlzjqto/upload';
const UPLOAD_PRESET = 'UnassinedPreset';

function AddPostPage() {
  const { currentUser } = useAuth(); 
  const [postDetails, setPostDetails] = useState({ title: '', content: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return '';
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      setError('Image upload failed. Please try again.');
      return '';
    }
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!postDetails.title || !postDetails.content) {
      setError('Title and content are required.');
      return;
    }

    setIsSubmitting(true);
    let uploadedImageUrl = '';

    if (imageFile) {
      uploadedImageUrl = await uploadImageToCloudinary();
      if (!uploadedImageUrl) {
        setIsSubmitting(false);
        return;
      }
      setImageUrl(uploadedImageUrl);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/posts`, {
        title: postDetails.title,
        content: postDetails.content,
        imageUrl: uploadedImageUrl,
        author: currentUser?.displayName || 'Anonymous', 
        authorId: currentUser?.uid || 'unknown',
      });

      setSuccess(response.data.message || 'Post created successfully!');
      setPostDetails({ title: '', content: '' });
      setImageFile(null);
    } catch (err) {
      console.error('Error submitting post:', err);
      setError(err.response?.data?.message || 'Failed to create post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Create New Post
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Post Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Post Title"
              name="title"
              value={postDetails.title}
              onChange={e => setPostDetails({ ...postDetails, title: e.target.value })}
              disabled={isSubmitting}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={8}
              label="Post Content"
              name="content"
              value={postDetails.content}
              onChange={e => setPostDetails({ ...postDetails, content: e.target.value })}
              disabled={isSubmitting}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Optional Image</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              disabled={isSubmitting}
            >
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            {imageFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {imageFile.name}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={isSubmitting ? <CircularProgress size={20} /> : <DoneIcon />}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Post'}
        </Button>
      </Box>
    </Box>
  );
}

export default AddPostPage;
