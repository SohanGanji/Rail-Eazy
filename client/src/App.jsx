import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import StatsBanner from './components/StatsBanner';
import RouteFilters from './components/RouteFilters';
import DirectRouteCard from './components/DirectRouteCard';
import SplitRouteCard from './components/SplitRouteCard';
import EmptyState from './components/EmptyState';
import LoadingSkeleton from './components/LoadingSkeleton';
import BookingGuideModal from './components/BookingGuideModal';
import { getStations, searchRoutes, getHealth } from './services/api';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [stations, setStations] = useState([]);
  const [origin, setOrigin] = useState('NGP');
  const [destination, setDestination] = useState('NZM');
  const [maxLayover, setMaxLayover] = useState(360);
  const [preferredClass, setPreferredClass] = useState('3A');

  const [directRoutes, setDirectRoutes] = useState([]);
  const [splitRoutes, setSplitRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Two primary tabs: 'split' or 'direct' (with fallback 'all')
  const [activeTab, setActiveTab] = useState('split');
  const [sortBy, setSortBy] = useState('duration');
  const [selectedRouteForModal, setSelectedRouteForModal] = useState(null);

  // Initial load: fetch stations & check health & run default search
  useEffect(() => {
    async function init() {
      try {
        const health = await getHealth();
        setBackendStatus(health.status === 'ok' ? 'ok' : 'offline');

        const stationsData = await getStations();
        setStations(stationsData);

        // Run initial search
        executeSearch('NGP', 'NZM', 360, '3A');
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err.message || 'Failed to connect to backend on localhost:5000');
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

        // Auto-select tab based on available results
        if ((data.splitRoutes || []).length > 0) {
          setActiveTab('split');
        } else if ((data.directRoutes || []).length > 0) {
          setActiveTab('direct');
        }
      } else {
        throw new Error(data.message || 'No route data returned');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search routes. Verify backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (orig, dest, maxL, pClass) => {
    executeSearch(orig, dest, maxL, pClass);
  };

  const handleClassChange = (newClass) => {
    setPreferredClass(newClass);
    executeSearch(origin, destination, maxLayover, newClass);
  };

  // Filter and sort routes
  const displayRoutes = useMemo(() => {
    let list = [];

    if (activeTab === 'split') {
      list = [...splitRoutes];
    } else if (activeTab === 'direct') {
      list = [...directRoutes];
    } else {
      list = [...directRoutes, ...splitRoutes];
    }

    return list.sort((a, b) => {
      if (sortBy === 'duration') {
        return a.summary.totalDurationMinutes - b.summary.totalDurationMinutes;
      }
      if (sortBy === 'fare') {
        const fareA = a.summary.totalFare || 999999;
        const fareB = b.summary.totalFare || 999999;
        return fareA - fareB;
      }
      if (sortBy === 'departure') {
        const depA = a.routeType === 'direct' ? a.train.departureTime : a.leg1.departureTime;
        const depB = b.routeType === 'direct' ? b.train.departureTime : b.leg1.departureTime;
        return depA.localeCompare(depB);
      }
      if (sortBy === 'layover') {
        const layoverA = a.routeType === 'split' ? a.layover.durationMinutes : 0;
        const layoverB = b.routeType === 'split' ? b.layover.durationMinutes : 0;
        return layoverA - layoverB;
      }
      return 0;
    });
  }, [directRoutes, splitRoutes, activeTab, sortBy]);

  const handleResetFilters = () => {
    setMaxLayover(360);
    executeSearch(origin, destination, 360, preferredClass);
  };

  const handleSwap = () => {
    const nextOrig = destination;
    const nextDest = origin;
    setOrigin(nextOrig);
    setDestination(nextDest);
    executeSearch(nextOrig, nextDest, maxLayover, preferredClass);
  };

  return (
    <div className="min-h-screen bg-synth-bg text-white font-sans selection:bg-synth-violet selection:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20">
        {/* Top Navbar */}
        <Navbar backendStatus={backendStatus} />

        {/* Hero Section */}
        <header className="text-center my-8 md:my-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-synth-violet/15 text-synth-violetLight border border-synth-violet/30 shadow-glow-violet mb-4">
            <Sparkles size={14} />
            <span>Synthwave Transit Routing Engine</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-3">
            Bypass Railway Waitlists with <br />
            <span className="bg-gradient-to-r from-synth-violetLight via-synth-emeraldLight to-synth-emerald bg-clip-text text-transparent">
              Smart Split-Leg Routing
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-synth-muted leading-relaxed">
            When direct trains show waitlists (RAC/WL), Rail Eazy computes multi-leg split routes with safe layover buffers at junction stations, unlocking confirmed seats under regional quotas.
          </p>
        </header>

        {/* Search Form */}
        <SearchForm
          stations={stations}
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
          maxLayover={maxLayover}
          setMaxLayover={setMaxLayover}
          preferredClass={preferredClass}
          setPreferredClass={handleClassChange}
          onSearch={handleSearchSubmit}
          loading={loading}
        />

        {/* Strategy Hack Info Banner */}
        <StatsBanner onLearnMore={() => setSelectedRouteForModal(splitRoutes[0] || directRoutes[0] || {})} />

        {/* Error Notification */}
        {error && (
          <div className="p-4 mb-6 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2.5">
              <AlertCircle size={18} className="text-red-400" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              className="px-3 py-1 bg-red-900/50 hover:bg-red-900 border border-red-500/50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
              onClick={() => executeSearch()}
            >
              <RefreshCw size={13} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Route Filters & Two Tabs (Split Routes / Direct Routes) */}
        <RouteFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          directCount={directRoutes.length}
          splitCount={splitRoutes.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Results Stream */}
        <main className="flex flex-col gap-5">
          {loading ? (
            <LoadingSkeleton />
          ) : displayRoutes.length === 0 ? (
            <EmptyState
              onResetSliders={handleResetFilters}
              onSwap={handleSwap}
              origin={origin}
              destination={destination}
            />
          ) : (
            displayRoutes.map((route) => {
              if (route.routeType === 'direct') {
                return (
                  <DirectRouteCard
                    key={route.routeId}
                    route={route}
                    preferredClass={preferredClass}
                    onBookClick={(r) => setSelectedRouteForModal(r)}
                  />
                );
              }
              return (
                <SplitRouteCard
                  key={route.routeId}
                  route={route}
                  preferredClass={preferredClass}
                  onOpenGuide={(r) => setSelectedRouteForModal(r)}
                />
              );
            })
          )}
        </main>

        {/* Booking Guide Modal */}
        {selectedRouteForModal && (
          <BookingGuideModal
            route={selectedRouteForModal}
            onClose={() => setSelectedRouteForModal(null)}
          />
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-synth-border text-center text-xs text-synth-dim">
          <p>Rail Eazy • Indian Railway Split-Transit Finder powered by Node.js, MongoDB Atlas, Express, and React (Vite).</p>
          <p className="mt-1">Synthwave Theme: #100c1a Background • #7b51df Violet • #10b981 Emerald</p>
        </footer>
      </div>
    </div>
  );
}
