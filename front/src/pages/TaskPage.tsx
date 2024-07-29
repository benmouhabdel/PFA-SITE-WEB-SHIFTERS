import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskList from '../components/Admin/TaskList';
import TaskForm from '../components/Admin/TaskForm';
import { Container, Box, Typography, Paper, styled } from '@mui/material';

const Background = styled(Box)({
  background: 'linear-gradient(135deg, #a2c2e0 30%, #f3e5f5 90%)',
  minHeight: '100vh',
  padding: '20px',
});

const ContentWrapper = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const PaperStyled = styled(Paper)({
  padding: '20px',
  width: '48%',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Title = styled(Typography)({
  marginBottom: '20px',
  fontWeight: 600,
  textAlign: 'center',
});

const TaskPage: React.FC = () => {
  const [taskUpdated, setTaskUpdated] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleTaskCreated = () => {
    setTaskUpdated(!taskUpdated);
  };

  return (
    <Background>
      <ContentWrapper maxWidth="lg">
        <PaperStyled elevation={3}>
          <Title variant="h6">Task List</Title>
          <TaskList key={taskUpdated.toString()} />
        </PaperStyled>

        {user?.role === 'admin' && (
          <PaperStyled elevation={3}>
            <Title variant="h6">Create New Mission</Title>
            <TaskForm onTaskCreated={handleTaskCreated} />
          </PaperStyled>
        )}
      </ContentWrapper>
    </Background>
  );
};

export default TaskPage;
