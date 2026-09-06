import React, { useState, useEffect } from 'react';
import { Train, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

const CLASS_OPTIONS = ['SL', '3A', '2A', 'CC'];

export default function DirectRouteCard({ route, preferredClass, onBookClick }) {
  const [selectedClass, setSelectedClass] = useState(preferredClass);

  useEffect(() => {
    setSelectedClass(preferredClass);
  }, [preferredClass]);

  const { train, summary } = route;
  const currentFare = train.fares ? train.fares[selectedClass] : null;

  return (
    <article className="glass-card p-6 border border-synth-border hover:border-synth-violet transition-all duration-300 relative rounded-2xl bg-synth-card/90 shadow-synth-card">
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-synth-border gap-2">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-synth-violet/20 text-synth-violetLight border border-synth-violet/40">
            <Train size={13} className="text-synth-violetLight" />
            Direct Route
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold text-white bg-synth-surface border border-synth-border">
            #{train.trainNumber}
          </span>
          <h3 className="text-base font-bold text-white font-display">
            {train.trainName}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-synth-muted">Total Travel Time:</span>
          <span className="text-sm font-extrabold text-white font-display bg-synth-surface px-2.5 py-1 rounded-md border border-synth-border">
            {summary.totalTravelTime}
          </span>
        </div>
      </div>

      {/* Direct Journey Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center mb-5 bg-synth-surface/60 p-4 rounded-xl border border-synth-border">
        {/* Departure */}
        <div>
          <div className="text-2xl font-extrabold text-white font-display leading-tight">{train.departureTime}</div>
          <div className="text-sm font-bold text-synth-violetLight">{train.origin}</div>
          <div className="text-xs text-synth-muted">Origin Station</div>
        </div>

        {/* Center Track */}
        <div className="md:col-span-2 flex flex-col items-center">
          <div className="text-xs font-semibold text-synth-muted flex items-center gap-1 mb-1">
            <Clock size={12} />
            <span>{train.duration} Non-stop</span>
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-synth-violet via-synth-violetLight to-synth-emerald relative flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-synth-surface border border-synth-violet flex items-center justify-center text-synth-violetLight">
              <Train size={12} />
            </div>
          </div>
          <div className="text-[10px] text-synth-dim mt-1.5">Direct Line Corridor</div>
        </div>

        {/* Arrival */}
        <div className="md:text-right">
          <div className="text-2xl font-extrabold text-white font-display leading-tight">{train.arrivalTime}</div>
          <div className="text-sm font-bold text-synth-emeraldLight">{train.destination}</div>
          <div className="text-xs text-synth-muted">Final Destination</div>
        </div>
      </div>

      {/* Dynamic Class Chips & Fare */}
      <div className="pt-4 border-t border-synth-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-synth-muted font-semibold">Travel Class:</span>
          <div className="flex gap-1.5">
            {CLASS_OPTIONS.map((cls) => {
              const isSelected = selectedClass === cls;
              const fare = train.fares ? train.fares[cls] : null;
              const available = fare !== null && fare !== undefined;

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
                  title={available ? `Switch to ${cls} class (₹${fare})` : `${cls} not available on this train`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fare & Booking */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-synth-muted">
              {selectedClass} Class Fare
            </div>
            <div className="text-xl font-extrabold text-synth-emeraldLight font-display">
              {currentFare ? `₹ ${currentFare.toLocaleString('en-IN')}` : 'N/A'}
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-synth-emerald/20 hover:bg-synth-emerald/30 border border-synth-emerald/40 text-synth-emeraldLight text-xs font-bold shadow-glow-emerald transition-all transform hover:-translate-y-0.5"
            onClick={() => onBookClick && onBookClick({ ...route, activeClass: selectedClass, activeFare: currentFare })}
          >
            <CheckCircle2 size={14} />
            <span>Book Direct</span>
          </button>
        </div>
      </div>
    </article>
  );
}
