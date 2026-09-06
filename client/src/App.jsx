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
  const [intermediate, setIntermediate] = useState(null);
  const [minLayover, setMinLayover] = useState(45);
  const [maxLayover, setMaxLayover] = useState(360);
  const [preferredClass, setPreferredClass] = useState('3A');

  const [directRoutes, setDirectRoutes] = useState([]);
  const [splitRoutes, setSplitRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'direct' | 'split'
  const [sortBy, setSortBy] = useState('duration'); // 'duration' | 'fare' | 'departure' | 'layover'
  const [selectedRouteForModal, setSelectedRouteForModal] = useState(null);

  // Initial load: check health & fetch stations & perform initial search
  useEffect(() => {
    async function init() {
      try {
        const health = await getHealth();
        setBackendStatus(health.status === 'ok' ? 'ok' : 'offline');

        const stationsData = await getStations();
        setStations(stationsData);

        // Perform initial search
        executeSearch('NGP', 'NZM', null, 45, 360, '3A');
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err.message || 'Failed to initialize system. Please check if backend is running.');
      }
    }
    init();
  }, []);

  const executeSearch = async (
    orig = origin,
    dest = destination,
    inter = intermediate,
    minL = minLayover,
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
        intermediate: inter,
        minLayoverMinutes: minL,
        maxLayoverMinutes: maxL,
        preferredClass: pClass
      });

      if (data.success) {
        setDirectRoutes(data.directRoutes || []);
        setSplitRoutes(data.splitRoutes || []);
      } else {
        throw new Error(data.message || 'Unable to fetch routes');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search routes. Please verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (orig, dest, inter, minL, maxL, pClass) => {
    executeSearch(orig, dest, inter, minL, maxL, pClass);
  };

  // Re-search when preferredClass changes to update fares dynamically
  const handleClassChange = (newClass) => {
    setPreferredClass(newClass);
    executeSearch(origin, destination, intermediate, minLayover, maxLayover, newClass);
  };

  // Sorted and filtered list
  const displayRoutes = useMemo(() => {
    let combined = [];

    if (activeTab === 'all' || activeTab === 'direct') {
      combined = combined.concat(directRoutes);
    }
    if (activeTab === 'all' || activeTab === 'split') {
      combined = combined.concat(splitRoutes);
    }

    return combined.sort((a, b) => {
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

  const handleResetSliders = () => {
    setMinLayover(30);
    setMaxLayover(480);
    executeSearch(origin, destination, intermediate, 30, 480, preferredClass);
  };

  const handleSwap = () => {
    const nextOrigin = destination;
    const nextDest = origin;
    setOrigin(nextOrigin);
    setDestination(nextDest);
    executeSearch(nextOrigin, nextDest, intermediate, minLayover, maxLayover, preferredClass);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar backendStatus={backendStatus} />

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Algorithmic Waitlist Bypass Engine</span>
        </div>
        <h1 className="hero-title">
          Smart Indian Railway <br />
          <span className="hero-highlight">Split-Route & Transit Finder</span>
        </h1>
        <p className="hero-desc">
          When direct trains show waitlists (RAC/WL), Rail Eazy computes multi-leg split journeys via strategic junctions with guaranteed layovers, unlocking confirmed seats under intermediate quotas.
        </p>
      </header>

      {/* Search Form */}
      <SearchForm
        stations={stations}
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
        intermediate={intermediate}
        setIntermediate={setIntermediate}
        minLayover={minLayover}
        setMinLayover={setMinLayover}
        maxLayover={maxLayover}
        setMaxLayover={setMaxLayover}
        preferredClass={preferredClass}
        setPreferredClass={handleClassChange}
        onSearch={handleSearchSubmit}
        loading={loading}
      />

      {/* Strategy Hack Banner */}
      <StatsBanner onLearnMore={() => setSelectedRouteForModal(splitRoutes[0] || directRoutes[0] || {})} />

      {/* Error Message */}
      {error && (
        <div 
          style={{ 
            background: 'rgba(244, 63, 94, 0.12)', 
            border: '1px solid rgba(244, 63, 94, 0.3)', 
            borderRadius: '12px', 
            padding: '16px 20px', 
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#fecdd3'
          }}
          role="alert"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertCircle size={20} color="#f43f5e" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            className="action-btn"
            style={{ padding: '6px 14px', fontSize: '12px' }}
            onClick={() => executeSearch()}
          >
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Route Filter & View Switcher */}
      <RouteFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        directCount={directRoutes.length}
        splitCount={splitRoutes.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Results List */}
      <main className="results-container" aria-live="polite">
        {loading ? (
          <LoadingSkeleton />
        ) : displayRoutes.length === 0 ? (
          <EmptyState
            onResetSliders={handleResetSliders}
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

      {/* Split Booking Guide Modal */}
      {selectedRouteForModal && (
        <BookingGuideModal
          route={selectedRouteForModal}
          onClose={() => setSelectedRouteForModal(null)}
        />
      )}

      {/* Footer */}
      <footer style={{ 
        marginTop: '64px', 
        paddingTop: '24px', 
        borderTop: '1px solid var(--border-dim)', 
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--text-dim)'
      }}>
        <p>Rail Eazy Transit Engine • Designed to solve IRCTC waitlists through algorithmic split-segment booking.</p>
        <p style={{ marginTop: '6px' }}>Built with Node.js, Express, MongoDB Atlas, and React Vite.</p>
      </footer>
    </div>
  );
}
