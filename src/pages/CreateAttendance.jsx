import React from 'react';
import { useNavigate } from 'react-router-dom';
import QRGenerator from '../components/QRGenerator';

const CreateAttendance = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Trang Quản Lý Điểm Danh</h2>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px' }}
      >
        ⬅ Quay lại Dashboard
      </button>
      <QRGenerator />
    </div>
  );
};

export default CreateAttendance;