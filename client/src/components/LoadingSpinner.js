import React from 'react';
import { Container, CircularProgress } from '@mui/material';

function LoadingSpinner() {
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

export default LoadingSpinner; 