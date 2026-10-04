import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    // Đảm bảo xóa sạch khung cũ trước khi render khung mới
    const scannerId = "reader";
    const existingElement = document.getElementById(scannerId);
    if (existingElement) {
      existingElement.innerHTML = "";
    }

    const scanner = new Html5QrcodeScanner(
      scannerId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (decodedText) => {
        if (onScanSuccess) {
          onScanSuccess(decodedText);
        }
        scanner.clear().catch((error) => console.error(error));
      },
      (error) => {
        // Bỏ qua lỗi quét liên tục
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner on unmount.", error);
      });
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <div id="reader" style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}></div>
    </div>
  );
};

export default QRScanner;