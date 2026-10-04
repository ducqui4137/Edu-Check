import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    // Chỉ lấy dữ liệu thực tế từ localStorage (nếu chưa có thì trả về mảng rỗng)
    const savedData = JSON.parse(localStorage.getItem('attendanceHistory')) || [];
    setHistoryList(savedData);
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc muốn xóa sạch lịch sử điểm danh này không?')) {
      localStorage.removeItem('attendanceHistory');
      setHistoryList([]);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '30px auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ⬅ Quay lại Dashboard
        </button>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Lịch Sử Điểm Danh</h2>
        <button 
          onClick={handleClearHistory}
          style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
        >
          Xóa lịch sử
        </button>
      </div>

      {historyList.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '30px' }}>Chưa có sinh viên nào điểm danh.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6', color: '#333' }}>
                <th style={{ padding: '12px' }}>STT</th>
                <th style={{ padding: '12px' }}>Họ và tên</th>
                <th style={{ padding: '12px' }}>MSSV</th>
                <th style={{ padding: '12px' }}>Lớp học</th>
                <th style={{ padding: '12px' }}>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, index) => (
                <tr key={item.id || index} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px' }}>{index + 1}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#2c3e50' }}>{item.fullName}</td>
                  <td style={{ padding: '12px' }}>{item.studentId}</td>
                  <td style={{ padding: '12px' }}>{item.className}</td>
                  <td style={{ padding: '12px', color: '#555', fontSize: '14px' }}>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;