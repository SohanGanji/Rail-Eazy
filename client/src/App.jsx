import React, { useState, useEffect } from 'react';

// ==============================================================
// 1. LANDING PAGE & PORTAL SELECTOR
// ==============================================================
function LandingView({ onLaunchRailEngine }) {
  return (
    <div className="w-full min-h-screen bg-space-void text-on-surface flex flex-col justify-between">
      <header className="fixed top-0 w-full z-50 bg-space-void/90 backdrop-blur-xl border-b border-purple-500/20">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-electric to-purple-800 flex items-center justify-center text-white border border-purple-400/40">
              <span className="material-symbols-outlined text-xl">train</span>
            </div>
            <div className="flex flex-col">
              <span className="font-pixel text-lg text-on-surface tracking-wider uppercase leading-none font-bold">
                RAIL EAZY
              </span>
              <span className="text-[10px] font-mono text-violet-lavender uppercase tracking-widest leading-none mt-1">
                TRANSIT MATRIX
              </span>
            </div>
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-surface-container-lowest text-on-surface border border-purple-500/20 rounded">
              <span className="w-2 h-2 rounded-full bg-violet-electric animate-pulse"></span>
              <span className="text-[11px] font-mono text-primary uppercase tracking-widest">
                LIVE NETWORK: NGP ⇄ NDLS
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={onLaunchRailEngine}
              className="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#3d1f85] hover:bg-violet-electric transition-colors"
            >
              Rail Engine
            </button>
            <a
              href="#portals"
              className="px-3 py-1.5 font-mono text-xs text-on-surface-variant hover:text-white transition-colors uppercase tracking-wider"
            >
              Portals
            </a>
            <a
              href="#how-it-works"
              className="px-3 py-1.5 font-mono text-xs text-on-surface-variant hover:text-white transition-colors uppercase tracking-wider"
            >
              Methodology
            </a>
          </nav>

          <button
            onClick={onLaunchRailEngine}
            className="px-3 py-1.5 bg-surface-container-high hover:bg-violet-electric hover:text-white text-xs font-mono text-primary rounded border border-purple-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open App</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </header>

      <main className="w-full pt-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low mb-6 border border-purple-500/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-xs text-primary uppercase tracking-wider">
              TRANSIT MATRIX ENGINE v2.8 • BYPASS BOTTLENECK CORRIDORS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-7 flex flex-col items-start space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-violet-lavender uppercase tracking-widest bg-surface-container-high px-2 py-0.5 rounded">
                  Autonomous Routing
                </span>
                <span className="text-violet-lavender">•</span>
                <span className="text-primary uppercase tracking-widest">Next-Gen Transit Optimization</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-on-surface uppercase tracking-tight leading-tight">
                Bypass Waitlists.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-lavender to-white">
                  Unlock Intelligent Split Routing.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                When direct trunk lines choke under heavy GNWL waitlists, Rail Eazy dynamically computes synchronized
                dual-leg interchanges through high-throughput junctions, backed by guaranteed verified buffer windows.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onLaunchRailEngine}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-container text-on-primary-container font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-[3px_3px_0px_#3d1f85] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                >
                  <span>Launch Rail Engine</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-surface-container text-on-surface font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-violet-lavender">account_tree</span>
                  <span>Inspect Methodology</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="bg-surface-container-low p-6 rounded-2xl border border-purple-500/30 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-4 bg-surface-container px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
                    <span className="font-mono text-xs text-on-surface uppercase font-bold">LIVE TELEMETRY</span>
                  </div>
                  <span className="text-[11px] font-mono text-violet-lavender uppercase">SYNC_FREQ: 240ms</span>
                </div>

                <div className="relative bg-surface-container-lowest p-4 mb-4 rounded-xl overflow-hidden flex flex-col justify-between h-48 border border-purple-500/20">
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-violet-lavender uppercase block">ORIGIN NODE</span>
                      <span className="font-pixel text-2xl text-on-surface font-bold">NGP</span>
                      <span className="text-xs text-on-surface-variant block">Nagpur Central</span>
                    </div>
                    <div className="text-center px-2 py-1 bg-secondary-container/60 rounded border border-purple-500/30">
                      <span className="text-[11px] font-mono text-primary uppercase font-bold block">INTERCHANGE: BPL</span>
                      <span className="text-[10px] text-on-surface-variant block">+3h 15m Safe Layover</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-violet-lavender uppercase block">DEST NODE</span>
                      <span className="font-pixel text-2xl text-on-surface font-bold">NDLS</span>
                      <span className="text-xs text-on-surface-variant block">New Delhi Term</span>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between pt-2 bg-surface-container-high/80 px-3 py-1.5 rounded text-xs font-mono">
                    <span className="text-rose-400">DIRECT: GNWL 82</span>
                    <span className="text-mint-glow font-bold bg-mint-emerald/20 px-2 py-0.5 rounded border border-mint-emerald/30">
                      SPLIT: AVAILABLE
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="bg-surface-container p-2.5 rounded-lg flex flex-col">
                    <span className="text-violet-lavender text-[10px]">BUFFER SAFETY</span>
                    <span className="text-on-surface font-bold">99.4% VERIFIED</span>
                  </div>
                  <div className="bg-surface-container p-2.5 rounded-lg flex flex-col">
                    <span className="text-violet-lavender text-[10px]">CORRIDOR AXIS</span>
                    <span className="text-on-surface font-bold">CENTRAL ⇄ NORTH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-surface-container-lowest py-16 border-t border-purple-500/20" id="portals">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-0.5 bg-primary"></span>
                  <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold">LAUNCHPAD ENGINES</span>
                </div>
                <h2 className="text-3xl font-extrabold text-on-surface uppercase tracking-tight">
                  SELECT TRANSIT PORTAL
                </h2>
              </div>
              <p className="text-xs md:text-sm text-on-surface-variant max-w-md mt-2 md:mt-0">
                Active high-demand railway split solver &amp; upcoming domestic aviation multi-modal pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative bg-surface-container-low p-6 rounded-2xl border border-purple-500/30 flex flex-col justify-between shadow-[4px_4px_0px_#3d1f85] hover:border-violet-electric transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container text-on-surface rounded-full border border-mint-emerald/30">
                      <span className="w-2 h-2 rounded-full bg-mint-emerald animate-pulse"></span>
                      <span className="font-mono text-xs text-mint-glow font-bold uppercase">
                        ONLINE • NGP ⇔ NDLS CORRIDOR LIVE
                      </span>
                    </div>
                    <span className="text-xs font-mono text-violet-lavender">PORTAL_ID: 01-RAIL</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-md">
                      <span className="material-symbols-outlined text-2xl">train</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface uppercase">Indian Railways</h3>
                      <span className="text-xs font-mono text-primary uppercase">Trunk Line Split Engine • Timetables Active</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                    Engineered multi-leg routing across heavy trunk corridors via strategic junctions (BPL, ET, VGLJ)
                    to bypass congested direct waitlists and discover unreserved regional segment capacity.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Waitlist Bypass', 'Junction Layover Buffers', 'Class Tariffs (SL, 3A, 2A, CC)'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-surface-container text-on-surface font-mono text-xs rounded border border-purple-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-500/20">
                  <button
                    onClick={onLaunchRailEngine}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-electric to-purple-600 hover:from-purple-500 hover:to-violet-electric text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-violet-electric/30 transition-all cursor-pointer"
                  >
                    <span>Launch Rail Engine</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="relative bg-surface-container-low/60 p-6 rounded-2xl border border-purple-500/20 flex flex-col justify-between opacity-75">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container text-on-surface rounded-full">
                      <span className="w-2 h-2 rounded-full bg-outline"></span>
                      <span className="font-mono text-xs text-on-surface-variant uppercase font-bold">
                        IN DEVELOPMENT • ROADMAP
                      </span>
                    </div>
                    <span className="text-xs font-mono text-on-surface-variant">PORTAL_ID: 02-AVIA</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-violet-lavender">
                      <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-on-surface uppercase">Domestic Aviation</h3>
                      <span className="text-xs font-mono text-on-surface-variant uppercase">Multi-Carrier Transfer Engine</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                    Multi-carrier flight split routing for high-demand routes, calculating self-transfer baggage reclaim buffers
                    and inter-terminal transitions to cut peak holiday fares.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {['LCC Splitting', 'Self-Transfer Bags Buffer', 'Terminal Transit Timers'].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant font-mono text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-500/20">
                  <button
                    disabled
                    className="w-full py-3.5 rounded-xl bg-surface-container text-outline font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-base">lock</span>
                    <span>Roadmap Pipeline (Upcoming)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full" id="how-it-works">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs text-violet-lavender uppercase tracking-widest font-bold">
              ALGORITHMIC LOGIC
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface uppercase tracking-tight mt-1">
              HOW SPLIT ROUTING UNLOCKS BERTHS
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-2">
              Bypassing waitlist deadlock takes precision timing, mathematical quota mapping, and verified layover tolerances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-purple-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-xl">pin_drop</span>
                </div>
                <h3 className="text-base font-bold text-on-surface uppercase mb-2">01. Select Station Pair</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Input origin and destination along the corridor where direct trains show heavy waitlists (GNWL).
                </p>
              </div>
              <div className="pt-2 border-t border-purple-500/20 text-[11px] font-mono text-violet-lavender">
                Query Corridor: NGP → NDLS
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl border border-purple-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-xl">alt_route</span>
                </div>
                <h3 className="text-base font-bold text-on-surface uppercase mb-2">02. Interchange Detection</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  The engine identifies intermediate hubs (Bhopal, Itarsi, Jhansi) with safe transfer windows (45m to 6h).
                </p>
              </div>
              <div className="pt-2 border-t border-purple-500/20 text-[11px] font-mono text-mint-glow">
                Safety Buffer Check: Verified
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl border border-purple-500/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center mb-4 text-white">
                  <span className="material-symbols-outlined text-xl">confirmation_number</span>
                </div>
                <h3 className="text-base font-bold text-on-surface uppercase mb-2">03. Combined Itinerary</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                  Get full timetables, combined fares, and seamless one-click redirection to verify availability on IRCTC.
                </p>
              </div>
              <div className="pt-2 border-t border-purple-500/20 text-[11px] font-mono text-primary">
                Multi-Leg Journey Synced
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-surface-container-lowest border-t border-purple-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div>© 2026 RAIL EAZY PROTOCOL • Autonomous Transit Routing Engine</div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>CORRIDOR: NGP ⇄ NDLS</span>
            <span>IRCTC COMPLIANT TIMETABLES</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==============================================================
// 2. ACTIVE RAILWAY SPLIT-ROUTING ENGINE (DASHBOARD)
// ==============================================================
function RailEngineView({ onBackToLanding }) {
  const [stations, setStations] = useState([]);
  const [origin, setOrigin] = useState('NGP');
  const [destination, setDestination] = useState('NDLS');
  const [preferredClass, setPreferredClass] = useState('3A');
  const [maxLayover, setMaxLayover] = useState(240);
  const [activeTab, setActiveTab] = useState('split');
  const [sortBy, setSortBy] = useState('fastest');
  const [selectedJunctionFilter, setSelectedJunctionFilter] = useState('ALL');

  const [directRoutes, setDirectRoutes] = useState([]);
  const [splitRoutes, setSplitRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const [selectedLegClasses, setSelectedLegClasses] = useState({});
  const [drawerRoute, setDrawerRoute] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    async function fetchStations() {
      try {
        const res = await fetch('/api/routes/stations');
        const json = await res.json();
        if (json.success && json.data) {
          setStations(json.data);
        }
      } catch (err) {
        console.error('Failed to load stations:', err);
      }
    }
    fetchStations();
    handleSearch('NGP', 'NDLS', preferredClass, maxLayover);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSearch = async (
    orig = origin,
    dest = destination,
    pClass = preferredClass,
    maxL = maxLayover
  ) => {
    if (!orig || !dest) return;
    if (orig === dest) {
      setError('Origin and destination cannot be identical.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const url = `/api/routes/search?origin=${orig}&destination=${dest}&preferredClass=${pClass}&minLayoverMinutes=45&maxLayoverMinutes=${maxL}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Error fetching routes');
      }

      setDirectRoutes(data.directRoutes || []);
      setSplitRoutes(data.splitRoutes || []);
      setHasSearched(true);

      const defaultPicks = {};
      (data.splitRoutes || []).forEach((r) => {
        defaultPicks[r.routeId] = {
          leg1: pClass,
          leg2: pClass,
        };
      });
      setSelectedLegClasses(defaultPicks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    const nextOrig = destination;
    const nextDest = origin;
    setOrigin(nextOrig);
    setDestination(nextDest);
    handleSearch(nextOrig, nextDest, preferredClass, maxLayover);
  };

  const pickClass = (routeId, legKey, chosenClass) => {
    setSelectedLegClasses((prev) => ({
      ...prev,
      [routeId]: {
        ...prev[routeId],
        [legKey]: chosenClass,
      },
    }));
  };

  const copySplitItinerary = (route) => {
    const leg1Choice = selectedLegClasses[route.routeId]?.leg1 || preferredClass;
    const leg2Choice = selectedLegClasses[route.routeId]?.leg2 || preferredClass;
    const fare1 = route.leg1.fares[leg1Choice] || 0;
    const fare2 = route.leg2.fares[leg2Choice] || 0;
    const totalFare = fare1 + fare2;

    const summaryText = `🚆 RAIL EAZY SPLIT ITINERARY
Corridor: ${route.leg1.origin} ➔ ${route.leg2.destination} (via ${route.intermediateStation})
Total Duration: ${route.summary.totalTravelTime} | Est Fare: ₹${totalFare}

[LEG 1] ${route.leg1.trainName} (#${route.leg1.trainNumber})
Departure: ${route.leg1.origin} at ${route.leg1.departureTime}
Arrival: ${route.leg1.destination} at ${route.leg1.arrivalTime}
Class: ${leg1Choice} (₹${fare1})

⏱ LAYOVER AT ${route.intermediateStation}: ${route.layover.formatted}

[LEG 2] ${route.leg2.trainName} (#${route.leg2.trainNumber})
Departure: ${route.leg2.origin} at ${route.leg2.departureTime}
Arrival: ${route.leg2.destination} at ${route.leg2.arrivalTime}
Class: ${leg2Choice} (₹${fare2})

Generated via Rail Eazy (${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'})`;

    navigator.clipboard.writeText(summaryText);
    showToast('Itinerary copied to clipboard!');
  };

  const formatLayoverHours = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m > 0 ? String(m).padStart(2, '0') + 'm' : '00m'}`;
  };

  const filteredSplitRoutes = splitRoutes
    .filter((r) => {
      if (selectedJunctionFilter === 'ALL') return true;
      return r.intermediateStation === selectedJunctionFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'fastest') {
        return a.summary.totalDurationMinutes - b.summary.totalDurationMinutes;
      }
      if (sortBy === 'fare') {
        const fareA = (a.leg1.fares[preferredClass] || 0) + (a.leg2.fares[preferredClass] || 0);
        const fareB = (b.leg1.fares[preferredClass] || 0) + (b.leg2.fares[preferredClass] || 0);
        return fareA - fareB;
      }
      if (sortBy === 'layover') {
        return a.layover.durationMinutes - b.layover.durationMinutes;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-space-void text-on-surface antialiased text-sm relative">
      <div className="bg-surface-container-high border-b border-purple-500/30 px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-primary hover:text-white transition-colors font-mono font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Landing &amp; Mode Selector</span>
        </button>
        <span className="font-mono text-mint-glow text-[11px] hidden sm:inline">
          Active Mode: Indian Railways Trunk Corridor (NGP ⇄ NDLS)
        </span>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="relative rounded-2xl bg-surface/90 border border-purple-500/30 p-5 md:p-6 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-3 bg-surface-container-low p-3.5 rounded-xl border border-purple-500/20">
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mb-1 uppercase">
                <span>Origin Station</span>
                <span className="text-mint-glow font-bold">Corridor Node</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-violet-electric">departure_board</span>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-transparent font-bold text-white text-base focus:outline-none w-full cursor-pointer"
                >
                  {stations.map((s) => (
                    <option key={s.code} value={s.code} className="bg-surface text-white">
                      {s.city} ({s.code}) - {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-1 flex justify-center -my-2 lg:my-0 z-10">
              <button
                onClick={handleSwap}
                className="w-11 h-11 rounded-xl bg-surface-container hover:bg-violet-electric border border-purple-500/30 text-on-surface-variant hover:text-white flex items-center justify-center transition-all duration-300"
                title="Swap Stations"
              >
                <span className="material-symbols-outlined text-xl">swap_horiz</span>
              </button>
            </div>

            <div className="lg:col-span-3 bg-surface-container-low p-3.5 rounded-xl border border-purple-500/20">
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mb-1 uppercase">
                <span>Destination Station</span>
                <span className="text-on-surface-variant">Terminus</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-mint-emerald">location_on</span>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-transparent font-bold text-white text-base focus:outline-none w-full cursor-pointer"
                >
                  {stations.map((s) => (
                    <option key={s.code} value={s.code} className="bg-surface text-white">
                      {s.city} ({s.code}) - {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-2 bg-surface-container-low p-3.5 rounded-xl border border-purple-500/20">
              <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mb-1 uppercase">
                <span>Travel Schedule</span>
                <span className="material-symbols-outlined text-sm text-violet-lavender">calendar_month</span>
              </div>
              <div className="font-bold text-white text-base">Daily Timetable</div>
            </div>

            <div className="lg:col-span-3">
              <button
                onClick={() => handleSearch()}
                disabled={loading}
                className="w-full h-full min-h-[64px] rounded-xl bg-gradient-to-r from-violet-electric via-purple-600 to-indigo-600 hover:from-purple-500 hover:to-violet-electric text-white font-mono text-xs font-bold tracking-wider shadow-lg shadow-violet-electric/40 border border-purple-400/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">
                  {loading ? 'progress_activity' : 'search'}
                </span>
                <span>{loading ? 'COMPUTING ROUTES...' : 'FIND SPLIT ROUTES'}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-purple-500/20 grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-surface-container/60 p-3.5 rounded-xl">
            <div className="md:col-span-5 flex flex-col gap-1.5">
              <label className="text-[11px] font-mono text-on-surface-variant uppercase flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-violet-lavender">airline_seat_recline_normal</span>
                Preferred Class
              </label>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {['SL', '3A', '2A', 'CC'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => {
                      setPreferredClass(cls);
                      handleSearch(origin, destination, cls, maxLayover);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                      preferredClass === cls
                        ? 'bg-violet-electric text-white border border-purple-400/40 font-semibold shadow-md shadow-violet-electric/30'
                        : 'bg-surface-container text-on-surface border border-purple-500/20 hover:border-purple-400/40'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-on-surface-variant flex items-center gap-1.5 uppercase">
                  <span className="material-symbols-outlined text-sm text-amber-warning">timelapse</span>
                  Max Layover Buffer
                </span>
                <span className="font-mono text-xs font-semibold text-white bg-surface-container-high px-2 py-0.5 rounded border border-purple-500/30">
                  Up to {formatLayoverHours(maxLayover)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-on-surface-variant">45m</span>
                <input
                  type="range"
                  min="45"
                  max="360"
                  step="15"
                  value={maxLayover}
                  onChange={(e) => setMaxLayover(Number(e.target.value))}
                  className="w-full accent-violet-electric cursor-pointer"
                />
                <span className="font-mono text-[11px] text-on-surface-variant">6h 00m</span>
              </div>
            </div>
          </div>
        </section>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono">
            {error}
          </div>
        )}

        <div className="flex items-center gap-2 border-b border-purple-500/20 pb-2">
          <button
            onClick={() => setActiveTab('split')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'split'
                ? 'bg-violet-electric text-white shadow-md shadow-violet-electric/30 border border-purple-400/30'
                : 'text-on-surface-variant hover:text-white bg-surface-container-low border border-purple-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>Split Routes (Junction Connections)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-violet-lavender font-mono text-[10px]">
              {filteredSplitRoutes.length} Available
            </span>
          </button>

          <button
            onClick={() => setActiveTab('direct')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'direct'
                ? 'bg-violet-electric text-white shadow-md shadow-violet-electric/30 border border-purple-400/30'
                : 'text-on-surface-variant hover:text-white bg-surface-container-low border border-purple-500/20'
            }`}
          >
            <span className="material-symbols-outlined text-sm">straight</span>
            <span>Direct Express Routes</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant font-mono text-[10px]">
              {directRoutes.length} Timetables
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-3 space-y-5">
            <div className="bg-surface/90 rounded-2xl border border-purple-500/20 p-5 space-y-5 backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                <div className="flex items-center gap-2 text-white text-base font-bold">
                  <span className="material-symbols-outlined text-violet-electric text-xl">tune</span>
                  <span>Refine Filters</span>
                </div>
                <button
                  onClick={() => {
                    setSortBy('fastest');
                    setSelectedJunctionFilter('ALL');
                  }}
                  className="text-[11px] font-mono text-violet-lavender hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block font-semibold">
                  Sort Prioritization
                </span>
                <div className="space-y-1 text-xs">
                  {[
                    { id: 'fastest', label: 'Fastest Total Journey', icon: 'speed' },
                    { id: 'fare', label: 'Lowest Combined Fare', icon: 'savings' },
                    { id: 'layover', label: 'Shortest Layover Buffer', icon: 'timer' },
                  ].map((s) => (
                    <label
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                        sortBy === s.id
                          ? 'bg-surface-container border border-purple-500/30 text-white font-medium'
                          : 'hover:bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-violet-electric">{s.icon}</span>
                        {s.label}
                      </span>
                      <input
                        type="radio"
                        name="route-sort"
                        checked={sortBy === s.id}
                        onChange={() => setSortBy(s.id)}
                        className="accent-violet-electric"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider block font-semibold">
                  Intermediate Junctions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedJunctionFilter('ALL')}
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs cursor-pointer ${
                      selectedJunctionFilter === 'ALL'
                        ? 'bg-violet-electric/40 border border-violet-electric text-white'
                        : 'bg-surface-container border border-purple-500/20 text-on-surface-variant'
                    }`}
                  >
                    All Junctions
                  </button>
                  {['BPL', 'ET', 'VGLJ'].map((junc) => (
                    <button
                      key={junc}
                      onClick={() => setSelectedJunctionFilter(junc)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs cursor-pointer ${
                        selectedJunctionFilter === junc
                          ? 'bg-violet-electric/40 border border-violet-electric text-white'
                          : 'bg-surface-container border border-purple-500/20 text-on-surface-variant'
                      }`}
                    >
                      {junc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-9 space-y-6">
            {activeTab === 'split' && (
              <div className="space-y-6">
                {filteredSplitRoutes.length === 0 && hasSearched && !loading && (
                  <div className="p-8 text-center text-on-surface-variant bg-surface rounded-2xl border border-purple-500/20">
                    No split journeys found between {origin} and {destination} matching your layover criteria.
                  </div>
                )}

                {filteredSplitRoutes.map((route) => {
                  const leg1Choice = selectedLegClasses[route.routeId]?.leg1 || preferredClass;
                  const leg2Choice = selectedLegClasses[route.routeId]?.leg2 || preferredClass;

                  const fare1 = route.leg1.fares[leg1Choice] || 0;
                  const fare2 = route.leg2.fares[leg2Choice] || 0;
                  const totalCombinedFare = fare1 + fare2;

                  return (
                    <article
                      key={route.routeId}
                      className="rounded-2xl bg-surface/95 border border-purple-500/30 overflow-hidden shadow-xl hover:border-violet-electric/60 transition-all duration-300"
                    >
                      <div className="bg-gradient-to-r from-purple-950/80 via-surface-container to-purple-950/50 px-5 py-3 border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-bold text-white tracking-wide">
                            Via {route.intermediateStation} Junction
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
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2 py-0.5 rounded bg-violet-electric text-white font-mono text-[11px] font-bold">
                                LEG 1
                              </span>
                              <span className="font-bold text-white">
                                {route.leg1.trainName} ({route.leg1.trainNumber})
                              </span>
                            </div>
                            <span className="text-xs font-mono text-on-surface-variant">
                              Duration: {route.leg1.duration}
                            </span>
                          </div>

                          <div className="bg-surface-container-low p-4 rounded-xl border border-purple-500/20 grid grid-cols-12 gap-3 items-center">
                            <div className="col-span-4">
                              <span className="text-2xl font-bold text-white">{route.leg1.departureTime}</span>
                              <div className="text-xs text-violet-lavender mt-0.5">{route.leg1.origin}</div>
                            </div>
                            <div className="col-span-4 text-center">
                              <span className="font-mono text-[11px] text-on-surface-variant">{route.leg1.duration}</span>
                              <div className="w-full flex items-center gap-1 my-1">
                                <span className="w-2 h-2 rounded-full bg-violet-electric shrink-0"></span>
                                <div className="h-0.5 w-full bg-gradient-to-r from-violet-electric to-purple-400"></div>
                                <span className="material-symbols-outlined text-sm text-violet-lavender">arrow_forward</span>
                                <div className="h-0.5 w-full bg-gradient-to-r from-purple-400 to-violet-electric"></div>
                                <span className="w-2 h-2 rounded-full bg-violet-electric shrink-0"></span>
                              </div>
                            </div>
                            <div className="col-span-4 text-right">
                              <span className="text-2xl font-bold text-white">{route.leg1.arrivalTime}</span>
                              <div className="text-xs text-violet-lavender mt-0.5">{route.leg1.destination}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="font-mono text-[11px] text-on-surface-variant uppercase">Select Class:</span>
                            {Object.entries(route.leg1.fares).map(([clsName, fare]) => {
                              if (!fare) return null;
                              const isSelected = leg1Choice === clsName;
                              return (
                                <button
                                  key={clsName}
                                  onClick={() => pickClass(route.routeId, 'leg1', clsName)}
                                  className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-2 transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-violet-electric text-white border border-purple-400/40 shadow-md'
                                      : 'bg-surface-container text-on-surface border border-purple-500/20 hover:bg-surface-container-high'
                                  }`}
                                >
                                  <span className="font-bold">{clsName}</span>
                                  <span className="font-mono">₹{fare}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="relative py-1 flex flex-col items-center">
                          <div className="w-full bg-surface-container-high rounded-xl p-3 border border-purple-500/30 flex items-center justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2.5 text-xs">
                              <span className="material-symbols-outlined text-amber-warning text-lg">schedule</span>
                              <span className="font-semibold text-white">
                                ⏱ {route.layover.formatted} Layover at {route.intermediateStation}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-violet-lavender bg-violet-electric/10 border border-violet-electric/30 px-2 py-0.5 rounded">
                              Transfer Buffer Verified
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="px-2 py-0.5 rounded bg-violet-electric text-white font-mono text-[11px] font-bold">
                                LEG 2
                              </span>
                              <span className="font-bold text-white">
                                {route.leg2.trainName} ({route.leg2.trainNumber})
                              </span>
                            </div>
                            <span className="text-xs font-mono text-on-surface-variant">
                              Duration: {route.leg2.duration}
                            </span>
                          </div>

                          <div className="bg-surface-container-low p-4 rounded-xl border border-purple-500/20 grid grid-cols-12 gap-3 items-center">
                            <div className="col-span-4">
                              <span className="text-2xl font-bold text-white">{route.leg2.departureTime}</span>
                              <div className="text-xs text-violet-lavender mt-0.5">{route.leg2.origin}</div>
                            </div>
                            <div className="col-span-4 text-center">
                              <span className="font-mono text-[11px] text-on-surface-variant">{route.leg2.duration}</span>
                              <div className="w-full flex items-center gap-1 my-1">
                                <span className="w-2 h-2 rounded-full bg-violet-electric shrink-0"></span>
                                <div className="h-0.5 w-full bg-gradient-to-r from-violet-electric to-purple-400"></div>
                                <span className="material-symbols-outlined text-sm text-violet-lavender">arrow_forward</span>
                                <div className="h-0.5 w-full bg-gradient-to-r from-purple-400 to-violet-electric"></div>
                                <span className="w-2 h-2 rounded-full bg-violet-electric shrink-0"></span>
                              </div>
                            </div>
                            <div className="col-span-4 text-right">
                              <span className="text-2xl font-bold text-white">{route.leg2.arrivalTime}</span>
                              <div className="text-xs text-violet-lavender mt-0.5">{route.leg2.destination}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="font-mono text-[11px] text-on-surface-variant uppercase">Select Class:</span>
                            {Object.entries(route.leg2.fares).map(([clsName, fare]) => {
                              if (!fare) return null;
                              const isSelected = leg2Choice === clsName;
                              return (
                                <button
                                  key={clsName}
                                  onClick={() => pickClass(route.routeId, 'leg2', clsName)}
                                  className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-2 transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-violet-electric text-white border border-purple-400/40 shadow-md'
                                      : 'bg-surface-container text-on-surface border border-purple-500/20 hover:bg-surface-container-high'
                                  }`}
                                >
                                  <span className="font-bold">{clsName}</span>
                                  <span className="font-mono">₹{fare}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                            <div>
                              <span className="text-[11px] font-mono text-on-surface-variant uppercase">Total Journey</span>
                              <div className="text-xl font-bold text-white">{route.summary.totalTravelTime}</div>
                              <span className="text-[10px] text-on-surface-variant">
                                Travel + {route.layover.formatted} Layover
                              </span>
                            </div>
                            <div className="h-8 w-px bg-purple-500/20"></div>
                            <div>
                              <span className="text-[11px] font-mono text-on-surface-variant uppercase">Combined Fare</span>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold text-mint-glow">
                                  ₹{totalCombinedFare.toLocaleString('en-IN')}
                                </span>
                                <span className="font-mono text-xs text-on-surface-variant">
                                  ({leg1Choice} + {leg2Choice})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 w-full sm:w-auto">
                            <button
                              onClick={() => copySplitItinerary(route)}
                              className="px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface border border-purple-500/20 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Copy itinerary details to clipboard"
                            >
                              <span className="material-symbols-outlined text-sm text-violet-lavender">content_copy</span>
                              <span>Copy Details</span>
                            </button>

                            <button
                              onClick={() => setDrawerRoute(route)}
                              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-electric to-purple-600 hover:from-purple-500 hover:to-violet-electric text-white text-sm font-bold shadow-lg shadow-violet-electric/30 border border-purple-400/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
                              <span>Open Booking Drawer</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {activeTab === 'direct' && (
              <div className="space-y-4">
                {directRoutes.length === 0 && hasSearched && !loading && (
                  <div className="p-8 text-center text-on-surface-variant bg-surface rounded-2xl border border-purple-500/20">
                    No direct trains found between {origin} and {destination}. Check the Split Routes tab for connections.
                  </div>
                )}

                {directRoutes.map((r) => (
                  <article
                    key={r.routeId}
                    className="rounded-2xl bg-surface-container-low border border-purple-500/20 p-5 md:p-6 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-xs font-semibold border border-purple-500/30">
                          Direct Service
                        </span>
                        <span className="text-lg font-bold text-white">
                          {r.train.trainName} ({r.train.trainNumber})
                        </span>
                      </div>
                      <span className="font-mono text-xs text-on-surface-variant">Single Train (No Interchange)</span>
                    </div>

                    <div className="bg-surface-container p-4 rounded-xl border border-purple-500/20 grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-4">
                        <span className="text-2xl font-bold text-white">{r.train.departureTime}</span>
                        <div className="text-xs text-on-surface-variant mt-0.5">{r.train.origin}</div>
                      </div>
                      <div className="col-span-4 text-center">
                        <span className="font-mono text-[11px] text-on-surface-variant">{r.train.duration}</span>
                        <div className="w-full flex items-center justify-center my-1">
                          <span className="material-symbols-outlined text-sm text-on-surface-variant/50">arrow_forward</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant">Direct non-stop</span>
                      </div>
                      <div className="col-span-4 text-right">
                        <span className="text-2xl font-bold text-white">{r.train.arrivalTime}</span>
                        <div className="text-xs text-on-surface-variant mt-0.5">{r.train.destination}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-purple-500/20">
                      <div className="flex items-center gap-3 flex-wrap text-xs">
                        <span className="font-mono text-[11px] text-on-surface-variant uppercase">Rates:</span>
                        {Object.entries(r.train.fares).map(([cls, fare]) => {
                          if (!fare) return null;
                          return (
                            <div key={cls} className="px-3 py-1 rounded-lg bg-surface-container border border-purple-500/20">
                              <span className="font-medium text-white">{cls}:</span>{' '}
                              <span className="font-mono text-on-surface">₹{fare}</span>
                            </div>
                          );
                        })}
                      </div>
                      <a
                        href="https://www.irctc.co.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-violet-lavender hover:text-white flex items-center gap-1"
                      >
                        <span>Check on IRCTC</span>
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Slide-over Booking Drawer */}
      {drawerRoute && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-all">
          <div className="w-full max-w-md bg-surface-container-lowest border-l border-purple-500/30 h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-purple-500/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">confirmation_number</span>
                  <span className="font-pixel text-lg text-white font-bold uppercase">Split Booking Guide</span>
                </div>
                <button
                  onClick={() => setDrawerRoute(null)}
                  className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-white transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="p-3 bg-primary-container/10 border border-primary-container/30 rounded-xl text-xs space-y-1">
                <div className="font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">info</span>
                  Recommended Booking Order:
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Book <strong>Leg 2 first</strong> to guarantee the overnight trunk leg into Delhi, then book <strong>Leg 1</strong>.
                </p>
              </div>

              {/* Leg 1 Item */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-purple-500/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded bg-violet-electric text-white text-[10px] font-mono font-bold">
                    STEP 1 (ORIGIN LEG)
                  </span>
                  <span className="font-mono text-xs text-mint-glow">
                    {selectedLegClasses[drawerRoute.routeId]?.leg1 || preferredClass}: ₹
                    {drawerRoute.leg1.fares[selectedLegClasses[drawerRoute.routeId]?.leg1 || preferredClass] || 0}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {drawerRoute.leg1.trainName} ({drawerRoute.leg1.trainNumber})
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {drawerRoute.leg1.origin} ({drawerRoute.leg1.departureTime}) ➔ {drawerRoute.leg1.destination} ({drawerRoute.leg1.arrivalTime})
                  </p>
                </div>
                <a
                  href={`https://www.irctc.co.in/nget/train-search`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-surface-container hover:bg-violet-electric hover:text-white text-primary text-xs font-mono font-bold rounded-lg border border-purple-500/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Book Leg 1 on IRCTC</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>

              {/* Transfer Indicator */}
              <div className="flex items-center gap-2 px-3 py-2 bg-surface-container rounded-xl text-xs font-mono text-violet-lavender justify-center border border-purple-500/20">
                <span className="material-symbols-outlined text-sm text-amber-warning">timelapse</span>
                <span>Interchange at {drawerRoute.intermediateStation} ({drawerRoute.layover.formatted})</span>
              </div>

              {/* Leg 2 Item */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-purple-500/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-mono font-bold">
                    STEP 2 (CONNECTING LEG)
                  </span>
                  <span className="font-mono text-xs text-mint-glow">
                    {selectedLegClasses[drawerRoute.routeId]?.leg2 || preferredClass}: ₹
                    {drawerRoute.leg2.fares[selectedLegClasses[drawerRoute.routeId]?.leg2 || preferredClass] || 0}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {drawerRoute.leg2.trainName} ({drawerRoute.leg2.trainNumber})
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {drawerRoute.leg2.origin} ({drawerRoute.leg2.departureTime}) ➔ {drawerRoute.leg2.destination} ({drawerRoute.leg2.arrivalTime})
                  </p>
                </div>
                <a
                  href={`https://www.irctc.co.in/nget/train-search`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-surface-container hover:bg-violet-electric hover:text-white text-primary text-xs font-mono font-bold rounded-lg border border-purple-500/30 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Book Leg 2 on IRCTC</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-purple-500/20 space-y-3">
              <button
                onClick={() => copySplitItinerary(drawerRoute)}
                className="w-full py-3 bg-surface-container hover:bg-surface-container-high text-white font-mono text-xs font-bold rounded-xl border border-purple-500/30 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">content_copy</span>
                <span>Copy Dual-Leg Itinerary</span>
              </button>
              <button
                onClick={() => setDrawerRoute(null)}
                className="w-full py-2.5 text-on-surface-variant hover:text-white text-xs font-mono transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-container-high border border-purple-500/40 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined text-mint-emerald text-xl">check_circle</span>
          <span className="text-xs font-mono">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

// ==============================================================
// 3. MAIN ROUTER WRAPPER
// ==============================================================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');

  if (currentScreen === 'landing') {
    return <LandingView onLaunchRailEngine={() => setCurrentScreen('railway')} />;
  }

  return <RailEngineView onBackToLanding={() => setCurrentScreen('landing')} />;
}