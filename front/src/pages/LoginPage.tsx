import React, { useState } from 'react';
import { Container, Box, Typography, styled, Drawer } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import backgroundImage from './shifters.jpg'; // Adjust the path as needed

const Background = styled(Box)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Footer = styled(Box)({
  height: '50px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  position: 'fixed',
  bottom: 0,
});

const LoginPage: React.FC = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(location.pathname === '/login');

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Background />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: { width: '50%' },
        }}
      >
        <LoginForm onClose={handleDrawerClose} />
      </Drawer>
      <Footer>
        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
          <Typography variant="body2" color="yellow">
            &copy; 2024 Shifters--Heec. Created by Abderrahman Benmouh.
          </Typography>
        </Container>
      </Footer>
    </>
  );
};

export default LoginPage;