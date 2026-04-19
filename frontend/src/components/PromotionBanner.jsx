import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Send, MessageCircle, Play } from 'lucide-react';

const PromotionBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="promotion-banner section-padding"
      style={{
        width: '100%', padding: '0', overflow: 'hidden', 
        position: 'relative', marginTop: '50px', cursor: 'pointer'
      }}
    >
      <div className="container">
        <div className="glass-panel" style={{ 
          display: 'flex', borderRadius: '40px', overflow: 'hidden', padding: '0', 
          border: '1px solid var(--primary)', position: 'relative',
          boxShadow: '0 0 40px var(--primary-glow)'
        }}>
          <div style={{ flex: 1.2, padding: '60px', textAlign: 'left', zIndex: 1 }}>
            <motion.h4 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              style={{ color: 'var(--primary)', letterSpacing: '6px', marginBottom: '15px', fontWeight: 800, fontSize: '0.8rem' }}
            >
              YOUTUBE CHANNEL
            </motion.h4>
            <h2 className="premium-font" style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1' }}>
              dk <span className="text-gradient">technical</span>
            </h2>
            <div style={{ background: 'var(--gradient-brand)', height: '4px', width: '120px', marginBottom: '30px', borderRadius: '2px' }} />
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '15px', fontWeight: 500 }}>
              🌍 GULF & EUROPE JOB GUIDE
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '40px' }}>
              ⚡ E&I Specialist | 📋 Interview Tips: Technician | Leadman | Foreman
            </p>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
              <motion.a 
                href="https://www.youtube.com/@dktechnical26?sub_confirmation=1"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium" 
                style={{ background: 'var(--primary)', borderRadius: '50px', padding: '1rem 3rem', textDecoration: 'none', color: 'white' }}
              >
                SUBSCRIBE ON YOUTUBE
              </motion.a>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px', fontWeight: 700 }}>SHARE:</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                   {[Camera, Send, MessageCircle].map((Icon, idx) => (
                     <motion.div 
                        key={idx}
                        whileHover={{ y: -5, color: 'var(--primary)' }}
                        style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
                     >
                       <Icon size={20} />
                     </motion.div>
                   ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="banner-visual" style={{ 
            flex: 1, background: 'linear-gradient(225deg, var(--bg-dark), var(--primary-glow))',
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
            borderLeft: '1px solid var(--border-glass)'
          }}>
             <div style={{ fontSize: '12rem', opacity: 0.03, position: 'absolute', fontWeight: 900, pointerEvents: 'none' }}>E&I</div>
             <motion.div 
               animate={{ scale: [1, 1.02, 1], rotate: [0, 1, 0] }}
               transition={{ duration: 6, repeat: Infinity }}
               style={{ width: '70%', height: '70%', border: '1px solid var(--border-glass)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}
             >
                <div style={{ textAlign: 'center' }}>
                   <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '20px' }}
                   >
                     <Play size={80} color="var(--primary)" fill="var(--primary)" fillOpacity={0.2} />
                   </motion.div>
                   <div className="premium-font" style={{ fontSize: '1.5rem', letterSpacing: '4px' }}>DK TIWARI</div>
                   <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '5px', marginTop: '10px' }}>EST. JAN 2026</div>
                   <div style={{ marginTop: '15px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.9rem' }}>160+ Subscribers</div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PromotionBanner;
