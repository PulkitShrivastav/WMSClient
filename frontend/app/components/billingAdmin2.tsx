import React, { useState, useMemo } from "react";

interface CatalogItem {
    id: string;
    name: string;
    brand: string;
    unit: string;
    rate: number;
    discountPercent: number;
    stock: number;
}

interface BillLineItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    discountPercent: number;
    subtotal: number;
}

const CATALOG: CatalogItem[] = [
    { id: "PRD-101", name: "Fortune Mustard Oil (1L x 12)", brand: "Fortune", unit: "Carton", rate: 1400, discountPercent: 5, stock: 140 },
    { id: "PRD-102", name: "Fortune Soyabean Oil (1L x 12)", brand: "Fortune", unit: "Carton", rate: 1300, discountPercent: 3, stock: 95 },
    { id: "PRD-103", name: "Daawat Basmati Rice (30kg Bag)", brand: "Daawat", unit: "Bag", rate: 2680, discountPercent: 2, stock: 64 },
    { id: "PRD-104", name: "Tata Salt Crystals (1kg x 24)", brand: "Tata", unit: "Sack", rate: 480, discountPercent: 0, stock: 220 },
    { id: "PRD-105", name: "MDH Deggi Mirch (500g x 10)", brand: "MDH", unit: "Box", rate: 2120, discountPercent: 4, stock: 50 },
    { id: "PRD-106", name: "Refined Pure Sugar (50kg Bag)", brand: "Uttam", unit: "Bag", rate: 1980, discountPercent: 1.5, stock: 110 },
];

export default function BillingAdminDesk() {
    // Read-only bill items state
    const [billItems, setBillItems] = useState<BillLineItem[]>([
        {
            id: "PRD-101",
            name: "Fortune Mustard Oil (1L x 12)",
            quantity: 5,
            unit: "Carton",
            discountPercent: 5,
            subtotal: Math.round(5 * 1400 * (1 - 5 / 100)),
        },
        {
            id: "PRD-103",
            name: "Daawat Basmati Rice (30kg Bag)",
            quantity: 3,
            unit: "Bag",
            discountPercent: 2,
            subtotal: Math.round(3 * 2680 * (1 - 2 / 100)),
        },
        {
            id: "PRD-105",
            name: "MDH Deggi Mirch (500g x 10)",
            quantity: 2,
            unit: "Box",
            discountPercent: 4,
            subtotal: Math.round(2 * 2120 * (1 - 4 / 100)),
        },
    ]);

    // Customer & ledger details
    const [customerName, setCustomerName] = useState("Gupta Supermart");
    const previousOutstanding = 14250; // Existing ledger balance for customer

    // Final Settlement States
    const [amountPaidInput, setAmountPaidInput] = useState<string>("15000");
    const [paymentMode, setPaymentMode] = useState<"UPI" | "Cash" | "Bank Transfer" | "Cheque">("UPI");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFinalized, setIsFinalized] = useState(false);

    // 1. Total Amount = sum of subtotals
    const totalAmount = useMemo(() => {
        return billItems.reduce((acc, item) => acc + item.subtotal, 0);
    }, [billItems]);

    // 2. Amount Paid
    const amountPaid = useMemo(() => {
        const parsed = parseFloat(amountPaidInput);
        return isNaN(parsed) ? 0 : Math.max(0, parsed);
    }, [amountPaidInput]);

    // 3. Due on this Order = Total Amount - Amount Paid
    const dueOnThisOrder = useMemo(() => {
        return Math.max(0, totalAmount - amountPaid);
    }, [totalAmount, amountPaid]);

    // 4. Total Due = Previous Outstanding + Due on this Order
    const totalDue = useMemo(() => {
        return previousOutstanding + dueOnThisOrder;
    }, [previousOutstanding, dueOnThisOrder]);

    const handleCatalogAdd = (product: CatalogItem) => {
        setBillItems((prev) => {
            const existing = prev.find((x) => x.id === product.id);
            if (existing) {
                const nextQty = existing.quantity + 1;
                const nextSubtotal = Math.round(nextQty * product.rate * (1 - product.discountPercent / 100));
                return prev.map((x) =>
                    x.id === product.id ? { ...x, quantity: nextQty, subtotal: nextSubtotal } : x
                );
            }

            const subtotal = Math.round(1 * product.rate * (1 - product.discountPercent / 100));
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    quantity: 1,
                    unit: product.unit,
                    discountPercent: product.discountPercent,
                    subtotal,
                },
            ];
        });
    };

    const filteredCatalog = useMemo(() => {
        if (!searchQuery.trim()) return CATALOG;
        const q = searchQuery.toLowerCase();
        return CATALOG.filter(
            (item) => item.name.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen w-full bg-[#e6f4f1] text-[#0a2727] flex antialiased selection:bg-[#0d5c58] selection:text-white">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
            body, input, button, select, textarea {
              font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .font-mono, [data-mono] {
              font-family: 'Fira Code', monospace !important;
            }
          `,
                }}
            />

            {/* FIXED SIDEBAR NAVIGATION */}
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
                        <span className="w-2 h-2 rounded-full bg-[#0d5c58]" />
                    </div>

                    {/* Active Counter Selector */}
                    <div className="px-4 py-3 border-b border-[#cce7e2]">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1.5">
                            Active Counter
                        </label>
                        <div className="relative group">
                            <select
                                defaultValue="desk-1"
                                className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-2.5 py-2 outline-none font-medium appearance-none cursor-pointer hover:border-[#0d5c58] focus:border-[#0d5c58]"
                            >
                                <option value="desk-1">Billing Counter #01</option>
                                <option value="desk-2">Gate Wholesale Express</option>
                                <option value="desk-3">Bulk Yard Dispatch</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#48716e]">
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
                            className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] hover:translate-x-1 transition-all duration-200"
                        >
                            <div className="flex items-center gap-2.5">
                                <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58]" viewBox="0 0 24 24" strokeWidth="2">
                                    <rect width="7" height="9" x="3" y="3" rx="1" />
                                    <rect width="7" height="5" x="14" y="3" rx="1" />
                                    <rect width="7" height="9" x="14" y="12" rx="1" />
                                    <rect width="7" height="5" x="3" y="16" rx="1" />
                                </svg>
                                <span>Dashboard</span>
                            </div>
                        </a>

                        <a
                            href="#billing"
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#0d5c58] text-white shadow-xs"
                        >
                            <div className="flex items-center gap-2.5">
                                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                                <span>Billing Screen</span>
                            </div>
                            <span className="font-mono text-[9px] bg-emerald-700/60 text-emerald-100 px-1.5 py-0.5 rounded font-bold uppercase">
                                Live
                            </span>
                        </a>

                        <a
                            href="#sales"
                            className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] hover:translate-x-1 transition-all duration-200"
                        >
                            <div className="flex items-center gap-2.5">
                                <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58]" viewBox="0 0 24 24" strokeWidth="2">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                    <rect x="8" y="2" width="8" height="4" rx="1" />
                                </svg>
                                <span>Invoices & Sales</span>
                            </div>
                            <span className="font-mono text-[10px] bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.5 rounded font-bold">
                                48
                            </span>
                        </a>
                    </nav>
                </div>

                {/* User Card */}
                <div className="p-3 border-t border-[#cce7e2]">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#cce7e2] shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#0d5c58] text-white flex items-center justify-center font-bold text-xs">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-[#0a2727] leading-tight">Admin User</span>
                                <span className="text-[10px] text-[#48716e]">Desk Operator</span>
                            </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
            </aside>

            {/* MAIN BILLING SCREEN */}
            <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
                {/* Sticky Header */}
                <header className="sticky top-0 z-20 bg-[#e6f4f1]/95 backdrop-blur-md px-6 py-3 border-b border-[#cce7e2] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] font-bold tracking-wider bg-[#d7ede7] text-[#0d5c58] px-2 py-0.5 rounded">
                            BIL-2026-0814
                        </span>
                        <span className="text-xs font-bold text-[#0a2727]">Point of Sale • Tax Invoice</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setBillItems([]);
                                setAmountPaidInput("0");
                                setIsFinalized(false);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-[#cce7e2] bg-white hover:bg-rose-50 hover:border-rose-300 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                            Clear Bill
                        </button>
                        <button
                            onClick={() => setIsFinalized(true)}
                            className="group flex items-center gap-1.5 bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5 fill-none stroke-current transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Save & Finalize Bill</span>
                        </button>
                    </div>
                </header>

                {/* Content Body */}
                <main className="p-6 space-y-6">
                    {isFinalized && (
                        <div className="bg-[#eff8f6] border border-[#bce2d8] rounded-xl p-4 flex items-center justify-between animate-fadeIn">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-[#0d5c58] text-white flex items-center justify-center font-bold text-xs">
                                    ✓
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-[#0d5c58]">Bill BIL-2026-0814 successfully posted!</div>
                                    <div className="text-[11px] text-[#48716e]">
                                        Settled ₹{amountPaid.toLocaleString("en-IN")} via {paymentMode}. Remaining Due on this Order: ₹{dueOnThisOrder.toLocaleString("en-IN")}.
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => window.print()}
                                className="px-3 py-1 bg-white border border-[#cce7e2] rounded-lg text-xs font-bold text-[#0d5c58] hover:bg-[#d7ede7] transition-colors cursor-pointer"
                            >
                                Print Slip
                            </button>
                        </div>
                    )}

                    {/* Customer Context Bar */}
                    <div className="bg-white p-4 rounded-xl border border-[#cce7e2] shadow-xs flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#edf5f3] flex items-center justify-center text-[#0d5c58] font-bold text-xs">
                                🏢
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block">Billed Customer</span>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="bg-transparent font-bold text-xs text-[#0a2727] outline-none hover:border-b border-[#0d5c58]"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                            <div className="px-3 py-1.5 rounded-lg bg-[#f6fbf9] border border-[#cce7e2]">
                                <span className="text-[10px] uppercase font-bold text-[#527774] block">Previous Ledger Due</span>
                                <span className="font-mono font-bold text-amber-900">₹ {previousOutstanding.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-[#f6fbf9] border border-[#cce7e2]">
                                <span className="text-[10px] uppercase font-bold text-[#527774] block">Bill Date</span>
                                <span className="font-mono font-bold text-[#0a2727]">24 Sep 2026</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                        {/* Catalog Drawer to populate items */}
                        <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-[#cce7e2] shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-[#0a2727] uppercase tracking-wider">Product Inventory</div>
                                    <div className="text-[11px] text-[#527774]">Click to append line item to bill</div>
                                </div>
                                <span className="font-mono text-[10px] bg-[#edf5f3] px-2 py-0.5 rounded font-bold text-[#48716e]">
                                    {CATALOG.length} SKUs
                                </span>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search item, brand, or code..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 bg-[#f6fbf9] border border-[#cce7e2] rounded-lg text-xs font-mono outline-none focus:border-[#0d5c58]"
                                />
                                <svg className="w-3.5 h-3.5 fill-none stroke-current text-[#48716e] absolute left-2.5 top-2.5" viewBox="0 0 24 24" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>

                            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                                {filteredCatalog.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleCatalogAdd(item)}
                                        className="p-2.5 rounded-xl border border-[#cce7e2] bg-[#fdfefe] hover:bg-[#eef8f5] hover:border-[#0d5c58] transition-all cursor-pointer flex items-center justify-between group"
                                    >
                                        <div>
                                            <div className="text-xs font-bold text-[#0a2727] group-hover:text-[#0d5c58] transition-colors">
                                                {item.name}
                                            </div>
                                            <div className="text-[10px] text-[#48716e] flex items-center gap-1.5 mt-0.5">
                                                <span className="font-mono bg-[#edf5f3] px-1 rounded">{item.id}</span>
                                                <span>{item.unit}</span>
                                                <span>•</span>
                                                <span className="font-mono text-emerald-700">{item.stock} in stock</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-xs font-bold text-[#0a2727]">
                                                ₹ {item.rate.toLocaleString("en-IN")}
                                            </div>
                                            <span className="text-[9px] font-mono text-rose-700 bg-rose-50 px-1 rounded border border-rose-100 font-semibold">
                                                {item.discountPercent}% OFF
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Read-Only Bill Table & Summary */}
                        <div className="xl:col-span-8 bg-white p-5 rounded-2xl border border-[#cce7e2] shadow-xs space-y-5">
                            <div className="flex items-center justify-between border-b border-[#edf5f3] pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#0a2727] uppercase tracking-wider">Customer Bill Table</span>
                                    <span className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                                        Read-Only Generated Output
                                    </span>
                                </div>
                                <span className="font-mono text-xs font-bold text-[#0d5c58]">
                                    {billItems.length} Total Items
                                </span>
                            </div>

                            {/* Strict Read-Only Fields Table */}
                            <div className="overflow-x-auto rounded-xl border border-[#cce7e2]">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-[#f0f8f6] border-b border-[#cce7e2] text-[#48716e] text-[10px] uppercase font-bold tracking-wider">
                                            <th className="py-2.5 px-3.5">Product Name</th>
                                            <th className="py-2.5 px-3 text-center">Quantity</th>
                                            <th className="py-2.5 px-3 text-center">Unit</th>
                                            <th className="py-2.5 px-3 text-center">Discount (%)</th>
                                            <th className="py-2.5 px-3.5 text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#edf5f3] bg-white select-none">
                                        {billItems.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-[#48716e] text-xs font-medium">
                                                    Bill is empty. Click items from the product inventory to generate lines.
                                                </td>
                                            </tr>
                                        ) : (
                                            billItems.map((item) => (
                                                <tr key={item.id} className="hover:bg-[#f6fbf9] transition-colors">
                                                    {/* 1. Product Name */}
                                                    <td className="py-3 px-3.5 font-semibold text-[#0a2727]">
                                                        {item.name}
                                                    </td>
                                                    {/* 2. Quantity (Non-editable) */}
                                                    <td className="py-3 px-3 text-center font-mono font-bold text-[#0a2727]">
                                                        {item.quantity}
                                                    </td>
                                                    {/* 3. Unit (Non-editable) */}
                                                    <td className="py-3 px-3 text-center font-mono text-[#48716e]">
                                                        {item.unit}
                                                    </td>
                                                    {/* 4. Discount in Percent (Non-editable) */}
                                                    <td className="py-3 px-3 text-center">
                                                        <span className="font-mono text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                                                            {item.discountPercent}%
                                                        </span>
                                                    </td>
                                                    {/* 5. Subtotal (Non-editable) */}
                                                    <td className="py-3 px-3.5 text-right font-mono font-bold text-[#0a2727]">
                                                        ₹ {item.subtotal.toLocaleString("en-IN")}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Settlement Fields */}
                            <div className="bg-[#f6fbf9] p-5 rounded-xl border border-[#cce7e2] space-y-3.5">
                                {/* 1. Total Amount */}
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-semibold text-[#48716e]">Total Amount</span>
                                    <span className="font-mono text-base font-bold text-[#0a2727]">
                                        ₹ {totalAmount.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                {/* 2. Amount Paid (Editable input) & Payment Mode */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#edf5f3]">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1">
                                            Payment Mode
                                        </label>
                                        <div className="flex items-center bg-[#daf0eb] p-1 rounded-lg border border-[#cce7e2] gap-1">
                                            {(["UPI", "Cash", "Bank Transfer", "Cheque"] as const).map((mode) => (
                                                <button
                                                    key={mode}
                                                    type="button"
                                                    onClick={() => setPaymentMode(mode)}
                                                    className={`flex-1 py-1 text-[11px] font-bold rounded transition-all cursor-pointer whitespace-nowrap ${paymentMode === mode
                                                        ? "bg-[#0d5c58] text-white shadow-xs"
                                                        : "text-[#345c59] hover:bg-white/60"
                                                        }`}
                                                >
                                                    {mode}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1">
                                            Amount Paid (₹)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={amountPaidInput}
                                            onChange={(e) => setAmountPaidInput(e.target.value)}
                                            className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs font-mono font-bold rounded-lg px-3 py-1.5 outline-none focus:border-[#0d5c58] focus:ring-1 focus:ring-[#0d5c58]"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* 3. Due on this Order & 4. Total Due */}
                                <div className="pt-3 border-t border-[#cce7e2] grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-3 bg-white rounded-lg border border-[#cce7e2]">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block">
                                            Due on this Order
                                        </span>
                                        <span className="font-mono text-lg font-bold text-[#0a2727] mt-0.5 block">
                                            ₹ {dueOnThisOrder.toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-[10px] text-[#527774]">Order Total − Amount Paid</span>
                                    </div>

                                    <div className="p-3 bg-[#eff8f6] rounded-lg border border-[#bce2d8]">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0d5c58] block">
                                                Total Due
                                            </span>
                                            <span className="text-[9px] font-mono font-bold bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.2 rounded">
                                                Includes Previous Due
                                            </span>
                                        </div>
                                        <span className="font-mono text-xl font-bold text-[#0d5c58] mt-0.5 block">
                                            ₹ {totalDue.toLocaleString("en-IN")}
                                        </span>
                                        <span className="text-[10px] text-[#48716e]">
                                            (₹{previousOutstanding.toLocaleString("en-IN")} prev + ₹{dueOnThisOrder.toLocaleString("en-IN")} current)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}