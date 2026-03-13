import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

export default function Exercises() {
  const { data, loading, error } = useFetch('/exercises');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const exercises = data?.data || [];
  const maxIndex = Math.max(0, exercises.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p>Loading exercises...</p>
        </div>
      </section>
    );
  }

  if (error || !exercises.length) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary tracking-[0.2em] text-sm mb-3 font-heading">DETTE TILBYDER VI</p>
          <h2 className="text-3xl md:text-4xl font-black text-dark font-heading">
            VI TILBYDER EKSKLUSIVE ØVELSER
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {exercises.map((exercise) => (
              <div 
                key={exercise._id} 
                className="shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col items-center text-center border border-gray-100">
                  {/* Icon/Image */}
                  <div className="w-24 h-24 mb-6 flex items-center justify-center">
                    <img 
                      src={exercise.image} 
                      alt={exercise.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-black text-dark mb-4 tracking-wide font-heading">
                    {exercise.title}
                  </h3>
                  
                  {/* Teaser */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {exercise.teaser}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              currentIndex === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-dark hover:bg-gray-800'
            }`}
            aria-label="Previous"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
              currentIndex >= maxIndex 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-dark hover:bg-gray-800'
            }`}
            aria-label="Next"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}