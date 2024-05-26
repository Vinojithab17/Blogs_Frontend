import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [userId, setUserId] = useState(1);
  const [csrfToken, setCsrfToken] = useState('');


// this is a dummy commit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const apiUrl = process.env.REACT_APP_API_URL;
    const requestBody = {
      title: title,
      content: content,
      image: imageUrl? imageUrl : 'https://source.unsplash.com/random?wallpapers',
      user_id: 1,
    };

    console.log('Request Body:', requestBody);

    const response = await axios.post(`${apiUrl}/blogs`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('POST request successful:', response.data);

    // Show success toast notification
    toast.success('Blog post added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Clear the form fields
    setTitle('');
    setContent('');
    setImageUrl('');
  } catch (error) {
    console.error('Error adding blog post:', error);
    // Show error toast notification
    toast.error('Error adding blog post. Please try again later.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          New Blog Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            multiline
            rows={4}
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default BlogForm;