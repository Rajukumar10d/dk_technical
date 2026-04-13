import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  FileText, 
  Map, 
  Compass, 
  CreditCard, 
  Heart, 
  Coffee, 
  ChevronRight, 
  Building2, 
  ShieldCheck, 
  Globe, 
  Plane,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Clock,
  Briefcase,
  Wrench
} from 'lucide-react';

const ExpertTip = ({ text }) => (
  <div className="expert-tip-box group">
    <HelpCircle size={16} className="tip-icon" />
    <div className="tip-content">
      <span className="tip-label">EXPERT TIP</span>
      <p>{text}</p>
    </div>
  </div>
);

const ResourceCard = ({ icon, title, desc, id, delay = 0 }) => (
  <motion.a
    href={`#${id}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    viewport={{ once: true }}
    className="resource-card-advanced group resource-card-link"
  >
    <div className="resource-icon-premium">{icon}</div>
    <div className="resource-body">
      <h3 className="resource-title">{title}</h3>
      <p className="resource-desc">{desc}</p>
      <div className="resource-link">
        Deep Dive <ChevronRight size={14} />
      </div>
    </div>
    <div className="resource-bg-pattern" />
  </motion.a>
);

const Guide = () => {
  const { scrollYProgress } = useScroll();

  const resources = [
    {
      id: 'gulf-salary-matrix',
      icon: <Briefcase />,
      title: 'Gulf Salary Matrix',
      desc: 'Detailed breakdown of basic pay, food allowance, and OT across KSA, UAE and Qatar.',
      details: 'Explore the exact pay bands for E&I technicians, including contract allowances, overtime structures, and retained benefits across Gulf markets.'
    },
    {
      id: 'visa-timeline',
      icon: <Clock />,
      title: 'Visa Timeline',
      desc: 'Understanding the processing times from interview to flight for various visa types.',
      details: 'This deep dive covers the fast-track visa routes, embassy interview cycles, medical clearance timing, and tips to avoid delays.'
    },
    {
      id: 'trade-test-library',
      icon: <Wrench />,
      title: 'Trade Test Library',
      desc: 'Technical diagrams and common questions for E&I technician interviews.',
      details: 'Get the exact circuit diagrams, wiring test checklists, and sample panel questions recruiters ask during trade tests.'
    },
    {
      id: 'camp-life-guide',
      icon: <Building2 />,
      title: 'Camp Life Guide',
      desc: 'What to pack and what to expect from industrial worker accommodations.',
      details: 'Learn the practical camp routines, accommodation standards, meal expectations, and items you should always carry on the first day.'
    },
    {
      id: 'europe-work-permits',
      icon: <Globe />,
      title: 'Europe Work Permits',
      desc: 'Step-by-step for Germany, Poland and Romania skilled worker visas.',
      details: 'Understand the documentation, timeline, and employer sponsorship process needed to secure European skilled-worker permits.'
    },
    {
      id: 'document-checklist',
      icon: <ShieldCheck />,
      title: 'Document Checklist',
      desc: 'Essential documents you need to carry before heading to the airport.',
      details: 'This checklist ensures you have visa copies, health records, training certificates, and embassy-ready paperwork before departure.'
    }
  ];

  const steps = [
    { title: 'Agency Verification', desc: 'Identify genuine Ministry-approved agents.', icon: <ShieldCheck />, tip: "Check MSME and License number on official portals." },
    { title: 'Technical Portfolio', desc: 'Prepare your ITI/Diploma & Experience docs.', icon: <FileText />, tip: "Keep scanned copies in Google Drive for quick access." },
    { title: 'Trade Test Mastery', desc: 'Crack the practical and theoretical interview.', icon: <Wrench />, tip: "Practice panel wiring and component identification daily." },
    { title: 'Final Deployment', desc: 'Visa, Medical and Flight to your destination.', icon: <Plane />, tip: "Carry some base currency of the destination country." },
  ];
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="page-guide grid-background">
      <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: '0%' }} />

      <div className="container section-padding">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="guide-hero-advanced"
        >
          <div className="guide-icon-box">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              <Compass size={48} className="text-gradient" />
            </motion.div>
          </div>
          <h1 className="premium-font text-reveal-advanced">
            Global <span className="text-gradient">Career Compass</span>
          </h1>
          <p className="guide-intro">
            A comprehensive roadmap for Electrical & Instrumentation professionals seeking opportunities in the Gulf and European markets. Curated by Dk Tiwari.
          </p>
        </motion.div>

        {/* The Roadmap - Interactive Timeline */}
        <section className="roadmap-section">
           <div className="section-subtitle-premium">STEP-BY-STEP JOURNEY</div>
           
           <div className="timeline-container-advanced">
              <div className="timeline-line-bg" />
              
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`timeline-item-advanced ${idx % 2 === 0 ? 'left' : 'right'}`}
                >
                  <div className="timeline-content-box glass-panel">
                     <div className="timeline-icon-circle">{step.icon}</div>
                     <div className="timeline-text">
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                        <ExpertTip text={step.tip} />
                     </div>
                     <div className="timeline-number">0{idx + 1}</div>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Fraud Prevention Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="warning-panel-premium"
        >
          <div className="warning-header">
            <AlertTriangle size={32} />
            <h3>INTELLIGENCE ALERT: FRAUD PREVENTION</h3>
          </div>
          <div className="warning-body">
            <p>
              The recruitment landscape is plagued by unverified middle-men. Dk Tiwari regularly exposes fraudulent agencies and demand letters on the YouTube channel. 
              <strong> Never pay for a job without a verified employment contract and visa copy.</strong>
            </p>
            <div className="warning-ctas">
              <a href="https://www.youtube.com/@dktechnical26" target="_blank" rel="noopener noreferrer" className="btn-warning-premium">Watch Fraud Exposure Videos</a>
              <a href="https://www.youtube.com/@dktechnical26" target="_blank" rel="noopener noreferrer" className="link-verify">Verify Agency License <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </motion.div>

        {/* Resources Grid */}
        <div className="section-subtitle-premium">TECHNICAL RESOURCES</div>
        <div className="resource-grid-advanced">
          {resources.map((item, idx) => (
            <ResourceCard key={item.id} id={item.id} icon={item.icon} title={item.title} desc={item.desc} delay={0.1 + idx * 0.1} />
          ))}
        </div>

        <section className="resource-details-section">
          <div className="section-subtitle-premium">RESOURCE DEEP DIVES</div>
          <div className="resource-details-grid">
            {resources.map((item, idx) => (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05, duration: 0.8 }}
                viewport={{ once: true }}
                className="resource-detail-card glass-card"
              >
                <div className="resource-detail-header">
                  <div className="resource-icon-premium">{item.icon}</div>
                  <div>
                    <h3 className="resource-title">{item.title}</h3>
                    <p className="resource-desc">{item.desc}</p>
                  </div>
                </div>
                <p className="resource-detail-copy">{item.details}</p>
                <a href="#" className="resource-back-link">Back to top</a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Country-Specific Guides */}
        <section className="roadmap-section" style={{ marginTop: '100px' }}>
          <div className="section-subtitle-premium">COUNTRY GUIDES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { country: '🇸🇦 Saudi Arabia', highlight: "Largest demand for E&I technicians", salary: "₹1.8L - ₹3L/month", tips: ["KSA prefers certified ITI holders", "Trade test is mandatory", "3-month iqama process typical"] },
              { country: '🇦🇪 UAE (Dubai, Abu Dhabi)', highlight: "Premium salary + free accommodation", salary: "₹2L - ₹2.8L/month", tips: ["Faster visa processing", "Multiple project opportunities", "Best for family sponsorship"] },
              { country: '🇶🇦 Qatar (Doha)', highlight: "Highest salaries + incentives", salary: "₹2.2L - ₹3.2L/month", tips: ["Rare but premium roles", "Expat benefits package", "Gulf's best infrastructure"] },
              { country: '🇩🇪 Germany', highlight: "EU work permit + competitive salary", salary: "€1600 - €2400/month", tips: ["German language helpful", "1-year renewable visa", "Pathway to permanent residence"] },
              { country: '🇵🇱 Poland', highlight: "Growing tech industries", salary: "€1400 - €2000/month", tips: ["Emerging market opportunities", "Easier entry than Germany", "Good quality of life"] },
              { country: '🇴🇲 Oman', highlight: "Underrated Gulf gem", salary: "₹1.6L - ₹2.2L/month", tips: ["Less competitive market", "Lower cost of living", "Growing industrial projects"] },
            ].map((guide, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="glass-card"
                style={{
                  padding: '2rem',
                  borderRadius: '20px',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--glass)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'var(--gradient-brand)' }} />
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontWeight: 700 }}>{guide.country}</h3>
                <p style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '15px' }}>{guide.highlight}</p>
                <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '12px', borderRadius: '10px', marginBottom: '15px', borderLeft: '3px solid var(--primary)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Expected Salary: <strong>{guide.salary}</strong></p>
                </div>
                <div>
                  {guide.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      <CheckCircle size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Download Resources */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: '100px',
            padding: '3rem',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, var(--primary-glow) 0%, transparent 100%)',
            border: '1px solid var(--border-glass)',
            textAlign: 'center'
          }}
        >
          <h2 className="premium-font" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📥 Free Downloadable Resources</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Get instant access to comprehensive guides, checklists, and templates prepared by DK Tiwari.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            {[
              { name: 'Visa Checklist', icon: '📋' },
              { name: 'Interview Prep Guide', icon: '📖' },
              { name: 'Document Templates', icon: '📄' },
              { name: 'Salary Negotiation Tips', icon: '💰' },
              { name: 'Agency Verification List', icon: '✅' },
              { name: 'Trade Test Practice', icon: '🔧' },
            ].map((resource, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                  border: '2px solid var(--border-glass)',
                  background: 'var(--glass)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{resource.icon}</div>
                {resource.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Guide;
