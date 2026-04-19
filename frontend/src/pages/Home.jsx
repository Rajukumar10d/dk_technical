import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useView } from '../context/ViewContext';
import { AuthContext } from '../context/AuthContext';
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
  Users,
  CheckCircle2,
  Award,
  Video,
  Clock,
  Eye,
  Rocket
} from 'lucide-react';
import PromotionBanner from '../components/PromotionBanner';
import FacebookPromotion from '../components/FacebookPromotion';

/* ── Floating Decorative Shape ── */
const FloatingShape = ({ color, size, top, left, delay = 0 }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      filter: 'blur(80px)',
      opacity: 0.2,
      top,
      left,
      zIndex: -1,
      pointerEvents: 'none'
    }}
    animate={{
      y: [0, 40, 0],
      x: [0, -30, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 10 + Math.random() * 5,
      repeat: Infinity,
      delay,
      ease: 'easeInOut'
    }}
  />
);

/* ── Animated Counter ── */
const AnimatedCounter = ({ target, suffix = '', duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const numTarget = parseFloat(target.replace(/[^\d.]/g, ''));
    const steps = 60;
    const increment = numTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numTarget) {
        current = numTarget;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{target.includes('K') ? 'K' : ''}{suffix}</span>;
};

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
      <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', height: '3.2rem', overflow: 'hidden', fontWeight: 700 }}>{title}</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
        <span>{views} views</span>
        <span>{date}</span>
      </div>
      <motion.div
        style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 700 }}
        whileHover={{ x: 5 }}
      >
        Watch Masterclass <ExternalLink size={16} />
      </motion.div>
    </div>
  </motion.a>
);

const SectionHeading = ({ subtitle, title, centered = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    style={{ textAlign: centered ? 'center' : 'left', marginBottom: '4rem' }}
  >
    <div className="badge-premium-pill" style={{ margin: centered ? '0 auto 1.5rem' : '0 0 1.5rem' }}>
      {subtitle}
    </div>
    <h2 className="premium-font h2-advanced" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: '1.1' }}>{title}</h2>
  </motion.div>
);

const Home = () => {
  const { is3D } = useView();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [activeTab, setActiveTab] = useState('gulf');
  const [searchValue, setSearchValue] = useState('');
  const [taglines, setTaglines] = useState([]);
  const { supabase } = useContext(AuthContext);

  useEffect(() => {
    fetchTaglines();
  }, [supabase]);

  const fetchTaglines = async () => {
    try {
      const { data, error } = await supabase
        .from('taglines')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        setTaglines(data);
      } else {
        // Fallback for home page if no active taglines
        setTaglines([
          { content: "🇸🇦 SAUDI ARAMCO PROJECTS: NOW HIRING E&I TECHNICIANS" },
          { content: "🇦🇪 DUBAI MALL 2nd PHASE: HVAC & ELECTRICAL VACANCIES" },
          { content: "🇩🇪 GERMANY OPPORTUNITY CARD: ITI & DIPLOMA HOLDERS ELIGIBLE" }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`page-home grid-background`} style={{ perspective: is3D ? '1500px' : 'none', overflowX: 'hidden' }}>

      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: '0%', height: '4px', background: 'var(--gradient-brand)', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }} />

      {/* Hero Section */}
      <section className="hero-bg hero-advanced" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Animated Background blobs */}
        <FloatingShape color="var(--primary)" size="400px" top="-10%" left="10%" delay={0} />
        <FloatingShape color="var(--secondary)" size="350px" top="60%" left="70%" delay={2} />
        <FloatingShape color="var(--accent)" size="250px" top="20%" left="80%" delay={5} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="badge-premium-pill" 
                style={{ margin: '0 auto 2.5rem' }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="pulse-dot" />
                <Rocket size={14} style={{ marginRight: '8px' }} /> 2026 CAREER TRANSFORMATION PORTAL
              </motion.div>

              <h1 className="hero-title-main" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', marginBottom: '1.5rem', fontWeight: 900, lineHeight: 1 }}>
                Legacy of Mastery, <br />
                <span className="text-gradient">Global Career Success</span>
              </h1>

              <p className="hero-description" style={{ fontSize: '1.25rem', marginBottom: '3.5rem', opacity: 0.9, lineHeight: 1.8, maxWidth: '800px', margin: '0 auto 3.5rem' }}>
                Access verified job intelligence, high-end technical training, and secure global pathways. Led by E&I Specialist <strong>DK Tiwari</strong>.
              </p>

              {/* Advanced Search Component */}
              <motion.div 
                className="search-box-premium" 
                style={{
                  padding: '8px',
                  borderRadius: '100px',
                  display: 'flex',
                  gap: '12px',
                  maxWidth: '700px',
                  margin: '0 auto 4rem',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                }}
                whileFocusWithin={{ scale: 1.02, borderColor: 'var(--primary)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '25px', color: 'var(--text-muted)' }}>
                  <Briefcase size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs (e.g. Electrician UAE, Germany Visa...)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    padding: '15px 5px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    fontWeight: 500
                  }}
                />
                <button 
                  id="home-search-btn"
                  className="btn-premium" 
                  style={{ padding: '0 35px', borderRadius: '100px', height: '55px', fontSize: '0.9rem' }}
                >
                  Quick Search
                </button>
              </motion.div>

              <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/jobs"
                    className="btn-premium"
                    style={{ borderRadius: '100px', padding: '1.2rem 3rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '1rem' }}
                  >
                    View Verified Jobs <ArrowRight size={20} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/about"
                    className="glass-card"
                    style={{ border: '1px solid var(--border-glass)', padding: '1.2rem 3rem', borderRadius: '100px', cursor: 'pointer', textDecoration: 'none', color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '1rem', fontWeight: 700 }}
                  >
                    Meet DK Tiwari <Users size={20} />
                  </Link>
                </motion.div>
              </div>

              {/* Trust Indicator */}
              <motion.div 
                className="trust-indicators-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', opacity: 0.6, fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, textTransform: 'uppercase' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Shield size={16} color="var(--primary)" /> 100% VERIFIED</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} color="var(--primary)" /> 21K+ COMMUNITY</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={16} color="var(--primary)" /> 15+ YRS EXPERTISE</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Fade Gradient */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, var(--bg-dark), transparent)', zIndex: 0 }} />
      </section>

      {/* Impact Stats Section - Modern Authority Building */}
      <section style={{ padding: '80px 0', position: 'relative', marginTop: '-100px', zIndex: 10 }}>
        <div className="container">
          <div className="glass-panel impact-stats-panel" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '40px', 
            padding: '50px', 
            borderRadius: '40px',
            textAlign: 'center',
            borderColor: 'var(--border-glass)',
            background: 'var(--bg-card)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
          }}>
            {[
              { label: 'YouTube Subscribers', val: '160', suffix: '+', icon: <Users size={28} /> },
              { label: 'Total Learning Views', val: '18.5', suffix: 'K+', icon: <Eye size={28} /> },
              { label: 'Instructional Videos', val: '89', suffix: '+', icon: <Video size={28} /> },
              { label: 'Industry Expertise', val: '15', suffix: ' YRS', icon: <Clock size={28} /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ color: 'var(--primary)', marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                <div className="text-gradient" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '5px' }}>
                  <AnimatedCounter target={stat.val} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="ticker-container-middle" style={{ background: 'var(--bg-darker)', padding: '25px 0', borderY: '1px solid var(--border-glass)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, padding: '0 30px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', fontWeight: 900, fontSize: '0.8rem', zIndex: 10, clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)', letterSpacing: '1px' }}>
          LIVE ALERTS
        </div>
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ display: 'flex', gap: '80px', whiteSpace: 'nowrap', paddingLeft: '180px' }}
        >
          {[...taglines, ...taglines, ...taglines, ...taglines].map((t, i) => (
            <div key={i} style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-bright)', display: 'flex', alignItems: 'center', gap: '15px' }}>
               <Zap size={16} color="var(--primary)" fill="var(--primary)" /> {t.content || t.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Roadmap Section */}
      <section className="section-padding" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <SectionHeading subtitle="THE BLUEPRINT" title="Strategic Career Roadmap" />

          <div className="roadmap-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { id: 'gulf', label: 'Gulf Mastery', icon: <Briefcase />, desc: 'KSA, UAE, Qatar Vacancies' },
                { id: 'europe', label: 'Europe Pathway', icon: <Plane />, desc: 'Germany, Poland & Romania' },
                { id: 'tech', label: 'Technical Intel', icon: <Wrench />, desc: 'E&I Hands-on Training' },
                { id: 'safety', label: 'Agency Audits', icon: <Shield />, desc: 'Fraud-Proof Selection' }
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: 10 }}
                  className={`glass-card ${activeTab === tab.id ? 'active-tab' : ''}`}
                  style={{
                    padding: '25px 35px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    cursor: 'pointer',
                    borderLeft: activeTab === tab.id ? '6px solid var(--primary)' : '1px solid var(--border-glass)',
                    background: activeTab === tab.id ? 'var(--bg-elevated)' : 'rgba(255,255,255,0.02)',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '15px', 
                    background: activeTab === tab.id ? 'var(--primary-glow)' : 'rgba(255,255,255,0.05)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)'
                  }}>
                    {tab.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: activeTab === tab.id ? 'white' : 'var(--text-muted)' }}>{tab.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{tab.desc}</div>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="glass-card"
              style={{ padding: 'clamp(30px, 8vw, 80px)', borderRadius: '50px', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'var(--primary-glow)', filter: 'blur(100px)', opacity: 0.2 }} />
              
              {activeTab === 'gulf' && (
                <div>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>Gulf Placement Excellence</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                    Access verified vacancy lists for the Middle East's most prestigious energy and infrastructure projects. We personally audit license holders to ensure zero commission fraud.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '3rem' }}>
                    {[
                      { t: 'ARAMCO Approved', d: 'Verified project vendor lists' },
                      { t: 'Trade Test Mastery', d: 'Interview prep modules' },
                      { t: 'Salary Standards', d: 'Updated pay scale guides' },
                      { t: 'Agency Whitelist', d: 'Direct contacts for top firms' }
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ color: 'var(--primary)' }}><CheckCircle2 size={24} /></div>
                        <div>
                          <div style={{ fontWeight: 800 }}>{item.t}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/jobs" className="btn-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '1.2rem 2.8rem', borderRadius: '50px', textDecoration: 'none' }}>
                    Explore Active Jobs <ArrowRight size={20} />
                  </Link>
                </div>
              )}

              {activeTab === 'europe' && (
                <div>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>Europe Professional Mobility</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                    Germany, Poland, and Romania are actively seeking technical talent. We break down the complex visa requirements into actionable steps.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '3rem' }}>
                    {[
                      { t: 'Opportunity Card', d: 'Germany points calculator' },
                      { t: 'Document Attestation', d: 'Step-by-step seal guide' },
                      { t: 'Work Permit Poland', d: 'Process timeline & cost' },
                      { t: 'Language Prep', d: 'Basic communication guides' }
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ color: 'var(--primary)' }}><CheckCircle2 size={24} /></div>
                        <div>
                          <div style={{ fontWeight: 800 }}>{item.t}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/guide" className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '1.2rem 2.8rem', borderRadius: '50px', textDecoration: 'none', color: 'white', fontWeight: 800, border: '1px solid var(--border-glass)' }}>
                    Download Visa Guide <FileText size={20} />
                  </Link>
                </div>
              )}

              {activeTab === 'tech' && (
                <div>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>E&I Technical Training</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                    Bridge the gap between academic knowledge and field reality. Our lessons cover everything from panel wiring to advanced instrumentation.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '3rem' }}>
                    {[
                      { t: 'Panel Wiring', d: 'Control & Power circuit logic' },
                      { t: 'Instrument Calib', d: 'Smart transmitters & vales' },
                      { t: 'P&ID Reading', d: 'Symbolism & industrial flow' },
                      { t: 'Safety (LSR)', d: '10 Life Saving Rules guide' }
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ color: 'var(--primary)' }}><CheckCircle2 size={24} /></div>
                        <div>
                          <div style={{ fontWeight: 800 }}>{item.t}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/videos" className="btn-premium" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '1.2rem 2.8rem', borderRadius: '50px', textDecoration: 'none' }}>
                    Start Learning Now <Play size={20} />
                  </Link>
                </div>
              )}

              {activeTab === 'safety' && (
                <div>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 900 }}>Security & Fraud Prevention</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                    Don't be a victim of recruitment scams. We maintain a database of verified recruitment agencies (RA) licensed by the Ministry of External Affairs.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '3rem' }}>
                    {[
                      { t: 'License Verification', d: 'eMigrate status check' },
                      { t: 'Fake Offer Analysis', d: 'Common red flags list' },
                      { t: 'Legal Complaints', d: 'How to report bad agents' },
                      { t: 'Whitelisted Offices', d: 'Direct office visit guides' }
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ color: 'var(--primary)' }}><CheckCircle2 size={24} /></div>
                        <div>
                          <div style={{ fontWeight: 800 }}>{item.t}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="https://t.me/dktechnical26" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '1.2rem 2.8rem', borderRadius: '50px', textDecoration: 'none' }}>
                    Join Safety Community <Send size={20} />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Video Showcase */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
         <FloatingShape color="var(--primary)" size="300px" top="30%" left="-5%" delay={1} />
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '40px' }}>
            <SectionHeading subtitle="LEARN FROM THE BEST" title="Expert Masterclass" centered={false} />
            <Link to="/videos" className="link-hover-effect" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 800, marginBottom: '4rem', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
              View All Tutorials <ArrowRight size={22} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            <VideoCard idx={0} id="3bLJ825vJVU" title="Gulf Jobs – Salary, Visa & Agency Selection Guide" views="12K" date="1w ago" />
            <VideoCard idx={1} id="CtCRBCL2FeQ" title="Israel Recruitment – Hiring Process & Visa Requirements" views="8.5K" date="3d ago" />
            <VideoCard idx={2} id="-s6GRYDF5ZY" title="Germany Work Visa – ITI & Diploma Jobs Full Guide" views="15K" date="5d ago" />
          </div>
        </div>
      </section>

      {/* Global Brand Trust Section */}
      <section style={{ padding: '100px 0', borderY: '1px solid var(--border-glass)', background: 'var(--bg-darker)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '4px', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '15px' }}>OPPORTUNITIES ACROSS GIANTS</div>
           </div>
          <div className="brand-logo-grid" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '80px',
            opacity: 0.3,
            filter: 'grayscale(100%) brightness(1.5)'
          }}>
            {["ARAMCO", "ADNOC", "NEOM", "SHELL", "PETROFAC", "SABIC", "L&T"].map(p => (
              <motion.h4 
                key={p} 
                className="premium-font" 
                style={{ letterSpacing: '8px', fontSize: '1.5rem', margin: 0 }}
                whileHover={{ opacity: 1, filter: 'grayscale(0%)', color: 'var(--primary)', scale: 1.1 }}
              >
                {p}
              </motion.h4>
            ))}
          </div>
        </div>
      </section>

      {/* Final Conversion Section */}
      <section className="section-padding" style={{ position: 'relative' }}>
         <FloatingShape color="var(--secondary)" size="400px" top="20%" left="80%" delay={0} />
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel" 
            style={{ padding: 'clamp(40px, 10vw, 100px)', borderRadius: '60px', textAlign: 'center', background: 'var(--gradient-brand)', border: 'none' }}
          >
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '2rem', fontWeight: 900, color: 'white' }}>Ready to elevate your career?</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.3rem', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem', lineHeight: 1.8 }}>
              Join 21K+ professionals who have already simplified their international journey. Get 100% clarity on your next big move.
            </p>
            <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a 
                href="https://www.youtube.com/@dktechnical26?sub_confirmation=1" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'none' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="glass-card" style={{ borderRadius: '100px', padding: '1.3rem 4rem', background: 'white', color: 'var(--primary)', border: 'none', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer' }}>Subscribe Now</button>
              </motion.a>
              <motion.a 
                href="https://t.me/dktechnical26" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'none' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="glass-card" style={{ borderRadius: '100px', padding: '1.3rem 4rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer' }}>Join Telegram</button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <PromotionBanner />
      <FacebookPromotion />
    </div>
  );
};

export default Home;
