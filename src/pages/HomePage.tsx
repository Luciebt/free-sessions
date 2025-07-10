
import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

export const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <h1>Welcome to Free Sessions During the Holidays</h1>
      <p>Find a therapist to support you during the holiday season.</p>
      <a href="/directory">View Directory</a>
    </HomeContainer>
  );
};
