import React, { useState } from 'react';
import { Button, Box, Typography, TextField, Paper, styled, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(Paper)((/* theme */) => ({
  padding: '40px',
  width: '100%',
  height: '100%',
  borderRadius: '0',
  boxShadow: 'none',
  background: 'linear-gradient(135deg, #fcbf49 0%, #023047 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const StyledTextField = styled(TextField)((/* theme */) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
}));

const StyledButton = styled(Button)((/* theme */) => ({
  borderRadius: '25px',
  padding: '12px 0',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  background: 'linear-gradient(45deg, darkblue 30%, #FF8E53 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(45deg, darkblue 30%, darkblue 90%)',
    transform: 'scale(1.05)',
  },
}));

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user, access_token } = await login({ email, password });
      localStorage.setItem('token', access_token);
      dispatch(setCredentials({ user, token: access_token }));
      navigate('/profile');
      onClose();
    } catch (error) {
      setError('Login failed. Please check your email and password and try again.');
    }
  };

  return (
    <FormContainer>
      <Box display="flex" justifyContent="flex-end" width="100%" mb={2}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'black' }}>
        Welcome Back
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: 'black', marginBottom: '2rem' }}>
        Sign in to your account
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <StyledButton type="submit" fullWidth variant="contained" color="primary">
          Log In
        </StyledButton>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Button color="primary" onClick={() => navigate('/register')}>
            Sign up
          </Button>
        </Typography>
      </StyledForm>
    </FormContainer>
  );
};

export default LoginForm;
