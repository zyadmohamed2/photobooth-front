import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export default function Welcome() {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState<string>('https://wrnwpvikdvjgryhkfdbk.supabase.co/storage/v1/object/public/visitor-photos/logo/eng-logo.png?t=2025-01-16T07%3A54%3A55.976Z');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogo() {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('value')
          .eq('key', 'logo_url')
          .single();

        if (error) throw error;
        if (data?.value) {
          setLogoUrl(data.value);
        }
      } catch (err) {
        console.error('Error fetching logo:', err);
        // الشعار الافتراضي موجود بالفعل في الحالة الأولية
      } finally {
        setIsLoading(false);
      }
    }

    fetchLogo();
  }, []);

  return (
    <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-8">
      <div className="text-white mb-8">
        {!isLoading && (
          <img 
            src={logoUrl}
            alt="Al Alali Logo" 
            className="w-48 h-auto mx-auto mb-6"
            onError={() => {
              // إذا فشل تحميل الصورة، استخدم الشعار الافتراضي
              setLogoUrl('https://wrnwpvikdvjgryhkfdbk.supabase.co/storage/v1/object/public/visitor-photos/logo/eng-logo.png?t=2025-01-16T07%3A54%3A55.976Z');
            }}
          />
        )}
        <h1 className="text-4xl font-bold text-center mb-4">شقلب الطعم على كيفك</h1>
        <p className="text-xl text-center">Capture your moment with style</p>
      </div>
      
      <button
        onClick={() => navigate('/background')}
        className="bg-white text-red-600 text-xl font-bold py-4 px-12 rounded-full hover:bg-yellow-300 transition-colors"
      >
        Start
      </button>
    </div>
  );
}