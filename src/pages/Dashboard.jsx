import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole') || 'student';
  const email = localStorage.getItem('userEmail') || 'Sinh viên CTUT';

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      {/* Tiêu đề được thiết kế lại gọn gàng, có khoảng cách line-height chuẩn để không bao giờ dính chữ */}
      <h1 style={{ fontSize: '26px', color: '#2c3e50', marginBottom: '8px', lineHeight: '1.4' }}>
        Bảng Điều Khiển <span style={{ color: '#007bff' }}>EduCheck - CTUT</span>
      </h1>
      
      <p style={{ fontSize: '15px', color: '#555', marginBottom: '35px' }}>
        Xin chào: <strong>{email}</strong> ({role === 'teacher' ? '👨‍🏫 Giảng viên / Cán bộ' : '🎓 Sinh viên CTUT'})
      </p>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
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

      <div>
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
    </div>
  );
};

export default Dashboard;