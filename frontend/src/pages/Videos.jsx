import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Calendar, Eye, Share2, Info, ChevronRight, ArrowRight, VideoOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { supabase } = useContext(AuthContext);

  useEffect(() => {
    fetchVideos();
  }, [supabase]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
      // Fallback to empty or dummy if error
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-videos grid-background" style={{ minHeight: '100vh', padding: 'var(--nav-height) 0 100px' }}>
      <div className="container">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '80px', textAlign: 'center' }}
        >
          <div className="text-gradient" style={{ letterSpacing: '4px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '1rem' }}>VIDEO MASTERCLASS</div>
          <h1 className="premium-font" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>Expert Technical <br/>Intelligence</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Learn everything from visa processing to E&I interview preparation with DK Tiwari's expert video series.
          </p>
        </motion.div>

        {/* Video List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Synchronizing video broadcasts...</div>
        ) : videos.length === 0 ? (
          <div className="glass-card" style={{ padding: '80px', textAlign: 'center', borderRadius: '40px' }}>
            <VideoOff size={48} style={{ color: 'var(--primary-glow)', marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No Broadcasts Yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>Admin is currently preparing new technical intelligence modules.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {videos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="glass-card video-list-row"
                style={{ padding: '0', borderRadius: '32px', border: '1px solid var(--border-glass)', overflow: 'hidden' }}
              >
                <div className="video-row-layout">
                  
                  {/* Video Side */}
                  <div className="video-embed-col" style={{ position: 'relative', background: '#000' }}>
                     <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                        <iframe
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          src={`https://www.youtube.com/embed/${video.youtube_id || video.id}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                     </div>
                  </div>

                  {/* Information Side */}
                  <div className="video-info-col" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                     <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <span style={{ padding: '6px 14px', borderRadius: '50px', background: 'var(--primary-glow)', color: 'var(--primary)', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>
                          Broadcast {idx + 1}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                           <Calendar size={14} /> {new Date(video.created_at).toLocaleDateString()}
                        </div>
                     </div>
                     
                     <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 900, lineHeight: 1.3, color: 'var(--text-main)' }}>
                       {video.title}
                     </h3>
                     
                     <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem', flex: 1 }}>
                       {video.description}
                     </p>

                     <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
                        >
                          Watch on YouTube <ArrowRight size={16} />
                        </a>
                     </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Cross-Page Navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '80px' }}>
          {[
            { name: 'Browse Job Updates', path: '/jobs', desc: 'Latest verified vacancies' },
            { name: 'Read Visa Guide', path: '/guide', desc: 'Step-by-step documentation' },
            { name: 'Contact DK Tiwari', path: '/contact', desc: 'Ask your career questions' },
          ].map((link, idx) => (
            <motion.div key={idx} whileHover={{ y: -5 }}>
              <Link to={link.path} className="glass-card" style={{
                padding: '25px', borderRadius: '20px', textDecoration: 'none', color: 'var(--text-main)',
                display: 'block', transition: 'var(--transition)'
              }}>
                <h4 style={{ fontWeight: 800, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {link.name} <ArrowRight size={16} color="var(--primary)" />
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{link.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Videos;