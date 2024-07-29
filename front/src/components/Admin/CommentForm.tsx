import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { RootState } from '../../store/store';
import styled from 'styled-components';



const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width:200%;
  
`;
const Textarea = styled.textarea`
  padding: 25px; /* Adjust padding for better usability */
  font-size: 16px;
  border: 2px solid #ddd; /* Increase the border width */
  border-radius: 4px;
  resize: vertical;
  min-height: 200px; /* Increase minimum height for better usability */
  width: 100%; /* Ensure the textarea uses the full width of the container */
  margin-bottom: 15px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: #f4a261;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  margin-top: 10px;
`;

const AdminMessage = styled.p`
  font-size: 20px;
  color: #1d3557;
  font-style: italic; /* Italicize the text */
  font-weight: bold; /* Make it bold for emphasis */
  text-align: center; /* Center-align the text */
  margin: 20px 0; /* Add some margin for spacing */
`;

const CommentForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post('/comments', { content });
      setContent('');
      alert('Comment added successfully');
    } catch (error: any) {
      setError(error.response?.data?.message || 'An unexpected error occurred');
    }
  };

  if (isAdmin) {
    return <AdminMessage>Bonjour Mr le Responsable.</AdminMessage>;
  }

  return (
    
      <StyledForm onSubmit={handleSubmit}>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment"
          required
        />
        <SubmitButton type="submit">Post Comment</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledForm>

  );
};

export default CommentForm;
