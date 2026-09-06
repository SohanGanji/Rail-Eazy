import React from 'react';
import { Train, GitBranch, Zap } from 'lucide-react';

export default function Navbar({ backendStatus }) {
  const isOnline = backendStatus === 'ok';

  return (
    <nav className="flex items-center justify-between pb-6 border-b border-synth-border" aria-label="Main Navigation">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-synth-violet to-synth-emerald flex items-center justify-center text-white shadow-glow-violet">
          <Train size={24} />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-extrabold font-display flex items-center gap-2 text-white">
            <span>Rail Eazy</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-synth-violet/20 border border-synth-violet/40 text-synth-violetLight">
              Synthwave
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-widest text-synth-muted font-medium">
            Smart Transit & Split-Routing Engine
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div 
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${
            isOnline 
              ? 'bg-synth-emerald/10 border-synth-emerald/30 text-synth-emeraldLight' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
          title={isOnline ? "Backend connected to MongoDB Atlas on port 5000" : "Backend unreachable"}
        >
          <span className={`w-2 h-2 rounded-full ${
            isOnline ? 'bg-synth-emerald status-indicator shadow-glow-emerald' : 'bg-red-500'
          }`} />
          <span>{isOnline ? "Engine Online" : "Engine Offline"}</span>
        </div>

        <a 
          href="https://github.com/SohanGanji/Rail-Eazy" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-synth-surface hover:bg-synth-card border border-synth-border text-synth-muted hover:text-white text-xs font-semibold transition-all"
        >
          <GitBranch size={14} />
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  );
}
