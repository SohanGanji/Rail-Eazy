import React from 'react';
import { SearchX, Sliders, RefreshCw } from 'lucide-react';

export default function EmptyState({ onResetSliders, onSwap, origin, destination }) {
  return (
    <div className="glass-card empty-state-box">
      <div className="empty-icon-circle">
        <SearchX size={32} />
      </div>
      <h3 className="empty-state-title">No Routes Match Current Layover Filters</h3>
      <p className="empty-state-desc">
        We couldn't find any direct or split journeys between <strong>{origin}</strong> and <strong>{destination}</strong> within the selected layover window.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
        <button
          type="button"
          className="action-btn"
          onClick={onResetSliders}
        >
          <Sliders size={15} color="#22d3ee" />
          <span>Expand Layover Range (30m to 8h)</span>
        </button>

        <button
          type="button"
          className="action-btn"
          onClick={onSwap}
        >
          <RefreshCw size={15} color="#818cf8" />
          <span>Try Reverse Route</span>
        </button>
      </div>
    </div>
  );
}
