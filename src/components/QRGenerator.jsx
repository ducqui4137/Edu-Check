import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRGenerator = () => {
  const [className, setClassName] = useState('Lập trình Web - Nhóm 01');
  const [sessionId, setSessionId] = useState('SESSION_' + Math.floor(Math.random() * 100000));
  const [isGenerated, setIsGenerated] = useState(false);

  // Thay vì dùng JSON.stringify, ta tạo một URL dẫn trực tiếp đến trang điểm danh kèm sessionId
  // (Sau này chạy thật, em thay 'http://localhost:5173' bằng domain của website EduCheck)
  const qrData = `http://localhost:5173/attendance?sessionId=${sessionId}&className=${encodeURIComponent(className)}`;

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!className.trim()) {
      alert('Vui lòng nhập tên lớp học!');
      return;
    }
    setIsGenerated(true);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '25px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#fff', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h3>Tạo Phiên Điểm Danh QR</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>Chiếu mã này lên màn hình để sinh viên quét</p>

      {!isGenerated ? (
        <form onSubmit={handleGenerate} style={{ textAlign: 'left', marginTop: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Tên môn học / Lớp học:</label>
            <input 
              type="text" 
              value={className} 
              onChange={(e) => setClassName(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Tạo Mã QR Điểm Danh
          </button>
        </form>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', border: '1px dashed #28a745', borderRadius: '8px', display: 'inline-block' }}>
            <QRCodeSVG value={qrData} size={220} level={"H"} includeMargin={true} />
          </div>
          <div style={{ marginTop: '15px' }}>
            <p><strong>Lớp:</strong> {className}</p>
            <p style={{ fontSize: '13px', color: '#666' }}>Mã phiên: {sessionId}</p>
          </div>
          <button 
            onClick={() => { setIsGenerated(false); setSessionId('SESSION_' + Math.floor(Math.random() * 100000)); }}
            style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Tạo Phiên Khác
          </button>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;