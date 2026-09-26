import React, { useState, useMemo } from "react";

// Types
interface InventoryItem {
    id: string;
    name: string;
    brand: string;
    unit: string;
    stock: number;
    rate: number;
    gstRate: number; // e.g. 5, 12, 18
}

interface BillItem {
    itemId: string;
    name: string;
    brand: string;
    quantity: number;
    rate: number;
    unit: string;
    gstRate: number;
}

// Preset Inventory Catalog
const CATALOG: InventoryItem[] = [
    { id: "PRD-101", name: "Fortune Mustard Oil (1L x 12)", brand: "Fortune", unit: "Carton", stock: 140, rate: 1400, gstRate: 5 },
    { id: "PRD-102", name: "Fortune Soyabean Oil (1L x 12)", brand: "Fortune", unit: "Carton", stock: 95, rate: 1300, gstRate: 5 },
    { id: "PRD-103", name: "Daawat Basmati Rice (30kg Bag)", brand: "Daawat", unit: "Bag", stock: 64, rate: 2680, gstRate: 0 },
    { id: "PRD-104", name: "Tata Salt Crystals (1kg x 24)", brand: "Tata", unit: "Sack", stock: 220, rate: 480, gstRate: 5 },
    { id: "PRD-105", name: "MDH Deggi Mirch (500g x 10)", brand: "MDH", unit: "Box", stock: 50, rate: 2120, gstRate: 12 },
    { id: "PRD-106", name: "Refined Pure Sugar (50kg Bag)", brand: "Uttam", unit: "Bag", stock: 110, rate: 1980, gstRate: 5 },
];

export default function WholesaleBillingDesk() {
    // Billing state
    const [billItems, setBillItems] = useState<BillItem[]>([
        { itemId: "PRD-101", name: "Fortune Mustard Oil (1L x 12)", brand: "Fortune", quantity: 5, rate: 1400, unit: "Carton", gstRate: 5 },
        { itemId: "PRD-103", name: "Daawat Basmati Rice (30kg Bag)", brand: "Daawat", quantity: 3, rate: 2680, unit: "Bag", gstRate: 0 },
    ]);

    const [customerName, setCustomerName] = useState("Gupta Supermart");
    const [customerGst, setCustomerGst] = useState("07AAAAA0000A1Z5");
    const [paymentMode, setPaymentMode] = useState<"UPI" | "CASH" | "CREDIT">("UPI");
    const [discountPercent, setDiscountPercent] = useState<number>(2);
    const [searchQuery, setSearchQuery] = useState("");
    const [isGenerated, setIsGenerated] = useState(false);

    // Filter Catalog for quick additions
    const filteredCatalog = useMemo(() => {
        if (!searchQuery.trim()) return CATALOG;
        const q = searchQuery.toLowerCase();
        return CATALOG.filter(
            (item) => item.name.toLowerCase().includes(q) || item.brand.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    // Calculations
    const subtotal = useMemo(() => {
        return billItems.reduce((acc, item) => acc + item.quantity * item.rate, 0);
    }, [billItems]);

    const discountAmount = useMemo(() => {
        return (subtotal * discountPercent) / 100;
    }, [subtotal, discountPercent]);

    const totalGst = useMemo(() => {
        return billItems.reduce((acc, item) => {
            const taxableAmount = item.quantity * item.rate * (1 - discountPercent / 100);
            return acc + (taxableAmount * item.gstRate) / 100;
        }, 0);
    }, [billItems, discountPercent]);

    const grandTotal = useMemo(() => {
        return Math.round(subtotal - discountAmount + totalGst);
    }, [subtotal, discountAmount, totalGst]);

    // Handlers
    const handleAddItem = (product: InventoryItem) => {
        setBillItems((prev) => {
            const existing = prev.find((x) => x.itemId === product.id);
            if (existing) {
                return prev.map((x) =>
                    x.itemId === product.id ? { ...x, quantity: x.quantity + 1 } : x
                );
            }
            return [
                ...prev,
                {
                    itemId: product.id,
                    name: product.name,
                    brand: product.brand,
                    quantity: 1,
                    rate: product.rate,
                    unit: product.unit,
                    gstRate: product.gstRate,
                },
            ];
        });
    };

    const handleUpdateQty = (itemId: string, delta: number) => {
        setBillItems((prev) =>
            prev
                .map((item) => {
                    if (item.itemId === itemId) {
                        const nextQty = item.quantity + delta;
                        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
                    }
                    return item;
                })
                .filter(Boolean) as BillItem[]
        );
    };

    const handleRemoveItem = (itemId: string) => {
        setBillItems((prev) => prev.filter((item) => item.itemId !== itemId));
    };

    return (
        <div className="min-h-screen w-full bg-[#e6f4f1] text-[#0a2727] flex antialiased selection:bg-[#0d5c58] selection:text-white">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
            body, input, button, select, textarea {
              font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .font-mono, [data-mono] {
              font-family: 'Fira Code', ui-monospace, SFMono-Regular, monospace !important;
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
                                    Billing & POS Desk
                                </span>
                            </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-[#0d5c58]" />
                    </div>

                    {/* Active Terminal Info */}
                    <div className="px-4 py-3 border-b border-[#cce7e2]">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1.5">
                            Active Counter
                        </label>
                        <div className="relative">
                            <select
                                defaultValue="counter-1"
                                className="w-full bg-white border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-2.5 py-2 outline-none font-medium appearance-none cursor-pointer hover:border-[#0d5c58] focus:border-[#0d5c58]"
                            >
                                <option value="counter-1">Terminal #01 (Gate Dispatch)</option>
                                <option value="counter-2">Terminal #02 (Express Wholesale)</option>
                                <option value="counter-3">Bulk Yard Desk</option>
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
                            className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] transition-all duration-200"
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
                                <span>Tax Billing</span>
                            </div>
                            <span className="font-mono text-[9px] bg-emerald-700/60 text-emerald-100 px-1.5 py-0.5 rounded font-bold uppercase">
                                Active
                            </span>
                        </a>

                        <a
                            href="#orders"
                            className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] transition-all duration-200"
                        >
                            <div className="flex items-center gap-2.5">
                                <svg className="w-4 h-4 fill-none stroke-current text-[#48716e] group-hover:text-[#0d5c58]" viewBox="0 0 24 24" strokeWidth="2">
                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                    <rect x="8" y="2" width="8" height="4" rx="1" />
                                </svg>
                                <span>Invoices List</span>
                            </div>
                            <span className="font-mono text-[10px] bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.5 rounded font-bold">
                                18
                            </span>
                        </a>
                    </nav>
                </div>

                {/* User Badge */}
                <div className="p-3 border-t border-[#cce7e2]">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#cce7e2] shadow-xs">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#0d5c58] text-white flex items-center justify-center font-bold text-xs">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-[#0a2727] leading-tight">Admin User</span>
                                <span className="text-[10px] text-[#48716e]">Terminal Authorized</span>
                            </div>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
            </aside>

            {/* MAIN BILLING INTERFACE */}
            <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
                {/* Sticky Top Action Bar */}
                <header className="sticky top-0 z-20 bg-[#e6f4f1]/95 backdrop-blur-md px-6 py-3 border-b border-[#cce7e2] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-bold tracking-wider bg-[#0d5c58] text-white px-2 py-0.5 rounded shadow-xs">
                                INV-2026-9042
                            </span>
                            <span className="text-xs font-bold text-[#0a2727]">Quick Invoice Generator</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setBillItems([]);
                                setIsGenerated(false);
                            }}
                            className="px-3 py-1.5 rounded-lg border border-[#cce7e2] bg-white hover:bg-rose-50 hover:border-rose-300 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                        >
                            Reset Invoice
                        </button>
                        <button
                            onClick={() => setIsGenerated(true)}
                            className="flex items-center gap-1.5 bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Save & Finalize</span>
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="p-6 space-y-6">
                    {/* Confirmation Banner */}
                    {isGenerated && (
                        <div className="bg-[#eff8f6] border border-[#bce2d8] rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-[#0d5c58] text-white flex items-center justify-center font-bold text-xs">
                                    ✓
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-[#0d5c58]">Invoice INV-2026-9042 Generated Successfully</div>
                                    <div className="text-[11px] text-[#48716e]">
                                        Total: ₹ {grandTotal.toLocaleString("en-IN")} | Method: {paymentMode} | Dispatched to {customerName}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => window.print()}
                                className="px-3 py-1 bg-white border border-[#cce7e2] rounded-lg text-xs font-bold text-[#0d5c58] hover:bg-[#d7ede7] transition-colors cursor-pointer"
                            >
                                Print Receipt
                            </button>
                        </div>
                    )}

                    {/* Customer Metadata Card */}
                    <section className="bg-white p-5 rounded-2xl border border-[#cce7e2] shadow-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-[#edf5f3] pb-3">
                            <div className="text-xs font-bold text-[#0a2727] uppercase tracking-wider">Customer & Dispatch Details</div>
                            <span className="font-mono text-[10px] text-[#0d5c58] bg-[#d7ede7] px-2 py-0.5 rounded font-bold">
                                B2B GST Verified
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1">
                                    Customer / Entity Name
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full bg-[#f6fbf9] border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-3 py-2 outline-none font-semibold focus:border-[#0d5c58]"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1">
                                    Customer GSTIN
                                </label>
                                <input
                                    type="text"
                                    value={customerGst}
                                    onChange={(e) => setCustomerGst(e.target.value)}
                                    className="w-full bg-[#f6fbf9] border border-[#cce7e2] text-[#0a2727] text-xs rounded-lg px-3 py-2 outline-none font-mono focus:border-[#0d5c58]"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#48716e] mb-1">
                                    Payment Terms
                                </label>
                                <div className="flex items-center bg-[#daf0eb] p-1 rounded-lg border border-[#cce7e2] gap-1">
                                    {(["UPI", "CASH", "CREDIT"] as const).map((mode) => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => setPaymentMode(mode)}
                                            className={`flex-1 py-1 text-[11px] font-bold rounded transition-all cursor-pointer ${paymentMode === mode ? "bg-[#0d5c58] text-white shadow-xs" : "text-[#345c59] hover:bg-white/60"
                                                }`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Catalog Picker & Bill Worksheet Split */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                        {/* Left: Quick Item Selection (5 cols) */}
                        <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-[#cce7e2] shadow-xs space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold text-[#0a2727] uppercase tracking-wider">Fast Catalog Picker</div>
                                    <div className="text-[11px] text-[#527774]">Click items to append to the active invoice</div>
                                </div>
                                <span className="font-mono text-[10px] font-bold bg-[#edf5f3] px-2 py-0.5 rounded text-[#48716e]">
                                    {CATALOG.length} stocked
                                </span>
                            </div>

                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type product name, brand or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 bg-[#f6fbf9] border border-[#cce7e2] rounded-lg text-xs font-mono outline-none focus:border-[#0d5c58]"
                                />
                                <svg className="w-3.5 h-3.5 fill-none stroke-current text-[#48716e] absolute left-2.5 top-2.5" viewBox="0 0 24 24" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>

                            {/* Product List */}
                            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                                {filteredCatalog.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleAddItem(product)}
                                        className="group p-2.5 rounded-xl border border-[#cce7e2] bg-[#fdfefe] hover:bg-[#eef8f5] hover:border-[#0d5c58] transition-all cursor-pointer flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="text-xs font-bold text-[#0a2727] group-hover:text-[#0d5c58] transition-colors">
                                                {product.name}
                                            </div>
                                            <div className="text-[10px] text-[#48716e] flex items-center gap-2 mt-0.5">
                                                <span className="font-mono bg-[#edf5f3] px-1 rounded">{product.id}</span>
                                                <span>Brand: {product.brand}</span>
                                                <span>•</span>
                                                <span className="font-mono text-emerald-700">{product.stock} in stock</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-mono text-xs font-bold text-[#0a2727]">
                                                ₹ {product.rate.toLocaleString("en-IN")}
                                            </div>
                                            <span className="text-[9px] font-mono font-bold text-[#0d5c58] bg-[#d7ede7] px-1 rounded">
                                                +{product.gstRate}% GST
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Bill Items Table & Settlement (7 cols) */}
                        <div className="xl:col-span-7 bg-white p-5 rounded-2xl border border-[#cce7e2] shadow-xs space-y-4">
                            <div className="flex items-center justify-between border-b border-[#edf5f3] pb-3">
                                <div className="text-xs font-bold text-[#0a2727] uppercase tracking-wider">Active Invoice Items</div>
                                <span className="font-mono text-xs font-bold text-[#0d5c58]">
                                    {billItems.length} {billItems.length === 1 ? "Line Item" : "Line Items"}
                                </span>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto rounded-xl border border-[#cce7e2]">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-[#f0f8f6] border-b border-[#cce7e2] text-[#48716e] text-[10px] uppercase">
                                            <th className="py-2.5 px-3 font-semibold">Item & Brand</th>
                                            <th className="py-2.5 px-3 font-semibold">Rate</th>
                                            <th className="py-2.5 px-3 font-semibold text-center">Qty</th>
                                            <th className="py-2.5 px-3 font-semibold text-right">Taxable</th>
                                            <th className="py-2.5 px-2 text-center w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#edf5f3] bg-white">
                                        {billItems.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-[#48716e] font-medium text-xs">
                                                    No items added yet. Click an item from the picker to add.
                                                </td>
                                            </tr>
                                        ) : (
                                            billItems.map((item) => (
                                                <tr key={item.itemId} className="hover:bg-[#eef8f5] transition-colors group">
                                                    <td className="py-2.5 px-3">
                                                        <div className="font-semibold text-[#0a2727] group-hover:text-[#0d5c58]">{item.name}</div>
                                                        <div className="text-[10px] text-[#48716e] font-mono">
                                                            GST {item.gstRate}% | Unit: {item.unit}
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 px-3 font-mono text-[#48716e]">
                                                        ₹ {item.rate.toLocaleString("en-IN")}
                                                    </td>
                                                    <td className="py-2.5 px-3">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <button
                                                                onClick={() => handleUpdateQty(item.itemId, -1)}
                                                                className="w-5 h-5 rounded bg-[#daf0eb] hover:bg-[#c3e6de] text-[#0d5c58] font-bold flex items-center justify-center cursor-pointer text-xs"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-mono font-bold w-6 text-center text-xs text-[#0a2727]">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => handleUpdateQty(item.itemId, 1)}
                                                                className="w-5 h-5 rounded bg-[#daf0eb] hover:bg-[#c3e6de] text-[#0d5c58] font-bold flex items-center justify-center cursor-pointer text-xs"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-2.5 px-3 font-mono text-right font-bold text-[#0a2727]">
                                                        ₹ {(item.quantity * item.rate).toLocaleString("en-IN")}
                                                    </td>
                                                    <td className="py-2.5 px-2 text-center">
                                                        <button
                                                            onClick={() => handleRemoveItem(item.itemId)}
                                                            className="text-[#7aa09b] hover:text-rose-600 transition-colors cursor-pointer"
                                                            title="Remove"
                                                        >
                                                            ✕
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Settlement Summary */}
                            <div className="bg-[#f6fbf9] p-4 rounded-xl border border-[#cce7e2] space-y-2.5">
                                <div className="flex justify-between text-xs text-[#48716e]">
                                    <span>Subtotal (Base Value)</span>
                                    <span className="font-mono font-bold text-[#0a2727]">₹ {subtotal.toLocaleString("en-IN")}</span>
                                </div>

                                <div className="flex justify-between items-center text-xs text-[#48716e]">
                                    <div className="flex items-center gap-2">
                                        <span>Trade Discount (%)</span>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={discountPercent}
                                            onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)}
                                            className="w-12 px-1.5 py-0.5 bg-white border border-[#cce7e2] rounded text-center font-mono text-xs outline-none focus:border-[#0d5c58]"
                                        />
                                    </div>
                                    <span className="font-mono text-rose-700 font-bold">
                                        - ₹ {discountAmount.toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="flex justify-between text-xs text-[#48716e]">
                                    <span>Calculated GST (CGST + SGST)</span>
                                    <span className="font-mono font-bold text-emerald-800">
                                        + ₹ {Math.round(totalGst).toLocaleString("en-IN")}
                                    </span>
                                </div>

                                <div className="pt-2.5 border-t border-[#cce7e2] flex justify-between items-baseline">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-[#0a2727]">Net Payable</span>
                                        <span className="text-[10px] text-[#48716e] block">Round-off applied</span>
                                    </div>
                                    <span className="font-mono text-2xl font-bold text-[#0d5c58] tracking-tight">
                                        ₹ {grandTotal.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}