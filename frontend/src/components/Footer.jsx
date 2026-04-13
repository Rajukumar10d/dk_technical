import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Mail, 
  Phone, 
  MapPin, 
  Play, 
  ArrowRight, 
  Shield, 
  Globe, 
  Send,
  ChevronRight,
  Camera,
  Share,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Quick Links": [
      { name: "Home", path: "/" },
      { name: "Job Updates", path: "/jobs" },
      { name: "Visa Guide", path: "/guide" },
      { name: "About DK Tiwari", path: "/about" }
    ],
    "Resources": [
      { name: "Video Tutorials", path: "/videos" },
      { name: "Contact Us", path: "/contact" },
      { name: "Interview Tips", path: "/guide" },
      { name: "Agency Verification", path: "/guide" }
    ],
    "Topics": [
      { name: "E&I Training", path: "/videos" },
      { name: "Visa Process", path: "/guide" },
      { name: "Trade Test Prep", path: "/guide" },
      { name: "Salary Info", path: "/jobs" }
    ]
  };

  return (
    <footer style={{ 
      background: 'var(--bg-darker)', 
      color: 'white', 
      padding: '100px 0 30px', 
      position: 'relative', 
      borderTop: '1px solid var(--border-glass)',
      overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', 
        background: 'var(--primary-glow)', filter: 'blur(100px)', borderRadius: '50%', opacity: 0.1, zIndex: 0 
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid-layout">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <div className="nav-logo-container" style={{ marginBottom: '25px' }}>
                <div className="nav-logo-icon">
                   <Wrench size={24} color="white" />
                </div>
                <div className="logo-text-stack">
                  <div className="premium-font" style={{ fontSize: '1.3rem', fontWeight: 900, lineHeight: '1' }}>
                    dk <span className="text-gradient">technical</span>
                  </div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '2px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '2px' }}>
                    GULF & EUROPE JOB GUIDE
                  </div>
                </div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '30px' }}>
              Gulf aur Europe mein naukri paane ke sahi tarike. E&I Specialist DK Tiwari dwara — visa, agency verification, aur interview guidance.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <motion.a href="https://www.youtube.com/@dktechnical26" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15, rotate: 10 }} className="social-icon" style={{ background: '#ff0000', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Play size={18} color="white" /></motion.a>
              <motion.a href="https://www.instagram.com/d.ktiwari021783" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15, rotate: 10 }} className="social-icon" style={{ background: '#E4405F', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Camera size={18} color="white" /></motion.a>
              <motion.a href="https://www.facebook.com/profile.php?id=61582131756115" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15, rotate: 10 }} className="social-icon" style={{ background: '#1877F2', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Share size={18} color="white" /></motion.a>
              <motion.a href="https://t.me/dktechnical26" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.15, rotate: 10 }} className="social-icon" style={{ background: '#0088cc', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Send size={18} color="white" /></motion.a>
              <motion.a href="mailto:dktechnical26@gmail.com" whileHover={{ scale: 1.15, rotate: 10 }} className="social-icon" style={{ background: 'var(--primary)', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={18} color="white" /></motion.a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-col" style={{ marginTop: '5px' }}>
              <h4 className="footer-heading">{title}</h4>
              <div className="footer-nav">
                {links.map(link => (
                  <Link key={link.name} to={link.path} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ChevronRight size={12} className="link-arrow" /> {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Newsletter / Contact */}
          <div className="footer-newsletter">
            <h4 className="footer-heading">Stay Connected</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Subscribe for daily Gulf & Europe job vacancy alerts.
            </p>
            <div className="newsletter-form" style={{ position: 'relative' }}>
              <input 
                type="email" 
                placeholder="Email Address" 
                style={{ 
                  width: '100%', padding: '15px 20px', background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white',
                  outline: 'none', transition: 'var(--transition)'
                }}
              />
              <button 
                className="btn-premium" 
                style={{ padding: '8px 15px', borderRadius: '8px', position: 'absolute', right: '5px', top: '5px' }}
              >
                <ArrowRight size={18} />
              </button>
            </div>
            
            <div style={{ marginTop: '30px', display: 'grid', gap: '12px' }}>
              <motion.a href="https://www.youtube.com/@dktechnical26" target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'var(--transition)' }}>
                <div style={{ background: '#ff0000', padding: '6px', borderRadius: '6px', display: 'flex' }}>
                   <Play size={14} color="white" />
                </div>
                YouTube: @dktechnical26
              </motion.a>
              <motion.a href="https://www.instagram.com/d.ktiwari021783" target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'var(--transition)' }}>
                <div style={{ background: '#E4405F', padding: '6px', borderRadius: '6px', display: 'flex' }}>
                   <Camera size={14} color="white" />
                </div>
                Instagram: @d.ktiwari021783
              </motion.a>
              <motion.a href="https://t.me/dktechnical26" target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', transition: 'var(--transition)' }}>
                <div style={{ background: '#0088cc', padding: '6px', borderRadius: '6px', display: 'flex' }}>
                   <Send size={14} color="white" />
                </div>
                Telegram: @dktechnical26
              </motion.a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '6px', display: 'flex' }}>
                   <Wrench size={14} color="white" />
                </div>
                E&I Specialist
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <div style={{ background: '#3b82f6', padding: '6px', borderRadius: '6px', display: 'flex' }}>
                   <MapPin size={14} color="white" />
                </div>
                India 🇮🇳
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {currentYear} <span style={{ fontWeight: 700, color: 'white' }}>dk technical</span> by DK Tiwari. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '1px' }} className="hover-white">ABOUT</Link>
            <Link to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '1px' }} className="hover-white">CONTACT</Link>
            <Link to="/guide" style={{ color: 'var(--text-muted)', textDecoration: 'none', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '1px' }} className="hover-white">RESOURCES</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
