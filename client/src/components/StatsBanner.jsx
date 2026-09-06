import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function StatsBanner({ onLearnMore }) {
  return (
    <div className="strategy-banner" role="region" aria-label="Split-Routing Strategy">
      <div className="strategy-text">
        <span className="strategy-badge">
          <Zap size={12} style={{ display: 'inline', marginRight: '4px' }} />
          Smart Hack
        </span>
        <span style={{ color: '#e2e8f0' }}>
          <strong>Tired of WL 80+ Waitlists?</strong> Direct trains often sell out fast, but individual legs (e.g. Nagpur → Bhopal + Bhopal → Delhi) usually have dozens of Confirmed seats available under regional quotas!
        </span>
      </div>

      <button
        type="button"
        className="info-link-btn"
        onClick={onLearnMore}
      >
        <span>Why Split Works</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
