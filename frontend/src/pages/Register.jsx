import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/auth.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        await authAPI.register({
          full_name: formData.fullName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });

        // Redirect to login
        navigate('/', { replace: true });
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
        setErrors({ submit: errorMessage });
        console.error('Registration error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container wide">
        <div className="auth-card">
          <div className="auth-logo">
            <span className="logo-icon">📋</span>
            <h1>Create Account</h1>
            <p>Start building better habits today</p>
          </div>

          <form onSubmit={handleSubmit} id="registerForm">
            {errors.submit && <div className="form-error" style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f8d7da', borderRadius: '4px' }}>{errors.submit}</div>}

            <div className="form-group">
              <label htmlFor="regFullname">Full Name</label>
              <input
                type="text"
                id="regFullname"
                name="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.fullName && <div className="form-error">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="regEmail">Email Address</label>
              <input
                type="email"
                id="regEmail"
                name="email"
                className="form-control"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="regUsername">Username</label>
              <input
                type="text"
                id="regUsername"
                name="username"
                className="form-control"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.username && <div className="form-error">{errors.username}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="regPassword">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="regPassword"
                  name="password"
                  className="form-control"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="regConfirmPassword">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  id="regConfirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="input-icon"
                  onClick={() => setShowConfirm(!showConfirm)}
                  disabled={isLoading}
                >
                  {showConfirm ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg" id="registerBtn" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </div>

        <div className="page-footer">
          <p>Habit Tracker System &copy; 2026 | University Student Project</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
