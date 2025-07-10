import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Therapist } from "types/Therapist";
import { getAllTherapists, updateTherapist } from "services/therapistService";
import { TherapistCard } from "features/directory/TherapistCard";
import theme from "../styles/theme";
import { useAuth } from "../features/auth/AuthContext";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const DirectoryContainer = styled.div`
  padding: ${theme.spacing.large};
  background-color: ${theme.colors.background};
  min-height: calc(100vh - 120px);
`;

const Title = styled.h2`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.h1.fontSize};
  text-align: center;
  margin-bottom: ${theme.spacing.large};
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.secondary};
  font-size: ${theme.typography.h2.fontSize};
  margin-top: ${theme.spacing.xLarge};
  margin-bottom: ${theme.spacing.medium};
`;

const TherapistList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.medium};
`;

const UnapprovedCard = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: ${theme.spacing.medium};
  margin: ${theme.spacing.small};
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  border: 2px solid ${theme.colors.secondary};
`;

const UnapprovedName = styled.h4`
  color: ${theme.colors.primary};
  margin-top: 0;
  margin-bottom: ${theme.spacing.small};
`;

const UnapprovedActions = styled.div`
  display: flex;
  gap: ${theme.spacing.small};
  margin-top: ${theme.spacing.medium};
`;

export const DirectoryPage: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const { session } = useAuth();
  const isAdmin =
    session && session.user.email === process.env.REACT_APP_ADMIN_EMAIL;
  const navigate = useNavigate();

  const fetchAllTherapists = () => {
    getAllTherapists().then(setTherapists);
  };

  useEffect(() => {
    fetchAllTherapists();
  }, []);

  const handleApprove = async (therapist: Therapist) => {
    await updateTherapist(therapist.id, { approved: true });
    fetchAllTherapists();
  };

  const handleViewProfile = (id: string) => {
    navigate(`/therapist/${id}`);
  };

  const unapprovedTherapists = therapists.filter((t) => !t.approved);
  const approvedTherapists = therapists.filter((t) => t.approved);

  return (
    <DirectoryContainer>
      <Title>Therapist Directory</Title>

      {isAdmin && unapprovedTherapists.length > 0 && (
        <>
          <SectionTitle>Unapproved Therapists (Admin View)</SectionTitle>
          <TherapistList>
            {unapprovedTherapists.map((therapist) => (
              <UnapprovedCard key={therapist.id}>
                <UnapprovedName>{therapist.fullName}</UnapprovedName>
                <p>{therapist.email}</p>
                <UnapprovedActions>
                  <Button onClick={() => handleApprove(therapist)}>
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleViewProfile(therapist.id)}
                    variant="secondary"
                  >
                    View Profile
                  </Button>
                </UnapprovedActions>
              </UnapprovedCard>
            ))}
          </TherapistList>
          <SectionTitle>Approved Therapists</SectionTitle>
        </>
      )}

      <TherapistList>
        {approvedTherapists.map((therapist) => (
          <TherapistCard key={therapist.id} therapist={therapist} />
        ))}
      </TherapistList>
    </DirectoryContainer>
  );
};

