import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import '../styles/profile.css';

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await userAPI.getProfile();
      setFormData({
        fullName: data.full_name || '',
        email: data.email || '',
        username: data.username || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await userAPI.updateProfile({
        full_name: formData.fullName,
        email: formData.email,
        username: formData.username,
      });
      // Update localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.full_name = formData.fullName;
      user.email = formData.email;
      user.username = formData.username;
      localStorage.setItem('user', JSON.stringify(user));
      alert('Profile updated successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      setErrors({ profile: errorMessage });
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await userAPI.changePassword({
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      });
      alert('Password changed successfully!');
      setShowPasswordSection(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      setErrors({});
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to change password';
      setErrors({ password: errorMessage });
      console.error('Error changing password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const avatarInitials = formData.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U';

  return (
    <>
      <div className="page-header">
        <h2>My Profile</h2>
      </div>

      <div className="card profile-card">
        <div className="card-body">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">{avatarInitials}</div>
            <div className="profile-info">
              <h3>{formData.fullName}</h3>
              <p>{formData.email}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>@{formData.username}</p>
            </div>
          </div>

          {/* Update Profile Form */}
          <form onSubmit={handleProfileUpdate}>
            {errors.profile && <div className="form-error" style={{ marginBottom: '16px' }}>{errors.profile}</div>}

            <div className="form-group">
              <label htmlFor="profileName">Full Name</label>
              <input
                type="text"
                id="profileName"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profileEmail">Email Address</label>
              <input
                type="email"
                id="profileEmail"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="profileUsername">Username</label>
              <input
                type="text"
                id="profileUsername"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Profile'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
                disabled={isLoading}
              >
                🔑 Change Password
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
                disabled={isLoading}
              >
                🚪 Logout
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password Section */}
      {showPasswordSection && (
        <div className="card profile-card" style={{ marginTop: '20px' }}>
          <div className="card-header">
            <span>Change Password</span>
            <button
              className="modal-close"
              onClick={() => setShowPasswordSection(false)}
              style={{ width: '28px', height: '28px', fontSize: '14px' }}
            >
              ✕
            </button>
          </div>
          <div className="card-body">
            <form onSubmit={handlePasswordUpdate}>
              {errors.password && <div className="form-error" style={{ marginBottom: '16px' }}>{errors.password}</div>}

              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="form-control"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
                {errors.currentPassword && <div className="form-error">{errors.currentPassword}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
                {errors.newPassword && <div className="form-error">{errors.newPassword}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
                {errors.confirmNewPassword && <div className="form-error">{errors.confirmNewPassword}</div>}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordSection(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
