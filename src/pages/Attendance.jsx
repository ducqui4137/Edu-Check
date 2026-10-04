import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';

const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [sessionId, setSessionId] = useState('');
  const [className, setClassName] = useState('');
  
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [attendanceTime, setAttendanceTime] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sId = params.get('sessionId');
    const cName = params.get('className');
    
    if (sId) setSessionId(sId);
    if (cName) setClassName(decodeURIComponent(cName));

    // Cleanup an toàn khi rời trang
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [location]);

  const startScanner = () => {
    setScanning(true);
    setTimeout(() => {
      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          console.log("Đã quét được QR:", decodedText);
          try {
            if (decodedText.includes('sessionId=')) {
              const url = new URL(decodedText.startsWith('http') ? decodedText : `http://localhost/#/${decodedText}`);
              const sId = url.searchParams.get('sessionId');
              const cName = url.searchParams.get('className');
              if (sId) setSessionId(sId);
              if (cName) setClassName(decodeURIComponent(cName));
            } else {
              setSessionId(decodedText);
            }
          } catch {
            setSessionId(decodedText);
          }

          html5QrCode.stop().then(() => {
            setScanning(false);
          }).catch(err => console.error("Lỗi tắt camera:", err));
        },
        () => {}
      ).catch(err => {
        console.error("Không thể khởi động camera:", err);
        alert("Không thể mở camera. Vui lòng kiểm tra quyền truy cập!");
        setScanning(false);
      });
    }, 100);
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        setScanning(false);
      }).catch(() => {
        setScanning(false);
      });
    } else {
      setScanning(false);
    }
  };

  // Hàm xử lý quay lại an toàn
  const handleBackToDashboard = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        navigate('/dashboard');
      }).catch(() => {
        navigate('/dashboard');
      });
    } else {
      navigate('/dashboard');
    }
  };

  const handleSubmitAttendance = (e) => {
    e.preventDefault();
    
    if (!fullName.trim() || !studentId.trim()) {
      alert('Vui lòng nhập đầy đủ Họ tên và Mã số sinh viên!');
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN') + ' - ' + now.toLocaleDateString('vi-VN');
    setAttendanceTime(timeString);

    const newRecord = {
      id: Date.now(),
      fullName,
      studentId,
      sessionId: sessionId || 'Phiên trực tiếp',
      className: className || 'Lớp học phần',
      time: timeString
    };

    const existingHistory = JSON.parse(localStorage.getItem('attendanceHistory')) || [];
    localStorage.setItem('attendanceHistory', JSON.stringify([newRecord, ...existingHistory]));

    setIsSubmitted(true);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: '30px auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      {/* Nút Quay lại Dashboard đã sửa triệt để lỗi không bấm được */}
      <button 
        type="button"
        onClick={handleBackToDashboard}
        style={{ marginBottom: '20px', padding: '8px 14px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ⬅ Quay lại Dashboard
      </button>

      <h2 style={{ color: '#2c3e50', marginBottom: '15px', textAlign: 'center' }}>Điểm Danh Sinh Viên CTUT</h2>
      
      {!isSubmitted ? (
        <div>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            {!scanning ? (
              <button 
                type="button"
                onClick={startScanner}
                style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginBottom: '10px' }}
              >
                📷 Mở Camera Quét Mã QR
              </button>
            ) : (
              <div>
                <div id="reader" style={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}></div>
                <button 
                  type="button"
                  onClick={stopScanner}
                  style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Tắt Camera
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmitAttendance} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', border: '1px solid #e9ecef' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '15px' }}><strong>Lớp học:</strong> {className || 'Chưa nhận diện lớp (Vui lòng quét QR hoặc nhập thông tin)'}</p>
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
        </div>
      ) : (
        <div style={{ padding: '25px', backgroundColor: '#d1e7dd', color: '#0f5132', borderRadius: '8px', textAlign: 'left' }}>
          <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>✅ Điểm Danh Thành Công!</h3>
          <p style={{ margin: '8px 0' }}>Họ tên: <strong>{fullName}</strong></p>
          <p style={{ margin: '8px 0' }}>MSSV: <strong>{studentId}</strong></p>
          <p style={{ margin: '8px 0' }}>Lớp: <strong>{className || 'Lớp học phần'}</strong></p>
          <p style={{ margin: '8px 0' }}>Thời gian: <strong>{attendanceTime}</strong></p>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              type="button"
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