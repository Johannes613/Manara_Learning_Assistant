import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import PostCard from './PostCard';
import RightSidebar from './RightSideBar';
import styles from './HomePage.module.css';
import axios from 'axios';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts`);
        setPosts(response.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Could not load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      className={styles.homeLayout}
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        gap: 4,
        px: { xs: 2, sm: 4, md: 6 },
        pt: 4,
        bgcolor: 'background.default',
      }}
    >
      {/* Left/Center Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          Posts
        </Typography>

        {/* Search Box */}
        <Paper
          elevation={0}
          sx={{
            p: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            borderRadius: 2,
            bgcolor: 'action.hover',
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary' }} />
          <input
            type="text"
            placeholder="Search by keyword..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              marginLeft: '8px',
              flex: 1,
              fontSize: '1rem',
            }}
          />
        </Paper>

        {/* Social Follow */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Follow us on social media
          </Typography>
          <Box>
            <IconButton size="small" sx={{ color: 'text.secondary' }}><SendIcon /></IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary' }}><XIcon /></IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary' }}><FacebookIcon /></IconButton>
          </Box>
        </Paper>

        {/* Posts */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <Typography sx={{ textAlign: 'center', my: 5 }}>
            No matching posts found.
          </Typography>
        )}
      </Box>

      {/* Right Sidebar */}
      {!isSmallScreen && (
        <Box sx={{ width: 300, flexShrink: 0 }}>
          <RightSidebar />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
