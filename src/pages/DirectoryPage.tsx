
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Therapist } from 'types/Therapist';
import { fetchTherapists } from 'services/therapistService';
import { TherapistCard } from 'features/directory/TherapistCard';

const DirectoryContainer = styled.div`
  padding: 2rem;
`;

const TherapistList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const DirectoryPage: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    fetchTherapists().then(setTherapists);
  }, []);

  return (
    <DirectoryContainer>
      <h2>Therapist Directory</h2>
      <TherapistList>
        {therapists.map((therapist) => (
          <TherapistCard key={therapist.id} therapist={therapist} />
        ))}
      </TherapistList>
    </DirectoryContainer>
  );
};
