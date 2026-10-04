import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';

const Attendance = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');

  const handleScanSuccess = (qrData) => {
    // Sau này đoạn này sẽ dùng axios gửi qrData lên Backend .NET để lưu lượt điểm danh
    setStatus(`Đã ghi nhận điểm danh thành công! Mã QR: ${qrData}`);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Điểm Danh Sinh Viên CTUT</h2>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
      >
        ⬅ Quay lại Dashboard
      </button>

      {status ? (
        <div style={{ padding: '20px', backgroundColor: '#d1e7dd', color: '#0f5132', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold' }}>
          ✅ {status}
        </div>
      ) : (
        <QRScanner onScanSuccess={handleScanSuccess} />
      )}
    </div>
  );
};

export default Attendance;