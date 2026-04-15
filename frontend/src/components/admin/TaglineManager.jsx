import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Plus, Trash2, CheckCircle2, AlertCircle, Radio } from 'lucide-react';
import adminApi from '../../api/admin';

const TaglineManager = () => {
  const [taglines, setTaglines] = useState([]);
  const [newTagline, setNewTagline] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: '' });

  useEffect(() => {
    fetchTaglines();
  }, []);

  const fetchTaglines = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getTaglines();
      setTaglines(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTagline.trim()) return;
    setLoading(true);
    try {
      await adminApi.addTagline({ content: newTagline, is_active: taglines.length === 0 });
      setMessage({ type: 'success', text: 'Tagline broadcasted!' });
      setNewTagline('');
      fetchTaglines();
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed' });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    if (currentStatus) return; // Already active
    try {
      await adminApi.updateTagline(id, { is_active: true });
      fetchTaglines();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.deleteTagline(id);
      setTaglines(taglines.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tagline-manager">
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              padding: '1rem', marginBottom: '1.5rem', borderRadius: '12px',
              background: message.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
              border: `1px solid ${message.type === 'error' ? 'rgba(239,68,68,0.5)' : 'rgba(34,197,94,0.5)'}`,
              color: message.type === 'error' ? '#ef4444' : '#22c55e',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}
          >
            {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card" style={{ padding: '35px', borderRadius: '32px', marginBottom: '40px' }}>
         <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Megaphone size={22} color="var(--primary)" /> Broadcast New Tagline
         </h3>
         <form onSubmit={handleAdd} style={{ display: 'flex', gap: '15px' }}>
            <input
              required
              type="text"
              placeholder="e.g. Interview for PETROFAC starts tomorrow in Mumbai!"
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              style={{
                flex: 1, padding: '15px 20px', background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-glass)', borderRadius: '14px', color: 'white',
                fontSize: '1rem', outline: 'none'
              }}
            />
            <button className="btn-premium" style={{ padding: '0 40px', borderRadius: '14px', fontWeight: 900 }} disabled={loading}>
               BROADCAST
            </button>
         </form>
         <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '12px', opacity: 0.7 }}>
            * This will immediately show up in the scrolling bar at the top of the website.
         </p>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
         <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '10px' }}>CURRENT TAGLINES</h4>
         {loading && taglines.length === 0 ? (
           <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Synchronizing broadcast servers...</div>
         ) : taglines.length === 0 ? (
           <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>No taglines in history.</div>
         ) : (
           taglines.map((t) => (
             <motion.div
               layout
               key={t.id}
               className="glass-card"
               style={{ 
                 padding: '20px 30px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                 borderLeft: t.is_active ? '4px solid var(--primary)' : '1px solid var(--border-glass)',
                 background: t.is_active ? 'rgba(249, 115, 22, 0.05)' : 'rgba(255,255,255,0.02)'
               }}
             >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                   <button 
                    onClick={() => toggleActive(t.id, t.is_active)}
                    style={{ 
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: t.is_active ? 'var(--primary)' : 'rgba(255,255,255,0.2)' 
                    }}
                   >
                     <CheckCircle2 size={24} fill={t.is_active ? 'var(--primary-glow)' : 'transparent'} />
                   </button>
                   <span style={{ color: t.is_active ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: 600, fontSize: '1.05rem' }}>{t.content}</span>
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(239,68,68,0.4)', cursor: 'pointer', transition: '0.3s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(239,68,68,0.4)'}
                >
                  <Trash2 size={20} />
                </button>
             </motion.div>
           ))
         )}
      </div>
    </div>
  );
};

export default TaglineManager;

