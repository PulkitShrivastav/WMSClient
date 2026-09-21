import React from 'react';

export default function LoginTerminal() {
  return (
    <div className="min-h-screen w-full bg-[#e6f4f1] text-[#0f2422] flex flex-col justify-between font-['Quicksand',sans-serif] antialiased selection:bg-[#0d5c58] selection:text-white">

      {/* Dynamic Font Loader */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap"
      />

      {/* Top Brand Bar */}
      <header className="w-full px-6 sm:px-12 py-5 flex items-center justify-between border-b border-[#cce7e2]/70 bg-[#e6f4f1]/80 backdrop-blur-sm sticky top-0 z-10 transition-all duration-300">
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-8 h-8 rounded-lg bg-[#0d5c58] flex items-center justify-center text-white font-bold text-base tracking-wider shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#0a4845] group-hover:shadow-[#0d5c58]/20">
            W
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider uppercase text-[#0d5c58] transition-colors duration-200 group-hover:text-[#0a2727]">
              Apex WMS
            </span>
            <span className="text-[11px] text-[#4f7370] tracking-tight">
              Enterprise Wholesale Terminal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-['Fira_Code',monospace] text-[#3b5e5b] bg-[#d9eee9] hover:bg-[#cce7e2] px-3 py-1.5 rounded-lg border border-[#cce7e2] transition-colors duration-200 cursor-default shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span className="tracking-wide">PORTAL ACTIVE</span>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-12 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Left Column: System Narrative & Live Stats */}
        <section className="lg:col-span-7 flex flex-col justify-center space-y-8">

          <div className="inline-flex items-center gap-2 self-start bg-[#daf0eb] hover:bg-[#cce7e2] text-[#0d5c58] text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#cce7e2] transition-colors duration-200 cursor-default">
            <span className="font-['Fira_Code',monospace]">v4.2</span>
            <span>•</span>
            <span>Unified Depot Network</span>
          </div>

          <div className="space-y-4 max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0a2727] leading-[1.18]">
              Wholesale logistics, orchestrated with clarity.
            </h1>
            <p className="text-sm sm:text-base text-[#3b5e5b] font-medium leading-relaxed">
              Designed for high-throughput receiving, real-time stock allocation,
              and precision dispatch across multi-tier regional warehouses.
            </p>
          </div>

          {/* Key Metrics Cards with Hover Interaction */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-[#cce7e2] max-w-lg">

            <div className="group p-3 rounded-xl border border-transparent hover:border-[#cce7e2] hover:bg-white/60 transition-all duration-300 hover:-translate-y-0.5">
              <div className="text-lg sm:text-2xl font-bold text-[#0d5c58] font-['Fira_Code',monospace] transition-colors duration-200 group-hover:text-[#0a4845]">
                99.98%
              </div>
              <div className="text-xs text-[#527774] font-medium mt-0.5">Pick Accuracy</div>
            </div>

            <div className="group p-3 rounded-xl border border-transparent hover:border-[#cce7e2] hover:bg-white/60 transition-all duration-300 hover:-translate-y-0.5">
              <div className="text-lg sm:text-2xl font-bold text-[#0d5c58] font-['Fira_Code',monospace] transition-colors duration-200 group-hover:text-[#0a4845]">
                &lt;35ms
              </div>
              <div className="text-xs text-[#527774] font-medium mt-0.5">Sync Latency</div>
            </div>

            <div className="group p-3 rounded-xl border border-transparent hover:border-[#cce7e2] hover:bg-white/60 transition-all duration-300 hover:-translate-y-0.5">
              <div className="text-lg sm:text-2xl font-bold text-[#0d5c58] font-['Fira_Code',monospace] transition-colors duration-200 group-hover:text-[#0a4845]">
                Multi-Hub
              </div>
              <div className="text-xs text-[#527774] font-medium mt-0.5">Stock Mesh</div>
            </div>

          </div>
        </section>

        {/* Right Column: Interactive Login Panel */}
        <section className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 border border-[#cce7e2] hover:border-[#0d5c58]/40 p-8 sm:p-10 transition-all duration-300">

            <div className="mb-7">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a2727] tracking-tight">
                Operator Sign In
              </h2>
              <p className="text-xs sm:text-sm text-[#527774] font-medium mt-1">
                Authenticate your workstation session to proceed.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">

              {/* Warehouse / Depot Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3b5e5b]">
                  Assigned Facility
                </label>
                <div className="relative group">
                  <select
                    defaultValue="hub-01"
                    className="w-full bg-[#f6fbf9] hover:bg-white border border-[#cce7e2] hover:border-[#0d5c58]/50 text-[#0a2727] text-xs sm:text-sm rounded-lg px-3.5 py-2.5 outline-none focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]/10 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="hub-01">Northern Hub • Okhla Sector 4</option>
                    <option value="hub-02">Western Hub • Bhiwandi Cluster</option>
                    <option value="hub-03">Central Depo • Sonipat Industrial</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#527774] group-hover:text-[#0d5c58] transition-colors duration-200">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Employee ID */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3b5e5b]">
                  Employee ID
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="employeeId"
                    placeholder="EMP-4092"
                    autoComplete="username"
                    className="w-full bg-[#f6fbf9] hover:bg-white border border-[#cce7e2] hover:border-[#0d5c58]/50 text-[#0a2727] text-xs sm:text-sm font-['Fira_Code',monospace] rounded-lg pl-10 pr-3.5 py-2.5 outline-none focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]/10 transition-all duration-200 placeholder:font-['Quicksand',sans-serif] placeholder:text-[#8ba7a4]"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#527774] group-focus-within:text-[#0d5c58] transition-colors duration-200">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Security PIN / Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#3b5e5b]">
                    Password
                  </label>
                  <a href="#reset" className="text-xs text-[#0d5c58] hover:text-[#0a4845] hover:underline font-semibold transition-colors duration-200">
                    Reset PIN
                  </a>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full bg-[#f6fbf9] hover:bg-white border border-[#cce7e2] hover:border-[#0d5c58]/50 text-[#0a2727] text-xs sm:text-sm font-['Fira_Code',monospace] rounded-lg pl-10 pr-3.5 py-2.5 outline-none focus:border-[#0d5c58] focus:ring-2 focus:ring-[#0d5c58]/10 transition-all duration-200 placeholder:text-[#8ba7a4]"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#527774] group-focus-within:text-[#0d5c58] transition-colors duration-200">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Session Persistence Checkbox */}
              <div className="flex items-center gap-2.5 pt-0.5 group cursor-pointer">
                <input
                  type="checkbox"
                  id="persistTerminal"
                  name="persistTerminal"
                  className="w-4 h-4 rounded border-[#cce7e2] text-[#0d5c58] focus:ring-[#0d5c58] accent-[#0d5c58] cursor-pointer transition-transform group-hover:scale-105"
                />
                <label htmlFor="persistTerminal" className="text-xs text-[#3b5e5b] group-hover:text-[#0a2727] font-medium cursor-pointer select-none transition-colors duration-200">
                  Keep terminal session authorized for this shift
                </label>
              </div>

              {/* Submit Trigger with Scale & Arrow Slide */}
              <button
                type="submit"
                className="w-full mt-2 bg-[#0d5c58] hover:bg-[#0a4845] active:bg-[#073634] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Authorize & Enter</span>
                <svg className="w-4 h-4 fill-none stroke-current transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>

            </form>

            <div className="mt-6 pt-5 border-t border-[#cce7e2]/70 text-center">
              <span className="text-xs text-[#6e8f8c] font-medium">
                Facing terminal issues? Contact internal dispatch desk.
              </span>
            </div>

          </div>
        </section>

      </main>

      {/* Clean Utility Footer */}
      <footer className="w-full px-6 sm:px-12 py-4 border-t border-[#cce7e2]/70 flex flex-col sm:flex-row items-center justify-between text-xs text-[#527774] font-medium gap-2">
        <div className="flex items-center gap-3">
          <span>Operational Security: Encrypted (TLS 1.3)</span>
          <span className="hidden sm:inline text-[#cce7e2]">•</span>
          <span className="hidden sm:inline">Role-Based Access Policy Active</span>
        </div>
        <div className="font-['Fira_Code',monospace] text-[11px] text-[#6e8f8c] tracking-tight bg-[#d9eee9]/50 px-2 py-0.5 rounded border border-[#cce7e2]">
          SYS-NODE // 10.14.0.88
        </div>
      </footer>

    </div>
  );
}