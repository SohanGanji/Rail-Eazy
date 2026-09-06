import React from 'react';
import { Layers, Train, GitMerge, ArrowUpDown } from 'lucide-react';

export default function RouteFilters({
  activeTab,
  setActiveTab,
  directCount = 0,
  splitCount = 0,
  sortBy,
  setSortBy,
  query
}) {
  const totalCount = directCount + splitCount;

  return (
    <div className="route-controls-bar">
      {/* View Tabs */}
      <div className="view-tabs" role="tablist" aria-label="Route Types">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'all'}
          className={`view-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <Layers size={16} />
          <span>All Options</span>
          <span className="tab-badge">{totalCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'direct'}
          className={`view-tab ${activeTab === 'direct' ? 'active' : ''}`}
          onClick={() => setActiveTab('direct')}
        >
          <Train size={16} />
          <span>Direct Trains</span>
          <span className="tab-badge">{directCount}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'split'}
          className={`view-tab ${activeTab === 'split' ? 'active' : ''}`}
          onClick={() => setActiveTab('split')}
        >
          <GitMerge size={16} color="#34d399" />
          <span>Smart Split Routes</span>
          <span className="tab-badge highlight">
            {splitCount} Bypass Available
          </span>
        </button>
      </div>

      {/* Sort Select */}
      <div className="sort-group">
        <ArrowUpDown size={15} color="#94a3b8" />
        <label htmlFor="sort-routes" className="sort-label">Sort By:</label>
        <select
          id="sort-routes"
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="duration">Fastest Journey (Duration)</option>
          <option value="fare">Lowest Total Fare</option>
          <option value="departure">Earliest Departure Time</option>
          <option value="layover">Shortest Transfer Layover</option>
        </select>
      </div>
    </div>
  );
}
