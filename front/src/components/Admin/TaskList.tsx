import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { Task } from '../../types';
import { List, ListItem, ListItemText, Typography, Button, Box } from '@mui/material';
import TaskUpdateForm from './TaskUpdate';
import { RootState } from '../../store/store';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get<Task[]>('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleUpdate = (id: number) => {
    setEditingTaskId(id);
  };

  const handleUpdateComplete = () => {
    setEditingTaskId(null);
    fetchTasks();
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <List>
      {tasks.slice().reverse().map((task) => (
          <ListItem key={task.id}>
            {editingTaskId === task.id ? (
              <TaskUpdateForm task={task} onUpdateComplete={handleUpdateComplete} />
            ) : (
              <>
                <ListItemText
                  primary={<Typography variant="h6">{task.title}</Typography>}
                  secondary={
                    <>
                      <Typography variant="body2">{task.description}</Typography>
                      <Typography variant="body2">{task.status}</Typography>
                      <Typography variant="body2">Assigned to: {task.user?.name || 'Unknown'}</Typography>
                    </>
                  }
                />
                {isAdmin && (
                  <Box>
                    <Button onClick={() => handleUpdate(task.id)}>Update</Button>
                    <Button onClick={() => handleDelete(task.id)} color="error">Delete</Button>
                  </Box>
                )}
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;