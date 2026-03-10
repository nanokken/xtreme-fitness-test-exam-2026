import { useFetch } from '../hooks/useFetch';

function SubscriptionCard({ subscription }) {
  const { image, title, list, price } = subscription;

  return (
    <div className="flex flex-col bg-white shadow-lg overflow-hidden max-w-[360px] mx-auto desktop:max-w-[280px] desktop:shadow-none">
      {/* Image with price overlay */}
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover desktop:h-36"
        />
        {/* Price circle - centered bottom on mobile, left side on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 desktop:left-4 desktop:translate-x-0 desktop:-bottom-10 w-28 h-28 desktop:w-24 desktop:h-24 rounded-full bg-gradient-brand flex flex-col items-center justify-center text-white shadow-lg">
          <span className="text-2xl desktop:text-xl font-bold">{price} DKK</span>
          <span className="text-sm italic">Mdr</span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 desktop:pt-14 pb-6 px-6 desktop:px-4 flex flex-col items-center desktop:items-start">
        <h3 className="text-2xl desktop:text-lg font-bold text-gray-900 uppercase tracking-wide mb-6 desktop:mb-4">
          {title}
        </h3>

        {/* Features list */}
        <ul className="w-full space-y-3 desktop:space-y-2 mb-6 desktop:mb-4">
          {list?.map((item, index) => (
            <li key={index} className="flex items-start gap-3 desktop:gap-2 text-gray-700 desktop:text-sm">
              <svg 
                className="w-5 h-5 desktop:w-4 desktop:h-4 text-primary flex-shrink-0 mt-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="bg-gradient-brand text-white px-6 py-3 desktop:px-4 desktop:py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity desktop:text-sm">
          <span>Tilmeld dig nu</span>
          <svg className="w-5 h-5 desktop:w-4 desktop:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function SubscriptionCards() {
  const { data, loading, error } = useFetch('/subscriptions');

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>Kunne ikke hente abonnementer</p>
      </div>
    );
  }

  const subscriptions = data?.data || [];

  return (
    <section className="py-12 px-4">
      <div className="flex flex-col gap-8 desktop:flex-row desktop:justify-center desktop:gap-6">
        {subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription._id} subscription={subscription} />
        ))}
      </div>
    </section>
  );
}
