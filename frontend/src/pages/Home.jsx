import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useView } from '../context/ViewContext';
import {
  ArrowRight,
  Globe,
  Shield,
  TrendingUp,
  Zap,
  Briefcase,
  Activity,
  Play,
  Wrench,
  Plane,
  FileText,
  Star,
  ExternalLink,
  Send,
  Users
} from 'lucide-react';
import PromotionBanner from '../components/PromotionBanner';

const VideoCard = ({ title, views, date, id, idx, videoUrl }) => (
  <motion.a
    href={videoUrl || `https://www.youtube.com/watch?v=${id}`}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -10 }}
    className="glass-card video-card-advanced"
    style={{ borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'var(--transition)' }}
  >
    <div style={{ position: 'relative', paddingTop: '56.25%', background: '#111' }}>
      <img
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
      />
      <div className="video-card-overlay">
        <Play size={40} className="video-play-icon" />
      </div>
    </div>
    <div style={{ padding: '1.5rem' }}>
      <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', height: '3.2rem', overflow: 'hidden' }}>{title}</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
        <span>{views} views</span>
        <span>{date}</span>
      </div>
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}
        whileHover={{ x: 5 }}
      >
        Watch Video <ExternalLink size={16} />
      </motion.div>
    </div>
  </motion.a>
);

const Card3D = ({ title, icon, desc, delay = 0 }) => {
  const { is3D } = useView();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, rotateY: is3D ? 15 : 0, rotateX: is3D ? -5 : 0 }}
      className="glass-card card-interactive-reveal"
      style={{
        padding: '2.5rem', borderRadius: '24px', position: 'relative',
        background: 'var(--bg-card)', border: '1px solid var(--border-glass)',
        boxShadow: is3D ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
        transformStyle: 'preserve-3d', cursor: 'pointer', textAlign: 'left'
      }}
    >
      <div style={{ marginBottom: '1.5rem', color: 'var(--primary)', transform: is3D ? 'translateZ(30px)' : 'none' }}>
        {icon}
      </div>
      <div className="reveal-content">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', transform: is3D ? 'translateZ(20px)' : 'none' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-muted)', transform: is3D ? 'translateZ(10px)' : 'none', fontSize: '0.95rem' }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

const SectionHeading = ({ subtitle, title, centered = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    style={{ textAlign: centered ? 'center' : 'left', marginBottom: '5rem' }}
  >
    <div className="text-gradient" style={{ letterSpacing: '4px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
      {subtitle}
    </div>
    <h2 className="premium-font h2-advanced" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: '1.1' }}>{title}</h2>
  </motion.div>
);

const Home = () => {
  const { is3D } = useView();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [activeTab, setActiveTab] = useState('gulf');

  return (
    <div className={`page-home grid-background`} style={{ perspective: is3D ? '1500px' : 'none' }}>

      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: '0%' }} />

      {/* Hero Section - Simplified & Interactive */}
      <section className="hero-bg hero-advanced" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-blob blob-1" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="badge-premium-pill" style={{ margin: '0 auto 2rem' }}>
                <div className="pulse-dot" />
                🚀 GULF & EUROPE 2026 CAREER PORTAL
              </div>

              <h1 className="hero-title-main" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', marginBottom: '1.5rem' }}>
                Technical Mastery, <br />
                <span className="text-gradient">Global Success</span>
              </h1>

              <p className="hero-description" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
                Your unified gateway to verified job updates and professional E&I technical intelligence. Led by <strong>DK Tiwari</strong>.
              </p>

              {/* Interactive Search Mockup */}
              <div className="search-box-premium" style={{
                padding: '10px',
                borderRadius: '50px',
                display: 'flex',
                gap: '10px',
                maxWidth: '600px',
                margin: '0 auto 3rem'
              }}>
                <input
                  type="text"
                  placeholder="Search jobs, visas, or technical tutorials..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    padding: '0 20px',
                    color: 'white',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                <button className="btn-premium" style={{ padding: '0.8rem 2rem', borderRadius: '40px' }}>
                  Search
                </button>
              </div>

              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/jobs"
                    className="btn-premium"
                    style={{ borderRadius: '50px', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                  >
                    Latest Job Updates <ArrowRight size={20} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/guide"
                    className="link-hover-effect"
                    style={{ border: '1px solid var(--border-glass)', padding: '1rem 2.5rem', borderRadius: '50px', cursor: 'pointer', textDecoration: 'none', color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                  >
                    Visa Guide <Globe size={20} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Job Ticker */}
      <div style={{ background: 'var(--bg-darker)', padding: '20px 0', borderY: '1px solid var(--border-glass)' }}>
        <motion.div
          animate={{ x: [0, -1500] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: 'flex', gap: '60px', whiteSpace: 'nowrap' }}
        >
          {["🇸🇦 Aramco Project Hiring", "🇦🇪 Dubai E&I Vacancy", "🇮🇱 Israel Construction", "🇩🇪 Germany Visa Info", "🇶🇦 Qatar Oil & Gas"].map((t, i) => (
            <div key={i} style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px' }}>● {t}</div>
          ))}
          {/* Duplicate for seamless scroll */}
          {["🇸🇦 Aramco Project Hiring", "🇦🇪 Dubai E&I Vacancy", "🇮🇱 Israel Construction", "🇩🇪 Germany Visa Info", "🇶🇦 Qatar Oil & Gas"].map((t, i) => (
            <div key={i + 'd'} style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px' }}>● {t}</div>
          ))}
        </motion.div>
      </div>

      {/* Main Roadmap Section - Consolidating Competencies & Benefits */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading subtitle="HOW WE HELP" title="The Career Roadmap" />

          <div className="roadmap-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { id: 'gulf', label: 'Gulf Placement', icon: <Briefcase /> },
                { id: 'europe', label: 'Europe Visa', icon: <Plane /> },
                { id: 'tech', label: 'Technical Prep', icon: <Wrench /> },
                { id: 'safety', label: 'Agency Alerts', icon: <Shield /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`glass-card ${activeTab === tab.id ? 'active-tab' : ''}`}
                  style={{
                    padding: '20px 30px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    cursor: 'pointer',
                    borderLeft: activeTab === tab.id ? '4px solid var(--primary)' : '1px solid var(--border-glass)',
                    background: activeTab === tab.id ? 'var(--bg-elevated)' : 'var(--bg-card)',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <span style={{ color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)' }}>{tab.icon}</span>
                  <span style={{ fontWeight: 700 }}>{tab.label}</span>
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card"
              style={{ padding: 'clamp(20px, 5vw, 60px)', borderRadius: '40px' }}
            >
              {activeTab === 'gulf' && (
                <div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Gulf Placement Mastery</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    Access verified vacancy lists for the Middle East's largest projects. We personally audit agencies to ensure 100% authenticity and zero fraud.
                  </p>
                  <ul style={{ marginTop: '2rem', listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <li>✅ ARAMCO Approved Projects</li>
                    <li>✅ ADNOC Vendor Listings</li>
                    <li>✅ Medical Checklist Info</li>
                    <li>✅ Trade Test Preparation</li>
                  </ul>
                  <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '2rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                    Browse Job Listings <ArrowRight size={18} />
                  </Link>
                </div>
              )}
              {activeTab === 'europe' && (
                <div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Europe Work Permit Guide</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    Navigating work visas for Germany, Poland, and Romania requires technical precision. We provide step-by-step document guidance.
                  </p>
                  <ul style={{ marginTop: '2rem', listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <li>✅ Germany ITI Pathway</li>
                    <li>✅ Poland Work Permits</li>
                    <li>✅ Document Attestation</li>
                    <li>✅ Language Requirements</li>
                  </ul>
                  <Link to="/guide" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '2rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                    Read Visa Guide <ArrowRight size={18} />
                  </Link>
                </div>
              )}
              {activeTab === 'tech' && (
                <div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>E&I Technical Training</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    Master the skills needed for high-paying Gulf projects. Our Electrical & Instrumentation modules are designed for Field Technicians.
                  </p>
                  <ul style={{ marginTop: '2rem', listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <li>✅ Panel Wiring Basics</li>
                    <li>✅ Instrument Calibration</li>
                    <li>✅ P&ID Reading</li>
                    <li>✅ Interview Prep</li>
                  </ul>
                  <Link to="/videos" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '2rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                    Watch Training Videos <ArrowRight size={18} />
                  </Link>
                </div>
              )}
              {activeTab === 'safety' && (
                <div>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Agency Audit & Safety</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    Protect yourself from recruitment fraud. We identify verified ISO-certified agencies with proven track records.
                  </p>
                  <ul style={{ marginTop: '2rem', listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <li>✅ Verified Agency List</li>
                    <li>✅ Fake Letter Detection</li>
                    <li>✅ ISO Certified Firms</li>
                    <li>✅ Service Fee Guides</li>
                  </ul>
                  <Link to="/guide" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '2rem', color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>
                    Learn About Safety <ArrowRight size={18} />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Video Showcase */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
            <SectionHeading subtitle="LEARN FROM THE BEST" title="Expert Masterclass" centered={false} />
            <Link to="/videos" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, marginBottom: '5rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View All Tutorials <ArrowRight size={20} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            <VideoCard idx={0} id="3bLJ825vJVU" title="Gulf Jobs – Salary, Visa & Agency Selection Guide" views="12K" date="1w ago" />
            <VideoCard idx={1} id="CtCRBCL2FeQ" title="Israel Recruitment – Hiring Process & Visa Requirements" views="8.5K" date="3d ago" />
            <VideoCard idx={2} id="-s6GRYDF5ZY" title="Germany Work Visa – ITI & Diploma Jobs Full Guide" views="15K" date="5d ago" />
          </div>
        </div>
      </section>

      {/* Global Partners */}
      <section style={{ padding: '60px 0', borderY: '1px solid var(--border-glass)' }}>
        <div className="container" style={{ opacity: 0.2, filter: 'grayscale(100%)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          {["ARAMCO", "ADNOC", "NEOM", "SHELL", "PETROFAC"].map(p => (
            <h4 key={p} className="premium-font" style={{ letterSpacing: '5px' }}>{p}</h4>
          ))}
        </div>
      </section>

      {/* Final Simple CTA */}
      <section className="section-padding">
        <div className="container">
          <div className="glass-panel" style={{ padding: '80px', borderRadius: '40px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to elevate your career?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
              Join our growing community of professionals and get absolute clarity on your international move.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://www.youtube.com/@dktechnical26?sub_confirmation=1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-premium" style={{ borderRadius: '50px', padding: '1rem 3rem' }}>Subscribe Now</button>
              </a>
              <a href="https://t.me/dktechnical26" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary" style={{ borderRadius: '50px', padding: '1rem 3rem' }}>Join Telegram</button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <PromotionBanner />
    </div>
  );
};

export default Home;
