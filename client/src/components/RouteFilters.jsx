import React from 'react';
import { Layers, Train, GitMerge, ArrowUpDown } from 'lucide-react';

export default function RouteFilters({
  activeTab,
  setActiveTab,
  directCount = 0,
  splitCount = 0,
  sortBy,
  setSortBy
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Two main tabs: Split Routes and Direct Routes */}
      <div className="flex bg-synth-surface p-1 rounded-xl border border-synth-border" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'split'}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'split'
              ? 'bg-synth-card text-white shadow-glow-emerald border border-synth-emerald/40'
              : 'text-synth-muted hover:text-white'
          }`}
          onClick={() => setActiveTab('split')}
        >
          <GitMerge size={16} className="text-synth-emeraldLight" />
          <span>Split Routes</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-synth-emerald/20 text-synth-emeraldLight border border-synth-emerald/30">
            {splitCount}
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'direct'}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'direct'
              ? 'bg-synth-card text-white shadow-glow-violet border border-synth-violet/40'
              : 'text-synth-muted hover:text-white'
          }`}
          onClick={() => setActiveTab('direct')}
        >
          <Train size={16} className="text-synth-violetLight" />
          <span>Direct Routes</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-synth-violet/20 text-synth-violetLight border border-synth-violet/30">
            {directCount}
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
            activeTab === 'all'
              ? 'bg-synth-card text-white border border-synth-border'
              : 'text-synth-dim hover:text-synth-muted'
          }`}
          onClick={() => setActiveTab('all')}
        >
          <Layers size={14} />
          <span>All ({directCount + splitCount})</span>
        </button>
      </div>

      {/* Sort Select */}
      <div className="flex items-center gap-2">
        <ArrowUpDown size={14} className="text-synth-muted" />
        <label htmlFor="sort-routes" className="text-xs text-synth-muted font-semibold">Sort By:</label>
        <select
          id="sort-routes"
          className="bg-synth-surface border border-synth-border text-white text-xs px-3 py-2 rounded-lg font-medium outline-none focus:border-synth-violet cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="duration">Fastest Total Time</option>
          <option value="fare">Lowest Total Fare</option>
          <option value="departure">Earliest Departure</option>
          <option value="layover">Shortest Layover</option>
        </select>
      </div>
    </div>
  );
}
