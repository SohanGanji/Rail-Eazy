import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowRightLeft, 
  Search, 
  SlidersHorizontal, 
  Clock, 
  Sparkles, 
  ShieldAlert,
  TrainTrack
} from 'lucide-react';

const TRAVEL_CLASSES = [
  { code: 'SL', name: 'Sleeper', tag: 'Budget' },
  { code: '3A', name: 'AC 3 Tier', tag: 'Popular' },
  { code: 'CC', name: 'AC Chair Car', tag: 'Day Trips' },
  { code: '2A', name: 'AC 2 Tier', tag: 'Comfort' },
  { code: '1A', name: 'First AC', tag: 'Premium' },
  { code: '2S', name: 'Second Sitting', tag: 'Economy' }
];

const ROUTE_PRESETS = [
  { origin: 'NGP', dest: 'NZM', label: 'Nagpur → Delhi (NZM)', hint: '3 Split Routes Available' },
  { origin: 'NGP', dest: 'NDLS', label: 'Nagpur → New Delhi (NDLS)', hint: 'Direct Rajdhani' },
  { origin: 'BPL', dest: 'NDLS', label: 'Bhopal → New Delhi', hint: 'Shatabdi & GT Express' },
  { origin: 'NGP', dest: 'BPL', label: 'Nagpur → Bhopal', hint: 'Vande Bharat Express' }
];

export default function SearchForm({
  stations = [],
  origin,
  setOrigin,
  destination,
  setDestination,
  intermediate,
  setIntermediate,
  minLayover,
  setMinLayover,
  maxLayover,
  setMaxLayover,
  preferredClass,
  setPreferredClass,
  onSearch,
  loading
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filter out junction stations for intermediate filter dropdown
  const junctionStations = stations.filter(s => s.isJunction);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handlePresetSelect = (preset) => {
    setOrigin(preset.origin);
    setDestination(preset.dest);
    onSearch(preset.origin, preset.dest, intermediate, minLayover, maxLayover, preferredClass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    onSearch(origin, destination, intermediate, minLayover, maxLayover, preferredClass);
  };

  const formatMins = (m) => {
    const hours = Math.floor(m / 60);
    const mins = m % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <section className="glass-card search-card" aria-label="Railway Search">
      {/* Quick Presets */}
      <div className="presets-bar">
        <span className="presets-label">
          <Sparkles size={14} color="#818cf8" />
          Corridor Presets:
        </span>
        {ROUTE_PRESETS.map((p, idx) => {
          const isActive = origin === p.origin && destination === p.dest;
          return (
            <button
              key={idx}
              type="button"
              className={`preset-chip ${isActive ? 'active' : ''}`}
              onClick={() => handlePresetSelect(p)}
              title={p.hint}
            >
              <span>{p.label}</span>
              <span style={{ fontSize: '10px', opacity: 0.7 }}>• {p.hint}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Origin / Swap / Destination Grid */}
        <div className="search-grid">
          {/* Origin Station */}
          <div className="form-group">
            <label className="form-label" htmlFor="origin-select">
              <MapPin size={15} color="#6366f1" />
              Origin Station
            </label>
            <div className="select-wrapper">
              <select
                id="origin-select"
                className="station-select"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              >
                <option value="" disabled>Select departure station</option>
                {stations.map((s) => (
                  <option 
                    key={s.code} 
                    value={s.code}
                    disabled={s.code === destination}
                  >
                    {s.code} — {s.name} ({s.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <button
            type="button"
            className="swap-btn"
            onClick={handleSwap}
            title="Swap Origin and Destination"
            aria-label="Swap Origin and Destination stations"
          >
            <ArrowRightLeft size={18} />
          </button>

          {/* Destination Station */}
          <div className="form-group">
            <label className="form-label" htmlFor="destination-select">
              <MapPin size={15} color="#06b6d4" />
              Destination Station
            </label>
            <div className="select-wrapper">
              <select
                id="destination-select"
                className="station-select"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              >
                <option value="" disabled>Select arrival station</option>
                {stations.map((s) => (
                  <option 
                    key={s.code} 
                    value={s.code}
                    disabled={s.code === origin}
                  >
                    {s.code} — {s.name} ({s.city})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Intermediate Junction Optional Filter */}
          <div className="form-group">
            <label className="form-label" htmlFor="intermediate-select">
              <TrainTrack size={15} color="#10b981" />
              Transfer Junction (Optional)
            </label>
            <div className="select-wrapper">
              <select
                id="intermediate-select"
                className="station-select"
                value={intermediate || ''}
                onChange={(e) => setIntermediate(e.target.value || null)}
              >
                <option value="">Any Transfer Junction (Auto)</option>
                {junctionStations.map((s) => (
                  <option 
                    key={s.code} 
                    value={s.code}
                    disabled={s.code === origin || s.code === destination}
                  >
                    Via {s.code} — {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Class Selection & Layover Controls */}
        <div className="advanced-filters">
          {/* Dynamic Travel Class Selection */}
          <div className="form-group">
            <label className="form-label">
              Travel Class Selection
            </label>
            <div className="classes-list" role="radiogroup" aria-label="Preferred Class">
              {TRAVEL_CLASSES.map((cls) => {
                const isSelected = preferredClass === cls.code;
                return (
                  <button
                    key={cls.code}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`class-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => setPreferredClass(cls.code)}
                  >
                    <span>{cls.code}</span>
                    <span className="class-subtext">{cls.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layover Buffer Controls */}
          <div className="slider-container">
            <div className="slider-header">
              <span className="form-label">
                <Clock size={15} color="#22d3ee" />
                Transfer Layover Buffer Window
              </span>
              <span className="slider-values">
                {formatMins(minLayover)} to {formatMins(maxLayover)}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                  <span>Min Transfer Time (Safety Buffer)</span>
                  <span style={{ color: minLayover >= 60 ? '#34d399' : '#fbbf24', fontWeight: 600 }}>
                    {formatMins(minLayover)} {minLayover >= 60 ? '(Safe)' : '(Tight)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="120"
                  step="15"
                  value={minLayover}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setMinLayover(val);
                    if (val > maxLayover) setMaxLayover(val + 30);
                  }}
                  className="range-slider"
                  aria-label="Minimum layover buffer"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                  <span>Max Allowable Layover Duration</span>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>
                    {formatMins(maxLayover)} (Ceiling)
                  </span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="480"
                  step="30"
                  value={maxLayover}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setMaxLayover(val);
                    if (val < minLayover) setMinLayover(val - 30);
                  }}
                  className="range-slider"
                  aria-label="Maximum allowable layover"
                />
              </div>
            </div>

            <div className="slider-ticks">
              <span>30m quick hop</span>
              <span>2h standard</span>
              <span>4h relaxed</span>
              <span>8h max transfer</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="search-action-row">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || !origin || !destination}
            id="search-routes-btn"
          >
            <Search size={18} />
            <span>{loading ? 'Analyzing Direct & Split Routes...' : 'Search Direct & Split Routes'}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
