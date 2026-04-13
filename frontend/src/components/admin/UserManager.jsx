import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Calendar, Shield, ExternalLink, Trash2 } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      (user.email?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (user.id?.toLowerCase() || '').includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Supabase has auth.users which is restricted.
      // Usually there's a public 'profiles' or 'users' table.
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('id', { ascending: false });
      
      if (error) {
        console.warn('Error fetching custom users table, trying profiles:', error);
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*');
        if (profileError) throw profileError;
        setUsers(profileData || []);
      } else {
        setUsers(data || []);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '20px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search users by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 12px 12px 45px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
              borderRadius: '12px', color: 'white', transition: 'var(--transition)'
            }}
          />
        </div>
        <div className="glass-panel" style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Total Users: <strong style={{ color: 'var(--primary)' }}>{users.length}</strong>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px', color: 'var(--text-muted)' }}>Loading user database...</div>
      ) : (
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
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'var(--transition)' }}>
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                       <div style={{ width: '40px', height: '40px', background: 'var(--primary-glow)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                         <Shield size={18} />
                       </div>
                       <div>
                         <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{user.email}</div>
                         <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'monospace' }}>{user.id?.slice(0, 15)}...</div>
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
                    {new Date(user.created_at || user.id?.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No matching users found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserManager;