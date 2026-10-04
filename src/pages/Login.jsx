import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();

    // --- LUẬT 1: Không được để trống ---
    if (!cleanEmail || !password.trim()) {
      setError('Vui lòng nhập đầy đủ Email CTUT và Mật khẩu!');
      return;
    }

    // --- LUẬT 2: Kiểm tra đuôi Email trường CTUT ---
    const isStudent = cleanEmail.endsWith('@student.ctuet.edu.vn');
    const isTeacher = cleanEmail.endsWith('@ctuet.edu.vn') && !isStudent;

    if (!isStudent && !isTeacher) {
      setError('Vui lòng sử dụng Email CTUT hợp lệ! (@student.ctuet.edu.vn hoặc @ctuet.edu.vn)');
      return;
    }

    // --- LUẬT 3: Độ dài mật khẩu ---
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    // Tự động xác định vai trò dựa trên đuôi email
    const detectedRole = isTeacher ? 'teacher' : 'student';

    // Lưu thông tin đăng nhập vào LocalStorage
    localStorage.setItem('userRole', detectedRole);
    localStorage.setItem('userEmail', cleanEmail);

    alert(`Đăng nhập thành công! Vai trò: ${isTeacher ? '👨‍🏫 Giảng viên / Cán bộ CTUT' : '🎓 Sinh viên CTUT'}`);
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '420px', margin: '60px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#007bff', marginBottom: '8px' }}>EduCheck - CTUT</h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '24px' }}>Hệ thống điểm danh bằng mã QR</p>
      
      {/* Thông báo lỗi màu đỏ */}
      {error && (
        <div style={{ padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '6px', marginBottom: '16px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        {/* Email CTUT */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Email CTUT:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            placeholder="sv123@student.ctuet.edu.vn"
          />
        </div>

        {/* Mật khẩu */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            placeholder="Nhập mật khẩu"
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default Login;