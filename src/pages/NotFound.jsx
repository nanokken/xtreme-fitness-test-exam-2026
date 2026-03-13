import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-brand flex flex-col items-center justify-center px-6 text-center text-white">
      <h1 className="font-heading font-black text-[10rem] leading-none opacity-20 select-none">
        404
      </h1>
      <h2 className="font-heading font-black text-3xl md:text-5xl uppercase -mt-8 mb-4">
        Siden blev ikke fundet
      </h2>
      <p className="text-white/70 text-base md:text-lg max-w-md mb-10">
        Den side, du leder efter, eksisterer ikke eller er blevet flyttet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all group"
      >
        <span className="text-base font-medium">Gå til forsiden</span>
        <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg className="w-4 h-4 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </Link>
    </div>
  );
}
