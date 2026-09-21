export default function BillingTerminalWorkspace() {
  return (
    <div className="min-h-screen w-full bg-[#e6f4f1] text-[#0a2727] flex flex-col antialiased selection:bg-[#0d5c58] selection:text-white">

      {/* Font pairing: Quicksand for clean UI and Fira Code for tabular data/UUIDs */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Quicksand:wght@500;600;700&display=swap"
        rel="stylesheet"
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        body, input, button, select, textarea {
          font-family: 'Quicksand', sans-serif;
        }
        .font-mono, [data-mono] {
          font-family: 'Fira Code', monospace !important;
        }
      `}} />

      {/* Header bar matching Apex WMS design system */}
      <header className="w-full bg-[#e6f4f1]/95 backdrop-blur-md px-6 py-3 border-b border-[#cce7e2] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0d5c58] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm">
            W
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-[#0a2727]">
              Apex Billing Terminal
            </span>
            <span className="text-[10px] text-[#48716e] font-medium">
              Counter POS & Live Dispatch Desk
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 bg-[#d9eee9] px-3 py-1 rounded-lg border border-[#cce7e2] text-[#48716e]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono">STATION #04 READY</span>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>New Bill</span>
          </button>
        </div>
      </header>

      {/* Main Split Grid Workspaces */}
      <main className="flex-1 p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start overflow-hidden">

        {/* ========================================================================= */}
        {/* LEFT COLUMN: PRODUCT SELECTION WORKSPACE (5 Cols)                          */}
        {/* ========================================================================= */}
        <section className="lg:col-span-5 bg-white rounded-2xl border border-[#cce7e2] p-5 shadow-xs flex flex-col h-[calc(100vh-5.5rem)]">
          
          {/* Workspace Title */}
          <div className="flex items-center justify-between pb-3 border-b border-[#edf5f3]">
            <div>
              <h2 className="text-sm font-bold text-[#0a2727]">Product Selector</h2>
              <p className="text-[11px] text-[#527774]">Lookup SKU, code, or title to add to draft bill</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-[#d7ede7] text-[#0d5c58] px-2 py-0.5 rounded-md">
              INVENTORY LIVE
            </span>
          </div>

          {/* Search Cluster with Left Alpha3 Code */}
          <div className="mt-4 relative flex items-center bg-[#f6fbf9] border border-[#cce7e2] rounded-lg transition-all duration-200 hover:border-[#0d5c58]/60 focus-within:border-[#0d5c58] focus-within:ring-1 focus-within:ring-[#0d5c58] shadow-xs">
            <div className="flex items-center pl-2.5 pr-1.5 gap-1.5 pointer-events-none shrink-0 border-r border-[#cce7e2] my-1">
              <span className="font-mono text-[10px] font-bold tracking-wider bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.5 rounded">
                PRD
              </span>
              <svg className="w-3.5 h-3.5 fill-none stroke-current text-[#48716e]" viewBox="0 0 24 24" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by product code, name, or scan barcode..."
              className="w-full px-3 py-2 bg-transparent text-xs text-[#0a2727] placeholder:text-[#80a5a2] outline-none"
            />
          </div>

          {/* Quick Categories Filter Tag Chips */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-[11px]">
            <button type="button" className="px-2.5 py-1 rounded bg-[#0d5c58] text-white font-bold shadow-xs">All</button>
            <button type="button" className="px-2.5 py-1 rounded bg-[#f6fbf9] hover:bg-[#eef8f5] text-[#345c59] border border-[#cce7e2] transition-colors">Edible Oils</button>
            <button type="button" className="px-2.5 py-1 rounded bg-[#f6fbf9] hover:bg-[#eef8f5] text-[#345c59] border border-[#cce7e2] transition-colors">Grains</button>
            <button type="button" className="px-2.5 py-1 rounded bg-[#f6fbf9] hover:bg-[#eef8f5] text-[#345c59] border border-[#cce7e2] transition-colors">Spices</button>
          </div>

          {/* Search Result Listing with Quick Add Action */}
          <div className="flex-1 overflow-y-auto mt-3 space-y-2.5 pr-1">

            {/* Product Item Card 1 */}
            <div className="group p-3 rounded-xl border border-[#cce7e2] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d5c58] hover:shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.2 rounded font-semibold">SKU-7701</span>
                  <span className="text-xs font-bold text-[#0a2727] group-hover:text-[#0d5c58] transition-colors">Fortune Mustard Oil 1L</span>
                </div>
                <div className="text-[11px] text-[#527774] flex items-center gap-3">
                  <span>Stock: <strong className="text-[#0a2727]">240 Cartons</strong></span>
                  <span>•</span>
                  <span>Unit: <strong className="font-mono text-[#0d5c58]">₹ 1,400</strong></span>
                </div>
              </div>
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-[#f0f8f6] hover:bg-[#0d5c58] text-[#0d5c58] hover:text-white border border-[#cce7e2] text-xs font-bold transition-all duration-150 flex items-center gap-1 active:scale-95"
              >
                <span>Add</span>
                <span className="text-sm leading-none">+</span>
              </button>
            </div>

            {/* Product Item Card 2 */}
            <div className="group p-3 rounded-xl border border-[#cce7e2] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d5c58] hover:shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.2 rounded font-semibold">SKU-8924</span>
                  <span className="text-xs font-bold text-[#0a2727] group-hover:text-[#0d5c58] transition-colors">Basmati Rice Royal (30kg)</span>
                </div>
                <div className="text-[11px] text-[#527774] flex items-center gap-3">
                  <span>Stock: <strong className="text-[#0a2727]">68 Bags</strong></span>
                  <span>•</span>
                  <span>Unit: <strong className="font-mono text-[#0d5c58]">₹ 2,680</strong></span>
                </div>
              </div>
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-[#f0f8f6] hover:bg-[#0d5c58] text-[#0d5c58] hover:text-white border border-[#cce7e2] text-xs font-bold transition-all duration-150 flex items-center gap-1 active:scale-95"
              >
                <span>Add</span>
                <span className="text-sm leading-none">+</span>
              </button>
            </div>

            {/* Product Item Card 3 */}
            <div className="group p-3 rounded-xl border border-[#cce7e2] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d5c58] hover:shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.2 rounded font-semibold">SKU-4412</span>
                  <span className="text-xs font-bold text-[#0a2727] group-hover:text-[#0d5c58] transition-colors">Tata Iodized Salt (1kg x 25)</span>
                </div>
                <div className="text-[11px] text-[#527774] flex items-center gap-3">
                  <span>Stock: <strong className="text-[#0a2727]">410 Bundles</strong></span>
                  <span>•</span>
                  <span>Unit: <strong className="font-mono text-[#0d5c58]">₹ 625</strong></span>
                </div>
              </div>
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-[#f0f8f6] hover:bg-[#0d5c58] text-[#0d5c58] hover:text-white border border-[#cce7e2] text-xs font-bold transition-all duration-150 flex items-center gap-1 active:scale-95"
              >
                <span>Add</span>
                <span className="text-sm leading-none">+</span>
              </button>
            </div>

            {/* Product Item Card 4 */}
            <div className="group p-3 rounded-xl border border-[#cce7e2] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d5c58] hover:shadow-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.2 rounded font-semibold">SKU-9903</span>
                  <span className="text-xs font-bold text-[#0a2727] group-hover:text-[#0d5c58] transition-colors">Refined Sugar M-30 (50kg)</span>
                </div>
                <div className="text-[11px] text-[#527774] flex items-center gap-3">
                  <span>Stock: <strong className="text-[#0a2727]">95 Bags</strong></span>
                  <span>•</span>
                  <span>Unit: <strong className="font-mono text-[#0d5c58]">₹ 1,980</strong></span>
                </div>
              </div>
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-[#f0f8f6] hover:bg-[#0d5c58] text-[#0d5c58] hover:text-white border border-[#cce7e2] text-xs font-bold transition-all duration-150 flex items-center gap-1 active:scale-95"
              >
                <span>Add</span>
                <span className="text-sm leading-none">+</span>
              </button>
            </div>

          </div>

          <div className="mt-3 pt-3 border-t border-[#edf5f3] flex items-center justify-between text-[11px] text-[#527774]">
            <span>Press <kbd className="font-mono bg-[#f0f8f6] px-1.5 py-0.5 rounded border border-[#cce7e2]">F2</kbd> for quick barcode scan</span>
            <span className="font-mono text-[#0d5c58] font-semibold">4 items ready</span>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: REAL-TIME INVOICE & DISPATCH WORKSPACE (7 Cols)              */}
        {/* ========================================================================= */}
        <section className="lg:col-span-7 bg-white rounded-2xl border border-[#cce7e2] p-6 shadow-xs flex flex-col h-[calc(100vh-5.5rem)] overflow-y-auto">
          
          {/* Header row: Bill Number (UUID) and Formatted Date */}
          <div className="pb-4 border-b border-[#edf5f3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block">
                Bill Number (UUID)
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#0d5c58] select-all">
                a6d2b45e-991f-4b0e-b7f3-e38fa9180c44
              </span>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block">
                Date & Time
              </span>
              <span className="font-mono text-xs font-bold text-[#0a2727]">
                21 : Sep : 26 - 09 : 36 PM
              </span>
            </div>
          </div>

          {/* Purchaser Details (Purchaser Name & Purchaser Mobile Number) */}
          <div className="py-4 border-b border-[#edf5f3] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block mb-0.5">
                Purchaser Name
              </span>
              <div className="text-sm font-bold text-[#0a2727]">
                M/S Rajesh Traders & Provisions
              </div>
              <span className="text-[10px] text-[#527774]">Depot Account: ACC-9018-DL</span>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block mb-0.5">
                Purchaser Mobile Number
              </span>
              <div className="font-mono text-sm font-bold text-[#0a2727]">
                +91 98110 24982
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                Verified Customer
              </span>
            </div>
          </div>

          {/* Bill Items Table */}
          <div className="mt-4 flex-1">
            <div className="text-xs font-bold text-[#0a2727] mb-2 flex items-center justify-between">
              <span>Billed Items List</span>
              <span className="font-mono text-[10px] text-[#48716e]">3 Lines</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#cce7e2]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f0f8f6] border-b border-[#cce7e2] text-[#48716e] text-[10px] uppercase">
                    <th className="py-2.5 px-3 font-semibold">Product Code</th>
                    <th className="py-2.5 px-3 font-semibold">Product Name</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Quantity</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Discount</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf5f3] bg-white">
                  
                  {/* Row 1 */}
                  <tr className="transition-colors duration-150 hover:bg-[#eef8f5] group">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#0d5c58] font-bold">
                      SKU-7701
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#0a2727]">
                      Fortune Mustard Oil 1L (Box x 12)
                    </td>
                    <td className="py-2.5 px-3 font-mono text-center font-bold text-[#0a2727]">
                      15
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right text-emerald-700">
                      ₹ 300
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right font-bold text-[#0a2727]">
                      ₹ 20,700
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="transition-colors duration-150 hover:bg-[#eef8f5] group">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#0d5c58] font-bold">
                      SKU-8924
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#0a2727]">
                      Basmati Rice Royal (30kg Bag)
                    </td>
                    <td className="py-2.5 px-3 font-mono text-center font-bold text-[#0a2727]">
                      10
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right text-emerald-700">
                      ₹ 800
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right font-bold text-[#0a2727]">
                      ₹ 26,000
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="transition-colors duration-150 hover:bg-[#eef8f5] group">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#0d5c58] font-bold">
                      SKU-9903
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#0a2727]">
                      Refined Sugar M-30 (50kg Bag)
                    </td>
                    <td className="py-2.5 px-3 font-mono text-center font-bold text-[#0a2727]">
                      8
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right text-emerald-700">
                      ₹ 240
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right font-bold text-[#0a2727]">
                      ₹ 15,600
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          {/* Two-Column Financial Summary Table */}
          <div className="mt-5 pt-4 border-t border-[#edf5f3] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            
            <div className="text-[11px] text-[#527774] space-y-1">
              <div>Payment Mode: <strong className="text-[#0a2727]">UPI Instant Settlement</strong></div>
              <div>Dispatch Status: <strong className="text-emerald-700">Gate Pass Ready</strong></div>
            </div>

            {/* Financial Ledger 2-Column Table */}
            <div className="w-full sm:w-80 rounded-xl border border-[#cce7e2] overflow-hidden bg-[#f6fbf9]">
              <table className="w-full text-xs border-collapse">
                <tbody className="divide-y divide-[#cce7e2]/70">
                  <tr>
                    <td className="py-2 px-3 text-[#48716e] font-semibold">Total Amount</td>
                    <td className="py-2 px-3 font-mono text-right font-bold text-[#0a2727]">
                      ₹ 62,300
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-[#48716e] font-semibold">Paid Amount</td>
                    <td className="py-2 px-3 font-mono text-right font-bold text-[#0d5c58]">
                      ₹ 45,000
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-[#48716e] font-semibold">Due on this order</td>
                    <td className="py-2 px-3 font-mono text-right font-bold text-amber-900 bg-amber-50/50">
                      ₹ 17,300
                    </td>
                  </tr>
                  <tr className="bg-[#ebf7f4]">
                    <td className="py-2.5 px-3 text-[#0d5c58] font-bold">Total Pending Dues</td>
                    <td className="py-2.5 px-3 font-mono text-right font-bold text-rose-700 text-sm">
                      ₹ 84,550
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Bottom Dispatch / Finalize Buttons */}
          <div className="mt-5 pt-4 border-t border-[#edf5f3] flex items-center justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#cce7e2] text-[#48716e] hover:bg-[#f0f8f6] hover:text-[#0a2727] transition-colors cursor-pointer"
            >
              Hold Draft (F4)
            </button>
            <button
              type="button"
              className="px-5 py-2 text-xs font-bold rounded-lg bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Complete & Print Bill (F8)</span>
              <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </section>

      </main>
    </div>
  );
}