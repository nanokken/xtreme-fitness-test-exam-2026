import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    setIsLoading(false);
    
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/backoffice');
      } else {
        navigate('/');
      }
    } else {
      setError('Forkert email eller password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      {/* Header text */}
      <h2 className="text-primary font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-center">
        Log ind for at tilmelde dig dagens træning
      </h2>
      
      {/* Main title */}
      <h1 className="text-3xl md:text-4xl font-bold uppercase mb-10">
        Log ind
      </h1>

      {/* Login form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-5">
        {/* Email input */}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-6 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:outline-none text-center text-gray-600 placeholder-gray-400"
          />
        </div>

        {/* Password input */}
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-6 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:outline-none text-center text-gray-600 placeholder-gray-400"
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-full border-2 border-gray-300 hover:border-primary transition-colors group disabled:opacity-50"
        >
          <span className="text-gray-600 group-hover:text-primary transition-colors">
            {isLoading ? 'Logger ind...' : 'Log ind'}
          </span>
          <span className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center">
            <svg 
              className="w-3 h-3 text-white ml-0.5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </form>

      {/* Demo credentials hint */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Admin login: admin@mediacollege.dk / admin</p>
      </div>
    </div>
  );
}
