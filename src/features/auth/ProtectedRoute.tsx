import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "features/auth/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly,
}) => {
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
