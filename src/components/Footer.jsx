import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../assets/icons/logo.png';
import footerLeftIcon from '../assets/icons/footer_left_icon.png';
import footerRightIcon from '../assets/icons/footer_right_icon.png';

const footerLinks = [
  { to: '/', label: 'Forside' },
  { to: '/tjenester', label: 'Tjenester' },
  { to: '/traenere', label: 'Trænere' },
  { to: '/priser', label: 'Priser' },
  { to: '/om-os', label: 'Om os' },
  { to: '/kontakt', label: 'Kontakt' },
];

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="relative bg-dark overflow-hidden">
      {/* Decorative icons */}
      <img 
        src={footerLeftIcon} 
        alt="" 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-32 md:w-48 desktop:w-64 opacity-20 pointer-events-none"
      />
      <img 
        src={footerRightIcon} 
        alt="" 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-32 md:w-48 desktop:w-64 opacity-20 pointer-events-none"
      />

      <div className="container mx-auto px-4 py-12 desktop:py-16 relative z-10">
        {/* Desktop Layout */}
        <div className="hidden desktop:grid desktop:grid-cols-3 desktop:gap-8 desktop:items-start">
          {/* Left - Logo & Description */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Xtreme Fitness" className="h-12" />
              <span className="text-white font-bold text-lg uppercase tracking-wider font-heading">
                Xtreme Fitness
              </span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              Dit fitnesscenter for alle niveauer. Vi hjælper dig med at nå dine mål med professionelle trænere og moderne faciliteter.
            </p>
          </div>

          {/* Center - Navigation */}
          <div className="flex flex-col items-center">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider mb-4 font-heading">
              Navigation
            </h3>
            <nav className="flex flex-col items-center gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right - Contact & Social */}
          <div className="flex flex-col items-end">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider mb-4 font-heading">
              Kontakt os
            </h3>
            <div className="text-white/80 text-sm text-right space-y-1 mb-6">
              <p>Xtreme Fitness Center</p>
              <p>Fitnessvejen 123</p>
              <p>1234 København</p>
              <p className="mt-2">Tlf: +45 12 34 56 78</p>
              <p>Email: info@xtremefitness.dk</p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="desktop:hidden flex flex-col items-center text-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center gap-2 mb-4">
            <img src={logo} alt="Xtreme Fitness" className="h-16" />
            <span className="text-white font-bold uppercase tracking-wider text-lg font-heading">
              Xtreme Fitness
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-white/70 text-sm italic mb-6">
            Hos os handler træning om glæde,<br />
            kvalitet og resultater
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Kontakt Os */}
          <h3 className="text-white font-bold text-xl uppercase tracking-wider mb-6 font-heading">
            Kontakt os
          </h3>

          {/* Contact Info */}
          <div className="text-center space-y-4 mb-8">
            <div>
              <p className="text-white font-semibold text-sm">Adresse:</p>
              <p className="text-white/70 text-sm italic">Nørregade 42, 9000 Aalborg</p>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Email:</p>
              <p className="text-white/70 text-sm italic">info@xtremefitness.dk</p>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Telefon:</p>
              <p className="text-white/70 text-sm italic">+ 45 99751642</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-white/20 text-center">
          <p className="text-white/50 text-sm">
            Copyright {new Date().getFullYear()} xtremefitness.dk - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
