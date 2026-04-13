import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { data, error } = await supabase.from('taglines').select('*').order('id', { ascending: false });
      if (error) throw error;
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
      const { error } = await supabase.from('taglines').insert([{ text: newTagline }]);
      if (error) throw error;
      setMessage({ type: 'success', text: 'Tagline broadcasted!' });
      setNewTagline('');
      fetchTaglines();
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('taglines').delete().eq('id', id);
      if (error) throw error;
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
              padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px',
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

      <div className="glass-card" style={{ padding: '30px', borderRadius: '24px', marginBottom: '30px' }}>
         <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Megaphone size={20} color="var(--primary)" /> Broadcast New Tagline
         </h3>
         <form onSubmit={handleAdd} style={{ display: 'flex', gap: '15px' }}>
            <input
              required
              type="text"
              placeholder="e.g. Interview for PETROFAC starts tomorrow in Mumbai!"
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              style={{
                flex: 1, padding: '15px', background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white'
              }}
            />
            <button className="btn-premium" style={{ padding: '0 30px', borderRadius: '12px' }} disabled={loading}>
               Broadcast
            </button>
         </form>
         <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '10px' }}>
            * This will immediately show up in the scrolling bar at the top of the website.
         </p>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
         <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Current Taglines</h4>
         {loading && taglines.length === 0 ? (
           <div style={{ color: 'var(--text-muted)' }}>Loading...</div>
         ) : taglines.length === 0 ? (
           <div style={{ color: 'var(--text-muted)' }}>No taglines active.</div>
         ) : (
           taglines.map((t) => (
             <motion.div
               layout
               key={t.id}
               className="glass-card"
               style={{ padding: '15px 25px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
             >
                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{t.text}</span>
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(239,68,68,0.6)', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
             </motion.div>
           ))
         )}
      </div>
    </div>
  );
};

export default TaglineManager;
