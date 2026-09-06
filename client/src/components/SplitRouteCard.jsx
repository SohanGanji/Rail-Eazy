import React, { useState, useEffect } from 'react';
import { 
  GitMerge, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Train,
  ArrowRight,
  Info
} from 'lucide-react';

const CLASS_OPTIONS = ['SL', '3A', '2A', 'CC'];

export default function SplitRouteCard({ 
  route, 
  preferredClass, 
  onOpenGuide 
}) {
  // Local class state allowing user to re-calculate fare on the fly per card
  const [selectedClass, setSelectedClass] = useState(preferredClass);

  useEffect(() => {
    setSelectedClass(preferredClass);
  }, [preferredClass]);

  const { leg1, leg2, layover, intermediateStation, summary } = route;

  // Re-calculate fares on the fly based on selectedClass
  const fare1 = leg1.fares ? leg1.fares[selectedClass] : null;
  const fare2 = leg2.fares ? leg2.fares[selectedClass] : null;
  const combinedFare = (fare1 !== null && fare2 !== null && fare1 !== undefined && fare2 !== undefined)
    ? fare1 + fare2
    : null;

  return (
    <article className="glass-card p-6 border border-synth-border hover:border-synth-violet transition-all duration-300 relative rounded-2xl bg-synth-card/90 shadow-synth-card">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-synth-border gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-synth-violet/20 text-synth-violetLight border border-synth-violet/40">
            <GitMerge size={14} className="text-synth-violetLight" />
            Split Route (2 Legs)
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-synth-emerald/15 text-synth-emeraldLight border border-synth-emerald/30">
            <Sparkles size={13} />
            Bypasses Direct Waitlist
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-synth-muted">Total Travel Time:</span>
          <span className="text-sm font-extrabold text-white font-display bg-synth-surface px-2.5 py-1 rounded-md border border-synth-border">
            {summary.totalTravelTime}
          </span>
        </div>
      </div>

      {/* 2-Leg Journey Details */}
      <div className="flex flex-col gap-3 mb-5">
        {/* Leg 1 Card */}
        <div className="bg-synth-surface/80 border border-synth-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-[180px]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-synth-violetLight mb-0.5">
              Leg 1 • Connecting
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Train size={14} className="text-synth-violet" />
              <span>#{leg1.trainNumber}</span>
            </div>
            <div className="text-xs text-synth-muted truncate max-w-[200px]" title={leg1.trainName}>
              {leg1.trainName}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-between gap-3 max-w-md">
            <div>
              <div className="text-lg font-extrabold text-white font-display leading-tight">{leg1.departureTime}</div>
              <div className="text-xs font-bold text-synth-violetLight">{leg1.origin}</div>
            </div>

            <div className="flex-1 flex flex-col items-center px-2">
              <span className="text-[11px] text-synth-muted font-medium mb-1">{leg1.duration}</span>
              <div className="w-full h-0.5 bg-gradient-to-r from-synth-violet to-synth-violetLight relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-synth-violet" />
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-extrabold text-white font-display leading-tight">{leg1.arrivalTime}</div>
              <div className="text-xs font-bold text-synth-violetLight">{leg1.destination} (Jct)</div>
            </div>
          </div>

          <div className="text-right md:min-w-[90px] border-t md:border-t-0 md:border-l border-synth-border pt-2 md:pt-0 md:pl-4">
            <div className="text-[10px] text-synth-muted uppercase font-medium">{selectedClass} Fare</div>
            <div className="text-base font-bold text-synth-emeraldLight">
              {fare1 ? `₹ ${fare1.toLocaleString('en-IN')}` : 'N/A'}
            </div>
          </div>
        </div>

        {/* Intermediate Junction Layover Badge */}
        <div className={`flex items-center justify-between p-3 rounded-xl border border-dashed gap-3 transition-colors ${
          layover.isSafe 
            ? 'bg-synth-emerald/10 border-synth-emerald/40 text-synth-emeraldLight' 
            : 'bg-synth-amber/10 border-synth-amber/40 text-synth-amber'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              layover.isSafe ? 'bg-synth-emerald/20 text-synth-emeraldLight' : 'bg-synth-amber/20 text-synth-amber'
            }`}>
              {layover.isSafe ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />}
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                Transfer at {intermediateStation} Junction
              </div>
              <div className="text-[11px] text-synth-muted">
                Arrival {leg1.arrivalTime} → Departure {leg2.departureTime}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${
              layover.isSafe ? 'bg-synth-emerald/20 text-synth-emeraldLight' : 'bg-synth-amber/20 text-synth-amber'
            }`}>
              <Clock size={13} />
              <span>{layover.formatted} Layover</span>
            </div>
            <span className="hidden sm:inline text-xs font-semibold">
              {layover.isSafe ? '(Safe Buffer >60m)' : '(Tight Buffer <60m)'}
            </span>
          </div>
        </div>

        {/* Leg 2 Card */}
        <div className="bg-synth-surface/80 border border-synth-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-[180px]">
            <div className="text-[10px] font-bold uppercase tracking-widest text-synth-emeraldLight mb-0.5">
              Leg 2 • Forward
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Train size={14} className="text-synth-emerald" />
              <span>#{leg2.trainNumber}</span>
            </div>
            <div className="text-xs text-synth-muted truncate max-w-[200px]" title={leg2.trainName}>
              {leg2.trainName}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-between gap-3 max-w-md">
            <div>
              <div className="text-lg font-extrabold text-white font-display leading-tight">{leg2.departureTime}</div>
              <div className="text-xs font-bold text-synth-emeraldLight">{leg2.origin} (Jct)</div>
            </div>

            <div className="flex-1 flex flex-col items-center px-2">
              <span className="text-[11px] text-synth-muted font-medium mb-1">{leg2.duration}</span>
              <div className="w-full h-0.5 bg-gradient-to-r from-synth-violetLight to-synth-emerald relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-synth-emerald" />
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-extrabold text-white font-display leading-tight">{leg2.arrivalTime}</div>
              <div className="text-xs font-bold text-synth-emeraldLight">{leg2.destination}</div>
            </div>
          </div>

          <div className="text-right md:min-w-[90px] border-t md:border-t-0 md:border-l border-synth-border pt-2 md:pt-0 md:pl-4">
            <div className="text-[10px] text-synth-muted uppercase font-medium">{selectedClass} Fare</div>
            <div className="text-base font-bold text-synth-emeraldLight">
              {fare2 ? `₹ ${fare2.toLocaleString('en-IN')}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Class Selector Chips & On-The-Fly Fare Recalculation */}
      <div className="pt-4 border-t border-synth-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-synth-muted font-semibold">Recalculate Fare:</span>
          <div className="flex gap-1.5">
            {CLASS_OPTIONS.map((cls) => {
              const isSelected = selectedClass === cls;
              const f1 = leg1.fares ? leg1.fares[cls] : null;
              const f2 = leg2.fares ? leg2.fares[cls] : null;
              const available = f1 !== null && f2 !== null && f1 !== undefined && f2 !== undefined;

              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-synth-violet text-white shadow-glow-violet scale-105'
                      : available
                        ? 'bg-synth-surface text-synth-muted hover:text-white hover:bg-synth-cardHover border border-synth-border'
                        : 'bg-synth-surface/40 text-synth-dim opacity-50 border border-synth-border/40'
                  }`}
                  title={available ? `Switch to ${cls} class` : `${cls} not available on both legs`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>

        {/* Combined Total Fare & Action */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-synth-muted">
              Combined Total ({selectedClass})
            </div>
            <div className="text-xl font-extrabold text-synth-emeraldLight font-display">
              {combinedFare !== null ? (
                <>
                  ₹ {combinedFare.toLocaleString('en-IN')}
                  {fare1 && fare2 && (
                    <span className="text-xs font-normal text-synth-muted ml-1.5">
                      (₹{fare1} + ₹{fare2})
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm font-medium text-synth-muted">Class N/A</span>
              )}
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-synth-violet hover:bg-synth-violetLight text-white text-xs font-bold shadow-glow-violet transition-all transform hover:-translate-y-0.5"
            onClick={() => onOpenGuide && onOpenGuide({ ...route, activeClass: selectedClass, activeTotalFare: combinedFare })}
          >
            <Info size={14} />
            <span>How to Book</span>
          </button>
        </div>
      </div>
    </article>
  );
}
