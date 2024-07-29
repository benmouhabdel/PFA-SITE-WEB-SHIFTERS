import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../../services/api';
import { Task, User } from '../../types';
import { RootState } from '../../store/store';

interface TaskUpdateFormProps {
  task: Task;
  onUpdateComplete: () => void;
}

const TaskUpdateForm: React.FC<TaskUpdateFormProps> = ({ task, onUpdateComplete }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);
  const [userId, setUserId] = useState<number>(task.user?.id || 0);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<User[]>('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user?.role !== 'admin') {
      setError('Only admins can update tasks');
      return;
    }

    try {
      await api.put(`/tasks/${task.id}`, { title, description, status, user_id: userId });
      onUpdateComplete();
    } catch (error) {
      console.error('Failed to update task:', error);
      setError('Failed to update task');
    }
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as string)}
        >
          <MenuItem value="urgent">Urgent</MenuItem>
          <MenuItem value="a faire prochainement">a faire prochainement</MenuItem>
          <MenuItem value="au fil du temps ">au fil du temps</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>User</InputLabel>
        <Select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          required
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Update Task
      </Button>
      <Button onClick={onUpdateComplete} variant="outlined">
        Cancel
      </Button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default TaskUpdateForm;
