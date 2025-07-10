
import React from 'react';
import styled from 'styled-components';
import { useAuth } from 'features/auth/AuthContext';
import { signOut } from 'services/authService';

const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Nav = styled.nav`
  a, button {
    margin-left: 1rem;
    text-decoration: none;
    color: #333;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      color: #007bff;
    }
  }
`;

const ADMIN_EMAIL = 'admin@example.com';

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
            {session.user.email === ADMIN_EMAIL && <a href="/admin">Admin</a>}
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <a href="/login">Therapist Login</a>
        )}
      </Nav>
    </HeaderContainer>
  );
};
