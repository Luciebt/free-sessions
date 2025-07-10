import React from "react";
import styled from "styled-components";
import { useAuth } from "features/auth/AuthContext";
import { signOut } from "services/authService";
import theme from "../../styles/theme";

const HeaderContainer = styled.header`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.medium} ${theme.spacing.large};
  border-bottom: 1px solid ${theme.colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: ${theme.typography.h2.fontSize};
  margin: 0;
  color: ${theme.colors.white};
`;

const Nav = styled.nav`
  a,
  button {
    margin-left: ${theme.spacing.medium};
    text-decoration: none;
    color: ${theme.colors.white};
    background: none;
    border: none;
    cursor: pointer;
    font-size: ${theme.typography.body.fontSize};

    &:hover {
      color: ${theme.colors.accent};
    }
  }
`;

export const Header: React.FC = () => {
  const { session } = useAuth();

  return (
    <HeaderContainer>
      <Logo>Free Sessions</Logo>
      <Nav>
        <a href="/">Home</a>
        <a href="/directory">Directory</a>
        {session ? (
          <>
            <a href="/dashboard">Dashboard</a>
            {session.user.email === process.env.REACT_APP_ADMIN_EMAIL && (
              <a href="/admin">Admin</a>
            )}
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <a href="/login">Therapist Login</a>
        )}
      </Nav>
    </HeaderContainer>
  );
};
