import React, { useContext } from 'react';
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Box,
  useTheme,
  Divider
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const theme = useTheme();

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: theme.palette.primary.main,
              fontSize: '2.5rem',
              mr: 3
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h6" gutterBottom>
            Account Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile; 