import React from 'react';
import { X, ShieldCheck, Ticket, Link2, AlertCircle, ExternalLink } from 'lucide-react';

export default function BookingGuideModal({ route, onClose }) {
  if (!route) return null;

  const isSplit = route.routeType === 'split';
  const { leg1, leg2, layover, intermediateStation, summary, train } = route;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Ticket size={22} color="#6366f1" />
            <span>
              {isSplit ? 'IRCTC Split-Booking Instructions' : 'Direct Booking Details'}
            </span>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {isSplit ? (
          <div>
            <div style={{ 
              background: 'rgba(99, 102, 241, 0.1)', 
              border: '1px solid rgba(99, 102, 241, 0.25)', 
              borderRadius: '8px', 
              padding: '12px 16px', 
              marginBottom: '20px',
              fontSize: '13px',
              color: '#c7d2fe'
            }}>
              <strong>Route Summary:</strong> {leg1.origin} → {intermediateStation} (Train #{leg1.trainNumber}) + {intermediateStation} → {leg2.destination} (Train #{leg2.trainNumber}) • Total Time: {summary.totalTravelTime}
            </div>

            <div className="guide-step">
              <div className="guide-step-num">1</div>
              <div>
                <div className="guide-step-title">Book Leg 1 on IRCTC</div>
                <div className="guide-step-desc">
                  Open IRCTC and search <strong>{leg1.origin}</strong> to <strong>{leg1.destination}</strong>. Select <strong>{leg1.trainName} (#{leg1.trainNumber})</strong> departing at {leg1.departureTime}. Complete booking and note down <strong>PNR #1</strong>.
                </div>
              </div>
            </div>

            <div className="guide-step">
              <div className="guide-step-num">2</div>
              <div>
                <div className="guide-step-title">Book Leg 2 on IRCTC</div>
                <div className="guide-step-desc">
                  Search <strong>{leg2.origin}</strong> to <strong>{leg2.destination}</strong>. Select <strong>{leg2.trainName} (#{leg2.trainNumber})</strong> departing at {leg2.departureTime}. Complete booking and note down <strong>PNR #2</strong>.
                </div>
              </div>
            </div>

            <div className="guide-step">
              <div className="guide-step-num">3</div>
              <div>
                <div className="guide-step-title">Link Both PNRs (Connecting Journey Feature)</div>
                <div className="guide-step-desc">
                  Under IRCTC's <em>"Connecting Journey Booking"</em>, link PNR #1 and PNR #2. If Leg 1 gets delayed and you miss Leg 2, Indian Railways will provide a 100% refund on Leg 2 or arrange alternate accommodation!
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(16, 185, 129, 0.1)', 
              border: '1px solid rgba(16, 185, 129, 0.25)', 
              borderRadius: '8px', 
              padding: '10px 14px', 
              fontSize: '12px',
              color: '#34d399',
              marginTop: '16px'
            }}>
              <ShieldCheck size={16} />
              <span>Layover Buffer: {layover.formatted} at {intermediateStation} junction provides a safe transfer window.</span>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '16px' }}>
              Direct train <strong>{train.trainName} (#{train.trainNumber})</strong> from {train.origin} to {train.destination}.
            </div>
            <div className="guide-step">
              <div className="guide-step-num">1</div>
              <div>
                <div className="guide-step-title">Log in to IRCTC</div>
                <div className="guide-step-desc">
                  Search directly from <strong>{train.origin}</strong> to <strong>{train.destination}</strong> for train #{train.trainNumber}.
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button 
            type="button" 
            className="action-btn" 
            onClick={onClose}
          >
            Close
          </button>
          <a
            href="https://www.irctc.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '13px', textDecoration: 'none' }}
          >
            <span>Go to IRCTC Portal</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
