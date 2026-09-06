import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export default function StatsBanner({ onLearnMore }) {
  return (
    <div className="bg-gradient-to-r from-synth-violet/15 via-synth-surface to-synth-emerald/10 border border-synth-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 shadow-sm">
      <div className="flex items-center gap-3 text-xs md:text-sm">
        <span className="inline-flex items-center gap-1 bg-synth-violet text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-glow-violet">
          <Zap size={11} />
          Waitlist Hack
        </span>
        <span className="text-synth-muted">
          <strong className="text-white">Why Split Routes?</strong> Direct trains often show RAC or WL 80+, while intermediate segments have confirmed seats available under regional quotas!
        </span>
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-1 text-xs font-bold text-synth-violetLight hover:text-white cursor-pointer underline underline-offset-4 flex-shrink-0"
        onClick={onLearnMore}
      >
        <span>How it Works</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
