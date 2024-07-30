import React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../types';
import { List, ListItem, ListItemText, Typography, Button, Box } from '@mui/material';
import { RootState } from '../../store/store';

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <List>
      {users.slice().reverse().map((user) => (
        <ListItem key={user.id}>
          <ListItemText
            primary={<Typography variant="h6">{user.name}</Typography>}
            secondary={
              <>
                <Typography variant="body2">{user.email}</Typography>
                <Typography variant="body2">Phone: {user.phone || 'Not provided'}</Typography>
                <Typography variant="body2">Role: {user.role}</Typography>
              </>
            }
          />
          {isAdmin && (
            <Box>
              <Button onClick={() => onUserSelect(user)}>Update</Button>
            </Box>
          )}
        </ListItem>
      ))}
    </List>
  );
};
