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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
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

         // Redirect to dashboard
         navigate('/dashboard');
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
            <span className="logo-icon">📋</span>
            <h1>Habit Tracker System</h1>
            <p>Track your habits, build better routines</p>
          </div>

          <form onSubmit={handleSubmit} id="loginForm">
            {errors.submit && <div className="form-error" style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>{errors.submit}</div>}
            
            <div className="form-group">
              <label htmlFor="loginEmail">Email / Username</label>
              <input
                type="text"
                id="loginEmail"
                name="email"
                className="form-control"
                placeholder="Enter your email or username"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
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
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" id="loginBtn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>

        <div className="page-footer">
          <p>Habit Tracker System &copy; 2026 | University Student Project</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
