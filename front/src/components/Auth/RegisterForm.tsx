import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationKey, setRegistrationKey] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/register/user', {
        name,
        email,
        password,
        registration_key: registrationKey,
      });
      const { user, access_token } = response.data;
      localStorage.setItem('token', access_token);
      dispatch(setCredentials({ user, token: access_token }));
      navigate('/dashboard'); // Redirection vers le tableau de bord après l'enregistrement
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="text"
        value={registrationKey}
        onChange={(e) => setRegistrationKey(e.target.value)}
        placeholder="Registration Key"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;