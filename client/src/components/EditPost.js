import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  useTheme 
} from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import LoadingSpinner from './LoadingSpinner';

function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImage(res.data.image || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE_URL}/api/posts/${id}`,
        { title, content, image },
        {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        }
      );
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ 
        padding: '2rem', 
        marginTop: '2rem',
        backgroundColor: theme.palette.background.paper 
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
              },
            }}
          />
          <TextField
            label="Image URL (optional)"
            fullWidth
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
              },
            }}
          />
          <TextField
            label="Content"
            fullWidth
            margin="normal"
            multiline
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '1rem' }}
          >
            Update Post
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default EditPost; 