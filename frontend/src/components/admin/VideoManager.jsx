import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Plus, Link as LinkIcon, Search, AlertCircle, CheckCircle2, Video, Globe, Clock, Play } from 'lucide-react';
import adminApi from '../../api/admin';

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
      (video.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (video.description?.toLowerCase() || '').includes(search.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [videos, search]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getVideos();
      setVideos(data || []);
    } catch (err) {
      console.error('Error:', err);
      setMessage({ type: 'error', text: `Failed to fetch videos` });
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
      if (editing) {
        await adminApi.updateVideo(editing, formData);
        setMessage({ type: 'success', text: 'Video intelligence updated!' });
      } else {
        await adminApi.addVideo(formData);
        setMessage({ type: 'success', text: 'New video broadcasted successfully!' });
      }
      
      setFormData({ title: '', url: '', description: '' });
      setEditing(null);
      fetchVideos();
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Action failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this technical module?')) return;
    try {
      await adminApi.deleteVideo(id);
      setVideos(videos.filter(v => v.id !== id));
      setMessage({ type: 'success', text: 'Video removed from system.' });
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const youtubeId = getYoutubeId(formData.url);

  return (
    <div className="video-manager">
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

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '30px', alignItems: 'start' }}>
        
        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
             <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
             <input
               type="text"
               placeholder="Filter intelligence by title..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               style={{
                 width: '100%', padding: '15px 15px 15px 45px',
                 background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
                 borderRadius: '16px', color: 'white'
               }}
             />
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            {filteredVideos.map((video) => (
              <motion.div
                layout
                key={video.id}
                className="glass-card"
                style={{ padding: '20px', borderRadius: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}
              >
                 <div style={{ width: '160px', height: '90px', borderRadius: '12px', background: '#000', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                    <div style={{ position: 'absolute', bottom: '5px', right: '5px', padding: '2px 6px', background: 'rgba(0,0,0,0.8)', color: 'white', fontSize: '10px', borderRadius: '4px' }}>
                      {video.duration || '00:00'}
                    </div>
                 </div>
                 <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{video.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
                      {video.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                       <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase' }}>{video.users?.display_name || 'Admin'}</span>
                       <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(video.created_at).toLocaleDateString()}</span>
                    </div>
                 </div>
                 <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => { setEditing(video.id); setFormData({ title: video.title, url: video.url, description: video.description || '' }); }}
                      style={{ padding: '10px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: '#6366f1', cursor: 'pointer', transition: '0.3s' }}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(video.id)}
                      style={{ padding: '10px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer', transition: '0.3s' }}
                    >
                      <Trash2 size={18} />
                    </button>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ position: 'sticky', top: '20px' }}>
          <div className="glass-card" style={{ padding: '30px', borderRadius: '32px', border: editing ? '1px solid var(--primary)' : '1px solid var(--border-glass)' }}>
             <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem', fontWeight: 900, marginBottom: '30px', color: editing ? 'var(--primary)' : 'var(--text-main)' }}>
                {editing ? <Edit /> : <Plus />}
                {editing ? 'Refine intelligence' : 'Add intelligence'}
             </h3>

             {/* Dynamic Preview */}
             {youtubeId && (
               <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ marginBottom: '25px', borderRadius: '16px', overflow: 'hidden', position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                  <img src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
                    <Play size={40} fill="currentColor" />
                  </div>
                  <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px' }}>
                    <p style={{ color: 'white', fontWeight: 900, fontSize: '0.85rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{formData.title || 'Untitled Broadcast'}</p>
                  </div>
               </motion.div>
             )}

             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                   <label className="input-label-premium">MODULE TITLE</label>
                   <input
                     required
                     type="text"
                     placeholder="e.g. Masterclass: Instrument Calibration"
                     value={formData.title}
                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                     className="input-premium"
                   />
                </div>
                <div>
                   <label className="input-label-premium">YOUTUBE LINK</label>
                   <div style={{ position: 'relative' }}>
                      <LinkIcon size={16} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        required
                        type="url"
                        placeholder="https://..."
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="input-premium"
                        style={{ paddingRight: '45px' }}
                      />
                   </div>
                </div>
                <div>
                   <label className="input-label-premium">KEY LEARNINGS</label>
                   <textarea
                     placeholder="Outline the technical value..."
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     rows="4"
                     className="input-premium"
                     style={{ resize: 'none' }}
                   />
                </div>
                
                <button 
                  disabled={loading}
                  type="submit" 
                  className="btn-premium" 
                  style={{ width: '100%', padding: '18px', borderRadius: '16px', fontWeight: 900, letterSpacing: '1px' }}
                >
                  {loading ? 'SYNCHRONIZING...' : editing ? 'UPDATE MODULE' : 'BROADCAST MODULE'}
                </button>
                
                {editing && (
                  <button 
                    type="button"
                    onClick={() => { setEditing(null); setFormData({ title: '', url: '', description: '' }); }}
                    style={{ width: '100%', padding: '10px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    Abort Refinement
                  </button>
                )}
             </form>
          </div>
        </div>

      </div>

      <style>{`
        .input-label-premium {
          display: block; 
          margin-bottom: 8px; 
          font-size: 0.75rem; 
          color: var(--text-muted); 
          font-weight: 800; 
          letter-spacing: 1px;
        }
        .input-premium {
          width: 100%; 
          padding: 14px 18px; 
          background: rgba(255,255,255,0.03); 
          border: 1px solid var(--border-glass); 
          border-radius: 14px; 
          color: white;
          outline: none;
          transition: 0.3s;
        }
        .input-premium:focus {
          border-color: var(--primary);
          background: rgba(255,255,255,0.06);
        }
      `}</style>
    </div>
  );
};

export default VideoManager;