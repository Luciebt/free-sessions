
import { Therapist } from 'types/Therapist';

export const mockTherapists: Therapist[] = [
  {
    id: '1',
    email: 'jane.doe@example.com',
    fullName: 'Dr. Jane Doe',
    bio: 'A compassionate therapist with over 10 years of experience.',
    languages: ['English', 'Spanish'],
    specialties: ['Cognitive Behavioral Therapy (CBT)', 'Mindfulness'],
    targetGroups: ['Adults', 'Adolescents'],
    location: {
      onlineOnly: true,
    },
    schedulingLink: 'https://calendly.com/janedoe',
    approved: true,
  },
  {
    id: '2',
    email: 'john.smith@example.com',
    fullName: 'Dr. John Smith',
    bio: 'Specializes in helping clients with anxiety and depression.',
    languages: ['English', 'French'],
    specialties: ['Psychodynamic Therapy'],
    targetGroups: ['Adults', 'Couples'],
    location: {
      onlineOnly: false,
      city: 'New York',
      country: 'USA',
    },
    schedulingLink: 'https://calendly.com/johnsmith',
    approved: true,
  },
];
