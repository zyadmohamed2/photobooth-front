import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download } from 'lucide-react';

export default function PhotoDisplay() {
  const [searchParams] = useSearchParams();
  const photoUrl = searchParams.get('photo');
  const [combinedImage, setCombinedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      if (!photoUrl) return;

      try {
        const response = await fetch(photoUrl);
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setCombinedImage(dataUrl);
      } catch (err) {
        console.error('Error loading image:', err);
        setError('Failed to load image');
      } finally {
        setLoading(false);
      }
    }

    loadImage();
  }, [photoUrl]);

  if (!photoUrl) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center">
        <p className="text-white text-xl">Photo not found</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center">
        <p className="text-white text-xl">Loading your photo...</p>
      </div>
    );
  }

  const handleDownload = () => {
    if (combinedImage) {
      const link = document.createElement('a');
      link.href = combinedImage;
      link.download = 'photo-booth-picture.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-[640px] w-full">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <img 
          src={combinedImage || photoUrl} 
          alt="Your photo" 
          className="w-full rounded-lg shadow-md mb-8"
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '640/950'
          }}
        />
        
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white text-xl 
                   font-bold py-4 px-8 rounded-full hover:bg-red-700 transition-colors"
        >
          <Download size={24} />
          Download Photo
        </button>
      </div>
    </div>
  );
}