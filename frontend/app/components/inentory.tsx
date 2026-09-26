import React, { useState } from "react";

export default function InventoryWorkspace() {
    // Criteria switcher for search bar
    const [activeCriteria, setActiveCriteria] = useState("NAM");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Track which product accordion row is currently open (null = all collapsed)
    const [expandedId, setExpandedId] = useState("SKU-7701");

    // Notification badge for inline actions
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 2500);
    };

    // Criteria button definitions
    const buttonsArr = [
        { code: "SKU", label: "SKU ID" },
        { code: "NAM", label: "Name" },
        { code: "BRD", label: "Brand" },
        { code: "LOC", label: "Location" },
    ];

    // Inventory dataset
    const [products, setProducts] = useState([
        {
            id: "SKU-7701",
            code: "SKU-7701",
            name: "Fortune Mustard Oil 1L",
            brand: "Adani Wilmar",
            category: "Edible Oils",
            unit: "Cartons (12x1L)",
            currentStock: 240,
            safetyStock: 60,
            reorderLevel: 80,
            costPrice: 1340,
            sellingPrice: 1400,
            bayLocation: "BAY-04 / RACK-B2",
            barcode: "8901233004128",
            taxRate: 5,
        },
        {
            id: "SKU-8924",
            code: "SKU-8924",
            name: "Basmati Rice Royal (30kg)",
            brand: "Royal Foods",
            category: "Grains & Flour",
            unit: "Jumbo Bags (30kg)",
            currentStock: 35,
            safetyStock: 50,
            reorderLevel: 65,
            costPrice: 2450,
            sellingPrice: 2680,
            bayLocation: "BAY-01 / PALLET-08",
            barcode: "8901548001923",
            taxRate: 0,
        },
        {
            id: "SKU-4412",
            code: "SKU-4412",
            name: "Tata Iodized Salt (1kg)",
            brand: "Tata Consumer",
            category: "Spices & Condiments",
            unit: "Shrink Bundles (25kg)",
            currentStock: 410,
            safetyStock: 100,
            reorderLevel: 150,
            costPrice: 580,
            sellingPrice: 625,
            bayLocation: "BAY-06 / RACK-A1",
            barcode: "8901030048121",
            taxRate: 0,
        },
        {
            id: "SKU-9903",
            code: "SKU-9903",
            name: "Refined Sugar M-30 (50kg)",
            brand: "Dhampure",
            category: "Grains & Flour",
            unit: "Standard Bags (50kg)",
            currentStock: 18,
            safetyStock: 35,
            reorderLevel: 45,
            costPrice: 1920,
            sellingPrice: 1980,
            bayLocation: "BAY-02 / PALLET-12",
            barcode: "8901429007416",
            taxRate: 5,
        },
        {
            id: "SKU-3105",
            code: "SKU-3105",
            name: "MDH Deggi Mirch (500g)",
            brand: "MDH Spices",
            category: "Spices & Condiments",
            unit: "Corrugated Box (24pk)",
            currentStock: 120,
            safetyStock: 30,
            reorderLevel: 40,
            costPrice: 2150,
            sellingPrice: 2360,
            bayLocation: "BAY-05 / SHELF-C3",
            barcode: "8901192003847",
            taxRate: 5,
        },
        {
            id: "SKU-2041",
            code: "SKU-2041",
            name: "Chana Dal Premium (30kg)",
            brand: "Nature Fresh",
            category: "Grains & Flour",
            unit: "Jumbo Bags (30kg)",
            currentStock: 12,
            safetyStock: 40,
            reorderLevel: 50,
            costPrice: 1850,
            sellingPrice: 2050,
            bayLocation: "BAY-03 / PALLET-02",
            barcode: "8901844005129",
            taxRate: 0,
        },
        {
            id: "SKU-5509",
            code: "SKU-5509",
            name: "Fortune Soyabean Oil 1L",
            brand: "Adani Wilmar",
            category: "Edible Oils",
            unit: "Cartons (12x1L)",
            currentStock: 140,
            safetyStock: 40,
            reorderLevel: 60,
            costPrice: 1240,
            sellingPrice: 1300,
            bayLocation: "BAY-04 / RACK-B3",
            barcode: "8901233007815",
            taxRate: 5,
        },
    ]);

    // Static daily sales ledger data for Top 5 sold products today
    const topSoldProductsToday = [
        {
            name: "Fortune Mustard Oil 1L (x12)",
            qtySold: 210,
            totalSale: 294000,
            stockLeft: 240,
        },
        {
            name: "Fortune Soyabean Oil 1L (x12)",
            qtySold: 140,
            totalSale: 182000,
            stockLeft: 140,
        },
        {
            name: "Basmati Rice Royal (30kg)",
            qtySold: 65,
            totalSale: 174200,
            stockLeft: 35,
        },
        {
            name: "Refined Sugar M-30 (50kg)",
            qtySold: 52,
            totalSale: 102960,
            stockLeft: 18,
        },
        {
            name: "Tata Iodized Salt (1kg x 25)",
            qtySold: 48,
            totalSale: 30000,
            stockLeft: 410,
        },
    ];

    // Unit options
    const unitOptions = [
        "Pieces (Individual)",
        "Cartons (12x1L)",
        "Jumbo Bags (30kg)",
        "Standard Bags (50kg)",
        "Shrink Bundles (25kg)",
        "Corrugated Box (24pk)",
        "Bulk Gunny Bag (100kg)",
    ];

    // Toggle accordion item
    const toggleAccordion = (id) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    // Field updater
    const handleFieldChange = (id, field, value) => {
        setProducts((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    // Trigger create PO action
    const handleCreatePurchaseOrders = () => {
        const count = replenishProducts.length;
        showToast(`Draft Purchase Order generated for ${count} low-stock items`);
    };

    // Filter products for the accordion list
    const filteredProducts = products.filter((item) => {
        const matchesCat =
            selectedCategory === "All" || item.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        if (!q) return matchesCat;

        if (activeCriteria === "SKU") {
            return matchesCat && item.code.toLowerCase().includes(q);
        } else if (activeCriteria === "BRD") {
            return matchesCat && item.brand.toLowerCase().includes(q);
        } else if (activeCriteria === "LOC") {
            return matchesCat && item.bayLocation.toLowerCase().includes(q);
        }
        return (
            matchesCat &&
            (item.name.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q))
        );
    });

    // Calculate 2 primary metrics
    const totalValuation = products.reduce(
        (sum, p) => sum + (Number(p.currentStock) || 0) * (Number(p.costPrice) || 0),
        0
    );

    // Products needing replenishment (Current stock <= minimum safety stock)
    const replenishProducts = products.filter(
        (p) => (Number(p.currentStock) || 0) <= (Number(p.safetyStock) || 0)
    );

    return (
        <div className="min-h-screen w-full bg-[#e6f4f1] text-[#0a2727] flex antialiased selection:bg-[#0d5c58] selection:text-white">
            {/* Global font styling and minimalist input reset */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Quicksand:wght@500;600;700&display=swap"
                rel="stylesheet"
            />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
        body, input, button, select, textarea {
          font-family: 'Quicksand', sans-serif;
        }
        .font-mono, [data-mono] {
          font-family: 'Fira Code', monospace !important;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `,
                }}
            />

            {/* ========================================================================= */}
            {/* SIDEBAR NAVIGATION                                                        */}
            {/* ========================================================================= */}
            <aside className="w-[260px] shrink-0 min-h-screen border-r border-[#cce7e2] bg-[#f0f8f6] flex flex-col justify-between select-none hidden md:flex">
                <div>
                    {/* Brand Header */}
                    <div className="px-5 py-4 border-b border-[#cce7e2] flex items-center justify-between group cursor-pointer transition-colors duration-200 hover:bg-[#e4f3ef]">
                        <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded bg-[#0d5c58] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm">
                                W
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold tracking-tight text-[#0a2727]">
                                    Wholesale Portal
                                </span>
                                <span className="text-[10px] text-[#48716e] font-medium">
                                    Admin Control Desk
                                </span>
                            </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-[#0d5c58]" />
                    </div>

                    {/* Active Warehouse Selector */}
                    <div className="px-4 py-3 border-b border-[#cce7e2]">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1.5">
                            Active Warehouse
                        </label>
                        <div className="relative">
                            <select
                                defaultValue="central-1"
                                className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-2.5 py-2 outline-none font-medium appearance-none cursor-pointer hover:border-[#0d5c58]"
                            >
                                <option value="central-1">Central Warehouse #1</option>
                                <option value="depot-north">North Hub Storage</option>
                                <option value="cold-store">Cold Storage Unit</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#48716e]">
                                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="p-3 space-y-1 text-xs font-semibold">
                        <a
                            href="#dashboard"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] transition-all"
                        >
                            <svg className="w-4 h-4 fill-none stroke-current text-[#48716e]" viewBox="0 0 24 24" strokeWidth="2">
                                <rect width="7" height="9" x="3" y="3" rx="1" />
                                <rect width="7" height="5" x="14" y="3" rx="1" />
                                <rect width="7" height="9" x="14" y="12" rx="1" />
                                <rect width="7" height="5" x="3" y="16" rx="1" />
                            </svg>
                            <span>Dashboard</span>
                        </a>

                        <a
                            href="#inventory"
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#0d5c58] text-white shadow-xs"
                        >
                            <div className="flex items-center gap-2.5">
                                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                                <span>Inventory Master</span>
                            </div>
                            <span className="font-mono text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">
                                {products.length}
                            </span>
                        </a>

                        <a
                            href="#sales"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] transition-all"
                        >
                            <svg className="w-4 h-4 fill-none stroke-current text-[#48716e]" viewBox="0 0 24 24" strokeWidth="2">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                <rect x="8" y="2" width="8" height="4" rx="1" />
                            </svg>
                            <span>Sales Orders</span>
                        </a>

                        <a
                            href="#purchases"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] transition-all"
                        >
                            <svg className="w-4 h-4 fill-none stroke-current text-[#48716e]" viewBox="0 0 24 24" strokeWidth="2">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <path d="M3 6h18" />
                            </svg>
                            <span>Purchases</span>
                        </a>
                    </nav>
                </div>

                {/* User Card */}
                <div className="p-3 border-t border-[#cce7e2]">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#cce7e2] shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#0d5c58] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-[#0a2727]">Admin User</span>
                                <span className="text-[10px] text-[#48716e]">Warehouse Desk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ========================================================================= */}
            {/* MAIN INVENTORY WORKSPACE                                                  */}
            {/* ========================================================================= */}
            <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
                {/* Sticky Top Header */}
                <header className="sticky top-0 z-20 bg-[#e6f4f1]/95 backdrop-blur-md px-6 py-3 border-b border-[#cce7e2] flex flex-wrap items-center justify-between gap-4">
                    {/* Search Cluster */}
                    <div className="flex items-center gap-2.5 w-full max-w-2xl">
                        <div className="flex-1 relative flex items-center bg-white border border-[#cce7e2] rounded-lg transition-all duration-200 hover:border-[#0d5c58]/60 focus-within:border-[#0d5c58] focus-within:ring-1 focus-within:ring-[#0d5c58] shadow-xs">
                            <div className="flex items-center pl-2.5 pr-1.5 gap-1.5 pointer-events-none shrink-0 border-r border-[#edf5f3] my-1">
                                <span className="font-mono text-[10px] font-bold tracking-wider bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.5 rounded">
                                    {activeCriteria}
                                </span>
                                <svg className="w-3.5 h-3.5 fill-none stroke-current text-[#48716e]" viewBox="0 0 24 24" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={
                                    activeCriteria === "SKU"
                                        ? "Search SKU Code (e.g. SKU-7701)..."
                                        : activeCriteria === "BRD"
                                            ? "Filter by brand name..."
                                            : activeCriteria === "LOC"
                                                ? "Search bay/bin (e.g. BAY-04)..."
                                                : "Search product name or keyword..."
                                }
                                className="w-full px-3 py-1.5 bg-transparent text-xs text-[#0a2727] placeholder:text-[#80a5a2] outline-none font-medium"
                            />
                        </div>

                        {/* Criteria Selector Pills */}
                        <div className="flex items-center bg-[#daf0eb] p-1 rounded-lg border border-[#cce7e2] gap-1 shrink-0 overflow-x-auto">
                            {buttonsArr.map((item) => (
                                <button
                                    key={item.code}
                                    type="button"
                                    onClick={() => setActiveCriteria(item.code)}
                                    className={`px-2.5 py-1 text-[11px] font-bold rounded transition-all duration-150 cursor-pointer whitespace-nowrap ${activeCriteria === item.code
                                            ? "bg-[#0d5c58] text-white shadow-xs"
                                            : "text-[#345c59] hover:text-[#0a2727] hover:bg-white/60"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Date Display */}
                    <div className="flex items-center gap-4 shrink-0 ml-auto">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-semibold text-[#0a2727]">Today</div>
                            <div className="font-mono text-[11px] text-[#48716e]">22 Sep 2026</div>
                        </div>
                    </div>
                </header>

                {/* Workspace Body */}
                <main className="p-6 space-y-6 max-w-7xl w-full mx-auto">
                    {/* Toast Notification */}
                    {toastMessage && (
                        <div className="fixed bottom-6 right-6 z-50 bg-[#0a2727] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-[#0d5c58] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{toastMessage}</span>
                        </div>
                    )}

                    {/* ========================================================================= */}
                    {/* 2 DATA-RICH METRIC CARDS WITH INTEGRATED TABLES                           */}
                    {/* ========================================================================= */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* CARD 1: TOP 5 SOLD PRODUCTS TODAY */}
                        <div className="bg-white p-5 rounded-2xl border border-[#cce7e2] shadow-xs flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-3 border-b border-[#edf5f3]">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#0d5c58]" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#345c59]">
                                            Top 5 Sold Products Today
                                        </span>
                                    </div>
                                    <span className="font-mono text-[11px] font-bold text-[#0d5c58] bg-[#d7ede7] px-2.5 py-0.5 rounded-md">
                                        Total Value: ₹{totalValuation.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                {/* Table: Top 5 Sold Products */}
                                <div className="mt-3 overflow-x-auto rounded-xl border border-[#cce7e2]">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="bg-[#f0f8f6] border-b border-[#cce7e2] text-[#48716e] text-[10px] uppercase font-semibold">
                                                <th className="py-2.5 px-3">Product Name</th>
                                                <th className="py-2.5 px-3 text-center">Qty Sold</th>
                                                <th className="py-2.5 px-3 text-right">Total Sale</th>
                                                <th className="py-2.5 px-3 text-center">Stock Left</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#edf5f3] bg-white">
                                            {topSoldProductsToday.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-[#eef8f5]/60 transition-colors">
                                                    <td className="py-2.5 px-3 font-semibold text-[#0a2727]">
                                                        {item.name}
                                                    </td>
                                                    <td className="py-2.5 px-3 font-mono text-center font-bold text-[#0d5c58]">
                                                        {item.qtySold}
                                                    </td>
                                                    <td className="py-2.5 px-3 font-mono text-right font-bold text-[#0a2727]">
                                                        ₹ {item.totalSale.toLocaleString("en-IN")}
                                                    </td>
                                                    <td className="py-2.5 px-3 text-center">
                                                        <span className="font-mono text-[11px] font-semibold bg-[#eaf5f2] text-[#0d5c58] px-2 py-0.5 rounded">
                                                            {item.stockLeft}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-[#edf5f3] flex items-center justify-between text-[11px] text-[#527774]">
                                <span>Showing today's top dispatches</span>
                                <span className="font-mono font-medium">5 items tracking</span>
                            </div>
                        </div>

                        {/* CARD 2: REPLENISHMENT & REORDER DESK */}
                        <div className="bg-white p-5 rounded-2xl border border-[#cce7e2] shadow-xs flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-3 border-b border-[#edf5f3]">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full ${replenishProducts.length > 0
                                                    ? "bg-amber-500 animate-pulse"
                                                    : "bg-emerald-500"
                                                }`}
                                        />
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#345c59]">
                                            Stock Replenishment Alerts
                                        </span>
                                    </div>

                                    {/* Create Purchase Orders Button */}
                                    <button
                                        type="button"
                                        onClick={handleCreatePurchaseOrders}
                                        className="flex items-center gap-1.5 bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span>Create Purchase Orders</span>
                                    </button>
                                </div>

                                {/* Table: Replenish Products */}
                                <div className="mt-3 overflow-x-auto rounded-xl border border-[#cce7e2]">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="bg-[#f0f8f6] border-b border-[#cce7e2] text-[#48716e] text-[10px] uppercase font-semibold">
                                                <th className="py-2.5 px-3">Product Name</th>
                                                <th className="py-2.5 px-3 text-center">Current Stock</th>
                                                <th className="py-2.5 px-3 text-center">Minimum Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#edf5f3] bg-white">
                                            {replenishProducts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="py-8 text-center text-xs text-[#80a5a2]">
                                                        All product inventory levels are healthy above safety buffers.
                                                    </td>
                                                </tr>
                                            ) : (
                                                replenishProducts.map((p) => (
                                                    <tr key={p.id} className="hover:bg-amber-50/40 transition-colors">
                                                        <td className="py-2.5 px-3">
                                                            <div className="font-semibold text-[#0a2727]">{p.name}</div>
                                                            <span className="font-mono text-[10px] text-[#48716e]">{p.code} • {p.unit}</span>
                                                        </td>
                                                        <td className="py-2.5 px-3 text-center">
                                                            <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                                                                {p.currentStock} units
                                                            </span>
                                                        </td>
                                                        <td className="py-2.5 px-3 text-center font-mono text-xs font-semibold text-[#527774]">
                                                            {p.safetyStock} units
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-3 pt-2 border-t border-[#edf5f3] flex items-center justify-between text-[11px] text-[#527774]">
                                <span>Requires vendor reorder</span>
                                <span className="font-mono font-bold text-amber-900">
                                    {replenishProducts.length} items breached
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ========================================================================= */}
                    {/* CATEGORY FILTER CHIPS & ACCORDION HEADER                                  */}
                    {/* ========================================================================= */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                            {["All", "Edible Oils", "Grains & Flour", "Spices & Condiments"].map(
                                (cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${selectedCategory === cat
                                                ? "bg-[#0d5c58] text-white shadow-xs"
                                                : "bg-white hover:bg-[#eef8f5] text-[#345c59] border border-[#cce7e2]"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                )
                            )}
                        </div>

                        <span className="text-xs text-[#527774] font-medium self-end sm:self-auto">
                            Showing <strong className="text-[#0a2727]">{filteredProducts.length}</strong> items • Click row to edit
                        </span>
                    </div>

                    {/* ========================================================================= */}
                    {/* STYLIZED PRODUCT ACCORDION LIST                                           */}
                    {/* ========================================================================= */}
                    <section className="space-y-3">
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-2xl border border-[#cce7e2] text-xs text-[#527774]">
                                No products found matching your search criteria.
                            </div>
                        ) : (
                            filteredProducts.map((product) => {
                                const isExpanded = expandedId === product.id;
                                const isLow =
                                    Number(product.currentStock) <= Number(product.safetyStock);
                                const grossMargin =
                                    product.sellingPrice > 0
                                        ? (
                                            ((product.sellingPrice - product.costPrice) /
                                                product.sellingPrice) *
                                            100
                                        ).toFixed(1)
                                        : "0.0";

                                return (
                                    <div
                                        key={product.id}
                                        className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${isExpanded
                                                ? "border-[#0d5c58] shadow-md ring-1 ring-[#0d5c58]/30"
                                                : "border-[#cce7e2] hover:border-[#0d5c58]/50 shadow-xs"
                                            }`}
                                    >
                                        {/* ACCORDION SUMMARY HEADER (Always Visible Row) */}
                                        <div
                                            onClick={() => toggleAccordion(product.id)}
                                            className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none transition-colors ${isExpanded ? "bg-[#f5fbf9]" : "hover:bg-[#fafdfc]"
                                                }`}
                                        >
                                            {/* Left: SKU, Name, Brand & Location */}
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-xs font-bold bg-[#d7ede7] text-[#0d5c58] px-2 py-1 rounded-md shrink-0">
                                                    {product.code}
                                                </span>

                                                <div>
                                                    <div className="text-sm font-bold text-[#0a2727] flex items-center gap-2">
                                                        <span>{product.name}</span>
                                                        <span className="text-[11px] font-normal text-[#527774]">
                                                            ({product.brand})
                                                        </span>
                                                    </div>
                                                    <div className="text-[11px] text-[#527774] flex items-center gap-2 mt-0.5">
                                                        <span>{product.unit}</span>
                                                        <span>•</span>
                                                        <span className="font-mono text-[10px] text-[#48716e]">
                                                            {product.bayLocation}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Quick Stock Status & Accordion Chevron */}
                                            <div className="flex items-center justify-between sm:justify-end gap-5">
                                                <div className="text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <span className="text-[10px] uppercase font-bold text-[#48716e]">
                                                            Stock:
                                                        </span>
                                                        <span
                                                            className={`font-mono text-sm font-bold px-2 py-0.5 rounded-md ${isLow
                                                                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                                                                    : "bg-[#eaf5f2] text-[#0d5c58]"
                                                                }`}
                                                        >
                                                            {product.currentStock}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-[#527774] font-mono mt-0.5">
                                                        Cost: ₹{product.costPrice} • Sell: ₹{product.sellingPrice}
                                                    </div>
                                                </div>

                                                {/* Chevron Icon */}
                                                <div
                                                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform duration-200 ${isExpanded
                                                            ? "rotate-180 bg-[#0d5c58] text-white"
                                                            : "bg-[#f0f8f6] text-[#48716e]"
                                                        }`}
                                                >
                                                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* EXPANDED ACCORDION BODY (Minimalist Editable Inputs) */}
                                        {isExpanded && (
                                            <div className="p-6 border-t border-[#edf5f3] bg-white space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    {/* CLUSTER 1: IDENTIFICATION & PACKAGING */}
                                                    <div className="p-4 rounded-xl bg-[#f8fcfb] border border-[#d9eee9] space-y-4">
                                                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0d5c58] border-b border-[#cce7e2] pb-1.5 flex items-center justify-between">
                                                            <span>Product Details</span>
                                                            <span className="text-[10px] font-mono text-[#527774]">METADATA</span>
                                                        </div>

                                                        {/* Product Name */}
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                Product Title
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={product.name}
                                                                onChange={(e) =>
                                                                    handleFieldChange(product.id, "name", e.target.value)
                                                                }
                                                                className="w-full text-xs font-bold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                            />
                                                        </div>

                                                        {/* Brand */}
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                Brand / Vendor
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={product.brand}
                                                                onChange={(e) =>
                                                                    handleFieldChange(product.id, "brand", e.target.value)
                                                                }
                                                                className="w-full text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                            />
                                                        </div>

                                                        {/* Packaging Unit */}
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                Standard Packaging Unit
                                                            </label>
                                                            <select
                                                                value={product.unit}
                                                                onChange={(e) =>
                                                                    handleFieldChange(product.id, "unit", e.target.value)
                                                                }
                                                                className="w-full text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors cursor-pointer"
                                                            >
                                                                {unitOptions.map((opt) => (
                                                                    <option key={opt} value={opt}>
                                                                        {opt}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* CLUSTER 2: STOCK AUDITING & THRESHOLDS */}
                                                    <div className="p-4 rounded-xl bg-[#f8fcfb] border border-[#d9eee9] space-y-4">
                                                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0d5c58] border-b border-[#cce7e2] pb-1.5 flex items-center justify-between">
                                                            <span>Stock & Safety Limits</span>
                                                            <span className="text-[10px] font-mono text-[#527774]">COUNT</span>
                                                        </div>

                                                        {/* Current Physical Stock */}
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                Current Physical Stock
                                                            </label>
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    value={product.currentStock}
                                                                    onChange={(e) =>
                                                                        handleFieldChange(
                                                                            product.id,
                                                                            "currentStock",
                                                                            Math.max(0, parseInt(e.target.value, 10) || 0)
                                                                        )
                                                                    }
                                                                    className="w-full font-mono text-sm font-bold text-[#0d5c58] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                                />
                                                                <span className="text-xs text-[#527774] shrink-0 font-medium">
                                                                    Units
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Safety Stock Buffer */}
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                Minimum Safety Stock
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={product.safetyStock}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        product.id,
                                                                        "safetyStock",
                                                                        Math.max(0, parseInt(e.target.value, 10) || 0)
                                                                    )
                                                                }
                                                                className="w-full font-mono text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                            />
                                                        </div>

                                                        {/* Reorder Level Threshold */}
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                Reorder Trigger Level
                                                            </label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={product.reorderLevel}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        product.id,
                                                                        "reorderLevel",
                                                                        Math.max(0, parseInt(e.target.value, 10) || 0)
                                                                    )
                                                                }
                                                                className="w-full font-mono text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* CLUSTER 3: PRICING, MARGINS & LOCATION */}
                                                    <div className="p-4 rounded-xl bg-[#f8fcfb] border border-[#d9eee9] space-y-4">
                                                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0d5c58] border-b border-[#cce7e2] pb-1.5 flex items-center justify-between">
                                                            <span>Financials & Logistics</span>
                                                            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                                                {grossMargin}% Margin
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3">
                                                            {/* Cost Price */}
                                                            <div>
                                                                <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                    Cost Price (₹)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    value={product.costPrice}
                                                                    onChange={(e) =>
                                                                        handleFieldChange(
                                                                            product.id,
                                                                            "costPrice",
                                                                            parseFloat(e.target.value) || 0
                                                                        )
                                                                    }
                                                                    className="w-full font-mono text-xs font-semibold text-[#527774] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                                />
                                                            </div>

                                                            {/* Selling Price */}
                                                            <div>
                                                                <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                    Selling Price (₹)
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    value={product.sellingPrice}
                                                                    onChange={(e) =>
                                                                        handleFieldChange(
                                                                            product.id,
                                                                            "sellingPrice",
                                                                            parseFloat(e.target.value) || 0
                                                                        )
                                                                    }
                                                                    className="w-full font-mono text-xs font-bold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Bay Storage Location */}
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                Warehouse Bay / Rack Location
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={product.bayLocation}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        product.id,
                                                                        "bayLocation",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full font-mono text-xs font-bold text-[#0d5c58] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                            />
                                                        </div>

                                                        {/* Barcode EAN */}
                                                        <div>
                                                            <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                                                EAN-13 Barcode
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={product.barcode}
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        product.id,
                                                                        "barcode",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="w-full font-mono text-xs text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1 transition-colors"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ACCORDION BOTTOM ACTIONS */}
                                                <div className="pt-2 flex items-center justify-between border-t border-[#edf5f3]">
                                                    <div className="text-[11px] text-[#527774]">
                                                        Total SKU inventory asset value:{" "}
                                                        <strong className="font-mono text-[#0a2727]">
                                                            ₹{" "}
                                                            {(
                                                                product.currentStock * product.costPrice
                                                            ).toLocaleString("en-IN")}
                                                        </strong>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleAccordion(product.id)}
                                                            className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-[#cce7e2] text-[#48716e] hover:bg-[#f0f8f6] transition-colors cursor-pointer"
                                                        >
                                                            Collapse
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                showToast(`${product.code} updated successfully`)
                                                            }
                                                            className="px-5 py-1.5 text-xs font-bold rounded-lg bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                                                        >
                                                            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                                                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <span>Save Changes</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}