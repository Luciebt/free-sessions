
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useAuth } from 'features/auth/AuthContext';
import { signOut } from 'services/authService';
import { getTherapist, createTherapist, updateTherapist } from 'services/therapistService';
import { Therapist } from 'types/Therapist';
import theme from '../styles/theme';
import Button from '../components/common/Button';
import { TherapistEditModal } from '../components/admin/TherapistEditModal';

const DashboardContainer = styled.div`
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

const ProfileSection = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  padding: ${theme.spacing.large};
  margin-top: ${theme.spacing.large};
  text-align: center;
`;

const ActionButton = styled(Button)`
  margin-top: ${theme.spacing.medium};
`;

export const DashboardPage: React.FC = () => {
  const { session } = useAuth();
  const [therapistProfile, setTherapistProfile] = useState<Therapist | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (session?.user?.id) {
      try {
        const profile = await getTherapist(session.user.id);
        setTherapistProfile(profile);
      } catch (error) {
        console.error('Error fetching therapist profile:', error);
        // If no profile exists, initialize with basic info
        setTherapistProfile({ id: session.user.id, email: session.user.email || '', fullName: '', bio: '', languages: [], specialties: [], targetGroups: [], location: { onlineOnly: true }, schedulingLink: '', approved: false, busy: false });
      }
    }
    setLoadingProfile(false);
  }, [session]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSaveProfile = async (updatedProfile: Therapist) => {
    if (!session?.user?.id) return;

    try {
      if (therapistProfile?.fullName) { // Check if profile already exists (simple check)
        await updateTherapist(session.user.id, updatedProfile);
        alert('Profile updated successfully!');
      } else {
        await createTherapist({ ...updatedProfile, id: session.user.id, email: session.user.email || '' });
        alert('Profile created successfully!');
      }
      setIsEditModalOpen(false);
      fetchProfile(); // Re-fetch to ensure state is consistent
    } catch (error: any) {
      alert(`Error saving profile: ${error.message}`);
    }
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  if (!session || loadingProfile) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardContainer>
      <Title>Therapist Dashboard</Title>
      <p>Welcome, {session.user.email}</p>
      <Button onClick={signOut}>Sign Out</Button>

      <ProfileSection>
        <h3>Your Profile</h3>
        {therapistProfile ? (
          <>
            <p><strong>Full Name:</strong> {therapistProfile.fullName}</p>
            <p><strong>Bio:</strong> {therapistProfile.bio}</p>
            <p><strong>Languages:</strong> {therapistProfile.languages.join(', ')}</p>
            <p><strong>Specialties:</strong> {therapistProfile.specialties.join(', ')}</p>
            <p><strong>Target Groups:</strong> {therapistProfile.targetGroups.join(', ')}</p>
            <p><strong>Location:</strong> {therapistProfile.location.onlineOnly ? 'Online' : `${therapistProfile.location.city}, ${therapistProfile.location.country}`}</p>
            <p><strong>Scheduling Link:</strong> {therapistProfile.schedulingLink}</p>
            <p><strong>Approved:</strong> {therapistProfile.approved ? 'Yes' : 'No'}</p>
            <p><strong>Busy:</strong> {therapistProfile.busy ? 'Yes' : 'No'}</p>
            {therapistProfile.personalLink && <p><strong>Personal Website:</strong> {therapistProfile.personalLink}</p>}
            <ActionButton onClick={handleOpenEditModal}>Edit Profile</ActionButton>
          </>
        ) : (
          <>
            <p>No profile found. Please create one.</p>
            <ActionButton onClick={handleOpenEditModal}>Create Profile</ActionButton>
          </>
        )}
      </ProfileSection>

      {isEditModalOpen && therapistProfile && (
        <TherapistEditModal
          therapist={therapistProfile}
          onSave={handleSaveProfile}
          onClose={handleCloseEditModal}
        />
      )}
    </DashboardContainer>
  );
};
