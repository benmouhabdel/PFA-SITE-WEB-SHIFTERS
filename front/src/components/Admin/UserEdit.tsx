import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { User } from '../../types';
import { TextField, Button, Box, Typography } from '@mui/material';
import './UserForm.css';

interface UserEditFormProps {
  userId: number;
  onSubmit: () => void;
  onDelete: () => void;
  fetchUsers: () => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({ userId, onSubmit, onDelete, fetchUsers }) => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get<User>(`/users/${userId}`);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !email) {
      setError('Name and email are required');
      setIsLoading(false);
      return;
    }

    try {
      await api.put(`/users/${userId}`, { name, email, password });
      fetchUsers();
      onSubmit();
    } catch (error: any) {
      console.error('Failed to update user:', error);
      setError(error.response?.data?.error || 'Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/users/${userId}`);
      fetchUsers();
      onDelete();
    } catch (error: any) {
      console.error('Failed to delete user:', error);
      setError(error.response?.data?.error || 'Failed to delete user');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} className="user-form" sx={{ mt: 2 }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password (optional)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading} aria-label="Update User">
          Update User
        </Button>
        <Button type="button" variant="contained" color="error" onClick={handleDelete} disabled={isLoading} aria-label="Delete User">
          Delete User
        </Button>
      </Box>
    </Box>
  );
};

export default UserEditForm;
