import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Calendar, User, Mail, Search, CheckCircle2, AlertCircle, Trash2, Reply, Sparkles, Filter } from 'lucide-react';
import adminApi from '../../api/admin';

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
      const { data } = await adminApi.getQuestions();
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
      await adminApi.updateQuestion(id, { answer, status: 'answered' });
      setMessage({ type: 'success', text: 'Reply sent successfully!' });
      setAnswering(null);
      setAnswer('');
      fetchQuestions();
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to send reply.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAiReply = (questionText) => {
    setLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      const suggestions = [
        "Hello! For this specific role, we recommend checking our latest video on technical requirements. You can apply directly through the link provided in the description.",
        "Greetings. DK Tiwari will be reviewing similar inquiries in our next live session. Please keep your documents ready for submission.",
        "Thank you for reaching out. We have verified this agency; you can proceed with confidence. Always double-check your visa offer letters."
      ];
      setAnswer(suggestions[Math.floor(Math.random() * suggestions.length)]);
      setLoading(false);
    }, 1000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await adminApi.deleteQuestion(id);
      setQuestions(questions.filter(q => q.id !== id));
      setMessage({ type: 'success', text: 'Inquiry removed.' });
      setTimeout(() => setMessage({ type: null, text: '' }), 3000);
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  return (
    <div className="question-manager">
      <AnimatePresence>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              padding: '1.2rem', marginBottom: '2rem', borderRadius: '14px',
              background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
              border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(34, 197, 94, 0.5)'}`,
              color: message.type === 'error' ? '#ef4444' : '#22c55e',
              display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600
            }}
          >
            {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search technician inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 14px 14px 45px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
              borderRadius: '14px', color: 'white', outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Filter size={18} color="var(--text-muted)" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '12px 20px', background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-glass)', borderRadius: '12px',
              color: 'white', outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="all">All Inquiries</option>
            <option value="pending">Action Required</option>
            <option value="answered">Handled</option>
          </select>
        </div>
      </div>

      {loading && questions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Retrieving secure messages...</div>
      ) : filteredQuestions.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '80px', borderRadius: '32px' }}>
           <MessageSquare size={48} style={{ color: 'var(--primary)', opacity: 0.2, marginBottom: '20px' }} />
           <p style={{ color: 'var(--text-muted)' }}>No technician inquiries matching your criteria.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '25px' }}>
          {filteredQuestions.map((q) => (
            <motion.div
              layout
              key={q.id}
              className="glass-card"
              style={{
                padding: '30px', borderRadius: '32px',
                borderLeft: `4px solid ${q.status === 'pending' ? 'var(--primary)' : '#10b981'}`,
                background: q.status === 'pending' ? 'rgba(249, 115, 22, 0.03)' : 'rgba(16, 185, 129, 0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                   <div style={{ width: '55px', height: '55px', background: 'var(--primary-glow)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 900, fontSize: '1.2rem' }}>
                     {q.name?.[0].toUpperCase() || 'T'}
                   </div>
                   <div>
                     <h4 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '4px' }}>{q.name}</h4>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {q.email}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {new Date(q.created_at).toLocaleDateString()}</span>
                     </div>
                   </div>
                </div>
                <button
                  onClick={() => handleDelete(q.id)}
                  style={{ padding: '10px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', cursor: 'pointer' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '25px', borderRadius: '20px', marginBottom: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <p style={{ color: 'var(--text-main)', lineHeight: 1.8, fontSize: '1.05rem' }}>{q.question}</p>
              </div>

              {q.answer ? (
                <div style={{ padding: '25px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.05)', borderLeft: '4px solid #10b981' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 900, marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <Reply size={18} /> BROADCASTED RESPONSE
                   </div>
                   <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.6 }}>{q.answer}</p>
                </div>
              ) : (
                <div style={{ marginTop: '10px' }}>
                  {answering === q.id ? (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                      <div style={{ position: 'relative' }}>
                        <textarea
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Craft a professional response..."
                          rows="5"
                          style={{
                            width: '100%', padding: '25px', background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--primary)', borderRadius: '24px',
                            color: 'white', outline: 'none', marginBottom: '20px', resize: 'none',
                            fontSize: '1rem'
                          }}
                        />
                        <button 
                          onClick={() => handleAiReply(q.question)}
                          title="Generate AI Suggestion"
                          style={{ position: 'absolute', right: '20px', bottom: '40px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '50px', padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)' }}
                        >
                          <Sparkles size={14} /> AI SUGGEST
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <button
                          onClick={() => handleAnswer(q.id)}
                          disabled={loading}
                          className="btn-premium"
                          style={{ padding: '12px 35px', borderRadius: '100px', fontWeight: 900 }}
                        >
                          {loading ? 'SENDING...' : 'SEND RESPONSE'}
                        </button>
                        <button
                          onClick={() => { setAnswering(null); setAnswer(''); }}
                          style={{
                            padding: '12px 35px', borderRadius: '100px', background: 'transparent',
                            border: '1px solid var(--border-glass)', color: 'var(--text-muted)',
                            cursor: 'pointer', fontSize: '0.9rem', fontWeight: 700
                          }}
                        >
                          Discard
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setAnswering(q.id)}
                      className="btn-premium"
                      style={{ padding: '12px 40px', borderRadius: '100px', fontWeight: 900, fontSize: '0.9rem' }}
                    >
                      RESPOND NOW
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