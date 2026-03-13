import { useFetch } from '../hooks/useFetch';

function SubscriptionCard({ subscription }) {
  const { image, title, list, price } = subscription;

  return (
    <div className="flex flex-col bg-white shadow-lg overflow-hidden w-full max-w-[360px] mx-auto desktop:max-w-[300px]">
      {/* Image with price overlay */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
        />
        {/* Price circle - always centered at bottom */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-14 w-28 h-28 rounded-full bg-gradient-brand flex flex-col items-center justify-center text-white shadow-lg">
          <span className="text-2xl font-bold leading-tight font-heading">{price} DKK</span>
          <span className="text-sm italic">Mdr</span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-8 px-6 flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-6 font-heading">
          {title}
        </h3>

        {/* Features list */}
        <ul className="w-full space-y-3 mb-8 text-left">
          {list?.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700 text-sm">
              <svg
                className="w-5 h-5 text-primary shrink-0 mt-0.5"
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
        <button className="bg-gradient-brand text-white px-6 py-3 rounded-full flex items-center gap-3 hover:opacity-90 transition-opacity">
          <span>Tilmeld dig nu</span>
          <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default function SubscriptionCards() {
  const { data, loading, error } = useFetch('/subscriptions');

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-center py-12 text-red-500">
        <p>Kunne ikke hente abonnementer</p>
      </div>
    );
  }

  const subscriptions = data?.data || [];

  return (
    <section className="min-h-screen py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3 font-heading">
          Priser
        </p>
        <h2 className="font-heading font-black text-3xl md:text-4xl uppercase text-dark">
          Vores Abonnementer
        </h2>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-16 desktop:flex-row desktop:justify-center desktop:gap-8">
        {subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription._id} subscription={subscription} />
        ))}
      </div>
    </section>
  );
}

