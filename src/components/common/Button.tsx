import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  border-radius: ${theme.borderRadius};
  border: none;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  font-size: ${theme.typography.body.fontSize};
  transition: background-color 0.3s ease;

  ${props => props.variant === 'primary' && `
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.secondary};
    }
  `}

  ${props => props.variant === 'secondary' && `
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.primary};
    }
  `}

  ${props => props.variant === 'text' && `
    background-color: transparent;
    color: ${theme.colors.primary};
    &:hover {
      color: ${theme.colors.secondary};
    }
  `}
`;

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
