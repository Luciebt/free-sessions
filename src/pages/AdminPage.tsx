import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Therapist } from '../types/Therapist';
import { getAllTherapists, updateTherapist, deleteTherapist } from '../services/therapistService';
import theme from '../styles/theme';
import Button from '../components/common/Button';
import { TherapistEditModal } from '../components/admin/TherapistEditModal';

const AdminContainer = styled.div`
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

const AdminControls = styled.div`
  margin-bottom: ${theme.spacing.large};
  display: flex;
  justify-content: flex-end;
`;

const ExportButton = styled(Button)`
  background-color: ${theme.colors.secondary};
  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

const TherapistTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  box-shadow: ${theme.boxShadow};

  th, td {
    border: 1px solid ${theme.colors.lightText};
    padding: ${theme.spacing.medium};
    text-align: left;
    font-size: ${theme.typography.body.fontSize};
  }

  th {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.text};
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: ${theme.colors.background};
  }
`;

const ActionButton = styled(Button)`
  margin-right: ${theme.spacing.small};
  padding: ${theme.spacing.small} ${theme.spacing.medium};
  font-size: 0.9rem;
`;

export const AdminPage: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [editingTherapist, setEditingTherapist] = useState<Therapist | null>(null);

  const fetchTherapistsData = () => {
    getAllTherapists().then(setTherapists);
  };

  useEffect(() => {
    fetchTherapistsData();
  }, []);

  const handleApproveToggle = async (therapist: Therapist) => {
    await updateTherapist(therapist.id, { approved: !therapist.approved });
    fetchTherapistsData();
  };

  const handleApprove = async (therapist: Therapist) => {
    await updateTherapist(therapist.id, { approved: true });
    fetchTherapistsData();
  };

  const handleEdit = (therapist: Therapist) => {
    setEditingTherapist(therapist);
  };

  const handleSave = async (updatedTherapist: Therapist) => {
    await updateTherapist(updatedTherapist.id, updatedTherapist);
    setEditingTherapist(null);
    fetchTherapistsData();
  };

  const handleCloseModal = () => {
    setEditingTherapist(null);
  };

  const exportToCsv = (data: Therapist[]) => {
    const headers = ["id", "email", "fullName", "bio", "languages", "specialties", "targetGroups", "location", "schedulingLink", "approved"].join(',');
    const rows = data.map(obj => {
      const languages = JSON.stringify(obj.languages);
      const specialties = JSON.stringify(obj.specialties);
      const targetGroups = JSON.stringify(obj.targetGroups);
      const location = JSON.stringify(obj.location);
      const approved = obj.approved ? 'TRUE' : 'FALSE';

      // Escape double quotes within JSON strings for CSV
      const escapeCsvString = (str: string) => {
        return '"' + str.replace(/"/g, '""') + '"'
      };

      return [
        obj.id,
        obj.email,
        `"${obj.fullName}"`,
        `"${obj.bio}"`,
        escapeCsvString(languages),
        escapeCsvString(specialties),
        escapeCsvString(targetGroups),
        escapeCsvString(location),
        `"${obj.schedulingLink}"`,
        approved,
      ].join(',');
    });
    return [headers, ...rows].join('\n');
  };

  const handleExport = () => {
    const csv = exportToCsv(therapists);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'therapists.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this therapist?')) {
      await deleteTherapist(id);
      fetchTherapistsData();
    }
  };

  const unapprovedTherapists = therapists.filter(t => !t.approved);
  const approvedTherapists = therapists.filter(t => t.approved);

  return (
    <AdminContainer>
      <Title>Admin Panel</Title>
      <AdminControls>
        <ExportButton onClick={handleExport}>Export to CSV</ExportButton>
      </AdminControls>

      {unapprovedTherapists.length > 0 && (
        <>
          <SectionTitle>Unapproved Therapists</SectionTitle>
          <TherapistTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unapprovedTherapists.map((therapist) => (
                <tr key={therapist.id}>
                  <td>{therapist.fullName}</td>
                  <td>{therapist.email}</td>
                  <td>
                    <ActionButton onClick={() => handleApprove(therapist)}>
                      Approve
                    </ActionButton>
                    <ActionButton onClick={() => handleDelete(therapist.id)} variant="secondary">
                      Delete
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </TherapistTable>
        </>
      )}

      <SectionTitle>All Therapists</SectionTitle>
      <TherapistTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Languages</th>
            <th>Specialties</th>
            <th>Target Groups</th>
            <th>Location</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {approvedTherapists.map((therapist) => (
            <tr key={therapist.id}>
              <td>{therapist.fullName}</td>
              <td>{therapist.email}</td>
              <td>{therapist.languages.join(', ')}</td>
              <td>{therapist.specialties.join(', ')}</td>
              <td>{therapist.targetGroups.join(', ')}</td>
              <td>
                {therapist.location.onlineOnly ? 'Online' : 
                  `${therapist.location.city}, ${therapist.location.country}`}
              </td>
              <td>{therapist.approved ? 'Yes' : 'No'}</td>
              <td>
                <ActionButton onClick={() => handleApproveToggle(therapist)} variant="secondary">
                  {therapist.approved ? 'Deactivate' : 'Approve'}
                </ActionButton>
                <ActionButton onClick={() => handleEdit(therapist)}>
                  Edit
                </ActionButton>
                <ActionButton onClick={() => handleDelete(therapist.id)} variant="secondary">
                  Delete
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </TherapistTable>

      {editingTherapist && (
        <TherapistEditModal
          therapist={editingTherapist}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </AdminContainer>
  );
};