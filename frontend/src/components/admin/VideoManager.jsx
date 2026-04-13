import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Plus, Play, Link as LinkIcon, FileText, Search, AlertCircle, CheckCircle2, Video } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [formData, setFormData] = useState({ title: '', url: '', description: '' });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: '' });

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = videos.filter(video =>
      video.title?.toLowerCase().includes(search.toLowerCase()) ||
      video.description?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [videos, search]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error('Error:', err);
      setMessage({ type: 'error', text: `Failed to fetch videos: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;
    
    setLoading(true);
    try {
      const videoId = getYoutubeId(formData.url);
      if (!videoId) throw new Error('Invalid YouTube URL');

      const payload = {
        ...formData,
        youtube_id: videoId
      };

      if (editing) {
        const { error } = await supabase.from('videos').update(payload).eq('id', editing);
        if (error) throw error;
        setMessage({ type: 'success', text: 'Video intelligence updated!' });
      } else {
        const { error } = await supabase.from('videos').insert([payload]);
        if (error) throw error;
        setMessage({ type: 'success', text: 'New video added successfully!' });
      }
      
      setFormData({ title: '', url: '', description: '' });
      setEditing(null);
      fetchVideos();
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this video entry?')) return;
    try {
      const { error } = await supabase.from('videos').delete().eq('id', id);
      if (error) throw error;
      setVideos(videos.filter(v => v.id !== id));
      setMessage({ type: 'success', text: 'Video removed from database.' });
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="video-manager">
      {/* Alert */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              padding: '1rem', marginBottom: '2rem', borderRadius: '12px',
              background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
              border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.5)'}`,
              color: message.type === 'error' ? '#ef4444' : '#22c55e',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}
          >
            {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px', alignItems: 'start' }}>
        
        {/* Left Side: Video List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
             <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
             <input
               type="text"
               placeholder="Search by title..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               style={{
                 width: '100%', padding: '15px 15px 15px 45px',
                 background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
                 borderRadius: '16px', color: 'white'
               }}
             />
          </div>

          {loading && videos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Loading...</div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {filteredVideos.map((video) => (
                <motion.div
                  layout
                  key={video.id}
                  className="glass-card"
                  style={{ padding: '20px', borderRadius: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}
                >
                   <div style={{ width: '120px', height: '68px', borderRadius: '12px', background: '#000', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={`https://img.youtube.com/vi/${getYoutubeId(video.url)}/mqdefault.jpg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                   </div>
                   <div style={{ flex: 1 }}>
                      <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '5px' }}>{video.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>{video.description}</p>
                   </div>
                   <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => { setEditing(video.id); setFormData({ title: video.title, url: video.url, description: video.description || '' }); }}
                        style={{ padding: '8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#3b82f6', cursor: 'pointer' }}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(video.id)}
                        style={{ padding: '8px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Upload Form */}
        <div style={{ position: 'sticky', top: '20px' }}>
          <div className="glass-card" style={{ padding: '30px', borderRadius: '24px', border: '1px solid var(--primary-glow)' }}>
             <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.3rem', marginBottom: '25px', color: 'var(--primary)' }}>
                {editing ? <Edit size={20} /> : <Plus size={20} />}
                {editing ? 'Update Video' : 'Add Video Intelligence'}
             </h3>
             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                   <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800 }}>VIDEO TITLE</label>
                   <input
                     required
                     type="text"
                     placeholder="e.g. Gulf Salary Guide 2026"
                     value={formData.title}
                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                     style={{ width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white' }}
                   />
                </div>
                <div>
                   <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800 }}>YOUTUBE URL</label>
                   <div style={{ position: 'relative' }}>
                      <LinkIcon size={16} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)' }} />
                      <input
                        required
                        type="url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        style={{ width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white' }}
                      />
                   </div>
                </div>
                <div>
                   <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800 }}>DESCRIPTION</label>
                   <textarea
                     placeholder="What will users learn in this video?"
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     rows="4"
                     style={{ width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white', resize: 'none' }}
                   />
                </div>
                
                <button 
                  disabled={loading}
                  type="submit" 
                  className="btn-premium" 
                  style={{ width: '100%', padding: '15px', borderRadius: '12px', fontSize: '0.9rem' }}
                >
                  {loading ? 'Processing...' : editing ? 'Save Changes' : 'Broadcast Video'}
                </button>
                
                {editing && (
                  <button 
                    type="button"
                    onClick={() => { setEditing(null); setFormData({ title: '', url: '', description: '' }); }}
                    style={{ width: '100%', padding: '12px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Cancel Edit
                  </button>
                )}
             </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoManager;