import React, { useState } from 'react';

export default function LandingPage({ 
  onLaunchEngine, 
  backendStatus = 'ok' 
}) {
  const [showToast, setShowToast] = useState(false);

  const handleLaunch = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onLaunchEngine();
    }, 1200);
  };

  const handleSelectPreset = (orig, dest) => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onLaunchEngine(orig, dest);
    }, 800);
  };

  return (
    <div className="bg-space-void font-body-medium text-body-medium text-on-surface antialiased min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-space-void/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.5)] border-b border-purple-500/20">
        <div className="h-16 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-electric to-purple-800 flex items-center justify-center text-white glow-box-violet border border-purple-400/40">
              <span className="material-symbols-outlined text-xl text-violet-200">train</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-5 text-headline-5 text-on-surface tracking-wider uppercase leading-none">
                RAIL EAZY
              </span>
              <span className="font-small text-small text-violet-lavender uppercase tracking-widest leading-none mt-1">
                TRANSIT MATRIX
              </span>
            </div>
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 bg-surface-container-lowest text-on-surface border border-purple-500/20">
              <span className={`w-2 h-2 rounded-full ${backendStatus === 'ok' ? 'bg-mint-emerald animate-pulse' : 'bg-amber-warning'}`}></span>
              <span className="font-small text-small text-primary uppercase tracking-widest">
                LIVE NETWORK: NGP ⇄ NDLS
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-space-xs">
            <button 
              className="px-3 py-1.5 uppercase tracking-wider bg-primary-container text-on-primary-container font-label-pixel text-label-pixel shadow-[2px_2px_0px_#3d1f85] cursor-pointer"
              onClick={() => {}}
            >
              Transit Portals
            </button>
            <button 
              className="px-3 py-1.5 font-label-pixel text-label-pixel text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors uppercase tracking-wider cursor-pointer"
              onClick={() => onLaunchEngine()}
            >
              Network Matrix
            </button>
            <a 
              className="px-3 py-1.5 font-label-pixel text-label-pixel text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors uppercase tracking-wider cursor-pointer"
              href="#how-it-works"
            >
              Methodology
            </a>
            <button 
              className="px-3 py-1.5 font-label-pixel text-label-pixel text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors uppercase tracking-wider cursor-pointer"
              onClick={() => onLaunchEngine()}
            >
              Timetables
            </button>
            <a 
              className="px-3 py-1.5 font-label-pixel text-label-pixel text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors uppercase tracking-wider"
              href="https://github.com/SohanGanji/Rail-Eazy"
              target="_blank"
              rel="noopener noreferrer"
            >
              API / Docs
            </a>
          </nav>

          <div className="flex items-center gap-space-sm shrink-0">
            <button 
              className="px-3 py-1.5 bg-primary-container text-on-primary-container font-label-pixel text-xs uppercase tracking-wider shadow-[2px_2px_0px_#3d1f85] hover:bg-violet-electric transition-all flex items-center gap-1.5 cursor-pointer"
              onClick={handleLaunch}
            >
              <span>Launch Matrix</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-16 bg-space-void">
        <div className="flex flex-col w-full">
          {/* Top Ambient Glow & Radial Scrim */}
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[55rem] h-[30rem] bg-gradient-to-b from-primary-container/20 via-violet-deep/15 to-transparent blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-1/4 -left-32 w-80 h-80 bg-violet-deep/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="absolute top-1/3 -right-32 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

            {/* Section 1: Hero Header & Mission */}
            <section className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-space-2xl pb-space-2xl">
              {/* Super-tag Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low mb-space-lg shadow-sm border border-purple-500/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-pixel text-label-pixel text-primary uppercase tracking-wider">
                  TRANSIT MATRIX ENGINE v2.8 • BYPASS BOTTLENECK CORRIDORS
                </span>
              </div>

              {/* Hero Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center mb-space-2xl">
                {/* Left: Text & CTA */}
                <div className="lg:col-span-7 flex flex-col items-start">
                  <div className="flex items-center gap-space-xs mb-space-xs">
                    <span className="font-small text-small text-violet-lavender uppercase tracking-widest bg-surface-container-high px-2 py-0.5">
                      Autonomous Dispatch
                    </span>
                    <span className="text-violet-lavender text-small">•</span>
                    <span className="font-small text-small text-tertiary uppercase tracking-widest">
                      Next-Gen Transit Optimization
                    </span>
                  </div>

                  <h1 className="font-headline-1 text-headline-1 text-on-surface uppercase mb-space-md tracking-tight leading-none">
                    Bypass Waitlists.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-on-primary-container">
                      Unlock Intelligent Split Routing.
                    </span>
                  </h1>

                  <p className="font-body-large text-body-large text-on-surface-variant max-w-2xl mb-space-xl leading-relaxed">
                    When direct trunk lines choke under heavy GNWL waitlists, Rail Eazy dynamically computes synchronized dual-leg interchanges through high-throughput junctions, backed by guaranteed verified buffer windows.
                  </p>

                  <div className="flex flex-wrap items-center gap-space-md">
                    <button
                      className="inline-flex items-center gap-space-xs px-6 py-3.5 bg-primary-container text-on-primary-container font-label-pixel text-label-pixel uppercase tracking-wider shadow-[3px_3px_0px_#3d1f85] hover:shadow-[1px_1px_0px_#3d1f85] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                      onClick={handleLaunch}
                    >
                      <span>Launch Matrix Portal</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>

                    <a
                      className="inline-flex items-center gap-space-xs px-5 py-3.5 bg-surface-container text-on-surface font-label-pixel text-label-pixel uppercase tracking-wider hover:bg-surface-container-high transition-colors"
                      href="#how-it-works"
                    >
                      <span className="material-symbols-outlined text-base text-violet-lavender">account_tree</span>
                      <span>Inspect Methodology</span>
                    </a>
                  </div>
                </div>

                {/* Right: Telemetry Radar Visual Card */}
                <div className="lg:col-span-5 w-full">
                  <div className="bg-surface-container-low p-space-lg shadow-xl relative overflow-hidden border border-purple-500/20">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-container via-primary to-violet-lavender"></div>
                    <div className="flex items-center justify-between pb-space-sm mb-space-md bg-surface-container px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
                        <span className="font-label-pixel text-label-pixel text-on-surface uppercase">LIVE CORRIDOR TELEMETRY</span>
                      </div>
                      <span className="font-small text-small text-violet-lavender uppercase font-mono">SYNC_FREQ: 240ms</span>
                    </div>

                    {/* Vector Network Node Display */}
                    <div className="relative bg-surface-container-lowest p-space-md mb-space-md overflow-hidden flex flex-col justify-between h-48 border border-purple-500/20">
                      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern height="24" id="synth-grid" patternUnits="userSpaceOnUse" width="24">
                            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#7b51df" strokeDasharray="2,2" strokeWidth="0.75"></path>
                          </pattern>
                        </defs>
                        <rect fill="url(#synth-grid)" height="100%" width="100%"></rect>
                        <path d="M 30,120 L 140,50 L 260,110 L 370,40" fill="none" stroke="#d0bcff" strokeLinecap="round" strokeWidth="2.5"></path>
                        <circle cx="30" cy="120" fill="#7b51df" r="5" stroke="#d0bcff" strokeWidth="2"></circle>
                        <circle cx="140" cy="50" fill="#cebdff" r="6" stroke="#3d1f85" strokeWidth="2"></circle>
                        <circle cx="260" cy="110" fill="#7b51df" r="5" stroke="#d0bcff" strokeWidth="2"></circle>
                        <circle cx="370" cy="40" fill="#d0bcff" r="6" stroke="#3d1f85" strokeWidth="2"></circle>
                      </svg>
                      
                      <div className="relative z-10 flex justify-between items-start">
                        <div>
                          <span className="font-small text-small text-violet-lavender uppercase block">ORIGIN NODE</span>
                          <span className="font-headline-4 text-headline-4 text-on-surface font-bold">NGP</span>
                          <span className="font-body-small text-body-small text-on-surface-variant block">Nagpur Central</span>
                        </div>
                        <div className="text-center px-2 py-1 bg-secondary-container/60 shadow-sm border border-purple-500/20">
                          <span className="font-label-pixel text-label-pixel text-primary uppercase">SPLIT: BPL JUNCTION</span>
                          <span className="font-small text-small text-canvas-light block">+1h 45m Transfer Safe Buffer</span>
                        </div>
                        <div className="text-right">
                          <span className="font-small text-small text-violet-lavender uppercase block">DEST NODE</span>
                          <span className="font-headline-4 text-headline-4 text-on-surface font-bold">NDLS</span>
                          <span className="font-body-small text-body-small text-on-surface-variant block">New Delhi Term</span>
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-between pt-space-xs bg-surface-container-high/80 px-space-sm">
                        <span className="font-small text-small text-primary font-mono tracking-wider">DIRECT WAITLIST: GNWL 82</span>
                        <span className="font-small text-small text-on-primary-container font-mono font-bold bg-primary-container px-2 py-0.5">
                          SPLIT: BERTH AVAILABLE (CNF)
                        </span>
                      </div>
                    </div>

                    {/* Mini telemetry specs */}
                    <div className="grid grid-cols-2 gap-space-xs font-mono text-small">
                      <div className="bg-surface-container p-2 flex flex-col">
                        <span className="text-violet-lavender text-small">BUFFER SAFETY INDEX</span>
                        <span className="text-on-surface font-bold">99.4% VERIFIED</span>
                      </div>
                      <div className="bg-surface-container p-2 flex flex-col">
                        <span className="text-violet-lavender text-small">PLATFORM RE-WALK</span>
                        <span className="text-on-surface font-bold">PF 1 → PF 3 (4.2 MIN)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick KPI Stats Bar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md p-space-md bg-surface-container-low shadow-md border border-purple-500/20">
                <div className="flex items-start gap-space-md p-space-sm bg-surface-container">
                  <div className="w-10 h-10 bg-primary-container/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                  </div>
                  <div>
                    <div className="font-headline-3 text-headline-3 text-on-surface leading-none mb-1">0</div>
                    <div className="font-label-pixel text-label-pixel text-primary uppercase">Missed Connections</div>
                    <div className="font-body-small text-body-small text-on-surface-variant">Guaranteed &gt;60m buffer algorithm</div>
                  </div>
                </div>

                <div className="flex items-start gap-space-md p-space-sm bg-surface-container">
                  <div className="w-10 h-10 bg-violet-deep flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-tertiary text-xl">airline_seat_recline_extra</span>
                  </div>
                  <div>
                    <div className="font-headline-3 text-headline-3 text-on-surface leading-none mb-1">3x</div>
                    <div className="font-label-pixel text-label-pixel text-tertiary uppercase">Berth Availability</div>
                    <div className="font-body-small text-body-small text-on-surface-variant">Regional quota unlocking (RLWL → CNF)</div>
                  </div>
                </div>

                <div className="flex items-start gap-space-md p-space-sm bg-surface-container">
                  <div className="w-10 h-10 bg-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-violet-lavender text-xl">database</span>
                  </div>
                  <div>
                    <div className="font-headline-3 text-headline-3 text-on-surface leading-none mb-1">100%</div>
                    <div className="font-label-pixel text-label-pixel text-violet-lavender uppercase">Real IRCTC Timetables</div>
                    <div className="font-body-small text-body-small text-on-surface-variant">Direct Central &amp; Northern Rail feeds</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Section 2: Transit Mode Selector */}
          <section className="w-full bg-surface-container-lowest py-space-3xl" id="portals">
            <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
                <div>
                  <div className="flex items-center gap-space-xs mb-space-2xs">
                    <span className="w-3 h-0.5 bg-primary"></span>
                    <span className="font-label-pixel text-label-pixel text-primary uppercase tracking-widest">LAUNCHPAD ENGINES</span>
                  </div>
                  <h2 className="font-headline-2 text-headline-2 text-on-surface uppercase tracking-tight">
                    SELECT TRANSIT PORTAL
                  </h2>
                </div>
                <p className="font-body-medium text-body-medium text-on-surface-variant max-w-md mt-2 md:mt-0">
                  Active high-demand railway split solver &amp; upcoming domestic aviation multi-modal pipelines.
                </p>
              </div>

              {/* 2-Column Selectable Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl">
                {/* Portal Card A: Active Hub */}
                <div className="relative bg-surface-container-low p-space-xl flex flex-col justify-between shadow-[4px_4px_0px_#3d1f85] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] border border-purple-500/30">
                  <div className="flex items-center justify-between mb-space-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container text-on-surface shadow-sm border border-mint-emerald/30">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="font-label-pixel text-label-pixel text-primary uppercase">ONLINE • NGP ⇔ NDLS CORRIDOR LIVE</span>
                    </div>
                    <span className="font-small text-small text-violet-lavender font-mono">PORTAL_ID: 01-RAIL</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-space-md mb-space-md">
                      <div className="w-14 h-14 bg-primary-container flex items-center justify-center text-on-primary-container shadow-md">
                        <span className="material-symbols-outlined text-3xl">train</span>
                      </div>
                      <div>
                        <h3 className="font-headline-3 text-headline-3 text-on-surface uppercase">Indian Railways</h3>
                        <span className="font-small text-small text-tertiary uppercase tracking-wider">Trunk Line Split Engine • IRCTC Verified</span>
                      </div>
                    </div>
                    <p className="font-body-medium text-body-medium text-on-surface-variant mb-space-lg leading-relaxed">
                      Engineered multi-leg routing across heavy trunk corridors via strategic junctions (BPL, ET, VGLJ) to bypass high-regret GNWL queues and discover hidden segment quotas.
                    </p>
                    <div className="flex flex-wrap gap-space-xs mb-space-lg">
                      <span className="px-2.5 py-1 bg-surface-container text-on-surface font-label-pixel text-label-pixel uppercase">Waitlist Bypass</span>
                      <span className="px-2.5 py-1 bg-surface-container text-on-surface font-label-pixel text-label-pixel uppercase">Junction Layover Buffers</span>
                      <span className="px-2.5 py-1 bg-surface-container text-on-surface font-label-pixel text-label-pixel uppercase">Class Tariffs [SL, 3A, 2A, CC]</span>
                    </div>
                  </div>

                  <div className="pt-space-md bg-surface-container px-space-md pb-space-md mt-space-md">
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-small text-small text-violet-lavender uppercase">Corridor Status</span>
                      <span className="font-small text-small text-on-surface font-mono">6 Daily Synchronized Splits Active</span>
                    </div>
                    <button 
                      className="w-full py-3.5 bg-primary-container text-on-primary-container font-label-pixel text-label-pixel uppercase tracking-wider flex items-center justify-center gap-2 shadow-[2px_2px_0px_#3d1f85] hover:bg-violet-electric transition-colors cursor-pointer"
                      onClick={handleLaunch}
                    >
                      <span>Launch Rail Engine</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* Portal Card B: Air Transfers */}
                <div className="relative bg-surface-container-low p-space-xl flex flex-col justify-between shadow-sm opacity-90 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-space-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container text-on-surface">
                      <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                      <span className="font-label-pixel text-label-pixel text-tertiary uppercase">IN DEVELOPMENT • Q2 ROADMAP</span>
                    </div>
                    <span className="font-small text-small text-on-surface-variant font-mono">PORTAL_ID: 02-AVIA</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-space-md mb-space-md">
                      <div className="w-14 h-14 bg-surface-container-high flex items-center justify-center text-violet-lavender">
                        <span className="material-symbols-outlined text-3xl">flight_takeoff</span>
                      </div>
                      <div>
                        <h3 className="font-headline-3 text-headline-3 text-on-surface uppercase">Domestic Aviation</h3>
                        <span className="font-small text-small text-on-surface-variant uppercase tracking-wider">Multi-Carrier Self-Transfer Engine</span>
                      </div>
                    </div>
                    <p className="font-body-medium text-body-medium text-on-surface-variant mb-space-lg leading-relaxed">
                      Multi-carrier flight split routing for high-demand routes, calculating self-transfer baggage reclaim buffers and inter-terminal transitions to cut peak holiday fares.
                    </p>
                    <div className="flex flex-wrap gap-space-xs mb-space-lg">
                      <span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant font-label-pixel text-label-pixel uppercase">Low-Cost Carrier Splitting</span>
                      <span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant font-label-pixel text-label-pixel uppercase">Self-Transfer Bags Buffer</span>
                      <span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant font-label-pixel text-label-pixel uppercase">Terminal Transit Timers</span>
                    </div>
                  </div>

                  <div className="pt-space-md bg-surface-container-high px-space-md pb-space-md mt-space-md">
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="font-small text-small text-on-surface-variant uppercase">Target Hubs</span>
                      <span className="font-small text-small text-on-surface-variant font-mono">DEL • BOM • BLR Airport Terminals</span>
                    </div>
                    <button className="w-full py-3.5 bg-surface-container text-outline font-label-pixel text-label-pixel uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed" disabled>
                      <span className="material-symbols-outlined text-base">lock</span>
                      <span>View Architecture Roadmap (Q2 2025)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: How It Works Strip */}
          <section className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-3xl w-full" id="how-it-works">
            <div className="text-center max-w-2xl mx-auto mb-space-2xl">
              <div className="inline-flex items-center gap-2 mb-space-2xs">
                <span className="font-label-pixel text-label-pixel text-violet-lavender uppercase tracking-widest">ALGORITHMIC LOGIC</span>
              </div>
              <h2 className="font-headline-2 text-headline-2 text-on-surface uppercase tracking-tight">
                HOW SPLIT ROUTING UNLOCKS BERTHS
              </h2>
              <p className="font-body-medium text-body-medium text-on-surface-variant mt-space-xs">
                Bypassing waitlist deadlock takes precision timing, mathematical quota mapping, and zero risk tolerance.
              </p>
            </div>

            {/* 3-Column Stepper */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
              <div className="bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm relative border border-purple-500/20">
                <div className="absolute top-0 right-0 px-3 py-1 bg-surface-container text-violet-lavender font-label-pixel text-label-pixel">
                  STEP 01 / INPUT
                </div>
                <div>
                  <div className="w-12 h-12 bg-surface-container flex items-center justify-center mb-space-md text-primary">
                    <span className="material-symbols-outlined text-2xl">pin_drop</span>
                  </div>
                  <h3 className="font-headline-4 text-headline-4 text-on-surface uppercase mb-space-sm">
                    Select Origin &amp; Destination
                  </h3>
                  <p className="font-body-small text-body-small text-on-surface-variant leading-relaxed mb-space-md">
                    Input your high-demand city pair (e.g., Nagpur Central to New Delhi) where standard direct trains show locked waitlists (GNWL 40+ or REGRET status).
                  </p>
                </div>
                <div className="pt-space-sm bg-surface-container-lowest px-3 py-2">
                  <span className="font-small text-small text-violet-lavender font-mono uppercase">Query Target: NGP → NDLS</span>
                </div>
              </div>

              <div className="bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm relative border border-purple-500/20">
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary-container text-on-primary-container font-label-pixel text-label-pixel">
                  STEP 02 / COMPUTE
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary-container/20 flex items-center justify-center mb-space-md text-primary">
                    <span className="material-symbols-outlined text-2xl">alt_route</span>
                  </div>
                  <h3 className="font-headline-4 text-headline-4 text-on-surface uppercase mb-space-sm">
                    Interchange Detection
                  </h3>
                  <p className="font-body-small text-body-small text-on-surface-variant leading-relaxed mb-space-md">
                    The matrix analyzes central junctions (Bhopal Jn, Itarsi Jn) for isolated regional pool allocations (PQWL / RLWL) paired with verified 1h 15m to 4h transfer buffers.
                  </p>
                </div>
                <div className="pt-space-sm bg-surface-container-lowest px-3 py-2">
                  <span className="font-small text-small text-primary font-mono uppercase">Safety Buffer Check: PASSED (&gt;75m)</span>
                </div>
              </div>

              <div className="bg-surface-container-low p-space-lg flex flex-col justify-between shadow-sm relative border border-purple-500/20">
                <div className="absolute top-0 right-0 px-3 py-1 bg-surface-container text-tertiary font-label-pixel text-label-pixel">
                  STEP 03 / CONFIRM
                </div>
                <div>
                  <div className="w-12 h-12 bg-secondary-container flex items-center justify-center mb-space-md text-canvas-light">
                    <span className="material-symbols-outlined text-2xl">confirmation_number</span>
                  </div>
                  <h3 className="font-headline-4 text-headline-4 text-on-surface uppercase mb-space-sm">
                    Synchronized Itinerary
                  </h3>
                  <p className="font-body-small text-body-small text-on-surface-variant leading-relaxed mb-space-md">
                    Get an exact dual-train itinerary detailing confirmed seat likelihood, platform change distances, foot-overbridge transit durations, and combined class tariffs.
                  </p>
                </div>
                <div className="pt-space-sm bg-surface-container-lowest px-3 py-2">
                  <span className="font-small text-small text-tertiary font-mono uppercase">Status: Confirmed Berths Available</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Interactive Quick-Preview Corridor Terminal */}
          <section className="w-full bg-surface-container-lowest py-space-3xl">
            <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
              <div className="bg-surface-container-low p-space-lg shadow-xl border border-purple-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md mb-space-lg bg-surface-container px-space-md py-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-xl">terminal</span>
                    <div>
                      <h3 className="font-label-pixel text-label-pixel text-on-surface uppercase">
                        ACTIVE LIVE CORRIDOR MATRIX: NAGPUR (NGP) ⇔ NEW DELHI (NDLS)
                      </h3>
                      <span className="font-small text-small text-on-surface-variant">Real-Time IRCTC PNR Pool Telemetry Engine</span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="font-small text-small text-primary font-mono uppercase">2 OPTIMAL SPLITS COMPUTED</span>
                  </div>
                </div>

                {/* Terminal Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-body-small text-body-small">
                    <thead>
                      <tr className="bg-surface-container-high text-violet-lavender font-label-pixel text-label-pixel uppercase">
                        <th className="p-space-sm">Route Split Pair</th>
                        <th className="p-space-sm">Leg 1 Departure</th>
                        <th className="p-space-sm">Junction Interchange</th>
                        <th className="p-space-sm">Leg 2 Arrival</th>
                        <th className="p-space-sm">Verified Layover</th>
                        <th className="p-space-sm">Est. Total Fare</th>
                        <th className="p-space-sm text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-on-surface">
                      <tr className="hover:bg-surface-container transition-colors border-b border-purple-500/10">
                        <td className="p-space-sm font-mono">
                          <div className="font-bold text-primary">NGP → BPL → NZM</div>
                          <div className="text-small text-on-surface-variant">Vande Bharat (20825) + Shaan-e-Bhopal (12155)</div>
                        </td>
                        <td className="p-space-sm">
                          <span className="font-bold">14:05</span>
                          <span className="text-small text-on-surface-variant block">NGP Platform 2</span>
                        </td>
                        <td className="p-space-sm">
                          <span className="bg-secondary-container px-2 py-0.5 text-canvas-light text-small font-mono uppercase">Bhopal Jn (BPL)</span>
                          <span className="text-small text-on-surface-variant block mt-0.5">Arrive 19:25</span>
                        </td>
                        <td className="p-space-sm">
                          <span className="font-bold">07:55</span>
                          <span className="text-small text-on-surface-variant block">NZM Platform 3</span>
                        </td>
                        <td className="p-space-sm font-mono text-primary font-bold">
                          3h 15m Safe Buffer
                        </td>
                        <td className="p-space-sm font-mono font-bold text-canvas-light">
                          ₹2,290 <span className="text-small text-violet-lavender font-normal">(3A / CC)</span>
                        </td>
                        <td className="p-space-sm text-right">
                          <button 
                            className="px-3 py-1.5 bg-primary-container text-on-primary-container font-label-pixel text-label-pixel uppercase shadow-[2px_2px_0px_#3d1f85] hover:bg-violet-electric transition-colors cursor-pointer"
                            onClick={() => handleSelectPreset('NGP', 'NZM')}
                          >
                            Select
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-surface-container transition-colors">
                        <td className="p-space-sm font-mono">
                          <div className="font-bold text-tertiary">NGP → ET → NZM</div>
                          <div className="text-small text-on-surface-variant">Samata Exp (12807) + Dakshin Exp (12721)</div>
                        </td>
                        <td className="p-space-sm">
                          <span className="font-bold">07:35</span>
                          <span className="text-small text-on-surface-variant block">NGP Platform 1</span>
                        </td>
                        <td className="p-space-sm">
                          <span className="bg-surface-container px-2 py-0.5 text-on-surface text-small font-mono uppercase">Itarsi Jn (ET)</span>
                          <span className="text-small text-on-surface-variant block mt-0.5">Arrive 12:45</span>
                        </td>
                        <td className="p-space-sm">
                          <span className="font-bold">04:00</span>
                          <span className="text-small text-on-surface-variant block">NZM Platform 1</span>
                        </td>
                        <td className="p-space-sm font-mono text-violet-lavender font-bold">
                          1h 25m Safe Buffer
                        </td>
                        <td className="p-space-sm font-mono font-bold text-canvas-light">
                          ₹1,810 <span className="text-small text-violet-lavender font-normal">(3A)</span>
                        </td>
                        <td className="p-space-sm text-right">
                          <button 
                            className="px-3 py-1.5 bg-surface-container-high text-on-surface font-label-pixel text-label-pixel uppercase hover:bg-surface-container transition-colors cursor-pointer"
                            onClick={() => handleSelectPreset('NGP', 'NZM')}
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-space-md pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
                  <span className="font-small text-small text-on-surface-variant">
                    * Layover buffers account for historical junction delays ± 45 minutes margin.
                  </span>
                  <button 
                    className="inline-flex items-center gap-1 font-label-pixel text-label-pixel text-primary hover:text-on-primary-container transition-colors uppercase cursor-pointer"
                    onClick={handleLaunch}
                  >
                    <span>Explore All Timetable Pairs in Rail Engine</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Quick Launch Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300">
          <div className="bg-surface-container-high p-space-md shadow-2xl flex items-center gap-space-md border border-purple-500/40">
            <span className="material-symbols-outlined text-primary text-2xl animate-spin">cyclone</span>
            <div>
              <div className="font-label-pixel text-label-pixel text-on-surface uppercase">INITIALIZING RAIL MATRIX</div>
              <div className="font-body-small text-body-small text-on-surface-variant">Routing timetable feed into live engine...</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest py-space-2xl border-t border-purple-500/20">
        <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl mb-space-2xl">
            <div>
              <div className="flex items-center gap-space-xs mb-space-sm">
                <span className="font-headline-4 text-headline-4 text-primary uppercase">RAIL EAZY</span>
              </div>
              <p className="font-body-small text-body-small text-on-surface-variant mb-space-md">
                Autonomous scheduling &amp; corridor telemetry synthesis network. Real-time dynamic routing and predictive rail transit telemetry.
              </p>
              <div className="flex items-center gap-space-xs">
                <span className="px-2 py-0.5 bg-violet-deep text-canvas-light font-small text-small uppercase tracking-widest">
                  GRID PROTOCOL v4.9
                </span>
              </div>
            </div>

            <div>
              <div className="font-label-pixel text-label-pixel text-violet-lavender uppercase tracking-wider mb-space-sm">
                CORRIDOR HUBS
              </div>
              <ul className="space-y-space-xs font-body-small text-body-small text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#">NGP Central • Transit Axis</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">NDLS Terminal • Northern Line</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">BCT Superloop • Western Sector</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">MAS Interceptor • Southern Vector</a></li>
              </ul>
            </div>

            <div>
              <div className="font-label-pixel text-label-pixel text-violet-lavender uppercase tracking-wider mb-space-sm">
                MATRIX FEEDS
              </div>
              <ul className="space-y-space-xs font-body-small text-body-small text-on-surface-variant">
                <li><a className="hover:text-primary transition-colors" href="#">High-Speed Rail Telemetry</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Slot Congestion Map</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Electrification Status (25kV)</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Signal Aspect Live Streams</a></li>
              </ul>
            </div>

            <div>
              <div className="font-label-pixel text-label-pixel text-violet-lavender uppercase tracking-wider mb-space-sm">
                TELEMETRY DISCLAIMER
              </div>
              <p className="font-body-small text-body-small text-on-surface-variant leading-relaxed">
                Data stream feeds reflect predicted dispatch algorithms synthesized with actual transponder telemetry. Subject to dynamic matrix rerouting, interlocking priority flags, and network variances.
              </p>
            </div>
          </div>

          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant border-t border-purple-500/10">
            <span className="font-small text-small uppercase tracking-widest">
              © 2025 RAIL EAZY PROTOCOL // TRANSIT MATRIX SYS. ALL RIGHTS RESERVED.
            </span>
            <div className="flex items-center gap-space-md font-small text-small uppercase tracking-wider">
              <a className="hover:text-primary transition-colors" href="#">STATUS ENGINE</a>
              <a className="hover:text-primary transition-colors" href="#">PRIVACY COMPLIANCE</a>
              <a className="hover:text-primary transition-colors" href="#">SECURITY NODE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
