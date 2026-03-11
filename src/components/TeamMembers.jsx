import { useFetch } from '../hooks/useFetch';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function TeamMembers({ mobileCount = 1, desktopCount = 3, className = '', textColor = 'text-light' }) {
  const { data, loading, error } = useFetch('/employees');

  if (loading) {
    return (
      <section className={`py-12 lg:py-20 ${className}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${textColor}/70`}>Indlæser...</p>
        </div>
      </section>
    );
  }

  if (error || !data?.data) {
    return null;
  }

  const maxCount = Math.max(mobileCount, desktopCount);
  const employees = data.data.slice(0, maxCount);

  return (
    <section className={`py-12 lg:py-20 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className={`${textColor} uppercase tracking-widest text-sm mb-2 font-heading`}>
            Trænere
          </p>
          <h2 className={`${textColor} text-2xl md:text-3xl lg:text-4xl font-bold uppercase font-heading`}>
            Vores hold af eksperter
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 justify-items-center">
          {employees.map((person, index) => {
            const hideOnMobile = index >= mobileCount;
            const hideOnDesktop = index >= desktopCount;
            
            if (hideOnMobile && hideOnDesktop) return null;
            
            return (
              <div 
                key={person._id} 
                className={`flex flex-col items-center ${hideOnMobile ? 'hidden lg:flex' : ''} ${hideOnDesktop ? 'lg:hidden' : ''}`}
              >
              {/* Circular image with border */}
              <div className={`w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 overflow-hidden mb-6 ${textColor === 'text-light' ? 'border-light' : 'border-current'}`}>
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and specialty */}
              <h3 className={`${textColor} text-xl font-bold uppercase mb-1 font-heading`}>
                {person.name}
              </h3>
              <p className={`${textColor}/80 mb-4`}>{person.area}</p>

              {/* Social icons */}
              <div className="flex gap-3">
                <a
                  href={person.facebook || "https://facebook.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center transition-opacity hover:opacity-80"
                >
                  <FaFacebookF className="w-5 h-5 text-white" />
                </a>
                <a
                  href={person.twitter || "https://twitter.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center transition-opacity hover:opacity-80"
                >
                  <FaTwitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href={person.instagram || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center transition-opacity hover:opacity-80"
                >
                  <FaInstagram className="w-5 h-5 text-white" />
                </a>
              </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

