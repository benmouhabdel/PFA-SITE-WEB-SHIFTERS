import React from 'react';
import CommentForm from '../components/Admin/CommentForm';
import CommentsList from '../components/Admin/CommentsList';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #1d3557 70%, #f4a261 90%); 
`;

const Heading = styled.h1`
  font-size: 32px;
  color: white;
  margin-bottom: 20px;
  
`;



const CommentPage: React.FC = () => {
  return (
    <PageContainer>
      <Heading>Commentaires</Heading>
        <CommentForm />
        <CommentsList />
    </PageContainer>
  );
};

export default CommentPage;
