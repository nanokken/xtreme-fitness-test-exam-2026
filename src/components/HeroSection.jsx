import { Link } from 'react-router-dom';
import heroImage from '../assets/headers/mainHeader.jpg';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Decorative Circle - positioned behind content */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[10%] pointer-events-none">
       
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-12">
        <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
          {/* Subtitle with left border */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <div className="hidden md:block w-1 h-16 bg-white"></div>
            <h2 className="text-white text-lg md:text-xl tracking-[0.3em] font-light">
              XTREME FITNESS
            </h2>
          </div>

          {/* Main Headline */}
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            BLIV STÆRK
          </h1>

          {/* Description */}
          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-md mx-auto md:mx-0">
            Det bedste fitnesscenter — hvor styrke og sundhed vokser sammen.
          </p>

          {/* CTA Button */}
          <Link 
            to="/subscriptions"
            className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all group"
          >
            <span className="text-lg">Tilmeld dig nu</span>
            <span className="w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
