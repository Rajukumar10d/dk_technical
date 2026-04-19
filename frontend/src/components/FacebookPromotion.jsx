import React from 'react';
import { motion } from 'framer-motion';
import { Share2, MessageCircle, Heart, Users, Globe } from 'lucide-react';

const FacebookPromotion = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="promotion-banner section-padding"
      style={{
        width: '100%', padding: '0', overflow: 'hidden', 
        position: 'relative', marginTop: '40px', marginBottom: '80px'
      }}
    >
      <div className="container">
        <div className="glass-panel" style={{ 
          display: 'flex', borderRadius: '40px', overflow: 'hidden', padding: '0', 
          border: '1px solid var(--accent)', position: 'relative',
          boxShadow: '0 0 40px var(--accent-glow)'
        }}>
          <div style={{ flex: 1.2, padding: '60px', textAlign: 'left', zIndex: 1 }}>
            <motion.h4 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              style={{ color: 'var(--accent)', letterSpacing: '6px', marginBottom: '15px', fontWeight: 800, fontSize: '0.8rem' }}
            >
              FACEBOOK COMMUNITY
            </motion.h4>
            <h2 className="premium-font" style={{ fontSize: 'clamp(2rem, 4vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: '1' }}>
              dk <span className="text-gradient">technical</span>
            </h2>
            <div style={{ background: 'var(--accent)', height: '4px', width: '120px', marginBottom: '30px', borderRadius: '2px' }} />
            
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '15px', fontWeight: 500 }}>
              🌍 DIGITAL CREATOR • UAE & BIHAR
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6' }}>
              Join 22,000+ followers for daily job alerts, visa intelligence, and verified recruitment notices.
              <strong> 100% Free Information — No Fees, Ever.</strong>
            </p>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
              <motion.a 
                href="https://www.facebook.com/profile.php?id=61582131756115"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium" 
                style={{ 
                  background: 'var(--primary)', 
                  borderRadius: '50px', 
                  padding: '1rem 3rem', 
                  textDecoration: 'none', 
                  color: 'white',
                  boxShadow: '0 10px 30px var(--accent-glow)'
                }}
              >
                FOLLOW ON FACEBOOK
              </motion.a>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px', fontWeight: 700 }}>ENGAGE:</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                   {[Share2, MessageCircle, Heart].map((Icon, idx) => (
                     <motion.div 
                        key={idx}
                        whileHover={{ y: -5, color: '#1877F2' }}
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
            flex: 1, background: 'linear-gradient(225deg, var(--bg-dark), var(--accent))',
            display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
            borderLeft: '1px solid var(--border-glass)'
          }}>
             <div style={{ fontSize: '12rem', opacity: 0.03, position: 'absolute', fontWeight: 900, pointerEvents: 'none', color: 'white' }}>FB</div>
             <motion.div 
               animate={{ scale: [1, 1.02, 1], rotate: [0, -1, 0] }}
               transition={{ duration: 7, repeat: Infinity }}
               style={{ width: '70%', height: '70%', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}
             >
                <div style={{ textAlign: 'center' }}>
                   <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ fontSize: '5rem', marginBottom: '20px' }}
                   >
                     <Users size={100} color="var(--accent)" />
                   </motion.div>
                   <div className="premium-font" style={{ fontSize: '1.5rem', letterSpacing: '4px', color: 'white' }}>DK TECHNICAL</div>
                   <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '5px', marginTop: '10px' }}>DIGITAL CREATOR</div>
                   <div style={{ marginTop: '15px', color: 'var(--accent)', fontWeight: 900, fontSize: '1.2rem', textShadow: '0 0 20px var(--accent-glow)' }}>22K+ Followers</div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FacebookPromotion;
