
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Therapist } from 'types/Therapist';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 80px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ProfileFormProps {
  therapist: Partial<Therapist>;
  onSubmit: (therapist: Partial<Therapist>) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ therapist, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Therapist>>({
    ...therapist,
    languages: therapist.languages || [],
    specialties: therapist.specialties || [],
    targetGroups: therapist.targetGroups || [],
    location: therapist.location || { onlineOnly: true },
  });

  useEffect(() => {
    setFormData({
      ...therapist,
      languages: therapist.languages || [],
      specialties: therapist.specialties || [],
      targetGroups: therapist.targetGroups || [],
      location: therapist.location || { onlineOnly: true },
    });
  }, [therapist]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name === 'onlineOnly') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...(prev.location || {}),
          onlineOnly: checked,
          city: checked ? '' : (prev.location?.city || ''),
          country: checked ? '' : (prev.location?.country || ''),
        },
      }));
    } else if (name === 'city' || name === 'country') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...(prev.location || {}),
          onlineOnly: prev.location?.onlineOnly || false,
          [name]: value,
        },
      }));
    } else if (name === 'languages' || name === 'specialties' || name === 'targetGroups') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(item => item.trim()),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submittedData: Partial<Therapist> = {
      ...formData,
      languages: formData.languages || [],
      specialties: formData.specialties || [],
      targetGroups: formData.targetGroups || [],
    };
    onSubmit(submittedData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName || ''}
        onChange={handleChange}
        required
      />
      <TextArea
        name="bio"
        placeholder="Short Professional Biography"
        value={formData.bio || ''}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="languages"
        placeholder="Languages Spoken (comma-separated)"
        value={formData.languages || ''}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="specialties"
        placeholder="Therapeutic Approaches (comma-separated)"
        value={formData.specialties || ''}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="targetGroups"
        placeholder="Target Groups (e.g., Adults, Adolescents - comma-separated)"
        value={formData.targetGroups || ''}
        onChange={handleChange}
      />
      <CheckboxContainer>
        <input
          type="checkbox"
          name="onlineOnly"
          checked={formData.location?.onlineOnly || false}
          onChange={handleChange}
        />
        <label htmlFor="onlineOnly">Online Only</label>
      </CheckboxContainer>
      {!formData.location?.onlineOnly && (
        <>
          <Input
            type="text"
            name="city"
            placeholder="City (if in-person)"
            value={formData.location?.city || ''}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="country"
            placeholder="Country (if in-person)"
            value={formData.location?.country || ''}
            onChange={handleChange}
          />
        </>
      )}
      <Input
        type="url"
        name="schedulingLink"
        placeholder="Link for Scheduling Sessions (e.g., Calendly)"
        value={formData.schedulingLink || ''}
        onChange={handleChange}
        required
      />
      <Button type="submit">Save Profile</Button>
    </Form>
  );
};
