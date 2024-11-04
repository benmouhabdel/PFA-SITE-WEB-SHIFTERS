import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const CommentCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const CommentContent = styled.p`
  font-size: 16px;
  color: #555;
`;

const CommentUser = styled.small`
  display: block;
  font-size: 14px;
  color: #888;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* Add margin-top to separate it from the content */

  &:hover {
    background-color: #c0392b;
  }
`;

const CommentsList: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.role === 'admin') {
      api.get('/comments').then((response) => {
        setComments(response.data);
      });
    }
  }, [user]);

  const handleDelete = async (commentId: number) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <Container>
      <Heading>Comments</Heading>
      {comments.map((comment) => (
        <CommentCard key={comment.id}>
          <CommentContent>{comment.content}</CommentContent>
          <CommentUser>by {comment.user.name}</CommentUser>
          <DeleteButton onClick={() => handleDelete(comment.id)}>Delete</DeleteButton>
        </CommentCard>
      ))}
    </Container>
  );
};

export default CommentsList;
