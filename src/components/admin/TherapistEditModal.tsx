import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Therapist } from '../../types/Therapist';
import theme from '../../styles/theme';
import Button from '../common/Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.large};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.h2`
  color: ${theme.colors.primary};
  margin-top: 0;
  margin-bottom: ${theme.spacing.large};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.medium};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.small};
  color: ${theme.colors.text};
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - ${theme.spacing.medium});
  padding: ${theme.spacing.small};
  border: 1px solid ${theme.colors.lightText};
  border-radius: ${theme.borderRadius};
  font-size: ${theme.typography.body.fontSize};
`;

const TextArea = styled.textarea`
  width: calc(100% - ${theme.spacing.medium});
  padding: ${theme.spacing.small};
  border: 1px solid ${theme.colors.lightText};
  border-radius: ${theme.borderRadius};
  font-size: ${theme.typography.body.fontSize};
  min-height: 80px;
  resize: vertical;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.medium};
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: ${theme.spacing.small};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${theme.spacing.medium};
  margin-top: ${theme.spacing.large};
`;

interface TherapistEditModalProps {
  therapist: Therapist;
  onSave: (updatedTherapist: Therapist) => void;
  onClose: () => void;
}

export const TherapistEditModal: React.FC<TherapistEditModalProps> = ({ therapist, onSave, onClose }) => {
  const [formData, setFormData] = useState<Therapist>(therapist);

  useEffect(() => {
    setFormData(therapist);
  }, [therapist]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: (e.target as HTMLInputElement).checked,
        },
      }));
    } else if (name === 'languages' || name === 'specialties' || name === 'targetGroups') {
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(item => item.trim()),
      }));
    } else if (name === 'city' || name === 'country') {
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* Prevent click-through */}
        <ModalHeader>Edit Therapist Profile</ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="bio">Bio</Label>
            <TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="languages">Languages (comma-separated)</Label>
            <Input
              id="languages"
              name="languages"
              value={formData.languages.join(', ')}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="specialties">Specialties (comma-separated)</Label>
            <Input
              id="specialties"
              name="specialties"
              value={formData.specialties.join(', ')}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="targetGroups">Target Groups (comma-separated)</Label>
            <Input
              id="targetGroups"
              name="targetGroups"
              value={formData.targetGroups.join(', ')}
              onChange={handleChange}
            />
          </FormGroup>
          <CheckboxContainer>
            <Checkbox
              id="onlineOnly"
              name="onlineOnly"
              checked={formData.location.onlineOnly}
              onChange={handleChange}
            />
            <Label htmlFor="onlineOnly">Online Only</Label>
          </CheckboxContainer>
          {!formData.location.onlineOnly && (
            <>
              <FormGroup>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.location.city || ''}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.location.country || ''}
                  onChange={handleChange}
                />
              </FormGroup>
            </>
          )}
          <FormGroup>
            <Label htmlFor="schedulingLink">Scheduling Link</Label>
            <Input
              id="schedulingLink"
              name="schedulingLink"
              value={formData.schedulingLink}
              onChange={handleChange}
            />
          </FormGroup>
          <ButtonContainer>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};
