import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Container, Box, Typography, Paper, styled } from '@mui/material';

const Background = styled(Box)({
  background: 'linear-gradient(135deg, #e0f7fa 30%, #e1bee7 90%)',
  minHeight: '100vh',
  padding: '20px',
});

const PaperStyled = styled(Paper)({
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Title = styled(Typography)({
  marginBottom: '20px',
  fontWeight: 600,
  textAlign: 'center',
});

const UserProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <Background>
      <Container maxWidth="sm">
        <PaperStyled elevation={3}>
          <Title variant="h4">User Profile</Title>
          <Typography variant="h6">Name:</Typography>
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="h6">Email:</Typography>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="h6">Role:</Typography>
          <Typography variant="body1">{user.role}</Typography>
        </PaperStyled>
      </Container>
    </Background>
  );
};

export default UserProfilePage;
