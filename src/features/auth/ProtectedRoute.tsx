
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'features/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

// This is a simple way to manage admin access. 
// In a real app, this would be a role in the database.
const ADMIN_EMAIL = 'admin@example.com'; 

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && session.user.email !== ADMIN_EMAIL) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};
