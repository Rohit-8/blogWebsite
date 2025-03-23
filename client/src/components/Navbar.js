import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  useTheme,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" 
          sx={{ 
            flexGrow: 0, 
            color: 'white', 
            textDecoration: 'none',
            marginRight: 4
          }}>
          Blog Website
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            sx={{ 
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            All Posts
          </Button>

          {user && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/my-posts"
              sx={{ 
                ml: 2,
                backgroundColor: location.pathname === '/my-posts' ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
            >
              My Posts
            </Button>
          )}
        </Box>

        {/* Theme Toggle and Auth Buttons */}
        <IconButton 
          sx={{ mr: 2 }} 
          onClick={toggleTheme} 
          color="inherit"
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {user ? (
          <>
            <Button 
              color="inherit" 
              component={Link} 
              to="/create"
              sx={{ mr: 2 }}
            >
              Create Post
            </Button>
            <IconButton
              onClick={handleMenuOpen}
              sx={{ p: 0 }}
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.dark }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 