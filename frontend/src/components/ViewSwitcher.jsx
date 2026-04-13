import React from 'react';
import { useView } from '../context/ViewContext';
import { Box, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const ViewSwitcher = () => {
  const { is3D, toggleView } = useView();

  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="view-switcher"
      onClick={toggleView}
      style={{
        position: 'fixed', bottom: '30px', right: '30px', 
        zIndex: 5000, cursor: 'pointer',
        background: 'var(--gradient-gold)', padding: '15px', 
        borderRadius: '50%', boxShadow: '0 10px 30px var(--secondary-glow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
    >
      {is3D ? <Layers size={24} color="white" /> : <Box size={24} color="white" />}
      <span style={{ 
        position: 'absolute', right: '120%', 
        background: 'rgba(0,0,0,0.8)', padding: '5px 15px', 
        borderRadius: '20px', fontSize: '0.8rem', whiteSpace: 'nowrap',
        pointerEvents: 'none', border: '1px solid var(--border-glass)'
      }}>
        Switch to {is3D ? '2D View' : '3D Immersive'}
      </span>
    </motion.div>
  );
};

export default ViewSwitcher;
