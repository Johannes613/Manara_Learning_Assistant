import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  TextField,
  Collapse,
  CircularProgress,
  Avatar,
  Badge,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./HomePage.module.css";
import MarkdownRenderer from "../../common/MarkdownRenderer";

// A new component to handle the reply section
const ReplySection = ({ postId, onReplyAdded }) => {
  const { currentUser } = useAuth();
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/replies`
        );
        setReplies(response.data);
      } catch (error) {
        console.error("Failed to fetch replies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReplies();
  }, [postId]);

  const handleAddReply = async () => {
    if (!newReply.trim() || !currentUser) return;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/replies`,
        {
          content: newReply,
          author: currentUser?.displayName || "Anonymous",
          authorId: currentUser?.uid,
        }
      );

      // Add the new reply to the state to update UI immediately
      const newReplyData = {
        id: response.data.replyId, // Use the ID from the backend response
        author: currentUser?.displayName || "Anonymous",
        content: newReply,
        created_at: new Date().toISOString(),
      };
      setReplies((prevReplies) => [...prevReplies, newReplyData]);
      onReplyAdded(); // Call the callback to update the parent's reply count
      setNewReply("");
    } catch (error) {
      console.error("Failed to add reply", error);
    }
  };

  return (
    <Box sx={{ mt: 2, borderTop: "1px solid", borderColor: "divider", pt: 2 }}>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        replies.map((reply) => (
          <Box key={reply.id} sx={{ display: "flex", mb: 1.5 }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: "0.8rem" }}>
              {reply.author?.[0] || "A"}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {reply.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reply.content}
              </Typography>
            </Box>
          </Box>
        ))
      )}
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Write a reply..."
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          disabled={!currentUser}
        />
        <Button onClick={handleAddReply} sx={{ ml: 1 }} disabled={!currentUser}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

const PostCard = ({ post }) => {
  const { currentUser } = useAuth();
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(post.user_has_liked > 0);
  const [showReplies, setShowReplies] = useState(false);
  const [replyCount, setReplyCount] = useState(post.reply_count || 0);

  // This useEffect hook ensures the 'isLiked' state is always
  // synchronized with the 'post' prop when it changes.
  useEffect(() => {
    setIsLiked(post.user_has_liked > 0);
  }, [post.user_has_liked]);

  const timeAgo = post.created_at
    ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
    : "just now";
  const avatarText = post.author ? post.author.charAt(0).toUpperCase() : "A";
  const avatarUrl = `https://placehold.co/40x40/EFEFEF/333?text=${avatarText}`;

  const handleLikeToggle = async () => {
    if (!currentUser) {
      alert("Please log in to like a post.");
      return;
    }

    const originalIsLiked = isLiked;
    const originalLikeCount = likeCount;
    // Optimistically update the UI for a responsive feel
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      // This API call tells the backend to update the database
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${post.id}/like`, {
        userId: currentUser.uid,
      });
    } catch (error) {
      console.error("Failed to toggle like", error);
      // Revert the UI changes if the API call fails
      setIsLiked(originalIsLiked);
      setLikeCount(originalLikeCount);
    }
  };

  const handleReplyAdded = () => {
    setReplyCount((prev) => prev + 1);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box className={styles.postHeader}>
        <img
          src={avatarUrl}
          alt="Author Avatar"
          className={styles.postAvatar}
        />
        <Box className={styles.postAuthorInfo}>
          <Typography
            variant="subtitle2"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {post.author || "Unknown"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Announcement • {timeAgo}
          </Typography>
        </Box>
      </Box>

      {post.image_url && (
        <img
          src={
            post.image_url.startsWith("http")
              ? post.image_url
              : `${process.env.REACT_APP_API_BASE_URL}${post.image_url}`
          }
          alt={post.title}
          className={styles.postImage}
        />
      )}

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 1, mt: post.image_url ? 2 : 0 }}
      >
        {post.title}
      </Typography>
      <MarkdownRenderer>{post.content}</MarkdownRenderer>
      <Box className={styles.postActions}>
        <Box className={styles.postVote}>
          {/* The icon's color changes based on the 'isLiked' state */}
          <IconButton size="small" onClick={handleLikeToggle}>
            {isLiked ? (
              <ThumbUpAltIcon color="primary" />
            ) : (
              <ThumbUpOffAltIcon />
            )}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {likeCount}
          </Typography>
        </Box>
        <Button
          startIcon={
            <Badge badgeContent={replyCount} color="primary">
              <ChatBubbleOutlineIcon />
            </Badge>
          }
          size="small"
          sx={{ textTransform: "none", color: "text.secondary", ml: 1 }}
          onClick={() => setShowReplies(!showReplies)}
        >
          Replies
        </Button>
      </Box>

      <Collapse in={showReplies}>
        <ReplySection postId={post.id} onReplyAdded={handleReplyAdded} />
      </Collapse>
    </Paper>
  );
};

export default PostCard;
