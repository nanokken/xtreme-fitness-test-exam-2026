import { Link } from 'react-router-dom';
import aboutImage from '../assets/images/about_us2.png';
import aboutBackground from '../assets/images/about_us_background.jpg';

const stats = [
  { value: "600K+", label: "ARBEJDSTIMER" },
  { value: "790+", label: "PROGRAMMER" },
  { value: "2560+", label: "GLADE KUNDER" },
  { value: "2560+", label: "SUNDERE KROPPE" },
];

export default function AboutUsSection({ showStats = false }) {
  // Simple version for About page (no stats, white background)
  if (!showStats) {
    return (
      <section className="py-16 px-6 bg-white">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-center gap-12 max-w-6xl mx-auto">
          {/* Image with ring */}
          <div className="relative shrink-0">
            <div className="w-80 h-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img
              src={aboutImage}
              alt="Træner og klient"
              className="relative z-10 w-96 h-auto object-contain"
            />
          </div>
          {/* Text content */}
          <div className="max-w-md">
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
              Om Os
            </p>
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase leading-tight mb-5 text-dark">
              Velkommen til Xtreme Fitness
            </h2>
            <p className="text-dark/70 leading-relaxed">
              Xtreme Fitness er stedet, hvor sved, grin og god musik går hånd i hånd. Vi lover ikke mirakler - men vi lover, at du bliver stærkere, gladere og får ondt i muskler, du ikke vidste, du havde!
            </p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center text-center">
          {/* Image with ring */}
          <div className="relative mb-8">
            <div className="w-56 h-56 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img
              src={aboutImage}
              alt="Træner og klient"
              className="relative z-10 w-72 h-auto object-contain"
            />
          </div>
          {/* Text content */}
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Om Os
          </p>
          <h2 className="font-heading font-black text-2xl uppercase leading-tight mb-4 text-dark">
            Velkommen til Xtreme Fitness
          </h2>
          <p className="text-dark/70 leading-relaxed max-w-sm">
            Xtreme Fitness er stedet, hvor sved, grin og god musik går hånd i hånd. Vi lover ikke mirakler - men vi lover, at du bliver stærkere, gladere og får ondt i muskler, du ikke vidste, du havde!
          </p>
        </div>
      </section>
    );
  }

  // Extended version for Home page (with stats, dark background)
  return (
    <section className="relative">
      {/* Desktop Layout */}
      <div
        className="hidden md:block bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aboutBackground})` }}
      >
        <div className="bg-black/70 py-16 px-6">
          <div className="flex items-center justify-center gap-12 max-w-6xl mx-auto">
            {/* Image with ring */}
            <div className="relative shrink-0">
              <div className="w-80 h-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <img
                src={aboutImage}
                alt="Træner og klient"
                className="relative z-10 w-96 h-auto object-contain"
              />
            </div>
            {/* Text content */}
            <div className="max-w-md text-white">
              <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
                Om Os
              </p>
              <h2 className="font-heading font-black text-3xl md:text-4xl uppercase leading-tight mb-5">
                Velkommen til Xtreme Fitness
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Xtreme Fitness er stedet, hvor sved, grin og god musik går hånd i hånd. Vi lover ikke mirakler - men vi lover, at du bliver stærkere, gladere og får ondt i muskler, du ikke vidste, du havde!
              </p>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-primary font-heading font-black text-4xl">
                      {stat.value}
                    </p>
                    <p className="text-white text-xs tracking-[0.15em] font-semibold uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              {/* CTA Button */}
              <Link
                to="/om-os"
                className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all group"
              >
                <span className="text-base">Læs mere</span>
                <span className="w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div
        className="md:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aboutBackground})` }}
      >
        <div className="bg-black/80 py-12 px-6 flex flex-col items-center text-center text-white">
          {/* Image with ring */}
          <div className="relative mb-8">
            <div className="w-56 h-56 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <img
              src={aboutImage}
              alt="Træner og klient"
              className="relative z-10 w-72 h-auto object-contain"
            />
          </div>
          {/* Text content */}
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Om Os
          </p>
          <h2 className="font-heading font-black text-2xl uppercase leading-tight mb-4">
            Velkommen til Xtreme Fitness
          </h2>
          <p className="text-white/70 leading-relaxed max-w-sm mb-8">
            Xtreme Fitness er stedet, hvor sved, grin og god musik går hånd i hånd. Vi lover ikke mirakler - men vi lover, at du bliver stærkere, gladere og får ondt i muskler, du ikke vidste, du havde!
          </p>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-primary font-heading font-black text-4xl">
                  {stat.value}
                </p>
                <p className="text-white text-xs tracking-[0.15em] font-semibold uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          {/* CTA Button */}
          <Link
            to="/om-os"
            className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white hover:bg-white/20 transition-all group"
          >
            <span className="text-base">Læs mere</span>
            <span className="w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
