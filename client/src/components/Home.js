import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Typography, 
  Container,
  useTheme,
  Box
} from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function Home() {
  const [posts, setPosts] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts`);
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
      {/* Posts Grid */}
      <Grid container spacing={4}>
        {posts.length > 0 ? (
          posts.map(post => (
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
                      {post.author && `By ${post.author.username} • `}
                      {new Date(post.createdAt).toLocaleDateString()}
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography 
              variant="h6" 
              align="center"
              sx={{ color: theme.palette.text.secondary }}
            >
              No posts available.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Home; 