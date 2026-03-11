import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/icons/logo.png';

const navLinks = [
  { to: '/', label: 'Forside' },
  { to: '/tjenester', label: 'Tjenester' },
  { to: '/traenere', label: 'Trænere' },
  { to: '/priser', label: 'Priser' },
  { to: '/om-os', label: 'Om os' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden desktop:flex absolute top-0 left-0 right-0 z-50 bg-transparent px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Xtreme Fitness" className="h-12" />
          <span className="text-white font-bold text-sm uppercase tracking-wider">
            Xtreme Fitness
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-white hover:text-primary transition-colors ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          
          {isAuthenticated ? (
            <>
              {isAdmin() && (
                <NavLink
                  to="/backoffice"
                  className={({ isActive }) =>
                    `text-white hover:text-primary transition-colors ${
                      isActive ? 'text-primary' : ''
                    }`
                  }
                >
                  Backoffice
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="text-white hover:text-primary transition-colors"
              >
                Log ud
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-white hover:text-primary transition-colors ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="desktop:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Xtreme Fitness" className="h-8" />
        </Link>

        {/* Burger Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="text-white p-2"
          aria-label="Åbn menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="desktop:hidden fixed inset-0 z-50 bg-black flex flex-col">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white p-2"
            aria-label="Luk menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Links */}
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-white text-xl hover:text-primary transition-colors ${
                    isActive ? 'text-primary' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {isAuthenticated ? (
              <>
                {isAdmin() && (
                  <NavLink
                    to="/backoffice"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `text-white text-xl hover:text-primary transition-colors ${
                        isActive ? 'text-primary' : ''
                      }`
                    }
                  >
                    Backoffice
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white text-xl hover:text-primary transition-colors"
                >
                  Log ud
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-white text-xl hover:text-primary transition-colors ${
                    isActive ? 'text-primary' : ''
                  }`
                }
              >
                Log ind
              </NavLink>
            )}
          </div>
        </div>
      )}
    </>
  );
}
