import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Calendar, Shield, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import adminApi from '../../api/admin';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setPage(1);
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getUsers(search, page);
      setUsers(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="user-manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '20px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search and press Enter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              width: '100%', padding: '12px 12px 12px 45px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
              borderRadius: '12px', color: 'white', transition: 'var(--transition)'
            }}
          />
        </div>
        <div className="glass-panel" style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Total Community: <strong style={{ color: 'var(--primary)' }}>{total}</strong>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Accessing secure technician database...</div>
      ) : (
        <>
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.4)', borderRadius: '24px', 
            border: '1px solid var(--border-glass)', overflow: 'hidden' 
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-glass)' }}>
                  <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-main)', fontSize: '0.9rem' }}>User / ID</th>
                  <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-main)', fontSize: '0.9rem' }}>Contact</th>
                  <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-main)', fontSize: '0.9rem' }}>Role</th>
                  <th style={{ padding: '20px', textAlign: 'left', color: 'var(--text-main)', fontSize: '0.9rem' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'var(--transition)' }}>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                         <div style={{ width: '40px', height: '40px', background: 'var(--primary-glow)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                           <Shield size={18} />
                         </div>
                         <div>
                           <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{user.display_name || user.email?.split('@')[0]}</div>
                           <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'monospace' }}>{user.email}</div>
                         </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {user.contact_number || 'N/A'}
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ 
                        padding: '4px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800,
                        background: user.role === 'admin' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255,255,255,0.05)',
                        color: user.role === 'admin' ? '#22c55e' : 'var(--text-muted)',
                        border: `1px solid ${user.role === 'admin' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)'}`
                      }}>
                        {user.role?.toUpperCase() || 'USER'}
                      </span>
                    </td>
                    <td style={{ padding: '20px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No matching users found.</div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem', alignItems: 'center' }}>
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary"
                style={{ padding: '8px', borderRadius: '8px', opacity: page === 1 ? 0.5 : 1 }}
              >
                <ChevronLeft size={20} />
              </button>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-secondary"
                style={{ padding: '8px', borderRadius: '8px', opacity: page === totalPages ? 0.5 : 1 }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserManager;