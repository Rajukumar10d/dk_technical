import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Award, 
  Users, 
  Wrench, 
  Globe, 
  Activity, 
  ShieldCheck,
  ChevronRight,
  Zap,
  Layers,
  Play,
  Heart,
  Send,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  BookOpen,
  Briefcase,
  Eye,
  Video,
  MessageCircle,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Clock,
  Trophy,
  Quote,
  FileText,
  Lightbulb,
  PlusCircle,
  ChevronDown
} from 'lucide-react';
import dkSafetyImage from '../assets/dk_safety.png';

/* ── Animated Counter ── */
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const numTarget = parseFloat(target.replace(/[^\d.]/g, ''));
    const isDecimal = target.includes('.');
    const steps = 60;
    const increment = numTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numTarget) {
        current = numTarget;
        clearInterval(timer);
      }
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{target.includes('K') ? `${count}K` : count}{suffix}</span>;
};

/* ── Skill Bar Component ── */
const SkillBar = ({ name, level, delay, icon }) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    className="about-skill-bar"
  >
    <div className="skill-bar-header">
      <div className="skill-bar-icon">{icon}</div>
      <span className="skill-bar-name">{name}</span>
      <span className="skill-bar-percent">{level}%</span>
    </div>
    <div className="skill-bar-track">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ delay: delay + 0.3, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
      />
    </div>
  </motion.div>
);

/* ── Timeline Item ── */
const JourneyItem = ({ year, title, desc, icon, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.15, duration: 0.7 }}
    viewport={{ once: true }}
    className={`about-journey-item ${idx % 2 === 0 ? 'left' : 'right'}`}
  >
    <div className="journey-connector">
      <motion.div
        className="journey-dot"
        whileInView={{ scale: [0, 1.3, 1] }}
        transition={{ delay: idx * 0.15 + 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      />
    </div>
    <motion.div
      className="journey-card glass-card"
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className="journey-year-badge">{year}</div>
      <div className="journey-icon-wrap">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </motion.div>
  </motion.div>
);

/* ── Testimonial Card ── */
const TestimonialCard = ({ name, role, text, rating }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className="about-testimonial-card glass-card"
  >
    <div className="testimonial-quote-icon">
      <Quote size={24} />
    </div>
    <p className="testimonial-text">{text}</p>
    <div className="testimonial-stars">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={14} fill="var(--primary)" color="var(--primary)" />
      ))}
    </div>
    <div className="testimonial-author">
      <div className="testimonial-avatar">{name.charAt(0)}</div>
      <div>
        <h5>{name}</h5>
        <span>{role}</span>
      </div>
    </div>
  </motion.div>
);

/* ── Accordion/FAQ Item ── */
const FAQItem = ({ question, answer, idx }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="faq-item glass-panel"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="faq-header"
        style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between', width: '100%' }}>
          <h4 style={{ margin: 0, textAlign: 'left', fontSize: '1.1rem', fontWeight: 600 }}>{question}</h4>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={24} color="var(--primary)" />
          </motion.div>
        </div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Achievement Badge ── */
const AchievementBadge = ({ icon, title, description, idx }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.08, y: -8 }}
    className="achievement-badge glass-card"
  >
    <div className="achievement-icon-wrap">{icon}</div>
    <h4>{title}</h4>
    <p>{description}</p>
  </motion.div>
);

/* ── Mission Point ── */
const MissionPoint = ({ title, desc, idx }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.1 }}
    viewport={{ once: true }}
    className="mission-point-advanced"
  >
    <div className="point-icon-box">
      <CheckCircle2 size={20} />
    </div>
    <div className="point-content">
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  </motion.div>
);

/* ── Main About Component ── */
const About = () => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const stats = [
    { val: '18.5', suffix: 'K+', label: 'Total Views', icon: <Eye size={24} /> },
    { val: '160', suffix: '+', label: 'Subscribers', icon: <Users size={24} /> },
    { val: '89', suffix: '+', label: 'Videos', icon: <Video size={24} /> },
    { val: '24', suffix: '/7', label: 'Support', icon: <Clock size={24} /> },
  ];

  const skills = [
    { name: 'Electrical & Instrumentation', level: 95, icon: <Zap size={18} /> },
    { name: 'Gulf Recruitment Expert', level: 90, icon: <Globe size={18} /> },
    { name: 'Panel Wiring & Calibration', level: 92, icon: <Wrench size={18} /> },
    { name: 'Agency Verification', level: 88, icon: <ShieldCheck size={18} /> },
    { name: 'Video Content Creation', level: 85, icon: <Play size={18} /> },
  ];

  const journey = [
    { year: '2024', title: 'Industry Beginnings', desc: 'Started career in Electrical & Instrumentation, gaining hands-on experience in industrial plants across India.', icon: <Wrench size={24} /> },
    { year: '2025', title: 'Gulf Exploration', desc: 'Worked on major projects in the Gulf region, mastering international recruitment workflows and visa processes.', icon: <Globe size={24} /> },
    { year: 'Jan 2026', title: 'DK Technical Born', desc: 'Launched the YouTube channel to bridge the gap between Indian workers and authentic Gulf job opportunities.', icon: <Play size={24} /> },
    { year: 'Apr 2026', title: '160+ Community', desc: 'Rapidly growing community of skilled workers, technicians, and engineers trusting DK Technical for career guidance.', icon: <TrendingUp size={24} /> },
  ];

  const testimonials = [
    { name: 'Rahul Sharma', role: 'Electrician – Dubai', text: 'DK bhai ki wajah se mujhe Dubai mein sahi agency mili. Pehle 2 baar fraud hua tha, ab genuine job lagi!', rating: 5 },
    { name: 'Amit Yadav', role: 'Instrument Tech – KSA', text: 'Best channel for Gulf jobs! Step-by-step guidance di, visa se lekar medical tak. Highly recommended.', rating: 5 },
    { name: 'Suresh Kumar', role: 'ITI Student', text: 'Technical padhai ke saath recruitment guidance bhi milti hai. Ek hi jagah pe sab kuch mil jaata hai.', rating: 5 },
  ];

  return (
    <div className="page-about grid-background section-padding">
      <div className="container">
        
        {/* ═══ HERO SECTION WITH PHOTO ═══ */}
        <div className="about-hero-grid-advanced">
           <motion.div
             initial={{ opacity: 0, x: -60 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
             className="about-hero-text"
           >
              <motion.div 
                className="badge-pill-advanced"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Play size={14} fill="currentColor" /> THE CREATOR JOURNEY
              </motion.div>
              
              <h1 className="premium-font title-main-advanced">
                Meet the Mind Behind <br/>
                <span className="text-gradient">DK Technical</span>
              </h1>
              
              <div className="creator-intro-box">
                <p>
                  Namaste! I am <strong>Dharmendra Tiwari (Dk Technical)</strong>, an <strong>Electrical & Instrumentation (E&I) Specialist</strong> with over <strong>15 years of international experience</strong> across the Gulf, Europe, and India.
                </p>
                <p>
                  My mission is to provide <strong>true technical intelligence</strong> and transparent recruitment guidance. Having worked on major industrial projects globally, I help job seekers navigate the complex recruitment landscape while avoiding fraudulent agents.
                </p>
              </div>

              <div className="about-mission-list">
                <MissionPoint idx={1} title="Zero Fraud Policy" desc="Every agency and vacancy shared is vetted for authenticity." />
                <MissionPoint idx={2} title="Technical Empowerment" desc="Practical lessons on panel wiring, calibration, and maintenance." />
                <MissionPoint idx={3} title="Localized Guidance" desc="Step-by-step Hindi/Urdu videos for easy understanding." />
              </div>

              <motion.a 
                href="https://www.youtube.com/@dktechnical26"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium btn-magnetic"
                style={{ marginTop: '3rem', borderRadius: '50px' }}
              >
                Join the Mission <ArrowRight size={20} />
              </motion.a>
           </motion.div>

           {/* ── PHOTO VISUAL STACK ── */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
             className="about-visual-stack"
           >
              <div className="visual-background-glow" />
              
              {/* Owner Photo Frame */}
              <div className="about-owner-photo-frame">
                <div className="owner-photo-border-glow" />
                <div className="owner-photo-wrapper">
                  <img src={dkSafetyImage} alt="DK Tiwari - DK Technical" className="owner-photo-img" />
                  <div className="owner-photo-overlay" />
                </div>
                
                {/* Floating Info Cards */}
                <motion.div
                  className="owner-float-card owner-float-yt glass-panel"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                >
                  <Play size={18} color="#ff0000" />
                  <span>@dktechnical26</span>
                </motion.div>

                <motion.div
                  className="owner-float-card owner-float-loc glass-panel"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                >
                  <MapPin size={18} color="var(--primary)" />
                  <span>India 🇮🇳</span>
                </motion.div>
              </div>

              {/* Stats Strip */}
              <div className="creator-profile-frame glass-panel" style={{ marginTop: '30px', borderRadius: '24px' }}>
                <div className="stats-strip-premium" style={{ borderRadius: '20px', border: 'none', margin: 0 }}>
                   <div className="stat-unit">
                      <strong>160+</strong>
                      <span>SUBS</span>
                   </div>
                   <div className="stat-divider" />
                   <div className="stat-unit">
                      <strong>18.5K</strong>
                      <span>VIEWS</span>
                   </div>
                   <div className="stat-divider" />
                   <div className="stat-unit">
                      <strong>89+</strong>
                      <span>VIDEOS</span>
                   </div>
                </div>
              </div>

              <motion.div 
                className="experience-badge-advanced"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <Award size={24} />
                <div style={{ textAlign: 'left' }}>
                  <div className="exp-val">E&I</div>
                  <div className="exp-label">SPECIALIST</div>
                </div>
              </motion.div>
           </motion.div>
        </div>

        {/* ═══ ANIMATED STATS COUNTER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="about-stats-section"
          style={{ marginTop: '120px' }}
        >
          <div className="section-subtitle-premium">CHANNEL STATS</div>
          <div className="about-stats-grid">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="about-stat-card glass-card"
              >
                <div className="about-stat-icon">{stat.icon}</div>
                <div className="about-stat-value text-gradient">
                  <AnimatedCounter target={stat.val} suffix={stat.suffix} />
                </div>
                <div className="about-stat-label">{stat.label}</div>
                <div className="about-stat-bg-glow" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ SKILLS & EXPERTISE ═══ */}
        <div style={{ marginTop: '150px' }}>
          <div className="section-subtitle-premium">SKILLS & EXPERTISE</div>
          <div className="about-skills-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-skills-text"
            >
              <h2 className="premium-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                Technical <span className="text-gradient">Mastery</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Years of hands-on experience in Electrical & Instrumentation across Indian and Gulf industrial projects, combined with deep recruitment expertise.
              </p>
              <div className="about-skills-bars">
                {skills.map((skill, idx) => (
                  <SkillBar key={skill.name} {...skill} delay={idx * 0.1} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="about-skills-visual"
            >
              <div className="skills-hex-grid">
                {[
                  { icon: <Wrench size={28} />, label: 'E&I' },
                  { icon: <Globe size={28} />, label: 'Gulf' },
                  { icon: <ShieldCheck size={28} />, label: 'Verify' },
                  { icon: <GraduationCap size={28} />, label: 'Train' },
                  { icon: <Briefcase size={28} />, label: 'Jobs' },
                  { icon: <Video size={28} />, label: 'Content' },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    className="hex-item glass-card"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    <div className="hex-icon">{item.icon}</div>
                    <span>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══ JOURNEY TIMELINE ═══ */}
        <div style={{ marginTop: '150px' }}>
          <div className="section-subtitle-premium">THE JOURNEY</div>
          <h2 className="premium-font" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '80px' }}>
            From Field to <span className="text-gradient">YouTube</span>
          </h2>
          <div className="about-journey-timeline">
            <div className="journey-line" />
            {journey.map((item, idx) => (
              <JourneyItem key={item.year} {...item} idx={idx} />
            ))}
          </div>
        </div>

        {/* ═══ CHANNEL PILLARS ═══ */}
        <div style={{ marginTop: '150px' }}>
           <div className="section-subtitle-premium">OUR PILLARS</div>
           <div className="card-pillar-grid">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-card mission-card-premium"
              >
                <div className="mission-icon-glow"><Globe size={40}/></div>
                <h3>Global Access</h3>
                <p>Unlocking direct employment routes to KSA, UAE, Qatar, and Germany.</p>
                <div className="mission-card-bg" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-card mission-card-premium"
              >
                <div className="mission-icon-glow"><Zap size={40}/></div>
                <h3>Energy & Intel</h3>
                <p>Specialized training for industrial E&I roles with real-world scenarios.</p>
                <div className="mission-card-bg" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-card mission-card-premium"
              >
                <div className="mission-icon-glow"><ShieldCheck size={40}/></div>
                <h3>Security First</h3>
                <p>Advanced agency auditing to prevent recruitment fraud and money loss.</p>
                <div className="mission-card-bg" />
              </motion.div>
           </div>
        </div>

        {/* ═══ TESTIMONIALS ═══ */}
        <div style={{ marginTop: '150px' }}>
          <div className="section-subtitle-premium">COMMUNITY VOICES</div>
          <h2 className="premium-font" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '80px' }}>
            What Our <span className="text-gradient">Viewers Say</span>
          </h2>
          <div className="about-testimonials-grid">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} {...t} />
            ))}
          </div>
        </div>

        {/* ═══ WHY CHOOSE US ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="about-why-section"
          style={{ marginTop: '150px' }}
        >
          <div className="section-subtitle-premium">WHY DK TECHNICAL</div>
          <div className="about-why-grid">
            {[
              { icon: <ShieldCheck size={32} />, title: '100% Verified', desc: 'Every job listing, agency contact, and salary info is verified before sharing.' },
              { icon: <Heart size={32} />, title: 'Community First', desc: 'Built by workers, for workers. Zero commercial bias in recommendations.' },
              { icon: <BookOpen size={32} />, title: 'Free Education', desc: 'Complete E&I training library available free on YouTube for all aspirants.' },
              { icon: <MessageCircle size={32} />, title: 'Direct Support', desc: '24/7 Telegram and YouTube support for interview prep and document help.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, borderColor: 'var(--primary)' }}
                className="about-why-card glass-card"
              >
                <div className="why-card-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ 10 LIFE SAVING RULES (RESTORING AS REQUESTED) ═══ */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="about-safety-section"
        >
          <div className="section-subtitle-premium">INDUSTRY COMPLIANCE</div>
          <h2 className="premium-font" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '80px' }}>
            10 Life <span className="text-gradient">Saving Rules</span>
          </h2>

          <div className="safety-rules-poster">
            <motion.div 
              className="safety-image-container"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img src={dkSafetyImage} alt="DK Technical Safety Advisory" />
              <div className="safety-image-overlay">
                <h3>DK Technical</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>E&I Specialist & Safety Advocate</p>
              </div>
            </motion.div>

            <div className="rules-content-wrap">
              <h3 className="premium-font" style={{ color: '#ffa500' }}>UAE COMPANY STANDARDS</h3>
              <p style={{ color: 'var(--text-muted)' }}>Essential protocols for every industrial worker in the Gulf region.</p>
              
              <div className="rules-list">
                {[
                  "Work with a valid Work Permit",
                  "Verify isolation before work",
                  "Obtain authorisation before overriding controls",
                  "Protect against a fall from height",
                  "Conduct gas checks when required",
                  "Obtain authorisation before entry into a confined space",
                  "Keep out of suspended load path",
                  "Follow a safe driving plan",
                  "Report all incidents immediately",
                  "Use the required PPE and equipment"
                ].map((rule, idx) => (
                  <motion.div 
                    key={idx}
                    className="rule-item-v2"
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="rule-num">{idx + 1}</div>
                    <div className="rule-text">{rule}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <motion.div 
            className="safety-footer-text"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            AAPKO MALUM HAI?
          </motion.div>
        </motion.div>

        {/* ═══ COMMUNITY CTA ═══ */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="about-final-cta glass-panel"
          style={{ marginTop: '150px' }}
        >
           <motion.div
             animate={{ scale: [1, 1.15, 1] }}
             transition={{ repeat: Infinity, duration: 2 }}
           >
             <Heart size={48} className="pulse-animation text-primary" style={{ color: 'var(--primary)' }} />
           </motion.div>
           <h2 className="premium-font">Fueled by Community</h2>
           <p>
             Your trust is our greatest asset. Help us expand the reach of genuine technical education by sharing our platform with fellow aspirants.
           </p>
           <div className="social-pill-group">
              <motion.a 
                href="https://www.youtube.com/@dktechnical26" 
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                whileHover={{ scale: 1.08, y: -5 }}
              >
                <Play size={18} /> YouTube
              </motion.a>
              <motion.a href="https://t.me/dktechnical26" target="_blank" rel="noopener noreferrer" className="social-pill" whileHover={{ scale: 1.08, y: -5 }}>
                <Send size={18} /> Telegram
              </motion.a>
              <motion.a href="https://www.instagram.com/d.ktiwari021783" target="_blank" rel="noopener noreferrer" className="social-pill" whileHover={{ scale: 1.08, y: -5 }}>
                <Globe size={18} /> Instagram
              </motion.a>
           </div>
        </motion.div>

        {/* ═══ CERTIFICATIONS & ACHIEVEMENTS ═══ */}
        <motion.div style={{ marginTop: '150px' }}>
          <div className="section-subtitle-premium">CREDENTIALS & MILESTONES</div>
          <h2 className="premium-font" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '80px' }}>
            Achievements & <span className="text-gradient">Recognition</span>
          </h2>
          <div className="achievements-grid">
            <AchievementBadge idx={0} icon={<Trophy size={40} />} title="15+ Years Expert" description="Industry veteran in E&I with over a decade of hands-on experience in global industrial projects" />
            <AchievementBadge idx={1} icon={<Users size={40} />} title="21K+ Community" description="A trusted and growing network of skilled professionals across Facebook and YouTube" />
            <AchievementBadge idx={2} icon={<Globe size={40} />} title="Euro-Gulf Focus" description="Specialized guidance for premium opportunities in Jordan, Italy, Albania, and the Gulf region" />
            <AchievementBadge idx={3} icon={<Award size={40} />} title="Mumbai & Cochin Hubs" description="Directly supporting offline interview drives and verified recruitment offices in major Indian cities" />
            <AchievementBadge idx={4} icon={<Globe size={40} />} title="Multi-Regional" description="Active partnerships with agencies across KSA, UAE, Qatar, and Germany" />
            <AchievementBadge idx={5} icon={<Sparkles size={40} />} title="24/7 Support" description="Direct access to guidance via Telegram and YouTube community" />
          </div>
        </motion.div>

        {/* ═══ EXPERIENCE BREAKDOWN ═══ */}
        <motion.div style={{ marginTop: '150px' }}>
          <div className="section-subtitle-premium">PROFESSIONAL TIMELINE</div>
          <h2 className="premium-font" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '80px' }}>
            Career <span className="text-gradient">Evolution</span>
          </h2>
          <div className="experience-breakdown">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
              className="experience-card glass-card"
            >
              <div className="exp-period">2019 - 2023</div>
              <div className="exp-role">Electrical & Instrumentation Technician</div>
              <p>Worked on complex industrial projects across major plants in India, specializing in panel wiring, calibration, and maintenance of critical control systems.</p>
              <div className="exp-skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
                <span className="skill-tag">PLC Programming</span>
                <span className="skill-tag">Wiring & Installation</span>
                <span className="skill-tag">Troubleshooting</span>
                <span className="skill-tag">Safety Protocols</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              viewport={{ once: true }}
              className="experience-card glass-card"
            >
              <div className="exp-period">2024 - 2025</div>
              <div className="exp-role">Gulf Projects Specialist</div>
              <p>Led major industrial projects in Saudi Arabia and UAE, managing international teams and mastering recruitment workflows, visa processes, and cross-border compliance.</p>
              <div className="exp-skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
                <span className="skill-tag">Project Management</span>
                <span className="skill-tag">Visa Processing</span>
                <span className="skill-tag">Team Leadership</span>
                <span className="skill-tag">Agency Relations</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="experience-card glass-card"
            >
              <div className="exp-period">Jan 2026 - Present</div>
              <div className="exp-role">DK Technical Founder & Creator</div>
              <p>Launched and scaled YouTube channel to 160+ subscribers with 18.5K views, creating authentic technical education and fraud-free recruitment guidance for global audience.</p>
              <div className="exp-skills" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
                <span className="skill-tag">Content Creation</span>
                <span className="skill-tag">Community Building</span>
                <span className="skill-tag">Recruitment Audit</span>
                <span className="skill-tag">Technical Training</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══ FAQ SECTION ═══ */}
        <motion.div style={{ marginTop: '150px' }}>
          <div className="section-subtitle-premium">FREQUENTLY ASKED</div>
          <h2 className="premium-font" style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '80px' }}>
            Questions About <span className="text-gradient">DK Technical</span>
          </h2>
          <div className="faq-grid">
            <FAQItem 
              idx={0}
              question="How do you verify job listings?" 
              answer="Every job vacancy and agency is personally audited by me. I verify company registration, agency credentials, salary claims, and do direct phone verification with employers before sharing on the channel. Over 3+ years of Gulf experience gives me the network to validate everything."
            />
            <FAQItem 
              idx={1}
              question="Is DK Technical completely free?" 
              answer="Yes, 100% free! All technical tutorials, job listings, visa guides, and career advice are available free on YouTube. We don't charge for community support via Telegram either. Our mission is to empower aspiring workers without commercial barriers."
            />
            <FAQItem 
              idx={2}
              question="What countries' jobs do you cover?" 
              answer="Primary focus on Saudi Arabia (KSA), UAE, Qatar, and Oman for Gulf jobs. Recently expanding to Germany and other European countries for skilled positions. Indian domestic opportunities are also shared regularly."
            />
            <FAQItem 
              idx={3}
              question="Can I get direct support from DK?" 
              answer="Yes! You can reach out via Telegram for interview prep, document questions, or career guidance. Response time is typically within 24 hours. For detailed 1-on-1 mentoring, join our community Telegram group where you connect with others and share experiences."
            />
            <FAQItem 
              idx={4}
              question="How do I stay updated with job listings?" 
              answer="Subscribe to the YouTube channel and turn on notifications. Join the Telegram community for instant job alerts. Weekly updates cover new vacancies, agency reviews, and market insights. Earliest updates always go to YouTube subscribers first."
            />
            <FAQItem 
              idx={5}
              question="Is there a cost for the E&I training videos?" 
              answer="Completely free! All E&I training modules covering panel wiring, PLC basics, instrumentation, and calibration are available on the YouTube channel. Download notes and study materials shared in the community for offline access."
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
