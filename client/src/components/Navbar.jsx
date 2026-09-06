import React from 'react';
import { Train, GitBranch, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar({ backendStatus }) {
  const isOnline = backendStatus === 'ok';

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="brand-wrapper">
        <div className="brand-icon-box" aria-hidden="true">
          <Train size={24} />
        </div>
        <div>
          <div className="brand-title">
            Rail Eazy
            <span style={{ fontSize: '11px', padding: '2px 8px', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '12px', color: '#818cf8', fontWeight: 600 }}>
              v1.0
            </span>
          </div>
          <div className="brand-subtitle">Smart Waitlist-Bypass Transit Finder</div>
        </div>
      </div>

      <div className="nav-actions">
        <div 
          className={`status-pill ${isOnline ? '' : 'offline'}`}
          title={isOnline ? "Backend connected and serving schedules" : "Backend unreachable on localhost:5000"}
        >
          <span className={`status-indicator ${isOnline ? '' : 'offline'}`} />
          <span>{isOnline ? "Engine Online" : "Engine Offline"}</span>
        </div>

        <a 
          href="https://github.com/SohanGanji/Rail-Eazy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="action-btn"
          style={{ textDecoration: 'none', padding: '8px 14px' }}
        >
          <GitBranch size={16} />
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  );
}
