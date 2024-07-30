import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, styled } from '@mui/material';
import api from '../services/api'; // Import the API client
import { UserList } from '../components/Admin/UserList';
import UserCreateForm from '../components/Admin/UserForm';
import UserEditForm from '../components/Admin/UserEdit';
import { User } from '../types';

const Background = styled(Box)({
  background: 'linear-gradient(135deg, #1d3557 70%, #f4a261 90%)',
  minHeight: '100vh',
  padding: '20px',
});

const PaperStyled = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Title = styled(Typography)({
  marginBottom: '20px',
  fontWeight: 600,
  textAlign: 'center',
  color: '#fff',
});

const AdminDashboardPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
    } catch (error: any) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleUserCreate = () => {
    setSelectedUser(null);
    fetchUsers();
  };

  const handleUserEdit = () => {
    setSelectedUser(null);
    fetchUsers();
  };

  const handleUserDelete = () => {
    setSelectedUser(null);
    fetchUsers();
  };

  return (
    <Background>
      <Container maxWidth="lg">
        <Title variant="h4">Admin Dashboard</Title>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PaperStyled elevation={3}>
              <Title variant="h6">User List</Title>
              <UserList users={users} onUserSelect={handleUserSelect} />
            </PaperStyled>
          </Grid>
          <Grid item xs={12} md={6}>
            <PaperStyled elevation={3}>
              <Title variant="h6">
                {selectedUser ? 'Edit User' : 'Create New User'}
              </Title>
              {selectedUser ? (
                <UserEditForm
                  userId={selectedUser.id}
                  onSubmit={handleUserEdit}
                  onDelete={handleUserDelete}
                  fetchUsers={fetchUsers}
                />
              ) : (
                <UserCreateForm onSubmit={handleUserCreate} fetchUsers={fetchUsers} />
              )}
            </PaperStyled>
          </Grid>
        </Grid>
      </Container>
    </Background>
  );
};

export default AdminDashboardPage;
