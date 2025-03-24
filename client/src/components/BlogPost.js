import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, useTheme, Box, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

function BlogPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/posts/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <Paper 
        sx={{ 
          padding: '2rem', 
          marginTop: '2rem',
          backgroundColor: theme.palette.background.paper
        }}
      >
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '4px',
              marginBottom: '2rem'
            }}
          />
        )}
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
        <Box sx={{ 
          mt: 3, 
          '& img': { maxWidth: '100%' },
          '& h1': { fontSize: '2rem', mt: 3, mb: 2 },
          '& h2': { fontSize: '1.8rem', mt: 3, mb: 2 },
          '& h3': { fontSize: '1.6rem', mt: 3, mb: 2 },
          '& p': { mb: 2, lineHeight: 1.7 },
          '& ul, & ol': { mb: 2, pl: 4 },
          '& blockquote': {
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            pl: 2,
            py: 1,
            my: 2,
            bgcolor: 'action.hover'
          },
          '& code': {
            p: 0.5,
            borderRadius: 1,
            bgcolor: 'action.hover',
            fontFamily: 'monospace'
          },
          '& pre': {
            p: 2,
            borderRadius: 1,
            bgcolor: 'action.hover',
            '& code': {
              bgcolor: 'transparent'
            }
          }
        }}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </Box>
        {user && user.id === post.author._id && (
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/edit/${post._id}`)}
            >
              Edit
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default BlogPost; 