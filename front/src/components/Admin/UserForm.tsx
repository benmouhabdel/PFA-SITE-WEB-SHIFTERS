import React, { useState } from 'react';
import api from '../../services/api';
import './UserForm.css';

interface UserCreateFormProps {
  onSubmit: () => void;
  fetchUsers: () => void;
}

const UserCreateForm: React.FC<UserCreateFormProps> = ({ onSubmit, fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!name || !email || !password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/users', { name, email, password });
      fetchUsers();
      onSubmit();
      setName('');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error('Failed to create user:', error);
      setError(error.response?.data?.error || 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
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
      <button type="submit" disabled={isLoading}>
        Create User
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default UserCreateForm;
