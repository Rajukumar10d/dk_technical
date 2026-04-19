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
      // First try to fetch only active taglines
      let { data, error } = await supabase
        .from('taglines')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      // If none are active, fetch the latest few as fallback
      if (!error && (!data || data.length === 0)) {
        const { data: latestData, error: latestError } = await supabase
          .from('taglines')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        data = latestData;
        error = latestError;
      }
      
      if (error) {
        // Fallback default taglines if table doesn't exist or query fails
        setTaglines([
          { content: "Latest Gulf Recruitment Drives for May 2026 are now open!", icon: 'zap' },
          { content: "Verify your visa documents through our official guide.", icon: 'shield' },
          { content: "New E&I technical training modules released on YouTube.", icon: 'play' }
        ]);
      } else {
        setTaglines(data.length > 0 ? data : [
           { content: "Welcome to DK Technical — Your trusted Gulf career partner.", icon: 'sparkles' }
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
      marginTop: 0,
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
        {/* Repeat many times to ensure continuous flow */}
        {[...taglines, ...taglines, ...taglines, ...taglines].map((tag, idx) => (
          <div key={idx} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--text-main)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}>
            <Zap size={14} color="var(--primary)" />
            {tag.content || tag.text}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Ticker;
