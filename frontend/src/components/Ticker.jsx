import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Zap, Sparkles, TrendingUp } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Ticker = () => {
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
        .order('id', { ascending: false });
      
      if (error) {
        // Fallback default taglines if table doesn't exist yet
        setTaglines([
          { text: "Latest Gulf Recruitment Drives for May 2026 are now open!", icon: 'zap' },
          { text: "Verify your visa documents through our official guide.", icon: 'shield' },
          { text: "New E&I technical training modules released on YouTube.", icon: 'play' }
        ]);
      } else {
        setTaglines(data.length > 0 ? data : [
           { text: "Welcome to DK Technical — Your trusted Gulf career partner.", icon: 'sparkles' }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (taglines.length === 0) return null;

  return (
    <div className="ticker-wrapper" style={{
      width: '100%',
      background: 'rgba(99, 102, 241, 0.05)',
      borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
      overflow: 'hidden',
      height: '40px',
      marginTop: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center',
      zIndex: 4998,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        height: '100%',
        background: 'var(--primary)',
        color: 'white',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10,
        fontSize: '0.75rem',
        fontWeight: 800,
        letterSpacing: '1px',
        boxShadow: '10px 0 20px rgba(0,0,0,0.2)'
      }}>
        <Megaphone size={14} /> RECENT UPDATES
      </div>

      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          duration: 30, 
          ease: "linear" 
        }}
        style={{
          display: 'flex',
          gap: '50px',
          whiteSpace: 'nowrap',
          paddingLeft: '180px'
        }}
      >
        {[...taglines, ...taglines].map((tag, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--text-main)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}>
            <Zap size={14} color="var(--primary)" />
            {tag.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;
