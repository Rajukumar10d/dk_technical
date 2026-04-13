import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Wrench,
  Zap,
  ChevronRight,
  Sparkles,
  Plane,
  X,
  Filter
} from 'lucide-react';

const JobCard = ({ title, company, location, salary, date, idx, tags = [] }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: idx * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8 }}
    className="glass-card job-card-premium"
  >
    <div className="job-card-inner">
      <div className="job-logo-box">
        <Wrench size={30} className="job-icon-glow" />
      </div>

      <div className="job-main-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <div className="verified-badge-premium">
            <ShieldCheck size={12} /> VERIFIED
          </div>
          <span className="company-name-premium">{company}</span>
        </div>

        <h3 className="job-title-premium">{title}</h3>

        <div className="job-tag-container-premium">
          {tags.map(tag => (
            <span key={tag} className="job-tag-advanced">{tag}</span>
          ))}
        </div>

        <div className="job-meta-row-premium">
          <div className="meta-item-premium"><MapPin size={14} color="var(--primary)" /> {location}</div>
          <div className="meta-item-premium"><DollarSign size={14} color="var(--primary)" /> {salary}</div>
          <div className="meta-item-premium"><Clock size={14} color="var(--primary)" /> {date} ago</div>
        </div>
      </div>

      <div className="job-action-box">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-premium btn-magnetic"
          style={{ minWidth: '140px', borderRadius: '50px' }}
        >
          View Deal <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const allJobs = [
    { title: "Field Technician (E&I)", company: "Saudi Aramco", location: "Dhahran, KSA", salary: "₹1,80,000 - ₹2,40,000", date: "2d", tags: ["Verified", "E&I", "Gulf", "Immediate"] },
    { title: "Panel Electrician", company: "DP World", location: "Dubai, UAE", salary: "₹2,00,000 - ₹2,80,000", date: "4d", tags: ["Verified", "Electrical", "Gulf", "Urgent"] },
    { title: "Instrumentation Technician", company: "SABIC", location: "Jubail, KSA", salary: "₹1,75,000 - ₹2,35,000", date: "6d", tags: ["Verified", "Instrumentation", "Gulf", "Best Option"] },
    { title: "Electrical Maintenance Technician", company: "Siemens Germany", location: "Berlin, Germany", salary: "€1,800 - €2,400", date: "8d", tags: ["Verified", "Electrical", "Europe", "Premium"] },
    { title: "E&I Senior Technician", company: "Oryx GTL", location: "Doha, Qatar", salary: "₹2,20,000 - ₹3,00,000", date: "3d", tags: ["Verified", "Senior", "Gulf", "Leadership"] },
    { title: "Wireman / Electrician", company: "Schneider Electric", location: "Muscat, Oman", salary: "₹1,60,000 - ₹2,20,000", date: "5d", tags: ["Verified", "Electrical", "Gulf", "Direct Entry"] },
    { title: "Control Systems Technician", company: "ABB Poland", location: "Warsaw, Poland", salary: "€1,600 - €2,200", date: "9d", tags: ["Verified", "Control Systems", "Europe", "Tech"] },
    { title: "Plant Maintenance Technician", company: "ADOC", location: "Abu Dhabi, UAE", salary: "₹1,90,000 - ₹2,60,000", date: "7d", tags: ["Verified", "Maintenance", "Gulf", "Compound"] },
    { title: "Electrical Technician", company: "Al Yamama Co.", location: "Riyadh, KSA", salary: "₹1,00,000 - ₹1,40,000", date: "1d", tags: ["Electrical", "Industrial", "KSA", "Immediate"] },
    { title: "Instrumentation Foreman", company: "Petrofac Ltd.", location: "Abu Dhabi, UAE", salary: "₹1,50,000 - ₹2,00,000", date: "2d", tags: ["E&I", "Foreman", "UAE", "Leadership"] },
    { title: "E&I Leadman", company: "Samsung Engineering", location: "Jubail, KSA", salary: "₹1,00,000 - ₹1,50,000", date: "3d", tags: ["E&I", "Leadman", "KSA", "Supervision"] },
    { title: "Electrician – Europe Project", company: "Recruiting Agency DE", location: "Germany 🇩🇪", salary: "€2,700 + OT", date: "5d", tags: ["Germany", "Europe", "Work Permit", "Premium"] },
  ];

  const filteredJobs = allJobs.filter(job =>
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.some(tag => job.tags.includes(tag)))
  );

  const toggleTag = (tag) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="page-jobs section-padding grid-background">
      <div className="container">

        {/* Advanced Search Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="jobs-header-advanced"
        >
          <div className="header-icon-float">
            <Filter size={32} />
          </div>
          <h1 className="premium-font title-reveal">
            Elite <span className="text-gradient">Career Radar</span>
          </h1>
          <p className="subtitle-faded">
            Precision verified technical vacancies curated by Dk Tiwari.
          </p>

          <div className="search-box-premium">
            <Search className="search-icon-anim" />
            <input
              type="text"
              placeholder="Role, location, or trade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-bg-glow" />
          </div>
        </motion.div>

        <div className="jobs-layout-grid-advanced">

          {/* Sidebar Filters */}
          <aside className="filters-sidebar-advanced">
            <div className="glass-panel sidebar-sticky">
              <div className="sidebar-header">
                <SlidersHorizontal size={18} />
                <span>FILTERS</span>
              </div>

              <div className="filter-group-premium">
                <label>TRADES & CATEGORIES</label>
                <div className="pill-cloud">
                  {["Verified", "Electrical", "E&I", "Instrumentation", "Maintenance", "Foreman", "Leadman", "Senior", "Control Systems", "Free Visa", "Europe", "Gulf", "KSA", "UAE", "Germany", "Poland", "Urgent", "Immediate", "Premium", "Leadership"].map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`filter-pill ${selectedTags.includes(tag) ? 'active' : ''}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sidebar-ad-premium">
                <Zap size={20} />
                <p>Verify agencies using our video guide before paying any fees.</p>
                <a href="/guide">Learn More <ChevronRight size={14} /></a>
              </div>
            </div>
          </aside>

          {/* Jobs Feed */}
          <main className="jobs-feed-premium">
            <div className="feed-controls">
              <span className="results-count">Showing <strong>{filteredJobs.length}</strong> listings</span>
              <div className="sort-buttons-advanced">
                <button className="active">Latest</button>
                <button>High Pay</button>
              </div>
            </div>

            <div className="jobs-list-anim">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job, idx) => (
                  <JobCard key={job.title} idx={idx} {...job} />
                ))}
              </AnimatePresence>
            </div>

            {filteredJobs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="no-results-premium"
              >
                <X size={48} />
                <h3>No matching vacancies found</h3>
                <p>Try broadening your search or subscribe for alerts.</p>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
