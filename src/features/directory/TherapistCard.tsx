import React from 'react';
import styled from 'styled-components';
import { Therapist } from 'types/Therapist';
import theme from '../../styles/theme';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: ${theme.spacing.large};
  margin: ${theme.spacing.medium};
  width: 300px; /* Fixed width for uniform size */
  min-height: 280px; /* Fixed min-height for uniform size */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
`;

const Name = styled.h3`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.h2.fontSize};
  margin-top: 0;
  margin-bottom: ${theme.spacing.small};
`;

const Bio = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.body.fontSize};
  margin-bottom: ${theme.spacing.medium};
  flex-grow: 1; /* Allows bio to take up available space */
`;

const Details = styled.p`
  color: ${theme.colors.lightText};
  font-size: ${theme.typography.body.fontSize};
  margin-bottom: ${theme.spacing.small};
  strong {
    color: ${theme.colors.text};
  }
`;

const ButtonWrapper = styled.div`
  margin-top: ${theme.spacing.medium};
  display: flex;
  justify-content: center;
`;

interface TherapistCardProps {
  therapist: Therapist;
}

export const TherapistCard: React.FC<TherapistCardProps> = ({ therapist }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    // Assuming a route like /therapist/:id exists
    navigate(`/therapist/${therapist.id}`);
  };

  return (
    <CardContainer>
      <div>
        <Name>{therapist.fullName}</Name>
        <Bio>{therapist.bio}</Bio>
        <Details><strong>Languages:</strong> {therapist.languages.join(', ')}</Details>
        <Details><strong>Specialties:</strong> {therapist.specialties.join(', ')}</Details>
        <Details><strong>Target Groups:</strong> {therapist.targetGroups.join(', ')}</Details>
        {therapist.location.city && (
          <Details><strong>Location:</strong> {therapist.location.city}, {therapist.location.country}</Details>
        )}
        {therapist.location.onlineOnly && (
          <Details><strong>Online Only:</strong> Yes</Details>
        )}
        {therapist.busy !== undefined && (
          <Details><strong>Status:</strong> {therapist.busy ? 'Busy' : 'Available'}</Details>
        )}
        {therapist.personalLink && (
          <Details><strong>Website:</strong> <a href={therapist.personalLink} target="_blank" rel="noopener noreferrer">Link</a></Details>
        )}
      </div>
      <ButtonWrapper>
        <Button onClick={handleViewMore}>View Profile</Button>
      </ButtonWrapper>
    </CardContainer>
  );
};