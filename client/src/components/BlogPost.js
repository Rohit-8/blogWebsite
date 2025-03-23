import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, useTheme } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function BlogPost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
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
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.content}
        </Typography>
        {user && user.id === post.author._id && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/edit/${post._id}`)}
              sx={{ marginRight: '1rem' }}
            >
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default BlogPost; 