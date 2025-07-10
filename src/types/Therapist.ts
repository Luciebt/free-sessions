
export interface Therapist {
  id: string;
  email: string;
  fullName: string;
  bio: string;
  languages: string[];
  specialties: string[];
  targetGroups: string[];
  location: {
    onlineOnly: boolean;
    city?: string;
    country?: string;
  };
  schedulingLink: string;
  approved: boolean;
}
