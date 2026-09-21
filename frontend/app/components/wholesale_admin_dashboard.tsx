import React from "react";

type ActiveCriteriaType = 'ORD' | 'PUR' | 'BIL' | 'PRD' | 'NAM' | 'BRD'

export default function AnalyticDashBoard() {
  const [activeCriteria, setActiveCriteria] = React.useState<ActiveCriteriaType>('NAM');

  const criteriaList = [
    { code: 'ORD', label: 'Order ID', placeholder: 'Paste Order UUID (e.g. 550e8400-e29b-41d4-a716-446655440000)...', isId: true },
    { code: 'PUR', label: 'Purchase ID', placeholder: 'Paste Purchase UUID...', isId: true },
    { code: 'BIL', label: 'Bill ID', placeholder: 'Paste Bill UUID...', isId: true },
    { code: 'PRD', label: 'Product ID', placeholder: 'Paste Product UUID...', isId: true },
    { code: 'NAM', label: 'Product Name', placeholder: 'Type product title or item description...', isId: false },
    { code: 'BRD', label: 'Brand', placeholder: 'Search brand or vendor name...', isId: false },
  ];

  const buttonsArr: Array<{ code: ActiveCriteriaType, label: string }> = [
    { code: 'ORD', label: 'Order ID' },
    { code: 'PUR', label: 'Purchase ID' },
    { code: 'BIL', label: 'Bill ID' },
    { code: 'PRD', label: 'Product ID' },
    { code: 'NAM', label: 'Name' },
    { code: 'BRD', label: 'Brand' },
  ]

  const currentConfig = criteriaList.find((c) => c.code === activeCriteria) ?? criteriaList[0];

  return (
    <div className="min-h-screen w-full bg-[#e6f4f1] text-[#0a2727] flex antialiased selection:bg-[#0d5c58] selection:text-white">

      <style dangerouslySetInnerHTML={{
        __html: `
        body, input, button, select, textarea {
          font-family: 'Quicksand', sans-serif;
        }
        .font-mono, [data-mono] {
          font-family: 'Fira Code', monospace !important;
        }
      `}} />

      {/* COLUMN 1: FIXED SIDEBAR NAVIGATION */}
      <aside className="w-[260px] shrink-0 min-h-screen border-r border-[#cce7e2] bg-[#f0f8f6] flex flex-col justify-between select-none">
        <div>
          {/* Brand Header */}
          <div className="px-5 py-4 border-b border-[#cce7e2] flex items-center justify-between group cursor-pointer transition-colors duration-200 hover:bg-[#e4f3ef]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[#0d5c58] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
                W
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-tight text-[#0a2727] group-hover:text-[#0d5c58] transition-colors">
                  Wholesale Portal
                </span>
                <span className="text-[10px] text-[#48716e] font-medium">
                  Admin Control Desk
                </span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#0d5c58]/40 group-hover:bg-[#0d5c58] transition-colors" />
          </div>

          {/* Active Warehouse Dropdown */}
          <div className="px-4 py-3 border-b border-[#cce7e2]">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1.5">
              Active Warehouse
            </label>
            <div className="relative group">
              <select
                defaultValue="central-1"
                className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-2.5 py-2 outline-none font-medium appearance-none cursor-pointer transition-all duration-200 hover:border-[#0d5c58] hover:shadow-xs focus:border-[#0d5c58] focus:ring-1 focus:ring-[#0d5c58]"
              >
                <option value="central-1">Central Warehouse #1</option>
                <option value="depot-north">North Hub Storage</option>
                <option value="cold-store">Cold Storage Unit</option>
                <option value="all">All Locations Combined</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#48716e] transition-transform duration-200 group-hover:translate-y-0.5">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            <a
              href="#dashboard"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#0d5c58] text-white shadow-xs transition-all duration-200 hover:bg-[#094643] hover:translate-x-1"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              <span>Dashboard</span>
            </a>

            <a
              href="#sales"
              className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] hover:translate-x-1 transition-all duration-200"
            >
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58] transition-colors" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" />
                </svg>
                <span>Sales Orders</span>
              </div>
              <span className="font-mono text-[10px] bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.5 rounded font-bold group-hover:bg-[#0d5c58] group-hover:text-white transition-colors duration-200">
                48
              </span>
            </a>

            <a
              href="#purchases"
              className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] hover:translate-x-1 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58] transition-colors" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
              </svg>
              <span>Purchases</span>
            </a>

            <a
              href="#customers"
              className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] hover:translate-x-1 transition-all duration-200"
            >
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58] transition-colors" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                </svg>
                <span>Customer Accounts</span>
              </div>
              <span className="font-mono text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200">
                12
              </span>
            </a>

            <a
              href="#inventory"
              className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] hover:translate-x-1 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58] transition-colors" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              <span>Inventory</span>
            </a>

            <a
              href="#reports"
              className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] hover:translate-x-1 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58] transition-colors" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>Reports</span>
            </a>

            <a
              href="#settings"
              className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] hover:translate-x-1 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58] transition-colors group-hover:rotate-45 duration-300" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
              </svg>
              <span>Settings</span>
            </a>
          </nav>
        </div>

        {/* User Card */}
        <div className="p-3 border-t border-[#cce7e2]">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#cce7e2] shadow-xs hover:border-[#0d5c58]/60 transition-all duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0d5c58] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0a2727] leading-tight">Admin User</span>
                <span className="text-[10px] text-[#48716e]">Manager Desk</span>
              </div>
            </div>
            <a
              href="#logout"
              title="Sign out"
              className="text-[#48716e] hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-md transition-colors duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* COLUMN 2: MAIN DASHBOARD AREA */}
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">

        {/* Sticky Top Header with Criteria Switcher to the Right & Left Alpha-3 Badge */}
        <header className="sticky top-0 z-20 bg-[#e6f4f1]/95 backdrop-blur-md px-6 py-3 border-b border-[#cce7e2] flex flex-wrap items-center justify-between gap-4">

          {/* Search Cluster: Search Input with Left Alpha-3 + Right Filter Buttons */}
          <div className="flex items-center gap-2.5 w-full max-w-2xl">

            {/* Search Input Container */}
            <div className="flex-1 relative flex items-center bg-white border border-[#cce7e2] rounded-lg transition-all duration-200 hover:border-[#0d5c58]/60 focus-within:border-[#0d5c58] focus-within:ring-1 focus-within:ring-[#0d5c58] shadow-xs">

              {/* Left Side: Alpha-3 Identifier & Search Icon */}
              <div className="flex items-center pl-2.5 pr-1.5 gap-1.5 pointer-events-none shrink-0 border-r border-[#edf5f3] my-1">
                <span className="font-mono text-[10px] font-bold tracking-wider bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.5 rounded">
                  {activeCriteria}
                </span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current text-[#48716e]" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              {/* Dynamic Placeholder Input based on selected UUID / Text Type */}
              <input
                type="text"
                placeholder={
                  activeCriteria === 'ORD' ? 'Paste Order UUID (e.g. 8f3d...)' :
                    activeCriteria === 'PUR' ? 'Paste Purchase UUID (e.g. e21c...)' :
                      activeCriteria === 'BIL' ? 'Paste Bill UUID (e.g. 5b9a...)' :
                        activeCriteria === 'PRD' ? 'Paste Product UUID (e.g. 3a1f...)' :
                          activeCriteria === 'NAM' ? 'Type exact or partial product name...' :
                            'Filter by manufacturer or brand name...'
                }
                className="w-full px-3 py-1.5 bg-transparent text-xs text-[#0a2727] placeholder:text-[#80a5a2] outline-none font-mono"
              />
            </div>

            {/* Input Criteria Selector Pills on the RIGHT side */}
            <div className="flex items-center bg-[#daf0eb] p-1 rounded-lg border border-[#cce7e2] gap-1 shrink-0 overflow-x-auto">
              {buttonsArr.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setActiveCriteria(item.code)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded transition-all duration-150 cursor-pointer whitespace-nowrap ${activeCriteria === item.code
                    ? 'bg-[#0d5c58] text-white shadow-xs'
                    : 'text-[#345c59] hover:text-[#0a2727] hover:bg-white/60'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

          </div>

          {/* Right Status Desk */}
          <div className="flex items-center gap-4 shrink-0 ml-auto">
            <div className="text-right">
              <div className="text-xs font-semibold text-[#0a2727]">Today</div>
              <div className="font-mono text-[11px] text-[#48716e]">21 Sep 2026</div>
            </div>
            <button className="group flex items-center gap-1.5 bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer">
              <svg className="w-3.5 h-3.5 fill-none stroke-current transition-transform duration-200 group-hover:rotate-90" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span>New Order</span>
            </button>
          </div>
        </header>

        {/* Main Content Sections */}
        <main className="p-6 space-y-6">

          {/* 1. MONEY TODAY */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Amount Credited */}
            <div className="group relative bg-white p-5 rounded-2xl border border-[#cce7e2] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-[#0d5c58]/60 cursor-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#345c59]">
                    Amount Credited Today
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold transition-transform duration-200 group-hover:scale-105">
                  42 payments
                </span>
              </div>

              <div className="mt-3">
                <div className="font-mono text-2xl font-bold text-[#0a2727] tracking-tight transition-colors duration-200 group-hover:text-[#0d5c58]">
                  ₹ 4,82,450
                </div>
                <div className="text-xs text-[#527774] mt-0.5">
                  Total collections received today
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#edf5f3] grid grid-cols-2 gap-3">
                <div className="bg-[#f6fbf9] p-3 rounded-xl border border-[#cce7e2] transition-all duration-200 hover:bg-[#ebf7f4] hover:border-[#0d5c58] hover:shadow-xs cursor-pointer">
                  <div className="flex items-center justify-between text-xs text-[#48716e]">
                    <span className="font-semibold">UPI / Online</span>
                    <span className="font-mono text-[10px] font-bold text-[#0d5c58] bg-white px-1.5 py-0.5 rounded border border-[#cce7e2]">68%</span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#0d5c58] mt-1.5">
                    ₹ 3,28,000
                  </div>
                  <div className="text-[10px] text-[#527774] mt-0.5">Instant settlement</div>
                </div>

                <div className="bg-[#f6fbf9] p-3 rounded-xl border border-[#cce7e2] transition-all duration-200 hover:bg-[#ebf7f4] hover:border-[#0d5c58] hover:shadow-xs cursor-pointer">
                  <div className="flex items-center justify-between text-xs text-[#48716e]">
                    <span className="font-semibold">Cash</span>
                    <span className="font-mono text-[10px] font-bold text-[#48716e] bg-white px-1.5 py-0.5 rounded border border-[#cce7e2]">32%</span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#0a2727] mt-1.5">
                    ₹ 1,54,450
                  </div>
                  <div className="text-[10px] text-[#527774] mt-0.5">Counter deposit</div>
                </div>
              </div>
            </div>

            {/* Amount Debited */}
            <div className="group relative bg-white p-5 rounded-2xl border border-[#cce7e2] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-rose-300 cursor-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#345c59]">
                    Amount Debited Today
                  </span>
                </div>
                <span className="font-mono text-[10px] text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md font-semibold transition-transform duration-200 group-hover:scale-105">
                  8 payments
                </span>
              </div>

              <div className="mt-3">
                <div className="font-mono text-2xl font-bold text-[#0a2727] tracking-tight transition-colors duration-200 group-hover:text-rose-700">
                  ₹ 2,95,800
                </div>
                <div className="text-xs text-[#527774] mt-0.5">
                  Supplier purchase payments and daily freight
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#edf5f3] grid grid-cols-2 gap-3">
                <div className="bg-[#fcf7f6] p-3 rounded-xl border border-[#f0dedb] transition-all duration-200 hover:bg-[#faeeea] hover:border-rose-400 hover:shadow-xs cursor-pointer">
                  <div className="flex items-center justify-between text-xs text-[#6e4943]">
                    <span className="font-semibold">Purchase Orders</span>
                    <span className="font-mono text-[10px] font-bold text-rose-700 bg-white px-1.5 py-0.5 rounded border border-[#f0dedb]">88%</span>
                  </div>
                  <div className="font-mono text-base font-bold text-rose-800 mt-1.5">
                    ₹ 2,60,000
                  </div>
                  <div className="text-[10px] text-[#527774] mt-0.5">Goods inward pay</div>
                </div>

                <div className="bg-[#f6fbf9] p-3 rounded-xl border border-[#cce7e2] transition-all duration-200 hover:bg-[#ebf7f4] hover:border-[#0d5c58] hover:shadow-xs cursor-pointer">
                  <div className="flex items-center justify-between text-xs text-[#48716e]">
                    <span className="font-semibold">Daily Expenses</span>
                    <span className="font-mono text-[10px] font-bold text-[#48716e] bg-white px-1.5 py-0.5 rounded border border-[#cce7e2]">12%</span>
                  </div>
                  <div className="font-mono text-base font-bold text-[#0a2727] mt-1.5">
                    ₹ 35,800
                  </div>
                  <div className="text-[10px] text-[#527774] mt-0.5">Transport & labor</div>
                </div>
              </div>
            </div>

          </section>

          {/* 2. CREDIT SECTION */}
          <section className="bg-white p-6 rounded-2xl border border-[#cce7e2] shadow-xs hover:border-[#0d5c58]/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-sm font-bold text-[#0a2727] flex items-center gap-2">
                  <span>Credit Given</span>
                  <span className="text-[10px] font-mono text-[#0d5c58] bg-[#d7ede7] px-2 py-0.5 rounded-full font-bold">
                    Hover nodes to inspect
                  </span>
                </div>
                <p className="text-xs text-[#527774] mt-0.5">
                  Daily value of goods sold on customer credit over the last 7 days
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="p-2 rounded-lg bg-[#f6fbf9] border border-[#cce7e2]">
                  <span className="text-[#527774] text-[10px] block uppercase font-bold">Total Unpaid Credit</span>
                  <span className="font-mono text-sm font-bold text-amber-900">₹ 14,82,000</span>
                </div>
                <div className="p-2 rounded-lg bg-[#f6fbf9] border border-[#cce7e2]">
                  <span className="text-[#527774] text-[10px] block uppercase font-bold">Credit Sold Today</span>
                  <span className="font-mono text-sm font-bold text-[#0d5c58]">₹ 2,65,000</span>
                </div>
              </div>
            </div>

            <div className="w-full h-52 relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160">
                <line x1="50" y1="20" x2="680" y2="20" stroke="#edf5f3" strokeDasharray="3 3" />
                <line x1="50" y1="55" x2="680" y2="55" stroke="#edf5f3" strokeDasharray="3 3" />
                <line x1="50" y1="90" x2="680" y2="90" stroke="#edf5f3" strokeDasharray="3 3" />
                <line x1="50" y1="125" x2="680" y2="125" stroke="#cce7e2" />

                <text x="5" y="24" className="font-mono text-[10px] fill-[#7aa09b]">₹ 3.0L</text>
                <text x="5" y="59" className="font-mono text-[10px] fill-[#7aa09b]">₹ 2.0L</text>
                <text x="5" y="94" className="font-mono text-[10px] fill-[#7aa09b]">₹ 1.0L</text>
                <text x="15" y="128" className="font-mono text-[10px] fill-[#7aa09b]">₹ 0</text>

                <polygon
                  points="80,125 80,85 170,98 260,65 350,75 440,42 530,58 620,38 620,125"
                  className="fill-[#0d5c58] opacity-10 transition-opacity duration-300 hover:opacity-20"
                />

                <polyline
                  points="80,85 170,98 260,65 350,75 440,42 530,58 620,38"
                  fill="none"
                  stroke="#0d5c58"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {[
                  { x: 80, y: 85, val: '₹ 1.25L', label: '15 Sep', id: 'p1' },
                  { x: 170, y: 98, val: '₹ 0.90L', label: '16 Sep', id: 'p2' },
                  { x: 260, y: 65, val: '₹ 1.80L', label: '17 Sep', id: 'p3' },
                  { x: 350, y: 75, val: '₹ 1.50L', label: '18 Sep', id: 'p4' },
                  { x: 440, y: 42, val: '₹ 2.40L', label: '19 Sep', id: 'p5' },
                  { x: 530, y: 58, val: '₹ 1.95L', label: '20 Sep', id: 'p6' },
                ].map((pt) => (
                  <g key={pt.id} className="group/pt cursor-pointer">
                    <line x1={pt.x} y1="20" x2={pt.x} y2="125" stroke="#0d5c58" strokeWidth="1" strokeDasharray="2 2" className="opacity-0 group-hover/pt:opacity-100 transition-opacity duration-200" />
                    <circle cx={pt.x} cy={pt.y} r="7" className="fill-[#0d5c58]/20 opacity-0 group-hover/pt:opacity-100 transition-all duration-200" />
                    <circle cx={pt.x} cy={pt.y} r="4" className="fill-[#0d5c58] group-hover/pt:r-5 group-hover/pt:fill-[#083b38] transition-all duration-200" />
                    <g className="opacity-0 group-hover/pt:opacity-100 transition-all duration-200 -translate-y-1 group-hover/pt:translate-y-0">
                      <rect x={pt.x - 28} y={pt.y - 37} width="56" height="22" rx="4" fill="#0a2727" />
                      <text x={pt.x} y={pt.y - 22} textAnchor="middle" className="font-mono text-[10px] fill-white font-bold">{pt.val}</text>
                    </g>
                    <text x={pt.x} y="142" textAnchor="middle" className="font-mono text-[10px] fill-[#527774] group-hover/pt:fill-[#0d5c58] group-hover/pt:font-bold transition-colors">{pt.label}</text>
                  </g>
                ))}

                {/* Point 7: Today */}
                <g className="group/p7 cursor-pointer">
                  <line x1="620" y1="20" x2="620" y2="125" stroke="#0d5c58" strokeWidth="1.5" strokeDasharray="2 2" className="opacity-40 group-hover/p7:opacity-100 transition-opacity duration-200" />
                  <circle cx="620" cy="38" r="9" className="fill-[#0d5c58]/30 group-hover/p7:scale-125 transition-transform duration-200" />
                  <circle cx="620" cy="38" r="4.5" className="fill-[#0d5c58] stroke-white stroke-2 group-hover/p7:r-6 transition-all duration-200" />
                  <g className="opacity-100 transition-all duration-200 group-hover/p7:-translate-y-1">
                    <rect x="592" y="2" width="56" height="22" rx="4" fill="#0d5c58" />
                    <text x="620" y="17" textAnchor="middle" className="font-mono text-[10px] fill-white font-bold">₹ 2.65L</text>
                  </g>
                  <text x="620" y="142" textAnchor="middle" className="font-mono text-[10px] fill-[#0a2727] font-bold group-hover/p7:fill-[#0d5c58] transition-colors">Today</text>
                </g>
              </svg>
            </div>
          </section>

          {/* 3. SALES SECTION */}
          <section className="bg-white p-6 rounded-2xl border border-[#cce7e2] shadow-xs hover:border-[#0d5c58]/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="text-sm font-bold text-[#0a2727]">Sales Analysis</div>
                <p className="text-xs text-[#527774] mt-0.5">Filter sales by period, category, brand, and item</p>
              </div>
              <div className="text-xs text-[#527774] bg-[#f0f8f6] px-3 py-1.5 rounded-lg border border-[#cce7e2]">
                Total for this selection: <span className="font-mono font-bold text-[#0d5c58]">₹ 6,10,000</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#f6fbf9] border border-[#cce7e2] rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e]">
                  Date Range
                </label>
                <select defaultValue="today" className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-2.5 py-1.5 outline-none transition-colors duration-200 hover:border-[#0d5c58] focus:border-[#0d5c58]">
                  <option value="today">Today (21 Sep)</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e]">
                  Product Category
                </label>
                <select defaultValue="oils" className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-2.5 py-1.5 outline-none transition-colors duration-200 hover:border-[#0d5c58] focus:border-[#0d5c58]">
                  <option value="all">All Categories</option>
                  <option value="oils">Edible Oils</option>
                  <option value="grains">Grains & Flour</option>
                  <option value="spices">Spices</option>
                  <option value="packaged">Packaged Goods</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e]">
                  Product Brand
                </label>
                <select defaultValue="fortune" className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-2.5 py-1.5 outline-none transition-colors duration-200 hover:border-[#0d5c58] focus:border-[#0d5c58]">
                  <option value="all">All Brands</option>
                  <option value="fortune">Fortune</option>
                  <option value="tata">Tata</option>
                  <option value="daawat">Daawat</option>
                  <option value="mdh">MDH</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e]">
                  Product Name
                </label>
                <input
                  type="text"
                  defaultValue="Fortune Mustard Oil 1L"
                  placeholder="Type product name..."
                  className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-2.5 py-1.5 outline-none transition-colors duration-200 hover:border-[#0d5c58] focus:border-[#0d5c58]"
                />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#edf5f3] space-y-3.5">
              <div className="flex justify-between text-xs text-[#527774] mb-1">
                <span className="font-semibold">Items Sold under Selected Brand</span>
                <span className="font-mono font-bold">460 Cartons total</span>
              </div>

              <div className="group cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-[#f3f9f7]">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#0a2727] font-semibold group-hover:text-[#0d5c58] transition-colors">
                    Fortune Mustard Oil (1L x 12)
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0a2727] group-hover:text-[#0d5c58]">
                    210 units • ₹ 2,94,000
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#eaf4f1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0d5c58] rounded-full transition-all duration-300 group-hover:brightness-125 origin-left" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="group cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-[#f3f9f7]">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#0a2727] font-semibold group-hover:text-[#186a64] transition-colors">
                    Fortune Soyabean Oil (1L x 12)
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0a2727] group-hover:text-[#186a64]">
                    140 units • ₹ 1,82,000
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#eaf4f1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#207c76] rounded-full transition-all duration-300 group-hover:brightness-125 origin-left" style={{ width: '45%' }} />
                </div>
              </div>

              <div className="group cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-[#f3f9f7]">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#0a2727] font-semibold group-hover:text-[#388f88] transition-colors">
                    Fortune Sunflower Oil (1L x 12)
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0a2727] group-hover:text-[#388f88]">
                    70 units • ₹ 91,000
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#eaf4f1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#469d96] rounded-full transition-all duration-300 group-hover:brightness-125 origin-left" style={{ width: '25%' }} />
                </div>
              </div>

              <div className="group cursor-pointer p-2 rounded-lg transition-all duration-200 hover:bg-[#f3f9f7]">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#0a2727] font-semibold group-hover:text-[#5aa9a3] transition-colors">
                    Fortune Rice Bran Oil (15L Tin)
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0a2727] group-hover:text-[#5aa9a3]">
                    40 units • ₹ 43,000
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#eaf4f1] rounded-full overflow-hidden">
                  <div className="h-full bg-[#75bfb9] rounded-full transition-all duration-300 group-hover:brightness-125 origin-left" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </section>

          {/* 4. PROFIT SECTION */}
          <section className="bg-white p-6 rounded-2xl border border-[#cce7e2] shadow-xs hover:border-[#0d5c58]/50 transition-all duration-300 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#edf5f3]">
              <div>
                <div className="text-sm font-bold text-[#0a2727]">Profit Overview</div>
                <p className="text-xs text-[#527774] mt-0.5">
                  Calculated from sales minus product purchase cost and running expenses
                </p>
              </div>
              <div className="text-xs text-[#527774] bg-[#f6fbf9] px-3 py-1.5 rounded-lg border border-[#cce7e2]">
                Period: <span className="font-mono text-xs font-bold text-[#0d5c58]">This Month (Sep 2026)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="group p-4 rounded-xl bg-[#f6fbf9] border border-[#cce7e2] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:border-[#0d5c58] cursor-default">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#48716e]">
                  Gross Profit
                </div>
                <div className="font-mono text-xl font-bold text-[#0a2727] mt-1.5 transition-colors group-hover:text-[#0d5c58]">
                  ₹ 3,42,800
                </div>
                <div className="flex justify-between items-center text-xs mt-1.5 text-[#527774]">
                  <span>Revenue minus Goods Cost</span>
                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    7.8%
                  </span>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-[#fcf7f6] border border-[#f0dedb] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:border-rose-400 cursor-default">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6e4943]">
                  Running Expenses
                </div>
                <div className="font-mono text-xl font-bold text-rose-800 mt-1.5 transition-colors group-hover:text-rose-900">
                  ₹ 84,200
                </div>
                <div className="flex justify-between items-center text-xs mt-1.5 text-[#527774]">
                  <span>Transport, labor, power</span>
                  <span className="font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                    1.9%
                  </span>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-[#eff8f6] border border-[#bce2d8] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs hover:border-[#0d5c58] cursor-default">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#0d5c58]">
                  Net Profit
                </div>
                <div className="font-mono text-xl font-bold text-[#0d5c58] mt-1.5 transition-colors group-hover:text-[#083b38]">
                  ₹ 2,58,600
                </div>
                <div className="flex justify-between items-center text-xs mt-1.5 text-[#0d5c58]">
                  <span>Net pure margin</span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#bce2d8] shadow-xs">
                    5.9% Net
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs font-bold text-[#0a2727] mb-2 flex items-center justify-between">
                <span>Sample Product Profit Margins</span>
                <span className="text-[10px] font-mono text-[#527774]">Hover rows to inspect</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[#cce7e2]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f0f8f6] border-b border-[#cce7e2] text-[#48716e] text-[10px] uppercase">
                      <th className="py-2.5 px-3 font-semibold">Item</th>
                      <th className="py-2.5 px-3 font-semibold">Cost Price</th>
                      <th className="py-2.5 px-3 font-semibold">Selling Price</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Profit / Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#edf5f3] bg-white">
                    <tr className="transition-colors duration-150 hover:bg-[#eef8f5] cursor-default group">
                      <td className="py-2.5 px-3 text-[#0a2727] font-semibold group-hover:text-[#0d5c58]">
                        Mustard Oil 1L (Carton of 12)
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#527774]">₹ 1,340</td>
                      <td className="py-2.5 px-3 font-mono text-[#0a2727]">₹ 1,400</td>
                      <td className="py-2.5 px-3 font-mono text-right font-bold text-emerald-800">
                        + ₹ 60
                      </td>
                    </tr>
                    <tr className="transition-colors duration-150 hover:bg-[#eef8f5] cursor-default group">
                      <td className="py-2.5 px-3 text-[#0a2727] font-semibold group-hover:text-[#0d5c58]">
                        Basmati Rice (30kg Bag)
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#527774]">₹ 2,450</td>
                      <td className="py-2.5 px-3 font-mono text-[#0a2727]">₹ 2,680</td>
                      <td className="py-2.5 px-3 font-mono text-right font-bold text-emerald-800">
                        + ₹ 230
                      </td>
                    </tr>
                    <tr className="transition-colors duration-150 hover:bg-[#eef8f5] cursor-default group">
                      <td className="py-2.5 px-3 text-[#0a2727] font-semibold group-hover:text-[#0d5c58]">
                        Spices Pack (Carton)
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#527774]">₹ 1,850</td>
                      <td className="py-2.5 px-3 font-mono text-[#0a2727]">₹ 2,120</td>
                      <td className="py-2.5 px-3 font-mono text-right font-bold text-emerald-800">
                        + ₹ 270
                      </td>
                    </tr>
                    <tr className="transition-colors duration-150 hover:bg-[#eef8f5] cursor-default group">
                      <td className="py-2.5 px-3 text-[#0a2727] font-semibold group-hover:text-[#0d5c58]">
                        Sugar (50kg Bag)
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#527774]">₹ 1,920</td>
                      <td className="py-2.5 px-3 font-mono text-[#0a2727]">₹ 1,980</td>
                      <td className="py-2.5 px-3 font-mono text-right font-bold text-emerald-800">
                        + ₹ 60
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </main>
      </div>

    </div>
  );
}