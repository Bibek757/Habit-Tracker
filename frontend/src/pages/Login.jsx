import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/auth.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (errors.submit) setErrors(prev => ({ ...prev, submit: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email or username is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
       setIsLoading(true);
       setSuccessMessage('');
       try {
         const response = await authAPI.login({
           email: formData.email,
           password: formData.password
         });

         // Store token and user data
         localStorage.setItem('token', response.token);
         localStorage.setItem('user', JSON.stringify({
           user_id: response.user_id,
           full_name: response.full_name,
           username: response.username,
           email: response.email
         }));

         setSuccessMessage('✓ Login successful! Redirecting...');
         
         // Redirect to dashboard after 1 second
         setTimeout(() => {
           navigate('/dashboard');
         }, 1000);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
        setErrors({ submit: errorMessage });
        console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <span className="logo-icon">✓</span>
            <h1>Welcome Back</h1>
            <p>Login to continue building better habits</p>
          </div>

          <form onSubmit={handleSubmit} id="loginForm">
            {errors.submit && (
              <div style={{ 
                marginBottom: '16px', 
                padding: '14px 16px', 
                backgroundColor: '#fee', 
                borderRadius: '10px',
                color: '#c33',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #fcc'
              }}>
                ⚠️ {errors.submit}
              </div>
            )}

            {successMessage && (
              <div style={{ 
                marginBottom: '16px', 
                padding: '14px 16px', 
                backgroundColor: '#efe', 
                borderRadius: '10px',
                color: '#3c3',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #cfc'
              }}>
                {successMessage}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="loginEmail">📧 Email or Username</label>
              <input
                type="text"
                id="loginEmail"
                name="email"
                className="form-control"
                placeholder="test@example.com or testuser"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="email"
              />
              {errors.email && <div className="form-error">❌ {errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">🔐 Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="loginPassword"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  title="Toggle password visibility"
                  disabled={isLoading}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <div className="form-error">❌ {errors.password}</div>}
            </div>

            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" id="loginBtn" disabled={isLoading}>
              {isLoading ? '⏳ Logging in...' : '🚀 Login'}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Create one now</Link>
          </div>
        </div>

        <div className="page-footer">
          <p>Habit Tracker System &copy; 2026 | Build Better Habits Today</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
