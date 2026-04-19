import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Menu, X, ArrowRight, Play, Camera, Share, Send, MessageCircle, Mail } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Videos', path: '/videos' },
    { name: 'Job Updates', path: '/jobs' },
    { name: 'Visa Guide', path: '/guide' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    ...(user ? [
      { name: 'Profile', path: '/profile' }
    ] : [
      { name: 'Login', path: '/login' }
    ]),
    ...(user && user.role === 'admin' ? [{ name: 'Admin', path: '/admin' }] : [])
  ];

  return (
    <nav 
      className={`navbar-main ${scrolled ? 'scrolled' : ''}`}
      style={{
        position: 'sticky', top: 0, zIndex: 5000, 
        display: 'flex', justifyContent: 'space-between', padding: '0 clamp(1rem, 5vw, 4rem)', alignItems: 'center',
        background: scrolled ? 'rgba(2, 6, 23, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        height: 'var(--nav-height)',
        borderBottom: scrolled ? '1px solid var(--border-glass)' : 'none',
        transition: 'var(--transition)',
        width: '100%'
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <div className="nav-logo-container">
          <div className="nav-logo-icon">
             <Wrench size={24} color="white" />
          </div>
          <div className="logo-text-stack">
            <div className="premium-font" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 900, lineHeight: '1', letterSpacing: '1px' }}>
              dk <span className="text-gradient">technical</span>
            </div>
            <div className="desktop-only" style={{ fontSize: '0.6rem', letterSpacing: '3px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '2px' }}>
              GULF & EUROPE JOB GUIDE
            </div>
          </div>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links desktop-only" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            style={{ 
              color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-main)', 
              textDecoration: 'none', 
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'var(--transition)',
              position: 'relative'
            }} 
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
        
        <div style={{ marginLeft: '1rem', display: 'flex', gap: '15px', alignItems: 'center' }}>
          {!user ? (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{ 
                padding: '0.6rem 1.5rem', 
                fontSize: '0.75rem',
                borderRadius: '50px',
              }}>
                Sign In
              </button>
            </Link>
          ) : (
            <button 
              onClick={logout}
              className="btn-secondary" 
              style={{ 
                padding: '0.6rem 1.5rem', 
                fontSize: '0.75rem',
                borderRadius: '50px',
              }}
            >
              Logout
            </button>
          )}
          <a href="https://www.youtube.com/@dktechnical26?sub_confirmation=1" target="_blank" style={{ textDecoration: 'none' }}>
            <button className="btn-premium" style={{ 
              padding: '0.6rem 1.5rem', 
              fontSize: '0.75rem',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Subscribe <ArrowRight size={14} />
            </button>
          </a>
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="mobile-only">
         <button 
           onClick={() => setIsOpen(!isOpen)}
           style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '10px' }}
         >
           {isOpen ? <X size={28} /> : <Menu size={28} />}
         </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 'var(--nav-height)', left: 0, width: '100%',
              background: 'var(--bg-dark)', borderBottom: '1px solid var(--border-glass)',
              padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
              zIndex: 4999, height: 'auto', maxHeight: '90vh', overflowY: 'auto'
            }}
          >
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                onClick={() => setIsOpen(false)}
                style={{ 
                  color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-main)', 
                  textDecoration: 'none', 
                  fontSize: '1.2rem',
                  fontWeight: 700
                }}
              >
                {item.name}
              </Link>
            ))}
            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-glass)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {!user ? (
                 <Link to="/login" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
                   <button className="btn-secondary" style={{ width: '100%', padding: '1rem' }}>
                     Sign In Account
                   </button>
                 </Link>
               ) : (
                 <button onClick={() => { logout(); setIsOpen(false); }} className="btn-secondary" style={{ width: '100%', padding: '1rem' }}>
                   Logout Account
                 </button>
               )}
               <a href="https://www.youtube.com/@dktechnical26?sub_confirmation=1" target="_blank" style={{ width: '100%', textDecoration: 'none' }}>
                 <button className="btn-premium" style={{ width: '100%', padding: '1rem' }}>
                   Subscribe on YouTube
                 </button>
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
