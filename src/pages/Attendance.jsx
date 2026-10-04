import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sessionId, setSessionId] = useState('');
  const [className, setClassName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Tự động lấy tham số từ URL khi sinh viên quét mã QR truy cập vào
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sId = params.get('sessionId');
    const cName = params.get('className');
    
    if (sId) setSessionId(sId);
    if (cName) setClassName(decodeURIComponent(cName));
  }, [location]);

  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    if (!studentId.trim()) {
      alert('Vui lòng nhập mã số sinh viên!');
      return;
    }

    // Sau này đoạn này sẽ gọi Axios gửi dữ liệu lên Backend .NET (.NET API)
    console.log({ studentId, sessionId, className });
    setIsSubmitted(true);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '40px auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '10px' }}>Điểm Danh Sinh Viên CTUT</h2>
      
      {!isSubmitted ? (
        <form onSubmit={handleSubmitAttendance} style={{ marginTop: '20px', textAlign: 'left' }}>
          <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #e9ecef' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '15px' }}><strong>Lớp học:</strong> {className || 'Đang tải...'}</p>
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}><strong>Mã phiên:</strong> {sessionId || 'N/A'}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>Nhập Mã Số Sinh Viên (MSSV):</label>
            <input 
              type="text" 
              placeholder="Ví dụ: B2101234"
              value={studentId} 
              onChange={(e) => setStudentId(e.target.value)} 
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '14px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
          >
            Xác Nhận Điểm Danh
          </button>
        </form>
      ) : (
        <div style={{ padding: '25px', backgroundColor: '#d1e7dd', color: '#0f5132', borderRadius: '8px', marginTop: '20px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>✅ Điểm Danh Thành Công!</h3>
          <p style={{ margin: '5px 0' }}>MSSV: <strong>{studentId}</strong></p>
          <p style={{ margin: '5px 0' }}>Lớp: <strong>{className}</strong></p>
          <button 
            onClick={() => setIsSubmitted(false)}
            style={{ marginTop: '15px', padding: '8px 16px', backgroundColor: '#0f5132', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Điểm danh lại
          </button>
        </div>
      )}
    </div>
  );
};

export default Attendance;