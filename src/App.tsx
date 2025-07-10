import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from 'components/layout/Header';
import { Footer } from 'components/layout/Footer';
import { HomePage } from 'pages/HomePage';
import { DirectoryPage } from 'pages/DirectoryPage';
import { LoginPage } from 'pages/LoginPage';
import { DashboardPage } from 'pages/DashboardPage';
import { AdminPage } from 'pages/AdminPage';
import { AuthProvider } from 'features/auth/AuthContext';
import { ProtectedRoute } from 'features/auth/ProtectedRoute';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;


function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </AuthProvider>
    </Router>
  );
}

export default App;
