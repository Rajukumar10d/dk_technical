import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Shield, Users, ArrowRight, CheckCircle, Lock, Mail, Key } from 'lucide-react';

const Login = () => {
  const { login, loginWithEmail, user, loading: authLoading } = useContext(AuthContext);
  const [loginMode, setLoginMode] = useState('user'); // 'user' or 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already logged in, redirect to correct dashboard
  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
  }, [user, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLocalLoading(true);
    
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      await loginWithEmail(trimmedEmail, trimmedPassword);
    } catch (err) {
      if (err.message.includes('confirm your email')) {
        setError('Verification required. Please check your inbox or confirm this user in your Supabase Auth dashboard.');
      } else {
        setError(err.message || 'Verification failed. Please check credentials.');
      }
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="section-padding container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
        className="auth-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '3rem',
          borderRadius: '32px',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Gradient accent */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px', 
          background: loginMode === 'admin' ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'var(--gradient-brand)' 
        }} />

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.div
            key={loginMode}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            style={{
              width: '70px', height: '70px', borderRadius: '22px',
              background: loginMode === 'admin' ? 'rgba(245, 158, 11, 0.15)' : 'var(--primary-glow)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem', color: loginMode === 'admin' ? '#f59e0b' : 'var(--primary)'
            }}
          >
            {loginMode === 'admin' ? <Shield size={32} /> : <Users size={32} />}
          </motion.div>
          
          <h2 className="premium-font" style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>
            {loginMode === 'admin' ? 'Master Admin' : 'Technician Login'}
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
            {loginMode === 'admin' 
              ? 'Secure console for Dharmendra Tiwari. Enter master credentials.' 
              : 'Access your profile, job tokens, and technical guides.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={{ 
          display: 'flex', background: 'rgba(255,255,255,0.03)', 
          padding: '6px', borderRadius: '14px', marginBottom: '2rem',
          border: '1px solid var(--border-glass)'
        }}>
          <button 
            onClick={() => { setLoginMode('user'); setError(''); }}
            style={{ 
              flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
              background: loginMode === 'user' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: loginMode === 'user' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 700, cursor: 'pointer', transition: '0.3s'
            }}
          >
            Technician
          </button>
          <button 
            onClick={() => { setLoginMode('admin'); setError(''); }}
            style={{ 
              flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
              background: loginMode === 'admin' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: loginMode === 'admin' ? '#f59e0b' : 'var(--text-muted)',
              fontWeight: 700, cursor: 'pointer', transition: '0.3s'
            }}
          >
            Administrator
          </button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{ 
              padding: '12px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', 
              fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' 
            }}
          >
            {error}
          </motion.div>
        )}

        <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '2rem' }}>
          {loginMode === 'admin' ? (
            <form onSubmit={handleEmailLogin} style={{ display: 'grid', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)' }} />
                <input
                  required
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '14px 15px 14px 45px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white' }}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <Key size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)' }} />
                <input
                  required
                  type="password"
                  placeholder="Master Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '14px 15px 14px 45px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white' }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={localLoading}
                type="submit"
                className="btn-premium"
                style={{
                  width: '100%', padding: '1.2rem', borderRadius: '16px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                  border: 'none', color: 'white', fontWeight: 800, cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)'
                }}
              >
                {localLoading ? 'Verifying Admin...' : 'Login to Command Center'}
              </motion.button>
            </form>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={login}
              className="btn-premium"
              style={{
                width: '100%', padding: '1.2rem 1.5rem', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                fontSize: '1rem', background: 'var(--gradient-brand)',
                border: 'none', color: 'white', fontWeight: 800, cursor: 'pointer',
                boxShadow: '0 10px 30px var(--primary-glow)'
              }}
            >
              <LogIn size={18} /> Sign in with Google
            </motion.button>
          )}
        </div>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '2rem' }}>
          {(loginMode === 'admin' 
            ? ['Identity: admindktiwari12@gmail.com', 'Encrypted Master Access', 'Full Broadcast Permissions'] 
            : ['Access verified Gulf jobs', 'Save career preferences', 'Direct technical support']
          ).map((benefit, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <CheckCircle size={16} color={loginMode === 'admin' ? '#f59e0b' : 'var(--primary)'} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            Exit to Home Page <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;