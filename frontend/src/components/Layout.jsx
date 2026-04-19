import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useView } from '../context/ViewContext';
import Navbar from './Navbar';
import Ticker from './Ticker';
import Footer from './Footer';
import ViewSwitcher from './ViewSwitcher';

/* Scroll to top on route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const Layout = ({ children }) => {
  const { is3D } = useView();
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Ticker />
      <div className={`app-container ${is3D ? 'mode-3d' : 'mode-2d'}`} style={{
        perspective: is3D ? '2000px' : 'none',
        overflowX: 'hidden',
        minHeight: '100vh',
        background: 'var(--bg-dark)'
      }}>
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            paddingTop: 0,
            transformStyle: 'preserve-3d',
            transform: is3D ? 'rotateX(5deg) scale(0.98)' : 'none',
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      </div>
      <ViewSwitcher />
    </>
  );
};

export default Layout;
