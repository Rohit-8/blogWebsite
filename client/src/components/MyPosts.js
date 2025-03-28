import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Typography, 
  Container,
  useTheme,
  Button,
  CircularProgress,
  Box
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const res = await axios.get(`${API_BASE_URL}/api/posts/user`, {
          headers: { 'x-auth-token': token }
        });
        setPosts(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching your posts');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <Container 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
        <Typography 
          variant="h6" 
          align="center" 
          color="error"
          sx={{ color: theme.palette.error.main }}
        >
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
        My Posts
      </Typography>

      {posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.secondary }}>
            You haven't created any posts yet.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/create')}
            sx={{ 
              mt: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.main',
              color: theme.palette.mode === 'dark' ? 'common.white' : 'common.white',
              '&:hover': {
                bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.dark',
              }
            }}
          >
            Create Your First Post
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {posts.map(post => (
            <Grid item xs={12} md={6} lg={4} key={post._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease-in-out',
                    boxShadow: 6
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(`/post/${post._id}`)}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          marginBottom: '1rem',
                          borderRadius: '4px'
                        }}
                      />
                    )}
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      gutterBottom
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {post.title}
                    </Typography>
                    <Typography 
                      color="textSecondary" 
                      gutterBottom
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Created on: {new Date(post.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      paragraph
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {post.content.substring(0, 150)}...
                    </Typography>
                    <Box 
                      sx={{ 
                        color: theme.palette.primary.main,
                        textDecoration: 'underline',
                        mt: 1
                      }}
                    >
                      Read More
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MyPosts; 