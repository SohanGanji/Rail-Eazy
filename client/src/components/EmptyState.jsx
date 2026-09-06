import React from 'react';
import { SearchX, Sliders, RefreshCw } from 'lucide-react';

export default function EmptyState({ onResetSliders, onSwap, origin, destination }) {
  return (
    <div className="glass-card p-12 text-center flex flex-col items-center gap-4 rounded-2xl bg-synth-card/90 border border-synth-border">
      <div className="w-16 h-16 rounded-full bg-synth-violet/10 border border-synth-violet/30 flex items-center justify-center text-synth-violetLight shadow-glow-violet">
        <SearchX size={32} />
      </div>
      <h3 className="text-xl font-bold text-white font-display">No Connections Within Current Layover Window</h3>
      <p className="text-xs md:text-sm text-synth-muted max-w-md">
        We found no routes between <strong>{origin}</strong> and <strong>{destination}</strong> matching the active layover buffer. Try expanding the layover ceiling or testing the reverse direction.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mt-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-synth-surface hover:bg-synth-card border border-synth-border text-synth-emeraldLight text-xs font-bold transition-all"
          onClick={onResetSliders}
        >
          <Sliders size={14} />
          <span>Expand Max Layover to 6h</span>
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-synth-surface hover:bg-synth-card border border-synth-border text-synth-violetLight text-xs font-bold transition-all"
          onClick={onSwap}
        >
          <RefreshCw size={14} />
          <span>Try Reverse Direction</span>
        </button>
      </div>
    </div>
  );
}
