import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCodeSvg from 'react-qr-code';

export default function QRCode() {
  const navigate = useNavigate();
  const photoUrl = sessionStorage.getItem('photoUrl');

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
      sessionStorage.clear();
    }, 90000); // 90 seconds timeout

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!photoUrl) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <QRCodeSvg value={photoUrl} size={256} />
      </div>
      
      <p className="text-white text-xl mt-8 text-center max-w-md">
        Scan the QR Code to download your photo directly
      </p>

      <button
        onClick={() => {
          navigate('/');
          sessionStorage.clear();
        }}
        className="mt-8 bg-yellow-300 text-red-600 text-xl font-bold py-4 px-12 rounded-full
                 hover:bg-yellow-400 transition-colors transform hover:scale-105"
      >
        Take Another Photo
      </button>
    </div>
  );
}