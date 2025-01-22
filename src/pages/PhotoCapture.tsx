import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

export default function PhotoCapture() {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const backgroundImage = sessionStorage.getItem('selectedBackground');

  const videoConstraints = {
    width: 640,
    height: 950,
    facingMode: "user",
    aspectRatio: 640/950
  };

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      setProcessing(true);
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          sessionStorage.setItem('capturedImage', imageSrc);
          navigate('/info');
        } else {
          throw new Error('Failed to capture image');
        }
      } catch (error) {
        console.error('Error capturing image:', error);
        alert('Failed to capture the photo. Please try again.');
      } finally {
        setProcessing(false);
      }
    }
  }, [navigate]);

  const startCountdown = useCallback(() => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setTimeout(() => {
            capture();
          }, 0);
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  }, [capture]);

  if (!backgroundImage) {
    navigate('/background');
    return null;
  }

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-[640px] mx-auto" style={{ aspectRatio: '640/950' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        
        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <span className="text-white text-9xl font-bold animate-pulse">
              {countdown}
            </span>
          </div>
        )}

        {processing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-xl">Processing...</div>
          </div>
        )}
      </div>

      {!countdown && !processing && (
        <button
          onClick={startCountdown}
          className="mt-8 bg-white text-red-600 text-xl font-bold py-4 px-12 rounded-full
                   hover:bg-yellow-300 transition-colors transform hover:scale-105"
        >
          Take Photo
        </button>
      )}
    </div>
  );
}