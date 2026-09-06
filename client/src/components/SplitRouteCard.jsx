import React, { useState } from 'react';
import { 
  GitMerge, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Info,
  ExternalLink
} from 'lucide-react';

export default function SplitRouteCard({ 
  route, 
  preferredClass, 
  onOpenGuide 
}) {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { leg1, leg2, layover, summary, intermediateStation } = route;

  const fare1 = leg1.selectedFare;
  const fare2 = leg2.selectedFare;
  const totalFare = summary.totalFare;

  return (
    <article className="glass-card route-card" aria-label={`Split route via ${intermediateStation}`}>
      {/* Route Header */}
      <div className="route-card-header">
        <div className="train-title-group" style={{ flexWrap: 'wrap' }}>
          <span className="route-type-tag split">
            <GitMerge size={13} />
            Split Route (2 Legs)
          </span>
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '4px',
            fontSize: '11px', 
            color: '#34d399', 
            background: 'rgba(16, 185, 129, 0.1)', 
            padding: '2px 8px', 
            borderRadius: '6px',
            border: '1px solid rgba(16, 185, 129, 0.2)' 
          }}>
            <Sparkles size={12} />
            Bypasses Direct Waitlist
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Journey Time:</span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#f8fafc' }}>
            {summary.totalTravelTime}
          </span>
        </div>
      </div>

      {/* 2-Legs Container */}
      <div className="split-legs-container">
        {/* Leg 1 */}
        <div className="split-leg-card">
          <div className="leg-train-meta">
            <div className="leg-tag">Leg 1 • Connecting Train</div>
            <div className="leg-train-num">#{leg1.trainNumber}</div>
            <div className="leg-train-name" title={leg1.trainName}>{leg1.trainName}</div>
          </div>

          <div className="leg-timeline-row">
            <div className="leg-time-item">
              <span className="leg-time">{leg1.departureTime}</span>
              <span className="leg-station-code">{leg1.origin}</span>
            </div>

            <div className="leg-middle-track">
              <span className="leg-duration-badge">{leg1.duration}</span>
              <div className="track-line" style={{ height: '2px' }} />
            </div>

            <div className="leg-time-item" style={{ textAlign: 'right' }}>
              <span className="leg-time">{leg1.arrivalTime}</span>
              <span className="leg-station-code">{leg1.destination} (Junction)</span>
            </div>
          </div>

          <div className="leg-fare-cell">
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{preferredClass} Fare</div>
            <div className="leg-fare-val">
              {fare1 ? `₹ ${fare1.toLocaleString('en-IN')}` : 'N/A'}
            </div>
          </div>
        </div>

        {/* Transfer Junction & Layover Banner */}
        <div className={`layover-hub-banner ${layover.isSafe ? '' : 'tight'}`}>
          <div className="layover-hub-left">
            <div className="transfer-hub-icon">
              {layover.isSafe ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
            </div>
            <div>
              <div className="layover-hub-title">
                Transfer at {intermediateStation} Junction
              </div>
              <div className="layover-hub-subtitle">
                Arrival {leg1.arrivalTime} → Departure {leg2.departureTime}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="layover-status-badge">
              <Clock size={13} />
              <span>{layover.formatted} Layover</span>
            </div>
            <span style={{ 
              fontSize: '11px', 
              color: layover.isSafe ? '#34d399' : '#fbbf24',
              fontWeight: 600,
              display: 'none',
              '@media (min-width: 600px)': { display: 'inline' }
            }}>
              {layover.isSafe ? 'Safe Transfer Buffer' : 'Tight Transfer Window'}
            </span>
          </div>
        </div>

        {/* Leg 2 */}
        <div className="split-leg-card">
          <div className="leg-train-meta">
            <div className="leg-tag" style={{ color: '#06b6d4' }}>Leg 2 • Forward Train</div>
            <div className="leg-train-num">#{leg2.trainNumber}</div>
            <div className="leg-train-name" title={leg2.trainName}>{leg2.trainName}</div>
          </div>

          <div className="leg-timeline-row">
            <div className="leg-time-item">
              <span className="leg-time">{leg2.departureTime}</span>
              <span className="leg-station-code">{leg2.origin} (Junction)</span>
            </div>

            <div className="leg-middle-track">
              <span className="leg-duration-badge">{leg2.duration}</span>
              <div className="track-line" style={{ height: '2px', background: 'linear-gradient(90deg, #06b6d4, #10b981)' }} />
            </div>

            <div className="leg-time-item" style={{ textAlign: 'right' }}>
              <span className="leg-time">{leg2.arrivalTime}</span>
              <span className="leg-station-code">{leg2.destination}</span>
            </div>
          </div>

          <div className="leg-fare-cell">
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{preferredClass} Fare</div>
            <div className="leg-fare-val">
              {fare2 ? `₹ ${fare2.toLocaleString('en-IN')}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="split-summary-footer">
        <div className="summary-benefit-note">
          <ShieldCheck size={16} />
          <span>
            Split-Ticket Advantage: Confirmed berths in both legs bypass end-to-end RAC/Waitlist
          </span>
        </div>

        <div className="summary-fare-group">
          <div className="combined-fare-box">
            <div className="combined-fare-label">
              Combined Total Fare ({preferredClass})
            </div>
            <div className="combined-fare-val">
              {totalFare ? (
                <>
                  ₹ {totalFare.toLocaleString('en-IN')}
                  {fare1 && fare2 && (
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#94a3b8', marginLeft: '6px' }}>
                      (₹{fare1} + ₹{fare2})
                    </span>
                  )}
                </>
              ) : 'Class N/A'}
            </div>
          </div>

          <button
            type="button"
            className="action-btn"
            style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
              borderColor: 'rgba(16, 185, 129, 0.4)',
              color: '#fff'
            }}
            onClick={() => onOpenGuide && onOpenGuide(route)}
          >
            <Info size={15} color="#34d399" />
            <span>How to Book</span>
          </button>
        </div>
      </div>

      {/* Class Fares Toggle for both legs */}
      <div>
        <button
          type="button"
          className="fare-matrix-toggle"
          onClick={() => setShowBreakdown(!showBreakdown)}
        >
          <span>{showBreakdown ? 'Hide class fare breakdown' : 'Compare fares across classes (SL, 3A, 2A)'}</span>
          {showBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showBreakdown && (
          <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,0,0,0.25)', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
              Segment Fare Matrix (Leg 1: #{leg1.trainNumber} + Leg 2: #{leg2.trainNumber})
            </div>
            <div className="fare-matrix-grid">
              {['SL', '3A', '2A', '1A', 'CC', '2S'].map((cls) => {
                const f1 = leg1.fares ? leg1.fares[cls] : null;
                const f2 = leg2.fares ? leg2.fares[cls] : null;
                if (!f1 && !f2) return null;
                const total = (f1 || 0) + (f2 || 0);
                const isCurrent = cls === preferredClass;
                return (
                  <div key={cls} className={`fare-matrix-item ${isCurrent ? 'selected' : ''}`}>
                    <span style={{ fontWeight: 700, color: isCurrent ? '#818cf8' : '#94a3b8' }}>
                      {cls}:
                    </span>{' '}
                    <span style={{ color: '#fff' }}>
                      {f1 && f2 ? `₹ ${total.toLocaleString('en-IN')} (₹${f1} + ₹${f2})` : 'Segment N/A'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
