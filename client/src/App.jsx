import React, { useState, useEffect, useMemo } from 'react';
import { getStations, searchRoutes, getHealth } from './services/api';

const STATION_ZONES = {
  NGP: 'Central Railway',
  ET: 'Central Railway',
  BPL: 'West Central Railway',
  VGLJ: 'North Central Railway',
  GWL: 'North Central Railway',
  NDLS: 'Northern Railway',
  NZM: 'Northern Railway'
};

const STATION_PLATFORMS = {
  NGP: 'PF 1',
  ET: 'PF 1',
  BPL: 'PF 4',
  VGLJ: 'PF 2',
  GWL: 'PF 3',
  NDLS: 'PF 14',
  NZM: 'PF 3'
};

export default function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [stations, setStations] = useState([]);
  const [origin, setOrigin] = useState('NGP');
  const [destination, setDestination] = useState('NDLS');
  const [selectedDate, setSelectedDate] = useState('24 OCT 2024');
  const [preferredClass, setPreferredClass] = useState('3A');
  const [maxLayover, setMaxLayover] = useState(240); // in minutes
  
  const [directRoutes, setDirectRoutes] = useState([]);
  const [splitRoutes, setSplitRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tab & Filters
  const [activeTab, setActiveTab] = useState('split'); // 'split' | 'direct'
  const [sortBy, setSortBy] = useState('fastest'); // 'fastest' | 'lowest' | 'shortest'
  const [selectedJunctionFilter, setSelectedJunctionFilter] = useState(null); // 'BPL' | 'ET' | 'VGLJ' | null
  const [layoverRanges, setLayoverRanges] = useState({ '1to2': true, '2to4': true, '4plus': true });
  const [showTransferMap, setShowTransferMap] = useState(null);

  // Per-route card class selection state for recalculating fares on the fly:
  // e.g. { [routeId]: { leg1Class: 'CC', leg2Class: '3A' } }
  const [cardClassSelections, setCardClassSelections] = useState({});

  useEffect(() => {
    async function init() {
      try {
        const health = await getHealth();
        setBackendStatus(health.status === 'ok' ? 'ok' : 'offline');

        const stationsData = await getStations();
        setStations(stationsData);

        // Run default search for NGP -> NDLS / NZM
        executeSearch('NGP', 'NDLS', 240, '3A');
      } catch (err) {
        console.error('Init error:', err);
        setError('Failed to connect to backend on localhost:5000');
      }
    }
    init();
  }, []);

  const executeSearch = async (
    orig = origin,
    dest = destination,
    maxL = maxLayover,
    pClass = preferredClass
  ) => {
    if (!orig || !dest) return;
    setLoading(true);
    setError(null);

    try {
      const data = await searchRoutes({
        origin: orig,
        destination: dest,
        minLayoverMinutes: 45,
        maxLayoverMinutes: maxL,
        preferredClass: pClass
      });

      if (data.success) {
        setDirectRoutes(data.directRoutes || []);
        setSplitRoutes(data.splitRoutes || []);

        // Initialize default class selections for each card
        const initialSelections = {};
        (data.splitRoutes || []).forEach(r => {
          // Find first available class on leg1 and leg2
          const leg1Available = Object.keys(r.leg1.fares || {}).find(k => r.leg1.fares[k] !== null) || pClass;
          const leg2Available = Object.keys(r.leg2.fares || {}).find(k => r.leg2.fares[k] !== null) || pClass;
          initialSelections[r.routeId] = {
            leg1Class: r.leg1.fares && r.leg1.fares[pClass] !== null ? pClass : leg1Available,
            leg2Class: r.leg2.fares && r.leg2.fares[pClass] !== null ? pClass : leg2Available
          };
        });
        setCardClassSelections(initialSelections);

        if ((data.splitRoutes || []).length > 0) {
          setActiveTab('split');
        } else if ((data.directRoutes || []).length > 0) {
          setActiveTab('direct');
        }
      } else {
        throw new Error(data.message || 'Route search failed');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Search failed. Please verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwapStations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
    executeSearch(destination, temp, maxLayover, preferredClass);
  };

  const handleClassToggle = (cls) => {
    setPreferredClass(cls);
    executeSearch(origin, destination, maxLayover, cls);
  };

  const formatLayoverHoursMins = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m > 0 ? String(m).padStart(2, '0') + 'm' : '00m'}`;
  };

  // On-the-fly card class pick
  const handlePickCardClass = (routeId, legKey, className) => {
    setCardClassSelections(prev => ({
      ...prev,
      [routeId]: {
        ...(prev[routeId] || {}),
        [legKey]: className
      }
    }));
  };

  // Filtered and sorted split routes
  const filteredSplitRoutes = useMemo(() => {
    let list = [...splitRoutes];

    // Filter by intermediate junction if selected
    if (selectedJunctionFilter) {
      list = list.filter(r => r.intermediateStation === selectedJunctionFilter);
    }

    // Filter by layover time range
    list = list.filter(r => {
      const mins = r.layover.durationMinutes;
      if (mins >= 60 && mins <= 120 && layoverRanges['1to2']) return true;
      if (mins > 120 && mins <= 240 && layoverRanges['2to4']) return true;
      if (mins > 240 && layoverRanges['4plus']) return true;
      return false;
    });

    // Sort
    return list.sort((a, b) => {
      if (sortBy === 'fastest') {
        return a.summary.totalDurationMinutes - b.summary.totalDurationMinutes;
      }
      if (sortBy === 'lowest') {
        const fareA = a.summary.totalFare || 999999;
        const fareB = b.summary.totalFare || 999999;
        return fareA - fareB;
      }
      if (sortBy === 'shortest') {
        return a.layover.durationMinutes - b.layover.durationMinutes;
      }
      return 0;
    });
  }, [splitRoutes, selectedJunctionFilter, layoverRanges, sortBy]);

  const originStationObj = stations.find(s => s.code === origin) || { code: origin, name: 'Nagpur Junction', city: 'Nagpur' };
  const destStationObj = stations.find(s => s.code === destination) || { code: destination, name: 'New Delhi', city: 'New Delhi' };

  return (
    <div className="min-h-screen cyber-grid antialiased text-sm text-on-surface">
      {/* ================= TOP NAV BAR ================= */}
      <header className="sticky top-0 z-50 bg-[#100c1a]/90 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand & Corridor Status */}
          <div className="flex items-center gap-6">
            <a className="flex items-center gap-3 group" href="#">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-electric to-purple-800 flex items-center justify-center text-white glow-box-violet border border-purple-400/40 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl text-violet-200">train</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-xl tracking-wide font-bold text-white glow-text-pixel">RAIL EAZY</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-violet-electric/30 text-violet-lavender border border-violet-electric/40">v2.8</span>
                </div>
                <p className="text-[11px] font-mono text-on-surface-variant">Multi-Leg Rail Transit Planner</p>
              </div>
            </a>

            {/* Corridor Indicator */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-mint-emerald/30 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${backendStatus === 'ok' ? 'bg-mint-emerald' : 'bg-amber-warning'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${backendStatus === 'ok' ? 'bg-mint-emerald' : 'bg-amber-warning'}`}></span>
              </span>
              <span className={`font-mono text-xs font-medium ${backendStatus === 'ok' ? 'text-mint-emerald' : 'text-amber-warning'}`}>
                {backendStatus === 'ok' ? `${origin} ⇄ ${destination} Corridor Live` : 'Engine Connecting...'}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-container-low p-1.5 rounded-xl border border-purple-500/20">
            <button className="px-3.5 py-1.5 rounded-lg bg-violet-electric text-white font-medium text-xs flex items-center gap-1.5 shadow-md shadow-violet-electric/30">
              <span className="material-symbols-outlined text-sm">explore</span>
              Route Explorer
            </button>
            <button className="px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-container transition-colors text-xs font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">bookmark</span>
              Saved Routes
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-purple-500/20 text-violet-lavender">3</span>
            </button>
            <button className="px-3.5 py-1.5 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-container transition-colors text-xs font-medium flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">schedule</span>
              Timetables
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              className="relative p-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-purple-500/20 text-on-surface transition-colors cursor-pointer" 
              title="Junction Updates"
              onClick={() => alert(`Active Indian Railways Corridors: NGP, ET, BPL, VGLJ, GWL, NDLS, NZM`)}
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-700 to-violet-500 border border-purple-300/40 flex items-center justify-center font-bold text-white font-pixel text-sm shadow-md">
              RE
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* SEARCH COMMAND MATRIX */}
        <section className="relative rounded-2xl bg-surface/90 border border-purple-500/30 p-5 md:p-6 shadow-2xl backdrop-blur-md">
          <div className="absolute -top-12 left-1/4 w-80 h-32 bg-violet-electric/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
          
          {/* Controls Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Origin Station */}
            <div className="lg:col-span-3 bg-surface-container-low p-3.5 rounded-xl border border-purple-500/20 hover:border-violet-electric/60 transition-colors">
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mb-1">
                <span className="uppercase">Origin Station</span>
                <span className="text-mint-glow">{STATION_ZONES[origin] || 'Central Railway'}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <span className="material-symbols-outlined text-violet-electric text-xl">departure_board</span>
                  <select
                    className="bg-transparent font-pixel text-lg md:text-xl text-white font-bold focus:outline-none w-full truncate cursor-pointer"
                    value={origin}
                    onChange={(e) => {
                      setOrigin(e.target.value);
                      executeSearch(e.target.value, destination, maxLayover, preferredClass);
                    }}
                  >
                    {stations.map(s => (
                      <option key={s.code} value={s.code} className="bg-surface text-white">
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>
                <span className="font-pixel text-lg font-bold text-violet-lavender bg-violet-electric/20 px-2 py-0.5 rounded border border-violet-electric/40">
                  {origin}
                </span>
              </div>
            </div>

            {/* Swap Interactive Button */}
            <div className="lg:col-span-1 flex justify-center -my-2 lg:my-0 z-10">
              <button 
                className="w-11 h-11 rounded-xl bg-surface-container hover:bg-violet-electric border border-purple-500/30 text-on-surface-variant hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-180 hover:glow-box-violet cursor-pointer" 
                onClick={handleSwapStations} 
                title="Swap Stations"
              >
                <span className="material-symbols-outlined text-xl">swap_horiz</span>
              </button>
            </div>

            {/* Destination Station */}
            <div className="lg:col-span-3 bg-surface-container-low p-3.5 rounded-xl border border-purple-500/20 hover:border-violet-electric/60 transition-colors">
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mb-1">
                <span className="uppercase">Destination Station</span>
                <span className="text-on-surface-variant">{STATION_ZONES[destination] || 'Northern Railway'}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 w-full">
                  <span className="material-symbols-outlined text-mint-emerald text-xl">location_on</span>
                  <select
                    className="bg-transparent font-pixel text-lg md:text-xl text-white font-bold focus:outline-none w-full truncate cursor-pointer"
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      executeSearch(origin, e.target.value, maxLayover, preferredClass);
                    }}
                  >
                    {stations.map(s => (
                      <option key={s.code} value={s.code} className="bg-surface text-white">
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>
                <span className="font-pixel text-lg font-bold text-mint-glow bg-mint-emerald/20 px-2 py-0.5 rounded border border-mint-emerald/40">
                  {destination}
                </span>
              </div>
            </div>

            {/* Departure Date Picker */}
            <div className="lg:col-span-2 bg-surface-container-low p-3.5 rounded-xl border border-purple-500/20">
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mb-1">
                <span className="uppercase">Travel Date</span>
                <span className="material-symbols-outlined text-sm text-violet-lavender">calendar_month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-pixel text-xl font-bold text-white">{selectedDate}</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="lg:col-span-3">
              <button 
                className="w-full h-full min-h-[64px] rounded-xl bg-gradient-to-r from-violet-electric via-purple-600 to-indigo-600 hover:from-purple-500 hover:to-violet-electric text-white font-pixel text-lg font-bold tracking-wider shadow-lg shadow-violet-electric/40 border border-purple-400/40 flex items-center justify-center gap-2.5 group transition-all duration-300 cursor-pointer disabled:opacity-50"
                onClick={() => executeSearch(origin, destination, maxLayover, preferredClass)}
                disabled={loading}
              >
                <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform text-white">
                  {loading ? 'refresh' : 'search'}
                </span>
                <span>{loading ? 'FINDING ROUTES...' : 'FIND SPLIT ROUTES'}</span>
              </button>
            </div>
          </div>

          {/* Travel Class Pills & Max Layover Buffer Row */}
          <div className="mt-4 pt-4 border-t border-purple-500/20 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-surface-container/60 p-3.5 rounded-xl">
            {/* Travel Class Selection */}
            <div className="md:col-span-5 flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-on-surface-variant uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-violet-lavender">airline_seat_recline_normal</span>
                Preferred Class
              </label>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {['SL', '3A', '2A', 'CC'].map(cls => {
                  const isActive = preferredClass === cls;
                  return (
                    <button
                      key={cls}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-violet-electric text-white border border-purple-400/40 font-semibold shadow-md shadow-violet-electric/30'
                          : 'bg-surface-container text-on-surface border border-purple-500/20 hover:border-purple-400/40'
                      }`}
                      onClick={() => handleClassToggle(cls)}
                    >
                      {cls}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Max Layover Buffer Slider */}
            <div className="md:col-span-7 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-on-surface-variant flex items-center gap-1.5 uppercase">
                  <span className="material-symbols-outlined text-sm text-amber-warning">timelapse</span>
                  Max Layover Buffer
                </span>
                <span className="font-mono text-xs font-semibold text-white bg-surface-container-high px-2 py-0.5 rounded border border-purple-500/30">
                  Up to {formatLayoverHoursMins(maxLayover)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-on-surface-variant">45m</span>
                <input 
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer" 
                  max="360" 
                  min="45" 
                  step="15" 
                  type="range" 
                  value={maxLayover}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setMaxLayover(val);
                  }}
                  onMouseUp={() => executeSearch(origin, destination, maxLayover, preferredClass)}
                  onTouchEnd={() => executeSearch(origin, destination, maxLayover, preferredClass)}
                />
                <span className="font-mono text-[11px] text-on-surface-variant">6h 00m</span>
              </div>
            </div>
          </div>
        </section>

        {/* VIEW TABS */}
        <div className="flex items-center gap-2 border-b border-purple-500/20 pb-2">
          <button 
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'split'
                ? 'bg-violet-electric text-white shadow-md shadow-violet-electric/30 border border-purple-400/30'
                : 'text-on-surface-variant hover:text-white bg-surface-container-low border border-purple-500/20 hover:border-purple-500/40'
            }`}
            onClick={() => setActiveTab('split')}
          >
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>Split Routes (Junction Connections)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-violet-lavender font-mono text-[10px]">
              {filteredSplitRoutes.length} Available
            </span>
          </button>

          <button 
            className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'direct'
                ? 'bg-violet-electric text-white shadow-md shadow-violet-electric/30 border border-purple-400/30'
                : 'text-on-surface-variant hover:text-white bg-surface-container-low border border-purple-500/20 hover:border-purple-500/40'
            }`}
            onClick={() => setActiveTab('direct')}
          >
            <span className="material-symbols-outlined text-sm">straight</span>
            <span>Direct Express Routes</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant font-mono text-[10px]">
              {directRoutes.length} Timetable
            </span>
          </button>
        </div>

        {/* MAIN WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: FUNCTIONAL FILTERS ONLY */}
          <aside className="lg:col-span-3 space-y-5">
            <div className="bg-surface/90 rounded-2xl border border-purple-500/20 p-5 space-y-5 backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                <div className="flex items-center gap-2 text-white font-pixel text-lg font-bold">
                  <span className="material-symbols-outlined text-violet-electric text-xl">tune</span>
                  <span>Refine Filters</span>
                </div>
                <button 
                  className="text-[11px] font-mono text-violet-lavender hover:underline cursor-pointer"
                  onClick={() => {
                    setSelectedJunctionFilter(null);
                    setSortBy('fastest');
                    setLayoverRanges({ '1to2': true, '2to4': true, '4plus': true });
                  }}
                >
                  Reset
                </button>
              </div>

              {/* Sort Selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block font-semibold">
                  Sort Prioritization
                </span>
                <div className="space-y-1 text-xs">
                  <label 
                    className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer font-medium transition-colors ${
                      sortBy === 'fastest'
                        ? 'bg-surface-container border-purple-500/30 text-white'
                        : 'hover:bg-surface-container-low text-on-surface-variant'
                    }`}
                    onClick={() => setSortBy('fastest')}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-violet-electric">speed</span>
                      Fastest Total Journey
                    </span>
                    <input 
                      type="radio" 
                      name="route-sort" 
                      checked={sortBy === 'fastest'} 
                      onChange={() => setSortBy('fastest')}
                      className="text-violet-electric focus:ring-0 accent-violet-electric"
                    />
                  </label>

                  <label 
                    className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer font-medium transition-colors ${
                      sortBy === 'lowest'
                        ? 'bg-surface-container border-purple-500/30 text-white'
                        : 'hover:bg-surface-container-low text-on-surface-variant'
                    }`}
                    onClick={() => setSortBy('lowest')}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">savings</span>
                      Lowest Combined Fare
                    </span>
                    <input 
                      type="radio" 
                      name="route-sort" 
                      checked={sortBy === 'lowest'} 
                      onChange={() => setSortBy('lowest')}
                      className="text-violet-electric focus:ring-0 accent-violet-electric"
                    />
                  </label>

                  <label 
                    className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer font-medium transition-colors ${
                      sortBy === 'shortest'
                        ? 'bg-surface-container border-purple-500/30 text-white'
                        : 'hover:bg-surface-container-low text-on-surface-variant'
                    }`}
                    onClick={() => setSortBy('shortest')}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">timer</span>
                      Shortest Layover Buffer
                    </span>
                    <input 
                      type="radio" 
                      name="route-sort" 
                      checked={sortBy === 'shortest'} 
                      onChange={() => setSortBy('shortest')}
                      className="text-violet-electric focus:ring-0 accent-violet-electric"
                    />
                  </label>
                </div>
              </div>

              {/* Intermediate Junction Filter */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block font-semibold">
                  Intermediate Junctions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { code: 'BPL', name: 'Bhopal' },
                    { code: 'ET', name: 'Itarsi' },
                    { code: 'VGLJ', name: 'Jhansi' }
                  ].map(j => {
                    const isSelected = selectedJunctionFilter === j.code;
                    return (
                      <button
                        key={j.code}
                        onClick={() => setSelectedJunctionFilter(isSelected ? null : j.code)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-xs flex items-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-violet-electric/30 border border-violet-electric text-white shadow-sm'
                            : 'bg-surface-container border border-purple-500/20 text-on-surface-variant hover:text-white'
                        }`}
                      >
                        <span>{j.code} {j.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Layover Filter */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block font-semibold">
                  Layover Time
                </span>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container border border-purple-500/20 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={layoverRanges['1to2']}
                      onChange={(e) => setLayoverRanges(prev => ({ ...prev, '1to2': e.target.checked }))}
                      className="rounded text-violet-electric focus:ring-0 accent-violet-electric"
                    />
                    <span>1h to 2h Layovers</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container border border-purple-500/20 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={layoverRanges['2to4']}
                      onChange={(e) => setLayoverRanges(prev => ({ ...prev, '2to4': e.target.checked }))}
                      className="rounded text-violet-electric focus:ring-0 accent-violet-electric"
                    />
                    <span>2h to 4h Layovers</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN RESULTS FEED */}
          <section className="lg:col-span-9 space-y-6">
            {loading ? (
              <div className="space-y-4">
                <div className="h-44 rounded-2xl border border-purple-500/20 bg-surface-container/40 animate-pulse" />
                <div className="h-44 rounded-2xl border border-purple-500/20 bg-surface-container/40 animate-pulse" />
              </div>
            ) : activeTab === 'split' ? (
              filteredSplitRoutes.length === 0 ? (
                <div className="rounded-2xl bg-surface/90 border border-purple-500/30 p-10 text-center space-y-3">
                  <span className="material-symbols-outlined text-4xl text-violet-lavender">search_off</span>
                  <h3 className="text-lg font-bold font-pixel text-white">No Split Routes Match Filters</h3>
                  <p className="text-xs text-on-surface-variant">
                    Try expanding your Max Layover Buffer slider or clearing junction filters.
                  </p>
                  <button
                    className="px-4 py-2 bg-violet-electric text-white text-xs font-bold rounded-xl mt-2 shadow-md"
                    onClick={() => {
                      setSelectedJunctionFilter(null);
                      setMaxLayover(360);
                      executeSearch(origin, destination, 360, preferredClass);
                    }}
                  >
                    Reset Layover to 6h
                  </button>
                </div>
              ) : (
                filteredSplitRoutes.map(route => {
                  const cardId = route.routeId;
                  const selections = cardClassSelections[cardId] || {
                    leg1Class: preferredClass,
                    leg2Class: preferredClass
                  };

                  const currentLeg1Class = selections.leg1Class || preferredClass;
                  const currentLeg2Class = selections.leg2Class || preferredClass;

                  const leg1Fare = route.leg1.fares ? route.leg1.fares[currentLeg1Class] : null;
                  const leg2Fare = route.leg2.fares ? route.leg2.fares[currentLeg2Class] : null;

                  const totalCombinedFare = (leg1Fare !== null && leg2Fare !== null && leg1Fare !== undefined && leg2Fare !== undefined)
                    ? leg1Fare + leg2Fare
                    : null;

                  return (
                    <article 
                      key={route.routeId} 
                      className="rounded-2xl bg-surface/95 border border-purple-500/30 overflow-hidden shadow-xl hover:border-violet-electric/60 transition-all duration-300"
                    >
                      {/* Route Header */}
                      <div className="bg-gradient-to-r from-purple-950/80 via-surface-container to-purple-950/50 px-5 py-3 border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-pixel text-base font-bold text-white tracking-wide">
                            Via {route.intermediateStation} Junction ({route.intermediateStation})
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-electric/20 text-violet-lavender border border-violet-electric/40">
                            2 Legs
                          </span>
                        </div>
                        <span className="text-xs font-mono text-on-surface-variant">
                          {route.leg1.origin} ➔ {route.intermediateStation} ➔ {route.leg2.destination}
                        </span>
                      </div>

                      <div className="p-5 md:p-6 space-y-5">
                        {/* LEG 1 */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2 py-0.5 rounded bg-violet-electric text-white font-mono text-[11px] font-bold">LEG 1</span>
                              <span className="font-pixel text-lg font-bold text-white">
                                {route.leg1.trainNumber} {route.leg1.trainName}
                              </span>
                              <span className="font-mono text-xs text-on-surface-variant">Daily Schedule</span>
                            </div>
                          </div>

                          {/* Leg 1 Route Timeline */}
                          <div className="bg-surface-container-low p-4 rounded-xl border border-purple-500/20 grid grid-cols-12 gap-3 items-center">
                            <div className="col-span-4">
                              <span className="font-pixel text-2xl md:text-3xl font-bold text-white">{route.leg1.departureTime}</span>
                              <div className="flex items-center gap-1.5 text-xs text-violet-lavender mt-0.5">
                                <span className="font-mono font-bold text-white">{route.leg1.origin}</span>
                                <span className="truncate">{originStationObj.name} • {STATION_PLATFORMS[route.leg1.origin] || 'PF 1'}</span>
                              </div>
                            </div>
                            <div className="col-span-4 flex flex-col items-center text-center">
                              <span className="font-mono text-[11px] text-on-surface-variant">{route.leg1.duration}</span>
                              <div className="w-full flex items-center gap-1 my-1">
                                <span className="w-2 h-2 rounded-full bg-violet-electric shrink-0"></span>
                                <div className="h-0.5 w-full bg-gradient-to-r from-violet-electric to-purple-400"></div>
                                <span className="material-symbols-outlined text-sm text-violet-lavender">arrow_forward</span>
                                <div className="h-0.5 w-full bg-gradient-to-r from-purple-400 to-violet-electric"></div>
                                <span className="w-2 h-2 rounded-full bg-violet-electric shrink-0"></span>
                              </div>
                              <span className="text-[10px] text-on-surface-variant">Confirmed Segment Quota</span>
                            </div>
                            <div className="col-span-4 text-right">
                              <span className="font-pixel text-2xl md:text-3xl font-bold text-white">{route.leg1.arrivalTime}</span>
                              <div className="flex items-center justify-end gap-1.5 text-xs text-violet-lavender mt-0.5">
                                <span className="truncate">{route.intermediateStation} Jn • {STATION_PLATFORMS[route.intermediateStation] || 'PF 4'}</span>
                                <span className="font-mono font-bold text-white">{route.intermediateStation}</span>
                              </div>
                            </div>
                          </div>

                          {/* Leg 1 Class Chips */}
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="font-mono text-[11px] text-on-surface-variant uppercase">Select Class:</span>
                            {['SL', '3A', '2A', 'CC', 'EC'].map(cls => {
                              const fare = route.leg1.fares ? route.leg1.fares[cls] : null;
                              if (fare === null || fare === undefined) return null;
                              const isActive = currentLeg1Class === cls;
                              return (
                                <button
                                  key={cls}
                                  className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-2 transition-all cursor-pointer ${
                                    isActive
                                      ? 'bg-violet-electric text-white border border-purple-400/40 shadow-md'
                                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface border border-purple-500/20'
                                  }`}
                                  onClick={() => handlePickCardClass(cardId, 'leg1Class', cls)}
                                >
                                  <span className={isActive ? 'font-bold' : ''}>{cls}</span>
                                  <span className="font-mono">₹{fare.toLocaleString('en-IN')}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* INTERMEDIATE JUNCTION TRANSFER BRIDGE */}
                        <div className="relative py-1 flex flex-col items-center">
                          <div className="w-full bg-surface-container-high rounded-xl p-3 border border-purple-500/30 flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2.5 text-xs">
                              <span className="material-symbols-outlined text-amber-warning text-lg">schedule</span>
                              <span className="font-semibold text-white">
                                ⏱ {route.layover.formatted} Layover at {route.intermediateStation} Jn ({STATION_PLATFORMS[route.intermediateStation] || 'PF 4'} ➔ PF 1)
                              </span>
                              <span className="text-on-surface-variant/40">•</span>
                              <span className="text-on-surface-variant font-mono">Overbridge Walk: ~5 mins</span>
                            </div>
                            <span className="text-[11px] font-mono text-violet-lavender bg-violet-electric/10 border border-violet-electric/30 px-2 py-0.5 rounded">
                              Station Transfer Verified
                            </span>
                          </div>
                        </div>

                        {/* LEG 2 */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2 py-0.5 rounded bg-violet-electric text-white font-mono text-[11px] font-bold">LEG 2</span>
                              <span className="font-pixel text-lg font-bold text-white">
                                {route.leg2.trainNumber} {route.leg2.trainName}
                              </span>
                              <span className="font-mono text-xs text-on-surface-variant">Connecting SF</span>
                            </div>
                          </div>

                          {/* Leg 2 Route Timeline */}
                          <div className="bg-surface-container-low p-4 rounded-xl border border-purple-500/20 grid grid-cols-12 gap-3 items-center">
                            <div className="col-span-4">
                              <span className="font-pixel text-2xl md:text-3xl font-bold text-white">{route.leg2.departureTime}</span>
                              <div className="flex items-center gap-1.5 text-xs text-violet-lavender mt-0.5">
                                <span className="font-mono font-bold text-white">{route.leg2.origin}</span>
                                <span className="truncate">{route.intermediateStation} Jn • PF 1</span>
                              </div>
                            </div>
                            <div className="col-span-4 flex flex-col items-center text-center">
                              <span className="font-mono text-[11px] text-on-surface-variant">{route.leg2.duration}</span>
                              <div className="w-full flex items-center gap-1 my-1">
                                <span className="w-2 h-2 rounded-full bg-violet-electric shrink-0"></span>
                                <div className="h-0.5 w-full bg-gradient-to-r from-violet-electric to-purple-400"></div>
                                <span className="material-symbols-outlined text-sm text-violet-lavender">nightlight</span>
                                <div className="h-0.5 w-full bg-gradient-to-r from-purple-400 to-violet-electric"></div>
                                <span className="w-2 h-2 rounded-full bg-violet-electric shrink-0"></span>
                              </div>
                              <span className="text-[10px] text-on-surface-variant">Direct Destination Leg</span>
                            </div>
                            <div className="col-span-4 text-right">
                              <div className="flex items-baseline justify-end gap-1.5">
                                <span className="font-pixel text-2xl md:text-3xl font-bold text-white">{route.leg2.arrivalTime}</span>
                                <span className="font-mono text-xs font-bold text-mint-glow">+1D</span>
                              </div>
                              <div className="flex items-center justify-end gap-1.5 text-xs text-violet-lavender mt-0.5">
                                <span className="truncate">{destStationObj.name} • {STATION_PLATFORMS[route.leg2.destination] || 'PF 3'}</span>
                                <span className="font-mono font-bold text-white">{route.leg2.destination}</span>
                              </div>
                            </div>
                          </div>

                          {/* Leg 2 Class Chips */}
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="font-mono text-[11px] text-on-surface-variant uppercase">Select Class:</span>
                            {['SL', '3A', '2A', 'CC', 'EC'].map(cls => {
                              const fare = route.leg2.fares ? route.leg2.fares[cls] : null;
                              if (fare === null || fare === undefined) return null;
                              const isActive = currentLeg2Class === cls;
                              return (
                                <button
                                  key={cls}
                                  className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-2 transition-all cursor-pointer ${
                                    isActive
                                      ? 'bg-violet-electric text-white border border-purple-400/40 shadow-md'
                                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface border border-purple-500/20'
                                  }`}
                                  onClick={() => handlePickCardClass(cardId, 'leg2Class', cls)}
                                >
                                  <span className={isActive ? 'font-bold' : ''}>{cls}</span>
                                  <span className="font-mono">₹{fare.toLocaleString('en-IN')}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* SUMMARY & ACTION STRIP */}
                        <div className="pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                            <div>
                              <span className="text-[11px] font-mono text-on-surface-variant uppercase">Total Journey</span>
                              <div className="font-pixel text-xl font-bold text-white">{route.summary.totalTravelTime}</div>
                              <span className="text-[10px] text-on-surface-variant">
                                Travel + Layover {route.layover.formatted}
                              </span>
                            </div>
                            <div className="h-8 w-px bg-purple-500/20"></div>
                            <div>
                              <span className="text-[11px] font-mono text-on-surface-variant uppercase">Combined Fare</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-pixel text-2xl font-bold text-mint-glow">
                                  {totalCombinedFare ? `₹${totalCombinedFare.toLocaleString('en-IN')}` : 'N/A'}
                                </span>
                                <span className="font-mono text-xs text-on-surface-variant">
                                  ({currentLeg1Class} + {currentLeg2Class})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 w-full sm:w-auto">
                            <button 
                              className="px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface border border-purple-500/20 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                              onClick={() => setShowTransferMap(route)}
                            >
                              <span className="material-symbols-outlined text-sm text-violet-lavender">map</span>
                              <span>Transfer Map</span>
                            </button>
                            <a 
                              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-electric to-purple-600 hover:from-purple-500 hover:to-violet-electric text-white font-pixel text-sm font-bold tracking-wide shadow-lg shadow-violet-electric/30 border border-purple-400/30 flex items-center justify-center gap-2 transition-all" 
                              href="https://www.irctc.co.in" 
                              rel="noopener noreferrer" 
                              target="_blank"
                            >
                              <span className="material-symbols-outlined text-base">open_in_new</span>
                              <span>Check on IRCTC</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              )
            ) : (
              directRoutes.length === 0 ? (
                <div className="rounded-2xl bg-surface/90 border border-purple-500/30 p-10 text-center space-y-3">
                  <span className="material-symbols-outlined text-4xl text-violet-lavender">train</span>
                  <h3 className="text-lg font-bold font-pixel text-white">No Direct Trains Scheduled</h3>
                  <p className="text-xs text-on-surface-variant">
                    No single non-stop train connects this pair directly. Switch to the Split Routes tab to view connecting options!
                  </p>
                  <button
                    className="px-4 py-2 bg-violet-electric text-white text-xs font-bold rounded-xl mt-2 shadow-md"
                    onClick={() => setActiveTab('split')}
                  >
                    View Split Connections ({filteredSplitRoutes.length})
                  </button>
                </div>
              ) : (
                directRoutes.map(route => {
                  const { train, summary } = route;
                  return (
                    <article 
                      key={route.routeId} 
                      className="rounded-2xl bg-surface-container-low border border-purple-500/20 p-5 md:p-6 space-y-4 shadow-xl"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-xs font-semibold border border-purple-500/30">
                            Direct Service
                          </span>
                          <span className="font-pixel text-lg font-bold text-white">
                            {train.trainNumber} {train.trainName}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-on-surface-variant">Single Train (No Interchange)</span>
                      </div>

                      {/* Direct Route Timeline */}
                      <div className="bg-surface-container p-4 rounded-xl border border-purple-500/20 grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-4">
                          <span className="font-pixel text-2xl font-bold text-white">{train.departureTime}</span>
                          <div className="text-xs text-on-surface-variant">{train.origin} • PF 1</div>
                        </div>
                        <div className="col-span-4 flex flex-col items-center text-center">
                          <span className="font-mono text-[11px] text-on-surface-variant">{summary.totalTravelTime} (Direct non-stop)</span>
                          <div className="w-full flex items-center gap-1 my-1">
                            <span className="w-2 h-2 rounded-full bg-on-surface-variant/40 shrink-0"></span>
                            <div className="h-0.5 w-full bg-on-surface-variant/20"></div>
                            <span className="material-symbols-outlined text-sm text-on-surface-variant/50">arrow_forward</span>
                            <div className="h-0.5 w-full bg-on-surface-variant/20"></div>
                            <span className="w-2 h-2 rounded-full bg-on-surface-variant/40 shrink-0"></span>
                          </div>
                          <span className="text-[10px] text-on-surface-variant">Trunk Route</span>
                        </div>
                        <div className="col-span-4 text-right">
                          <span className="font-pixel text-2xl font-bold text-white">
                            {train.arrivalTime} <span className="font-mono text-xs text-violet-lavender">+1D</span>
                          </span>
                          <div className="text-xs text-on-surface-variant">{train.destination} • PF 14</div>
                        </div>
                      </div>

                      {/* Direct Fares & Official Verification Link */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-purple-500/20">
                        <div className="flex items-center gap-3 flex-wrap text-xs">
                          <span className="font-mono text-[11px] text-on-surface-variant uppercase">Timetable Rates:</span>
                          {['3A', '2A', '1A', 'SL'].map(cls => {
                            const fare = train.fares ? train.fares[cls] : null;
                            if (!fare) return null;
                            return (
                              <div key={cls} className="px-3 py-1 rounded-lg bg-surface-container border border-purple-500/20">
                                <span className="font-medium text-white">{cls}: </span>
                                <span className="font-mono text-on-surface">₹{fare.toLocaleString('en-IN')}</span>
                              </div>
                            );
                          })}
                        </div>
                        <a 
                          className="text-xs font-mono text-violet-lavender hover:text-white flex items-center gap-1" 
                          href="https://www.irctc.co.in" 
                          rel="noopener noreferrer" 
                          target="_blank"
                        >
                          <span>Verify Direct Availability on IRCTC</span>
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                      </div>
                    </article>
                  );
                })
              )
            )}
          </section>
        </div>
      </main>

      {/* ================= TRANSFER MAP MODAL ================= */}
      {showTransferMap && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setShowTransferMap(null)}>
          <div className="bg-surface border border-purple-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-violet-electric">alt_route</span>
                <span className="font-pixel text-lg font-bold text-white">Transfer Protocol • {showTransferMap.intermediateStation} Junction</span>
              </div>
              <button className="text-on-surface-variant hover:text-white" onClick={() => setShowTransferMap(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-surface-container-low p-3 rounded-xl border border-purple-500/20">
                <div className="font-bold text-white mb-1">Step 1: Arrive on Leg 1</div>
                <div className="text-on-surface-variant">Train #{showTransferMap.leg1.trainNumber} arrives at {showTransferMap.leg1.arrivalTime} at Platform 4.</div>
              </div>

              <div className="bg-surface-container-low p-3 rounded-xl border border-purple-500/20">
                <div className="font-bold text-white mb-1">Step 2: Platform Transfer ({showTransferMap.layover.formatted})</div>
                <div className="text-on-surface-variant">Walk across Foot Overbridge (FOB) from PF 4 to PF 1 (~4-5 mins walk with luggage lifts available).</div>
              </div>

              <div className="bg-surface-container-low p-3 rounded-xl border border-purple-500/20">
                <div className="font-bold text-white mb-1">Step 3: Board Leg 2</div>
                <div className="text-on-surface-variant">Train #{showTransferMap.leg2.trainNumber} departs at {showTransferMap.leg2.departureTime} from Platform 1.</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                className="px-4 py-2 bg-violet-electric hover:bg-violet-glow text-white font-pixel rounded-xl text-xs"
                onClick={() => setShowTransferMap(null)}
              >
                Close Transfer Protocol
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CLEAN FOOTER ================= */}
      <footer className="mt-16 bg-surface-container-low border-t border-purple-500/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-purple-500/20">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-violet-electric flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-sm">train</span>
                </div>
                <span className="font-pixel text-base font-bold text-white tracking-wider">RAIL EAZY</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Independent routing utility for finding multi-leg rail transfers and junction layovers across Indian Railways corridors.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono text-xs text-white uppercase font-bold tracking-wider">Major Junction Hubs</div>
              <div className="text-xs text-on-surface-variant space-y-1">
                <div>Bhopal Junction (BPL) · Central & WCR Interchange</div>
                <div>Itarsi Junction (ET) · Central Railway Hub</div>
                <div>VGL Jhansi (VGLJ) · North-Central Axis</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="font-mono text-xs text-white uppercase font-bold tracking-wider">Transit Disclaimer</div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Rail Eazy provides timetable routing only and does not issue tickets or PNRs. All seat reservations must be verified and completed through authorized IRCTC portals.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
            <div>© 2025 Rail Eazy • Open Routing Utility</div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <a className="hover:text-white transition-colors" href="#">Route Directory</a>
              <a className="hover:text-white transition-colors" href="#">Timetable Index</a>
              <a className="hover:text-white transition-colors" href="#">Terms & Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
