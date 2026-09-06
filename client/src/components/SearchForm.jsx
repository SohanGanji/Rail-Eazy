import React from 'react';
import { 
  MapPin, 
  ArrowRightLeft, 
  Search, 
  Clock, 
  Sparkles, 
  Sliders
} from 'lucide-react';

const CLASS_OPTIONS = [
  { code: 'SL', name: 'Sleeper' },
  { code: '3A', name: 'AC 3 Tier' },
  { code: '2A', name: 'AC 2 Tier' },
  { code: 'CC', name: 'AC Chair Car' }
];

const ROUTE_PRESETS = [
  { origin: 'NGP', dest: 'NZM', label: 'Nagpur → Delhi (NZM)' },
  { origin: 'NGP', dest: 'NDLS', label: 'Nagpur → New Delhi (NDLS)' },
  { origin: 'BPL', dest: 'NDLS', label: 'Bhopal → New Delhi' },
  { origin: 'NGP', dest: 'BPL', label: 'Nagpur → Bhopal' }
];

export default function SearchForm({
  stations = [],
  origin,
  setOrigin,
  destination,
  setDestination,
  maxLayover,
  setMaxLayover,
  preferredClass,
  setPreferredClass,
  onSearch,
  loading
}) {
  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handlePresetSelect = (preset) => {
    setOrigin(preset.origin);
    setDestination(preset.dest);
    onSearch(preset.origin, preset.dest, maxLayover, preferredClass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    onSearch(origin, destination, maxLayover, preferredClass);
  };

  const formatMins = (m) => {
    const hours = Math.floor(m / 60);
    const mins = m % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  return (
    <section className="glass-card p-6 md:p-8 mb-8 relative rounded-2xl bg-synth-card/90 border border-synth-border shadow-synth-card overflow-hidden">
      {/* Top ambient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-synth-violet via-synth-emerald to-synth-violetLight" />

      {/* Preset Chips */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <span className="text-xs font-bold text-synth-muted flex items-center gap-1.5 mr-1">
          <Sparkles size={14} className="text-synth-violetLight" />
          Quick Routes:
        </span>
        {ROUTE_PRESETS.map((p, idx) => {
          const isActive = origin === p.origin && destination === p.dest;
          return (
            <button
              key={idx}
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-synth-violet text-white shadow-glow-violet'
                  : 'bg-synth-surface text-synth-muted hover:text-white hover:bg-synth-cardHover border border-synth-border'
              }`}
              onClick={() => handlePresetSelect(p)}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Origin / Swap / Destination */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end mb-6">
          {/* Origin */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-synth-muted flex items-center gap-1.5" htmlFor="origin-select">
              <MapPin size={14} className="text-synth-violetLight" />
              Origin Station
            </label>
            <div className="relative">
              <select
                id="origin-select"
                className="w-full bg-synth-surface border border-synth-border text-white px-4 py-3.5 rounded-xl font-semibold outline-none focus:border-synth-violet focus:ring-2 focus:ring-synth-violet/20 transition-all cursor-pointer appearance-none"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              >
                <option value="" disabled>Select origin</option>
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
            className="h-12 w-12 md:w-12 mx-auto flex items-center justify-center bg-synth-surface border border-synth-border rounded-xl text-synth-muted hover:text-synth-violetLight hover:border-synth-violet hover:rotate-180 transition-all duration-300 shadow-sm"
            onClick={handleSwap}
            title="Swap stations"
            aria-label="Swap Origin and Destination"
          >
            <ArrowRightLeft size={18} />
          </button>

          {/* Destination */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-synth-muted flex items-center gap-1.5" htmlFor="destination-select">
              <MapPin size={14} className="text-synth-emeraldLight" />
              Destination Station
            </label>
            <div className="relative">
              <select
                id="destination-select"
                className="w-full bg-synth-surface border border-synth-border text-white px-4 py-3.5 rounded-xl font-semibold outline-none focus:border-synth-emerald focus:ring-2 focus:ring-synth-emerald/20 transition-all cursor-pointer appearance-none"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              >
                <option value="" disabled>Select destination</option>
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
        </div>

        {/* Class Selector & Max Layover Slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-synth-border mb-6">
          {/* Class selector buttons (SL, 3A, 2A, CC) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-synth-muted">
              Travel Class Selector
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CLASS_OPTIONS.map((cls) => {
                const isSelected = preferredClass === cls.code;
                return (
                  <button
                    key={cls.code}
                    type="button"
                    onClick={() => setPreferredClass(cls.code)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
                      isSelected
                        ? 'bg-synth-violet text-white border border-synth-violetLight shadow-glow-violet'
                        : 'bg-synth-surface text-synth-muted hover:text-white hover:bg-synth-cardHover border border-synth-border'
                    }`}
                  >
                    <span className="text-sm">{cls.code}</span>
                    <span className="text-[10px] font-normal opacity-80">{cls.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Max Layover Range Slider (45 to 360 mins) */}
          <div className="flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-synth-muted flex items-center gap-1.5" htmlFor="max-layover-slider">
                <Clock size={14} className="text-synth-emeraldLight" />
                Max Transfer Layover Buffer
              </label>
              <span className="text-xs font-extrabold text-synth-emeraldLight bg-synth-emerald/10 border border-synth-emerald/30 px-2.5 py-0.5 rounded-md">
                Up to {formatMins(maxLayover)} ({maxLayover} mins)
              </span>
            </div>

            <div>
              <input
                id="max-layover-slider"
                type="range"
                min="45"
                max="360"
                step="15"
                value={maxLayover}
                onChange={(e) => setMaxLayover(parseInt(e.target.value, 10))}
                className="range-slider cursor-pointer w-full"
                aria-label="Max transfer layover duration"
              />
              <div className="flex justify-between text-[11px] text-synth-dim mt-1.5 font-medium">
                <span>45m (Min safe)</span>
                <span>2h 00m</span>
                <span>4h 00m</span>
                <span>6h 00m (Max ceiling)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Routes Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-synth-violet to-synth-violetLight hover:from-synth-violetDark hover:to-synth-violet text-white font-bold font-display shadow-glow-violet transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={loading || !origin || !destination}
            id="search-routes-btn"
          >
            <Search size={18} />
            <span>{loading ? 'Analyzing Routes...' : 'Search Routes'}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
