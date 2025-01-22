import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../config/supabase';
import type { Background } from '../types';

export default function BackgroundSelect() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    async function fetchBackgrounds() {
      try {
        const { data, error } = await supabase
          .from('backgrounds')
          .select('*')
          .eq('active', true)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setBackgrounds(data || []);
      } catch (err) {
        console.error('Error fetching backgrounds:', err);
        setError('Failed to load backgrounds. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchBackgrounds();
  }, []);

  // Handle scroll position to show/hide arrows
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const handleContinue = () => {
    if (selectedBackground) {
      sessionStorage.setItem('selectedBackground', selectedBackground);
      navigate('/capture');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading backgrounds...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-600 flex flex-col items-center justify-center p-8">
        <div className="text-white text-xl mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-red-600 px-6 py-2 rounded-full"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-600 p-8">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Choose Your Background</h2>
      
      <div className="relative max-w-[90vw] mx-auto mb-8">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 text-red-600 rounded-full p-2 shadow-lg hover:bg-white transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 text-red-600 rounded-full p-2 shadow-lg hover:bg-white transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {backgrounds.map((bg) => (
            <div
              key={bg.id}
              className={`
                flex-none w-[280px] cursor-pointer rounded-lg overflow-hidden border-4
                transition-all transform hover:scale-105 snap-center
                ${selectedBackground === bg.url ? 'border-yellow-300 scale-105' : 'border-transparent'}
              `}
              onClick={() => setSelectedBackground(bg.url)}
            >
              <div className="aspect-w-16 aspect-h-9 relative group">
                <img 
                  src={bg.thumbnail} 
                  alt="Background option" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedBackground}
          className={`
            bg-white text-red-600 text-xl font-bold py-4 px-12 rounded-full
            transition-all transform hover:scale-105 hover:bg-yellow-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
}