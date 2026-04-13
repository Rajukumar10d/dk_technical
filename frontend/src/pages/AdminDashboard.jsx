import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import VideoManager from '../components/admin/VideoManager';
import UserManager from '../components/admin/UserManager';
import QuestionManager from '../components/admin/QuestionManager';
import Overview from '../components/admin/Overview';
import AdminSettings from '../components/admin/AdminSettings';
import TaglineManager from '../components/admin/TaglineManager';
import { LogOut, Film, Users, MessageSquare, Settings, BarChart3, Megaphone } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-gradient)'
      }}>
        <div style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '1.2rem'
        }}>Access denied. Admin only.</div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'videos', label: 'Videos', icon: Film },
    { id: 'taglines', label: 'Taglines', icon: Megaphone },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'questions', label: 'Questions', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="admin-dashboard-wrapper" style={{
      minHeight: '100vh',
      background: 'var(--bg-gradient)',
      paddingTop: '6rem'
    }}>
      {/* Header */}
      <div className="admin-header" style={{
        background: 'rgba(15, 23, 42, 0.8)',
        borderBottom: '1px solid rgba(249, 115, 22, 0.2)',
        padding: '2rem 4rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            marginBottom: '0.25rem',
            color: 'var(--text-main)',
            fontWeight: 900
          }}>Admin Panel
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem'
          }}>Welcome, {user?.email}</p>
        </div>
        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 1.5rem',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#ef4444',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: 600,
            transition: 'var(--transition)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.3)';
            e.target.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="admin-nav-tabs" style={{
        padding: '2rem 4rem',
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.8rem 1.4rem',
                background: isActive
                  ? 'linear-gradient(135deg, var(--primary) 0%, #fb923c 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid ' + (isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'),
                color: isActive ? 'white' : 'var(--text-muted)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'var(--transition)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.borderColor = 'rgba(249, 115, 22, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              <IconComponent size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="admin-content" style={{
        padding: '2rem 4rem'
      }}>
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'videos' && <VideoManager />}
        {activeTab === 'taglines' && <TaglineManager />}
        {activeTab === 'users' && <UserManager />}
        {activeTab === 'questions' && <QuestionManager />}
        {activeTab === 'settings' && <AdminSettings />}
      </div>
    </div>
  );
};

export default AdminDashboard;