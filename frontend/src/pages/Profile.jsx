import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: 'Bibek Sharma',
    email: 'bibek.sharma@university.edu',
    username: 'bibek_s',
  });
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordSection(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      <div className="page-header">
        <h2>My Profile</h2>
      </div>

      <div className="card profile-card">
        <div className="card-body">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">BS</div>
            <div className="profile-info">
              <h3>{formData.fullName}</h3>
              <p>{formData.email}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>@{formData.username}</p>
            </div>
          </div>

          {/* Update Profile Form */}
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label htmlFor="profileName">Full Name</label>
              <input
                type="text"
                id="profileName"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
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
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn btn-primary">Update Profile</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowPasswordSection(!showPasswordSection)}
              >
                🔑 Change Password
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
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
                />
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
                />
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
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Update Password</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPasswordSection(false)}
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
