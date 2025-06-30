import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function AuthForm({ type }) {
  const navigate = useNavigate();
  const isLogin = type === 'login';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: isLogin ? '' : ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On successful auth, redirect to verification
      navigate('/verify', { 
        state: { 
          email: formData.email,
          name: isLogin ? '' : formData.name 
        } 
      });
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <p className="title">{isLogin ? 'Login' : 'Sign Up'}</p>
      
      {error && <div className="error-message">{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your college email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            minLength="6"
          />
          {isLogin && (
            <div className="forgot">
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>
          )}
        </div>

        {!isLogin && (
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm your password"
              required
              minLength="6"
            />
          </div>
        )}

        <button 
          className="sign-button" 
          type="submit"
          disabled={isLoading}
          style={{ 
            backgroundColor: isLoading ? '#9c7ca5' : '#69247C',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? (
            <span className="button-loader">Processing...</span>
          ) : (
            <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
          )}
        </button>
      </form>

      <div className="social-message">
        <div className="line"></div>
        <p className="message">Or continue with</p>
        <div className="line"></div>
      </div>

      <div className="social-icons">
        <button 
          aria-label="Log in with Google" 
          className="icon"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="icon-svg">
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
        </button>

        <button 
          aria-label="Log in with College SSO" 
          className="icon"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </button>
      </div>

      <p className="auth-redirect">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <Link 
          to={isLogin ? "/signup" : "/login"} 
          className="redirect-link"
        >
          {isLogin ? ' Sign Up' : ' Sign In'}
        </Link>
      </p>
    </div>
  );
}