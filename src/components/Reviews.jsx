import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import reviewsBackground from '../assets/images/reviews_background.jpg';
import reviewPerson from '../assets/images/reviews.png';

export default function Reviews() {
  const { data, loading, error } = useFetch('/reviews');
  const [current, setCurrent] = useState(0);

  if (loading || error || !data?.data?.length) return null;

  const reviews = data.data;
  const review = reviews[current];

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${reviewsBackground})` }}
    >
      <div className="bg-black/70">
        {/* ── DESKTOP ── */}
        <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-12 py-20 gap-12">
          {/* Left: text */}
          <div className="max-w-lg text-white">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
              Udtalelser
            </p>
            <h2 className="font-heading font-black text-4xl uppercase leading-tight mb-10">
              Det siger vores<br />kunder om os
            </h2>

            {/* Quote */}
            <div className="flex gap-4 mb-6">
              <span className="text-primary font-heading font-black text-6xl leading-none -mt-2">"</span>
              <p className="text-white/80 leading-relaxed text-base">
                {review.content}
              </p>
            </div>

            {/* Author */}
            <div className="border-l-4 border-white pl-4 mb-8">
              <p className="font-heading font-bold text-lg">{review.author}</p>
              {review.position && (
                <p className="text-white/60 text-sm">{review.position}</p>
              )}
            </div>

            {/* Nav buttons */}
            <div className="flex gap-4">
              <button
                onClick={prev}
                aria-label="Forrige"
                className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Næste"
                className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: person with ring */}
          <div className="relative shrink-0 w-96 h-96 flex items-center justify-center">
            <div className="absolute inset-0" />
            <img
              src={reviewPerson}
              alt="Kunde"
              className="relative z-10 w-full h-full object-contain"
            />
          </div>
        </div>

        {/* ── MOBILE ── */}
        <div className="md:hidden flex flex-col items-center text-center text-white px-6 pt-14 pb-10">
          {/* Header */}
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Udtalelser
          </p>
          <h2 className="font-heading font-black text-3xl uppercase leading-tight mb-8">
            Det siger vores<br />kunder om os
          </h2>

          {/* Quote */}
          <span className="text-primary font-heading font-black text-7xl leading-none mb-2">"</span>
          <p className="text-white/80 leading-relaxed text-base mb-6 max-w-sm">
            {review.content}
          </p>

          {/* Author */}
          <p className="font-heading font-bold text-xl mb-1">{review.author}</p>
          {review.position && (
            <p className="text-white/60 text-sm mb-8">{review.position}</p>
          )}

          {/* Nav buttons */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={prev}
              aria-label="Forrige"
              className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Næste"
              className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Person with ring */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-16 border-primary" />
            <img
              src={reviewPerson}
              alt="Kunde"
              className="relative z-10 w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
