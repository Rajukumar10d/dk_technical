import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Phone, LogOut, ArrowRight, CheckCircle, Shield, Briefcase, Video, BookOpen } from 'lucide-react';

const Profile = () => {
  const { user, logout, updateContact } = useContext(AuthContext);
  const [contactNumber, setContactNumber] = useState(user?.contact_number || '');
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContact(contactNumber);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="section-padding container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center' }}
        >
          <h2 className="premium-font" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Access <span className="text-gradient">Required</span></h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please log in to view your profile.</p>
          <Link to="/login" className="btn-premium" style={{ borderRadius: '50px', padding: '1rem 3rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            Go to Login <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  const quickLinks = [
    { name: 'Job Updates', path: '/jobs', icon: <Briefcase size={18} /> },
    { name: 'Video Tutorials', path: '/videos', icon: <Video size={18} /> },
    { name: 'Visa Guide', path: '/guide', icon: <BookOpen size={18} /> },
    { name: 'Contact Us', path: '/contact', icon: <Mail size={18} /> },
  ];

  return (
    <div className="section-padding container" style={{ minHeight: '70vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel"
          style={{
            padding: '40px', borderRadius: '32px',
            marginBottom: '30px', position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--gradient-brand)' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'var(--gradient-brand)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 900, color: 'white',
              boxShadow: '0 10px 30px var(--primary-glow)'
            }}>
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '2px', marginBottom: '4px' }}>TECHNICIAN DASHBOARD</div>
              <h2 className="premium-font" style={{ fontSize: '1.8rem', marginBottom: '5px' }}>
                Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              style={{
                padding: '10px 20px', borderRadius: '50px',
                background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              <LogOut size={16} /> Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Contact Update Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-panel"
          style={{ padding: '40px', borderRadius: '32px', marginBottom: '30px' }}
        >
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={20} color="var(--primary)" /> Update Contact Number
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '1px' }}>
                PHONE NUMBER
              </label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
                style={{
                  width: '100%', padding: '14px 20px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
                  color: 'white', fontSize: '1rem', outline: 'none',
                  transition: 'var(--transition)'
                }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn-premium"
              style={{ padding: '14px 30px', borderRadius: '12px', height: 'fit-content' }}
            >
              {saved ? <><CheckCircle size={18} /> Saved!</> : 'Update'}
            </motion.button>
          </form>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '15px', color: 'var(--text-muted)', letterSpacing: '2px' }}>
            EXPLORE
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
            {quickLinks.map((link, idx) => (
              <motion.div key={idx} whileHover={{ y: -5, borderColor: 'var(--primary)' }}>
                <Link to={link.path} className="glass-card" style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '20px', borderRadius: '16px', textDecoration: 'none', color: 'var(--text-main)',
                  fontWeight: 700, fontSize: '0.95rem'
                }}>
                  <div style={{ color: 'var(--primary)' }}>{link.icon}</div>
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;