import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone, CheckCircle2, AlertCircle, Play, Camera, Share, MessageCircle, ArrowRight } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const { error } = await supabase.from('questions').insert([formData]);
      if (error) throw error;

      setStatus({ type: 'success', message: 'Your message has been received. We\'ll get back to you soon!' });
      setFormData({ name: '', email: '', question: '' });
    } catch (err) {
      setStatus({ type: 'error', message: `Submission failed: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      value: "dktechnical26@gmail.com",
      description: "Available 24/7 for your career queries",
      href: "mailto:dktechnical26@gmail.com"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Telegram Support",
      value: "@dktechnical26",
      description: "Quick response during working hours",
      href: "https://t.me/dktechnical26"
    },
    {
      icon: <MapPin size={24} />,
      title: "Based In",
      value: "India 🇮🇳",
      description: "Serving Gulf & Europe recruitment globally"
    }
  ];

  return (
    <div className="page-contact">
      {/* Background Decor */}
      <div className="hero-blob blob-1" style={{ opacity: 0.1, filter: 'blur(150px)' }}></div>
      <div className="hero-blob blob-2" style={{ opacity: 0.1, filter: 'blur(150px)', bottom: '10%', left: '10%' }}></div>

      <section className="section-padding container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span className="badge-premium-pill">
            <span className="pulse-dot"></span>
            GET IN TOUCH
          </span>
          <h1 className="hero-title-main" style={{ marginBottom: '1.5rem' }}>
            Let's Start a <span className="text-gradient">Conversation</span>
          </h1>
          <p className="hero-description" style={{ margin: '0 auto' }}>
            Whether you're looking for global career opportunities or have technical questions about recruitment, we are here to guide you.
          </p>
        </motion.div>

        <div className="contact-layout-grid">
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-info-stack"
          >
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>Contact Information</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>
              We're committed to connecting technical talent with premium opportunities in the Gulf & Europe.
            </p>

            {contactMethods.map((method, idx) => (
              <motion.a
                key={idx}
                href={method.href || '#'}
                target={method.href ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="contact-card-premium glass-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
              >
                <div className="contact-card-icon">
                  {method.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>
                    {method.title}
                  </h4>
                  <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary-light)', marginBottom: '2px' }}>
                    {method.value}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {method.description}
                  </p>
                </div>
              </motion.a>
            ))}

            <div style={{ marginTop: '40px' }}>
              <h5 style={{ fontSize: '0.9rem', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '20px' }}>FOLLOW OUR UPDATES</h5>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href="https://www.youtube.com/@dktechnical26" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ background: '#ff0000', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Play size={18} color="white" /></a>
                <a href="https://www.instagram.com/d.ktiwari021783" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ background: '#E4405F', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Camera size={18} color="white" /></a>
                <a href="https://www.facebook.com/profile.php?id=61582131756115" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ background: '#1877F2', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Share size={18} color="white" /></a>
                <a href="https://t.me/dktechnical26" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ background: '#0088cc', borderRadius: '50%', padding: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Send size={18} color="white" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div style={{ marginTop: '40px', padding: '25px', borderRadius: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)' }}>
              <h5 style={{ fontSize: '0.85rem', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '15px' }}>QUICK NAVIGATION</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  { name: 'Job Updates', path: '/jobs' },
                  { name: 'Visa Guide', path: '/guide' },
                  { name: 'Videos', path: '/videos' },
                  { name: 'About DK', path: '/about' }
                ].map(link => (
                  <Link key={link.name} to={link.path} style={{
                    padding: '8px 16px', borderRadius: '50px', background: 'var(--primary-glow)',
                    color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700,
                    textDecoration: 'none', transition: 'var(--transition)'
                  }}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="contact-form-glass glass-panel"
          >
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '25px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>YOUR NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '10px' }}>HOW CAN WE HELP?</label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Describe your query or interest in detail..."
                  required
                  rows="6"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn-premium"
                style={{ width: '100%', justifyContent: 'center', height: '60px' }}
              >
                {loading ? 'Sending...' : (
                  <>
                    SEND MESSAGE
                    <Send size={18} style={{ marginLeft: '10px' }} />
                  </>
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '15px 20px',
                    borderRadius: '12px',
                    background: status.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${status.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                    color: status.type === 'success' ? '#4ade80' : '#f87171'
                  }}
                >
                  {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="section-padding grid-background" style={{ borderTop: '1px solid var(--border-glass)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px' }}>Global <span className="text-gradient">Reach</span></h2>
          <p className="hero-description" style={{ margin: '0 auto 60px' }}>
            Based in India, serving the best technical talent with opportunities across the Gulf & Europe.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            {[
              { flag: '🇸🇦', country: 'Saudi Arabia', type: 'KSA Projects' },
              { flag: '🇦🇪', country: 'UAE', type: 'Dubai & Abu Dhabi' },
              { flag: '🇶🇦', country: 'Qatar', type: 'Doha Projects' },
              { flag: '🇩🇪', country: 'Germany', type: 'EU Work Permit' },
              { flag: '🇮🇳', country: 'India', type: 'Headquarters' },
            ].map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, borderColor: 'var(--primary)' }}
                className="glass-card"
                style={{ padding: '30px', borderRadius: '24px', textAlign: 'center' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{loc.flag}</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '5px' }}>{loc.country}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{loc.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;