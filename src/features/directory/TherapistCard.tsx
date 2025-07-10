
import React from 'react';
import styled from 'styled-components';
import { Therapist } from 'types/Therapist';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Name = styled.h3`
  margin-top: 0;
`;

interface TherapistCardProps {
  therapist: Therapist;
}

export const TherapistCard: React.FC<TherapistCardProps> = ({ therapist }) => {
  return (
    <Card>
      <Name>{therapist.fullName}</Name>
      <p>{therapist.bio}</p>
      <p><strong>Languages:</strong> {therapist.languages.join(', ')}</p>
      <p><strong>Specialties:</strong> {therapist.specialties.join(', ')}</p>
      <a href={therapist.schedulingLink} target="_blank" rel="noopener noreferrer">
        Schedule a Session
      </a>
    </Card>
  );
};
