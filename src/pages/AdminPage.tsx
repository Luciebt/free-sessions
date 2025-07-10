
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Therapist } from 'types/Therapist';
import { getAllTherapists, updateTherapist } from 'services/therapistService';

const AdminContainer = styled.div`
  padding: 2rem;
`;

const AdminControls = styled.div`
  margin-bottom: 1rem;
`;

const ExportButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const TherapistTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export const AdminPage: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  useEffect(() => {
    getAllTherapists().then(setTherapists);
  }, []);

  const handleApprove = async (therapist: Therapist) => {
    await updateTherapist(therapist.id, { ...therapist, approved: !therapist.approved });
    getAllTherapists().then(setTherapists);
  };

  const exportToCsv = (data: Therapist[]) => {
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(obj => Object.values(obj).map(value => {
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
      }
      return String(value);
    }).join(','));
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

  return (
    <AdminContainer>
      <h2>Admin Panel</h2>
      <AdminControls>
        <ExportButton onClick={handleExport}>Export to CSV</ExportButton>
      </AdminControls>
      <TherapistTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map((therapist) => (
            <tr key={therapist.id}>
              <td>{therapist.fullName}</td>
              <td>{therapist.email}</td>
              <td>{therapist.approved ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleApprove(therapist)}>
                  {therapist.approved ? 'Deactivate' : 'Approve'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TherapistTable>
    </AdminContainer>
  );
};

