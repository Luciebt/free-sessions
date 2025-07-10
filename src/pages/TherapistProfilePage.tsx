import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Therapist } from "../types/Therapist";
import { getTherapist, updateTherapist } from "../services/therapistService";
import { useAuth } from "../features/auth/AuthContext";
import theme from "../styles/theme";
import Button from "../components/common/Button";

const ProfileContainer = styled.div`
  padding: ${theme.spacing.xLarge};
  background-color: ${theme.colors.background};
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ProfileCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: ${theme.spacing.xLarge};
  width: 100%;
  max-width: 800px;
  text-align: left;
`;

const Name = styled.h1`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.h1.fontSize};
  margin-bottom: ${theme.spacing.medium};
`;

const Bio = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.body.fontSize};
  line-height: ${theme.typography.body.lineHeight};
  margin-bottom: ${theme.spacing.large};
`;

const DetailItem = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.body.fontSize};
  margin-bottom: ${theme.spacing.small};
  strong {
    color: ${theme.colors.primary};
  }
`;

const BookingButton = styled(Button)`
  width: 100%;
  padding: ${theme.spacing.medium} ${theme.spacing.large};
  font-size: 1.2rem;
  margin-top: ${theme.spacing.xLarge};
  background-color: ${theme.colors.secondary};
  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

const TherapistProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { session } = useAuth();
  const isAdmin =
    session && session.user.email === process.env.REACT_APP_ADMIN_EMAIL;

  useEffect(() => {
    if (id) {
      getTherapist(id)
        .then((data) => {
          setTherapist(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch therapist:", err);
          setError("Therapist not found or an error occurred.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleApprove = async () => {
    if (therapist) {
      await updateTherapist(therapist.id, { approved: true });
      setTherapist((prev) => (prev ? { ...prev, approved: true } : null));
    }
  };

  if (loading) {
    return <ProfileContainer>Loading therapist profile...</ProfileContainer>;
  }

  if (error) {
    return <ProfileContainer>{error}</ProfileContainer>;
  }

  if (!therapist) {
    return <ProfileContainer>Therapist not found.</ProfileContainer>;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <Name>{therapist.fullName}</Name>
        <Bio>{therapist.bio}</Bio>
        <DetailItem>
          <strong>Languages:</strong> {therapist.languages.join(", ")}
        </DetailItem>
        <DetailItem>
          <strong>Specialties:</strong> {therapist.specialties.join(", ")}
        </DetailItem>
        <DetailItem>
          <strong>Target Groups:</strong> {therapist.targetGroups.join(", ")}
        </DetailItem>
        {therapist.location.city && (
          <DetailItem>
            <strong>Location:</strong> {therapist.location.city},{" "}
            {therapist.location.country}
          </DetailItem>
        )}
        {therapist.location.onlineOnly && (
          <DetailItem>
            <strong>Online Only:</strong> Yes
          </DetailItem>
        )}
        {therapist.busy !== undefined && (
          <DetailItem>
            <strong>Status:</strong> {therapist.busy ? 'Busy' : 'Available'}
          </DetailItem>
        )}
        {therapist.personalLink && (
          <DetailItem>
            <strong>Website:</strong> <a href={therapist.personalLink} target="_blank" rel="noopener noreferrer">{therapist.personalLink}</a>
          </DetailItem>
        )}
        <BookingButton
          onClick={() => window.open(therapist.schedulingLink, "_blank")}
          disabled={!therapist.schedulingLink}
        >
          Book a Session
        </BookingButton>

        {isAdmin && !therapist.approved && (
          <BookingButton onClick={handleApprove} variant="secondary">
            Approve Therapist
          </BookingButton>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default TherapistProfilePage;