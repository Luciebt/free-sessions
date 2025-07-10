
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from 'features/auth/AuthContext';
import { signOut } from 'services/authService';
import { getTherapist, createTherapist, updateTherapist } from 'services/therapistService';
import { ProfileForm } from 'features/profile/ProfileForm';
import { Therapist } from 'types/Therapist';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

export const DashboardPage: React.FC = () => {
  const { session } = useAuth();
  const [therapistProfile, setTherapistProfile] = useState<Partial<Therapist>>({});
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.id) {
        try {
          const profile = await getTherapist(session.user.id);
          setTherapistProfile(profile);
        } catch (error) {
          console.error('Error fetching therapist profile:', error);
          // If no profile exists, initialize with basic info
          setTherapistProfile({ id: session.user.id, email: session.user.email || '' });
        }
      }
      setLoadingProfile(false);
    };

    fetchProfile();
  }, [session]);

  const handleProfileSubmit = async (updatedProfile: Partial<Therapist>) => {
    if (!session?.user?.id) return;

    try {
      if (therapistProfile.fullName) { // Check if profile already exists (simple check)
        await updateTherapist(session.user.id, updatedProfile);
        alert('Profile updated successfully!');
      } else {
        await createTherapist({ ...updatedProfile, id: session.user.id, email: session.user.email || '' });
        alert('Profile created successfully!');
      }
      // Re-fetch to ensure state is consistent
      const profile = await getTherapist(session.user.id);
      setTherapistProfile(profile);
    } catch (error: any) {
      alert(`Error saving profile: ${error.message}`);
    }
  };

  if (!session || loadingProfile) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardContainer>
      <h2>Therapist Dashboard</h2>
      <p>Welcome, {session.user.email}</p>
      <button onClick={signOut}>Sign Out</button>
      <h3>Your Profile</h3>
      <ProfileForm therapist={therapistProfile} onSubmit={handleProfileSubmit} />
    </DashboardContainer>
  );
};
