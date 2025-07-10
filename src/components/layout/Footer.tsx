
import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.medium} ${theme.spacing.large};
  border-top: 1px solid ${theme.colors.secondary};
  text-align: center;
  margin-top: ${theme.spacing.xLarge};
  color: ${theme.colors.white};
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; 2025 Free Sessions During the Holidays. All rights reserved.</p>
    </FooterContainer>
  );
};
