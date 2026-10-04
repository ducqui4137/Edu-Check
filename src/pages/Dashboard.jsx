import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  // Lấy thông tin đã lưu lúc Đăng nhập
  const role = localStorage.getItem('userRole') || 'student';
  const email = localStorage.getItem('userEmail') || 'Sinh viên CTUT';

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Bảng Điều Khiển - EduCheck CTUT</h1>
      <p style={{ fontSize: '16px', color: '#555' }}>
        Xin chào: <strong>{email}</strong> ({role === 'teacher' ? '👨‍🏫 Giảng viên / Cán bộ' : '🎓 Sinh viên CTUT'})
      </p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
        {/* Nếu là Giảng viên / Cán bộ -> Hiện tính năng Tạo mã QR */}
        {role === 'teacher' && (
          <div style={{ padding: '20px', border: '1px solid #28a745', borderRadius: '8px', width: '220px', textAlign: 'center', backgroundColor: '#e8f5e9' }}>
            <h3>Tạo Mã QR Điểm Danh</h3>
            <p style={{ fontSize: '13px', color: '#666' }}>Tạo phiên điểm danh cho lớp học</p>
            <button 
              onClick={() => navigate('/create-attendance')}
              style={{ padding: '10px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Tạo mã QR
            </button>
          </div>
        )}

        {/* Nút Bật Camera Quét Mã QR dành cho Sinh viên */}
        <div style={{ padding: '20px', border: '1px solid #007bff', borderRadius: '8px', width: '220px', textAlign: 'center', backgroundColor: '#e3f2fd' }}>
          <h3>Quét Mã QR Điểm Danh</h3>
          <p style={{ fontSize: '13px', color: '#666' }}>Bật camera để tiến hành điểm danh</p>
          <button 
            onClick={() => navigate('/attendance')}
            style={{ padding: '10px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            📷 Bật Camera Quét
          </button>
        </div>

        {/* Lịch sử điểm danh (Đã gắn onClick chuyển sang trang /history) */}
        <div style={{ padding: '20px', border: '1px solid #6c757d', borderRadius: '8px', width: '220px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
          <h3>Lịch Sử Điểm Danh</h3>
          <p style={{ fontSize: '13px', color: '#666' }}>Xem lại các buổi đã điểm danh</p>
          <button 
            onClick={() => navigate('/history')}
            style={{ padding: '10px 16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Xem Chi Tiết
          </button>
        </div>
      </div>

      <button 
        onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}
        style={{ marginTop: '40px', padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Dashboard;