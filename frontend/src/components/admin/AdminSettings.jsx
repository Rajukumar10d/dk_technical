import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Lock, Mail, Check, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const { user, supabase } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      setMessage('Email update request sent! Please check both your old and new email addresses to confirm.');
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setTimeout(() => setMessage(''), 5000);
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Error: New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('Error: Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setMessage('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
      setTimeout(() => setMessage(''), 3000);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'var(--text-main)',
    borderRadius: '8px',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
    transition: 'var(--transition)',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: 600
  };

  const sectionStyle = {
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(249, 115, 22, 0.2)',
    borderRadius: '12px',
    padding: '2rem',
    backdropFilter: 'blur(10px)'
  };

  return (
    <div className="admin-settings-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Message Alert */}
      {message && (
        <div style={{
          padding: '1rem',
          marginBottom: '2rem',
          background: message.includes('Error') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
          border: `1px solid ${message.includes('Error') ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.5)'}`,
          color: message.includes('Error') ? '#ef4444' : '#22c55e',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideDown 0.3s ease'
        }}>
          {message.includes('Error') ? <AlertCircle size={18} /> : <Check size={18} />}
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Email Settings */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Mail size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: 0 }}>Update Email</h3>
          </div>
          <form onSubmit={handleEmailChange}>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Current Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }}
                />
              </div>
              <div>
                <label style={labelStyle}>New Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter new email"
                  style={inputStyle}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="admin-btn-primary"
              style={{
                padding: '0.8rem 2rem',
                background: 'linear-gradient(135deg, var(--primary) 0%, #fb923c 100%)',
                border: 'none',
                color: 'white',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Updating...' : 'Update Email'}
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Lock size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: 0 }}>Change Password</h3>
          </div>
          <form onSubmit={handlePasswordChange}>
            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={labelStyle}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  style={inputStyle}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.8rem 2rem',
                background: 'linear-gradient(135deg, var(--primary) 0%, #fb923c 100%)',
                border: 'none',
                color: 'white',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Updating...' : 'Change Password'}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div style={sectionStyle}>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Account Information</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Email</p>
              <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: 600 }}>{user?.email}</p>
            </div>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Role</p>
              <p style={{ margin: 0, color: 'var(--primary)', fontWeight: 600 }}>Admin</p>
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>User ID</p>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{user?.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
