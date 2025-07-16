import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import MarkdownRenderer from "../../common/MarkdownRenderer";
import axios from "axios";
import { auth } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_BASE_URL);

const DiscussionTab = ({ examId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // State for the logged-in user
  const messagesEndRef = useRef(null);

  // Effect to listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Effect for fetching initial messages and handling real-time updates
  useEffect(() => {
    if (!examId) return;

    // Join the specific chat room for this exam
    socket.emit("joinRoom", examId);

    // Fetch initial messages
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/exams/${examId}/discussions`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();

    // Listener for new messages from the server
    const handleNewMessage = (newMessage) => {
      // Ensure the message belongs to the current discussion
      if (newMessage.exam_id.toString() === examId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("new_message", handleNewMessage);

    // Cleanup on component unmount or when examId changes
    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [examId]);

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handlePostMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    const messageData = {
      userId: currentUser.uid,
      authorName: currentUser.displayName || "Anonymous",
      authorAvatarUrl: currentUser.photoURL,
      messageBody: newMessage,
    };

    // The message is sent via HTTP POST, and the server broadcasts it via WebSocket
    try {
      console.log("Exam id" + examId)
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/exams/${examId}/discussions`,
        messageData
      );
      setNewMessage(""); // Clear input only on successful post
    } catch (error) {
      console.error("Failed to post message", error);
      alert("Error: Could not post your message.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "70vh" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
        {/* ... (The mapping and rendering of messages remains the same) ... */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <Paper key={msg.id} sx={{ p: 2, mb: 2, display: "flex", gap: 2 }}>
              <Avatar
                src={msg.author_avatar_url}
                sx={{ bgcolor: "primary.main" }}
              >
                {msg.author_name.charAt(0)}
              </Avatar>
              <Box sx={{ width: "100%", minWidth: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {msg.author_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(msg.created_at).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ mt: 1, wordBreak: "break-word" }}>
                  <MarkdownRenderer>{msg.message_body}</MarkdownRenderer>
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography color="text.secondary" align="center">
            No discussion for this exam yet. Be the first to start!
          </Typography>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        component="div"
        sx={{ mt: 2, display: "flex", gap: 2, flexShrink: 0 }}
      >
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          label={
            currentUser ? "Join the discussion..." : "Please log in to chat"
          }
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!currentUser}
        />
        <Button
          sx={{ height: "50%" }}
          variant="contained"
          onClick={handlePostMessage}
          disabled={!currentUser}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default DiscussionTab;
