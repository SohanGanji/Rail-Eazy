import React from 'react';
import { X, ShieldCheck, Ticket, ExternalLink } from 'lucide-react';

export default function BookingGuideModal({ route, onClose }) {
  if (!route) return null;

  const isSplit = route.routeType === 'split';
  const { leg1, leg2, layover, intermediateStation, summary, train } = route;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-synth-card border border-synth-border rounded-2xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-synth-border">
          <div className="flex items-center gap-2.5 text-lg font-bold text-white font-display">
            <Ticket size={22} className="text-synth-violet" />
            <span>
              {isSplit ? 'IRCTC Split-Booking Instructions' : 'Direct Booking Details'}
            </span>
          </div>
          <button 
            type="button" 
            className="text-synth-muted hover:text-white p-1 rounded-lg hover:bg-synth-surface transition-all" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {isSplit ? (
          <div className="space-y-4">
            <div className="bg-synth-violet/15 border border-synth-violet/30 rounded-xl p-3 text-xs text-synth-violetLight">
              <strong>Split Segment Plan:</strong> {leg1.origin} → {intermediateStation} (#{leg1.trainNumber}) + {intermediateStation} → {leg2.destination} (#{leg2.trainNumber}) • Total Time: {summary.totalTravelTime}
            </div>

            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-synth-violet text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <div className="text-xs font-bold text-white mb-0.5">Book Leg 1 on IRCTC</div>
                <div className="text-xs text-synth-muted">
                  Search <strong>{leg1.origin}</strong> to <strong>{leg1.destination}</strong> for <strong>{leg1.trainName} (#{leg1.trainNumber})</strong> departing at {leg1.departureTime}. Complete booking and save <strong>PNR #1</strong>.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-synth-violet text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <div className="text-xs font-bold text-white mb-0.5">Book Leg 2 on IRCTC</div>
                <div className="text-xs text-synth-muted">
                  Search <strong>{leg2.origin}</strong> to <strong>{leg2.destination}</strong> for <strong>{leg2.trainName} (#{leg2.trainNumber})</strong> departing at {leg2.departureTime}. Complete booking and save <strong>PNR #2</strong>.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-synth-emerald text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <div className="text-xs font-bold text-synth-emeraldLight mb-0.5">Link Both PNRs (Connecting Journey Feature)</div>
                <div className="text-xs text-synth-muted">
                  Under IRCTC's <em>"Connecting Journey Booking"</em>, link PNR #1 and PNR #2. If Leg 1 runs late causing a missed connection, Indian Railways provides a 100% refund on Leg 2!
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-synth-emerald/10 border border-synth-emerald/30 rounded-xl p-3 text-xs text-synth-emeraldLight mt-4">
              <ShieldCheck size={18} />
              <span>Layover Buffer: {layover.formatted} at {intermediateStation} junction offers a safe transfer margin.</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-synth-muted">
              Direct connection via <strong>{train.trainName} (#{train.trainNumber})</strong> from {train.origin} to {train.destination}.
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-synth-violet text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <div className="text-xs font-bold text-white mb-0.5">Book directly on IRCTC</div>
                <div className="text-xs text-synth-muted">
                  Search <strong>{train.origin}</strong> to <strong>{train.destination}</strong> and select train #{train.trainNumber}.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-synth-border flex justify-end gap-3">
          <button 
            type="button" 
            className="px-4 py-2 rounded-xl bg-synth-surface hover:bg-synth-card border border-synth-border text-synth-muted hover:text-white text-xs font-semibold" 
            onClick={onClose}
          >
            Close
          </button>
          <a
            href="https://www.irctc.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-synth-violet hover:bg-synth-violetLight text-white text-xs font-bold shadow-glow-violet transition-all"
          >
            <span>Open IRCTC</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
