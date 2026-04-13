import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { BarChart3, Users, Video, MessageSquare, TrendingUp, ArrowUpRight } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Overview = () => {
  const [stats, setStats] = useState({
    users: 0,
    videos: 0,
    questions: 0,
    pendingQuestions: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
      const { count: videoCount } = await supabase.from('videos').select('*', { count: 'exact', head: true });
      const { count: questionCount } = await supabase.from('questions').select('*', { count: 'exact', head: true });
      const { count: pendingCount } = await supabase.from('questions').select('*', { count: 'exact', head: true }).eq('status', 'pending');

      setStats({
        users: userCount || 0,
        videos: videoCount || 0,
        questions: questionCount || 0,
        pendingQuestions: pendingCount || 0
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const dashboardCards = [
    { title: 'Total Community', value: stats.users, icon: <Users />, color: '#6366f1', label: 'Registered Technicians' },
    { title: 'Video Intelligence', value: stats.videos, icon: <Video />, color: '#f59e0b', label: 'Lessons Broadcasted' },
    { title: 'Questions Handled', value: stats.questions, icon: <MessageSquare />, color: '#10b981', label: 'Total Inquiries' },
    { title: 'Action Required', value: stats.pendingQuestions, icon: <TrendingUp />, color: '#ef4444', label: 'Pending Responses' },
  ];

  return (
    <div className="admin-overview">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
        {dashboardCards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card"
            style={{ padding: '30px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: card.color, opacity: 0.05, filter: 'blur(50px)', borderRadius: '50%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
               <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: `${card.color}20`, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 {React.cloneElement(card.icon, { size: 24 })}
               </div>
               <ArrowUpRight size={20} style={{ color: 'rgba(255,255,255,0.2)' }} />
            </div>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '5px' }}>{card.value}</h3>
            <p style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>{card.title}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '40px', borderRadius: '32px', textAlign: 'center' }}>
         <h2 className="premium-font" style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Dharmendra Tiwari Admin Portal</h2>
         <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            Managing DK Technical broadcasts and worker inquiries from one unified dashboard. Use the tabs above to broadcast new video intelligence or respond to technicians.
         </p>
      </div>
    </div>
  );
};

export default Overview;