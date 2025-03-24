import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  useTheme,
  Box
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        `${API_BASE_URL}/api/posts`,
        { title, content, image },
        {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        }
      );
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ 
        padding: '2rem', 
        marginTop: '2rem',
        backgroundColor: theme.palette.background.paper 
      }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Post
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Image URL (optional)"
            fullWidth
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Content
            </Typography>
            <div data-color-mode={theme.palette.mode}>
              <MDEditor
                value={content}
                onChange={setContent}
                preview="edit"
                height={400}
                hideToolbar={false}
                textareaProps={{
                  placeholder: "Write your post content here..."
                }}
              />
            </div>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Formatting Tips:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              • Use # for headings (# H1, ## H2, etc.)<br />
              • **text** for bold<br />
              • *text* for italic<br />
              • - or * for bullet points<br />
              • 1. for numbered lists<br />
              • > for blockquotes
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
            sx={{ marginTop: '1rem' }}
          >
            {submitting ? 'Creating...' : 'Create Post'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreatePost; 