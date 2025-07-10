import React from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import theme from "../styles/theme";
import { useAuth } from "../features/auth/AuthContext";

const HomeContainer = styled.div`
  padding: ${theme.spacing.large};
  text-align: center;
  background-color: ${theme.colors.background};
  min-height: calc(100vh - 120px); // Adjust based on header/footer height
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.h1.fontSize};
  margin-bottom: ${theme.spacing.medium};
`;

const Subtitle = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.body.fontSize};
  margin-bottom: ${theme.spacing.large};
`;

const ButtonContainer = styled.div`
  margin-top: ${theme.spacing.large};
  display: flex;
  gap: ${theme.spacing.medium};
  justify-content: center;
`;

const HomePage: React.FC = () => {
  const { session } = useAuth();
  const isAdmin =
    session && session.user.email === process.env.REACT_APP_ADMIN_EMAIL;

  return (
    <HomeContainer>
      <Card>
        <Title>Welcome to Free Sessions During the Holidays</Title>
        <Subtitle>
          Find a therapist to support you during the holiday season.
        </Subtitle>
        <ButtonContainer>
          <Button onClick={() => (window.location.href = "/directory")}>
            View Directory
          </Button>
          <Button variant="text" onClick={() => alert("Contact Us clicked!")}>
            Contact Us
          </Button>
          {isAdmin && (
            <Button onClick={() => (window.location.href = "/admin")}>
              Go to Admin Page
            </Button>
          )}
        </ButtonContainer>
      </Card>
    </HomeContainer>
  );
};

export default HomePage;

