
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 1rem 2rem;
  border-top: 1px solid #e9ecef;
  text-align: center;
  margin-top: 2rem;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; 2025 Free Sessions During the Holidays. All rights reserved.</p>
    </FooterContainer>
  );
};
