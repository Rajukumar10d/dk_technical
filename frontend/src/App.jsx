import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ViewProvider } from './context/ViewContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Guide from './pages/Guide';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Videos from './pages/Videos';

// Simple placeholders for other pages
const Placeholder = ({ title }) => (
  <div className="section-padding container">
    <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>{title} <span className="text-gradient">Coming Soon</span></h2>
    <p style={{ color: 'var(--text-muted)' }}>We are refining our {title.toLowerCase()} resource library for the 2026 update.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ViewProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Layout>
        </Router>
      </ViewProvider>
    </AuthProvider>
  );
}

export default App;
