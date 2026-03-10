import { useFetch } from '../hooks/useFetch';

const BASE_URL = 'http://localhost:3042';

export default function ServiceCards() {
  const { data, loading, error } = useFetch('/services');

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading services: {error}
      </div>
    );
  }

  const services = data?.data || [];

  return (
    <section className="py-12 px-4">
      {/* Desktop Layout - 2x2 Grid */}
      <div className="hidden desktop:grid desktop:grid-cols-2 gap-1 max-w-6xl mx-auto">
        {services.slice(0, 4).map((service) => (
          <div
            key={service._id}
            className="relative aspect-square overflow-hidden group"
          >
            {/* Background Image */}
            <img
              src={service.image || `${BASE_URL}/services/no-image.png`}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {/* Icon */}
              {service.icon && (
                <img
                  src={service.icon}
                  alt=""
                  className="w-8 h-8 mb-3 opacity-90"
                />
              )}
              {/* Title */}
              <h3 className="font-heading font-bold text-lg uppercase tracking-wider mb-2">
                {service.title}
              </h3>
              {/* Teaser */}
              <p className="text-white/80 text-sm leading-relaxed">
                {service.teaser}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Layout - Stacked Cards with overlay */}
      <div className="desktop:hidden flex flex-col gap-4 max-w-sm mx-auto">
        {services.slice(0, 4).map((service) => (
          <div key={service._id} className="relative aspect-square overflow-hidden rounded-lg">
            {/* Background Image */}
            <img
              src={service.image || `${BASE_URL}/services/no-image.png`}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              {/* Icon */}
              {service.icon && (
                <img
                  src={service.icon}
                  alt=""
                  className="w-8 h-8 mb-2"
                />
              )}
              
              {/* Title */}
              <h3 className="font-heading font-bold text-base uppercase tracking-wider mb-1">
                {service.title}
              </h3>
              
              {/* Teaser */}
              <p className="text-white/80 text-sm leading-relaxed italic">
                {service.teaser}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
