import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Calendar, User, Mail, Search, CheckCircle2, AlertCircle, Trash2, Reply } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [answering, setAnswering] = useState(null);
  const [answer, setAnswer] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: '' });

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    let filtered = questions.filter(q =>
      (q.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (q.email?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (q.question?.toLowerCase() || '').includes(search.toLowerCase())
    );
    if (statusFilter !== 'all') {
      filtered = filtered.filter(q => q.status === statusFilter);
    }
    setFilteredQuestions(filtered);
  }, [questions, search, statusFilter]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setQuestions(data || []);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setMessage({ type: 'error', text: 'Failed to load questions.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (id) => {
    if (!answer.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('questions')
        .update({ 
          answer: answer,
          status: 'answered',
          answered_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Reply sent successfully!' });
      setAnswering(null);
      setAnswer('');
      fetchQuestions();
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      console.error('Error answering question:', err);
      setMessage({ type: 'error', text: 'Failed to send reply.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const { error } = await supabase.from('questions').delete().eq('id', id);
      if (error) throw error;
      setQuestions(questions.filter(q => q.id !== id));
      setMessage({ type: 'success', text: 'Message deleted.' });
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  return (
    <div className="question-manager">
      {/* Alert Message */}
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              background: message.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
              border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.5)'}`,
              color: message.type === 'error' ? '#ef4444' : '#22c55e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by name, email, or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 12px 12px 45px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
              borderRadius: '12px', color: 'white', transition: 'var(--transition)'
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '12px 20px', background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-glass)', borderRadius: '12px',
            color: 'white', outline: 'none', cursor: 'pointer'
          }}
        >
          <option value="all">All Messages</option>
          <option value="pending">Pending</option>
          <option value="answered">Answered</option>
        </select>
      </div>

      {loading && questions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Loading messages...</div>
      ) : filteredQuestions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>No messages found.</div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredQuestions.map((q) => (
            <motion.div
              layout
              key={q.id}
              className="glass-card"
              style={{
                padding: '25px', borderRadius: '24px',
                borderLeft: `4px solid ${q.status === 'pending' ? '#ffa500' : 'var(--primary)'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                   <div style={{ width: '50px', height: '50px', background: 'var(--primary-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 800 }}>
                     {q.name?.[0].toUpperCase()}
                   </div>
                   <div>
                     <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{q.name}</h4>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Mail size={14} /> {q.email}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {new Date(q.created_at).toLocaleDateString()}</span>
                     </div>
                   </div>
                </div>
                <button
                  onClick={() => handleDelete(q.id)}
                  style={{ padding: '8px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
                 <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{q.question}</p>
              </div>

              {q.answer ? (
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--primary-glow)', borderLeft: '4px solid var(--primary)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 800, marginBottom: '10px', fontSize: '0.9rem' }}>
                      <Reply size={16} /> ADMIN RESPONSE
                   </div>
                   <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{q.answer}</p>
                </div>
              ) : (
                <div>
                  {answering === q.id ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your response to Dharmendra..."
                        rows="4"
                        style={{
                          width: '100%', padding: '20px', background: 'rgba(255,255,255,0.05)',
                          border: '1px solid var(--primary)', borderRadius: '16px',
                          color: 'white', outline: 'none', marginBottom: '15px', resize: 'none'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleAnswer(q.id)}
                          disabled={loading}
                          className="btn-premium"
                          style={{ padding: '10px 25px', borderRadius: '100px', fontSize: '0.85rem' }}
                        >
                          Send Response
                        </button>
                        <button
                          onClick={() => { setAnswering(null); setAnswer(''); }}
                          style={{
                            padding: '10px 25px', borderRadius: '100px', background: 'transparent',
                            border: '1px solid var(--border-glass)', color: 'var(--text-muted)',
                            cursor: 'pointer', fontSize: '0.85rem'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setAnswering(q.id)}
                      className="btn-premium"
                      style={{ padding: '10px 25px', borderRadius: '100px', fontSize: '0.85rem' }}
                    >
                      Reply Now
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionManager;