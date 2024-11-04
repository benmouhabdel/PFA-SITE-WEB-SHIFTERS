import React, { useState } from 'react';
import { Button, Box, Typography, TextField, Paper, styled, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyIcon from '@mui/icons-material/VpnKey';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(Paper)((() => ({
  padding: '40px',
  width: '100%',
  maxWidth: '900px',
  borderRadius: '0',
  boxShadow: 'none',
  background: 'linear-gradient(135deg, #fcbf49 0%, #023047 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
})));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '25px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
  },
}));

const StyledButton = styled(Button)(() => ({
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

interface RegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [registrationKey, setRegistrationKey] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/register/user', {
        name,
        email,
        password,
        phone,
        registration_key: registrationKey,
      });
      const { user, access_token } = response.data;
      localStorage.setItem('token', access_token);
      dispatch(setCredentials({ user, token: access_token }));
      navigate('/profile');
      onClose();
    } catch (error) {
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <FormContainer>
      <Box display="flex" justifyContent="flex-end" width="100%" mb={2}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Register
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
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
        <StyledTextField
          fullWidth
          label="Phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          fullWidth
          label="Registration Key"
          type="text"
          value={registrationKey}
          onChange={(e) => setRegistrationKey(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <StyledButton type="submit" fullWidth variant="contained" color="primary">
          Register
        </StyledButton>
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account?{' '}
          <Button color="primary" onClick={() => navigate('/login')}>
            Log in
          </Button>
        </Typography>
      </StyledForm>
    </FormContainer>
  );
};

export default RegisterForm;
