import { useState } from 'react';
import { fetchAPI } from '../hooks/useFetch';
import contactBackground from '../assets/images/contact_us_background.jpg';
import contactImage from '../assets/images/contact_us.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'phone' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await fetchAPI('/message', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${contactBackground})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20 min-h-screen flex items-center">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-16 w-full">
          {/* Image with red circle - visible on both mobile (top) and desktop (left) */}
          <div className="shrink-0 flex justify-center lg:justify-start lg:w-1/2">
            <div className="relative">
              {/* Person image */}
              <img
                src={contactImage}
                alt="Person exercising"
                className="relative z-10 w-full h-52 md:w-72 md:h-72 lg:hidden lg:h-96 object-cover"
              />
            </div>
          </div>

          {/* Form section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Header */}
            <p className="text-secondary uppercase tracking-widest text-sm mb-2 font-heading">
              Kontakt os
            </p>
            <h2 className="text-light text-2xl md:text-3xl lg:text-4xl font-bold uppercase mb-8 font-heading leading-tight">
              Send os en besked og vi
              <br />
              svarer hurtigst muligt
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile: stacked, Desktop: 2x2 grid for first 4 fields */}
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Navn"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-full bg-light text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-full bg-light text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-full bg-light text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Emne"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-full bg-light text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Message textarea */}
              <textarea
                name="message"
                placeholder="Besked"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-3xl bg-light text-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />

              {/* Submit button */}
              <div className="flex justify-center lg:justify-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-dark border border-gray-600 text-light hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sender...' : 'Send'}</span>
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-light"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <p className="text-green-400 text-center lg:text-left">
                  Din besked er sendt! Vi vender tilbage hurtigst muligt.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-center lg:text-left">
                  Der opstod en fejl. Prøv venligst igen.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
