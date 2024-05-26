import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Sidebar from './Sidebar';
import Footer from './Footer';
import axios from 'axios';
import { CircularProgress, List, ListItem, ListItemText,Box,Typography } from '@mui/material';
import { useState,useEffect } from 'react';



const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};




const defaultTheme = createTheme();

export default function Blog() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
      const user = localStorage.getItem('user');

      if (!user) {
        window.location.href = "/login"
        return;
      }


      const fetchBlogs = async () => {
        try {
        const apiUrl = process.env.REACT_APP_API_URL;
        console.log(apiUrl);
        const response = await axios.get(`${apiUrl}/blogs`);
          setBlogs(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
    
      fetchBlogs();
    }, []);
    
    if (loading) {
      return (
        <Container maxWidth="sm">
          <Box my={4} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        </Container>
      );
    }
    
    if (error) {
      return (
        <Container maxWidth="sm">
          <Box my={4}>
            <Typography variant="h6" color="error">
                Error
              {error}
            </Typography>
          </Box>
        </Container>
      );
    }
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {blogs.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Blogs"
        description="Create Blogs for fun"
      />
    </ThemeProvider>
  );
}