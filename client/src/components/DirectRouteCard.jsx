import React, { useState } from 'react';
import { Train, Clock, ArrowRight, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

export default function DirectRouteCard({ route, preferredClass, onBookClick }) {
  const [showFares, setShowFares] = useState(false);
  const { train, summary } = route;

  const activeFare = train.fares ? train.fares[preferredClass] : null;

  return (
    <article className="glass-card route-card" aria-label={`Direct train ${train.trainName}`}>
      {/* Card Header */}
      <div className="route-card-header">
        <div className="train-title-group">
          <span className="route-type-tag direct">
            <Train size={13} />
            Direct Route
          </span>
          <span className="train-number-pill">#{train.trainNumber}</span>
          <h3 className="train-name-text">{train.trainName}</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Duration:</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
            {summary.totalTravelTime}
          </span>
        </div>
      </div>

      {/* Journey Timeline Row */}
      <div className="journey-row">
        {/* Departure */}
        <div className="station-time-box">
          <span className="station-time">{train.departureTime}</span>
          <span className="station-code">{train.origin}</span>
          <span className="station-name">Origin Station</span>
        </div>

        {/* Center Track */}
        <div className="duration-connector">
          <span className="duration-text">
            <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
            {train.duration} Non-stop
          </span>
          <div className="track-line">
            <div className="track-icon">
              <Train size={14} />
            </div>
          </div>
          <span style={{ fontSize: '10px', color: '#64748b', marginTop: '6px' }}>Direct Corridor</span>
        </div>

        {/* Arrival */}
        <div className="station-time-box" style={{ textAlign: 'right' }}>
          <span className="station-time">{train.arrivalTime}</span>
          <span className="station-code">{train.destination}</span>
          <span className="station-name">Final Destination</span>
        </div>

        {/* Fare Cell */}
        <div className="fare-box">
          <div className="fare-class-tag">{preferredClass} Class Fare</div>
          <div className="fare-amount">
            {activeFare ? `₹ ${activeFare.toLocaleString('en-IN')}` : 'N/A'}
          </div>
          <button
            type="button"
            className="action-btn"
            style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}
            onClick={() => onBookClick && onBookClick(route)}
          >
            <CheckCircle2 size={15} color="#34d399" />
            <span>Book Direct</span>
          </button>
        </div>
      </div>

      {/* Class Fares Toggle */}
      {train.fares && (
        <div>
          <button
            type="button"
            className="fare-matrix-toggle"
            onClick={() => setShowFares(!showFares)}
          >
            <span>{showFares ? 'Hide all class fares' : 'View all class fares (SL, 3A, 2A, 1A)'}</span>
            {showFares ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showFares && (
            <div className="fare-matrix-grid">
              {Object.entries(train.fares).map(([cls, fare]) => {
                if (fare === null) return null;
                const isCurrent = cls === preferredClass;
                return (
                  <div key={cls} className={`fare-matrix-item ${isCurrent ? 'selected' : ''}`}>
                    <span style={{ fontWeight: 700, color: isCurrent ? '#818cf8' : '#94a3b8' }}>
                      {cls}:
                    </span>{' '}
                    <span style={{ color: '#fff' }}>₹ {fare.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
