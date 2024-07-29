import React from 'react';
import { Container, Box, Typography, Paper, styled } from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';

const Background = styled(Box)({
  background: 'linear-gradient(135deg, #1d3557 70%, #f4a261 90%)',
  minHeight: 'calc(100vh - 50px)', // Ajustez cette valeur pour la hauteur du footer
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const PaperStyled = styled(Paper)({
  padding: '30px',
  maxWidth: '600px',
  width: '100%',
  borderRadius: '8px',
  boxShadow: '0 4px 9px rgba(0, 0, 0, 0.2)',
  background: 'linear-gradient(135deg, #FF8E53 70%, blue 90%)',
});

const Title = styled(Typography)({
  marginBottom: '30px',
  fontWeight: 600,
  textAlign: 'center',
  color: 'black',
});

const Footer = styled(Box)({
  height: '50px', // Ajustez cette valeur pour la hauteur du footer
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
  return (
    <>
      <Background>
        <Container maxWidth="sm">
          <PaperStyled elevation={3}>
            <Title variant="h4">Login</Title>
            <LoginForm />
          </PaperStyled>
        </Container>
      </Background>
      <Footer>
      <Container maxWidth="lg" style={{ textAlign: 'center' }}>
        <Typography variant="body2" color="yellow"  >
          &copy; 2024 Shifters--Heec . Creat by Abderrahman Benmouh.
        </Typography>
      </Container>
      </Footer>
    </>
  );
};

export default LoginPage;
