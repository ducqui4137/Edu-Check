import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Attendance = () => {
  const location = useLocation();
  
  const [sessionId, setSessionId] = useState('');
  const [className, setClassName] = useState('');
  
  // Thêm state cho Họ tên, MSSV và Thời gian điểm danh
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [attendanceTime, setAttendanceTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Tự động lấy tham số từ URL khi quét mã QR
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sId = params.get('sessionId');
    const cName = params.get('className');
    
    if (sId) setSessionId(sId);
    if (cName) setClassName(decodeURIComponent(cName));
  }, [location]);

  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu nhập vào
    if (!fullName.trim() || !studentId.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên và Mã số sinh viên!');
      return;
    }

    // Lấy thời gian hiện tại lúc bấm xác nhận
    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN') + ' - ' + now.toLocaleDateString('vi-VN');
    setAttendanceTime(timeString);

    // Dữ liệu chuẩn bị gửi lên Backend .NET sau này
    const attendanceData = {
      fullName,
      studentId,
      sessionId,
      className,
      time: timeString
    };

    console.log("Dữ liệu điểm danh:", attendanceData);
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

          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px', color: '#333' }}>Họ và tên:</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Nguyễn Văn A"
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '15px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px', color: '#333' }}>Mã số sinh viên (MSSV):</label>
            <input 
              type="text" 
              placeholder="Ví dụ: B2101234"
              value={studentId} 
              onChange={(e) => setStudentId(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '15px' }}
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
        <div style={{ padding: '25px', backgroundColor: '#d1e7dd', color: '#0f5132', borderRadius: '8px', marginTop: '20px', textAlign: 'left' }}>
          <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>✅ Điểm Danh Thành Công!</h3>
          <p style={{ margin: '8px 0' }}>Họ tên: <strong>{fullName}</strong></p>
          <p style={{ margin: '8px 0' }}>MSSV: <strong>{studentId}</strong></p>
          <p style={{ margin: '8px 0' }}>Lớp: <strong>{className}</strong></p>
          <p style={{ margin: '8px 0' }}>Thời gian: <strong>{attendanceTime}</strong></p>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              onClick={() => setIsSubmitted(false)}
              style={{ padding: '8px 16px', backgroundColor: '#0f5132', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Điểm danh lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;