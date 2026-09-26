import React, { useState } from "react";

export default function EmployeeCreationWorkspace() {
    // Generated Employee ID state
    const [employeeId, setEmployeeId] = useState("EMP-8492");

    // Notification toast
    const [toastMessage, setToastMessage] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "+91 ",
        emailAddress: "",
        nationalId: "",
        emergencyContact: "",
        role: "Billing Counter Operator",
        terminalPin: "",
        stationNumber: "STATION #04 (Counter POS)",
        warehouseLocation: "Central Warehouse #1 (DL-01)",
        shiftTiming: "Day Shift (08:00 AM - 04:30 PM)",
        joiningDate: "2026-09-23",
    });

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setFormData({
            fullName: "",
            mobileNumber: "+91 ",
            emailAddress: "",
            nationalId: "",
            emergencyContact: "",
            role: "Billing Counter Operator",
            terminalPin: "",
            stationNumber: "STATION #04 (Counter POS)",
            warehouseLocation: "Central Warehouse #1 (DL-01)",
            shiftTiming: "Day Shift (08:00 AM - 04:30 PM)",
            joiningDate: "2026-09-23",
        });
        setEmployeeId("EMP-" + Math.floor(1000 + Math.random() * 9000));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName.trim()) {
            showToast("Please enter employee full name");
            return;
        }
        showToast(`Staff record for ${formData.fullName} (${employeeId}) generated successfully`);
        handleReset();
    };

    return (
        <div className="min-h-screen w-full bg-[#e6f4f1] text-[#0a2727] flex antialiased selection:bg-[#0d5c58] selection:text-white">
            {/* Typography & Minimal Underline Focus Style */}
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
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#224b48] hover:bg-[#deede8] hover:text-[#0a2727] transition-all"
                        >
                            <svg className="w-4 h-4 fill-none stroke-current text-[#48716e]" viewBox="0 0 24 24" strokeWidth="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                            <span>Inventory</span>
                        </a>

                        <a
                            href="#employees"
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#0d5c58] text-white shadow-xs"
                        >
                            <div className="flex items-center gap-2.5">
                                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                <span>Staff & Access</span>
                            </div>
                            <span className="font-mono text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-bold">
                                NEW
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
                                <span className="text-[10px] text-[#48716e]">HR & Security Desk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ========================================================================= */}
            {/* MAIN ENROLLMENT WORKSPACE                                                 */}
            {/* ========================================================================= */}
            <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
                {/* Sticky Header Bar */}
                <header className="sticky top-0 z-20 bg-[#e6f4f1]/95 backdrop-blur-md px-6 py-3.5 border-b border-[#cce7e2] flex items-center justify-between">
                    <div>
                        <h1 className="text-sm font-bold text-[#0a2727]">Employee Onboarding Desk</h1>
                        <p className="text-[11px] text-[#527774]">
                            Generate security credentials, system PINs, and station roles
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-[#d9eee9] px-3 py-1 rounded-lg border border-[#cce7e2] text-[#48716e]">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[11px] font-mono">SYS-AUTH READY</span>
                        </div>
                    </div>
                </header>

                {/* Workspace Body */}
                <main className="p-6 max-w-4xl w-full mx-auto space-y-6">
                    {/* Toast Notification */}
                    {toastMessage && (
                        <div className="fixed bottom-6 right-6 z-50 bg-[#0a2727] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-[#0d5c58] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{toastMessage}</span>
                        </div>
                    )}

                    {/* Form Container */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl border border-[#cce7e2] p-7 shadow-xs space-y-7"
                    >
                        {/* Header Strip with Auto-generated ID */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#edf5f3]">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block">
                                    New System Employee ID
                                </span>
                                <span className="font-mono text-base font-bold text-[#0d5c58] select-all">
                                    {employeeId}
                                </span>
                            </div>
                            <div className="text-[11px] text-[#527774] sm:text-right">
                                <span>Account Status: </span>
                                <strong className="text-emerald-700">Pending Creation</strong>
                            </div>
                        </div>

                        {/* SECTION 1: PERSONAL & CONTACT KYC */}
                        <div className="space-y-4">
                            <div className="border-b border-[#cce7e2] pb-1.5 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#0d5c58]">
                                    1. Personal Identity & KYC
                                </span>
                                <span className="font-mono text-[10px] text-[#527774]">LEGAL INFO</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Full Legal Name */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Full Legal Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                                        placeholder="e.g. Vikram Malhotra"
                                        className="w-full text-xs font-bold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors placeholder:text-[#9bb7b3]"
                                    />
                                </div>

                                {/* Mobile Contact Number */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Mobile Contact Number *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.mobileNumber}
                                        onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                                        placeholder="+91 98..."
                                        className="w-full font-mono text-xs font-bold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors placeholder:text-[#9bb7b3]"
                                    />
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Email Address (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.emailAddress}
                                        onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                                        placeholder="vikram@wholesale.internal"
                                        className="w-full text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors placeholder:text-[#9bb7b3]"
                                    />
                                </div>

                                {/* National ID / Aadhaar */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Government ID / Aadhaar Number
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nationalId}
                                        onChange={(e) => handleInputChange("nationalId", e.target.value)}
                                        placeholder="XXXX - XXXX - XXXX"
                                        className="w-full font-mono text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors placeholder:text-[#9bb7b3]"
                                    />
                                </div>

                                {/* Emergency Contact */}
                                <div className="sm:col-span-2">
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Emergency Contact Name & Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.emergencyContact}
                                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                                        placeholder="e.g. Ramesh Malhotra (Father) - +91 94112 00000"
                                        className="w-full text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors placeholder:text-[#9bb7b3]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: ROLE & TERMINAL ACCESS */}
                        <div className="space-y-4">
                            <div className="border-b border-[#cce7e2] pb-1.5 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#0d5c58]">
                                    2. Role Authorization & Station Access
                                </span>
                                <span className="font-mono text-[10px] text-[#527774]">CREDENTIALS</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {/* Designated Role */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Designated Portal Role *
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => handleInputChange("role", e.target.value)}
                                        className="w-full text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors cursor-pointer"
                                    >
                                        <option value="Billing Counter Operator">Billing Counter Operator</option>
                                        <option value="Inventory Manager">Inventory Manager</option>
                                        <option value="Gate Pass Dispatch Officer">Gate Pass Dispatch Officer</option>
                                        <option value="Inward Quality Inspector">Inward Quality Inspector</option>
                                        <option value="Audit & Accounts Officer">Audit & Accounts Officer</option>
                                    </select>
                                </div>

                                {/* Assigned Station */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Default Terminal Station *
                                    </label>
                                    <select
                                        value={formData.stationNumber}
                                        onChange={(e) => handleInputChange("stationNumber", e.target.value)}
                                        className="w-full text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors cursor-pointer"
                                    >
                                        <option value="STATION #01 (Front Counter)">STATION #01 (Front Counter)</option>
                                        <option value="STATION #02 (Fast POS)">STATION #02 (Fast POS)</option>
                                        <option value="STATION #03 (Bulk Counter)">STATION #03 (Bulk Counter)</option>
                                        <option value="STATION #04 (Counter POS)">STATION #04 (Counter POS)</option>
                                        <option value="DESK #B1 (Dispatch / Gate)">DESK #B1 (Dispatch / Gate)</option>
                                        <option value="DESK #W1 (Warehouse Control)">DESK #W1 (Warehouse Control)</option>
                                    </select>
                                </div>

                                {/* 4-Digit Quick Passcode / PIN */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        4-Digit POS PIN *
                                    </label>
                                    <input
                                        type="password"
                                        maxLength={4}
                                        value={formData.terminalPin}
                                        onChange={(e) =>
                                            handleInputChange("terminalPin", e.target.value.replace(/\D/g, ""))
                                        }
                                        placeholder="••••"
                                        className="w-full font-mono text-sm tracking-widest font-bold text-[#0d5c58] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors placeholder:text-[#9bb7b3]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: DEPOT ROUTING & SHIFT */}
                        <div className="space-y-4">
                            <div className="border-b border-[#cce7e2] pb-1.5 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#0d5c58]">
                                    3. Depot Deployment & Shift Schedule
                                </span>
                                <span className="font-mono text-[10px] text-[#527774]">DEPLOYMENT</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {/* Warehouse Location */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Primary Depot Location
                                    </label>
                                    <select
                                        value={formData.warehouseLocation}
                                        onChange={(e) => handleInputChange("warehouseLocation", e.target.value)}
                                        className="w-full text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors cursor-pointer"
                                    >
                                        <option value="Central Warehouse #1 (DL-01)">Central Warehouse #1 (DL-01)</option>
                                        <option value="North Hub Storage (HR-04)">North Hub Storage (HR-04)</option>
                                        <option value="Cold Storage Unit (UP-02)">Cold Storage Unit (UP-02)</option>
                                    </select>
                                </div>

                                {/* Shift Timing */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Operational Shift
                                    </label>
                                    <select
                                        value={formData.shiftTiming}
                                        onChange={(e) => handleInputChange("shiftTiming", e.target.value)}
                                        className="w-full text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors cursor-pointer"
                                    >
                                        <option value="Morning Shift (06:00 AM - 02:30 PM)">Morning Shift (06:00 AM - 02:30 PM)</option>
                                        <option value="Day Shift (08:00 AM - 04:30 PM)">Day Shift (08:00 AM - 04:30 PM)</option>
                                        <option value="Evening Shift (02:00 PM - 10:30 PM)">Evening Shift (02:00 PM - 10:30 PM)</option>
                                        <option value="Night Operations (10:00 PM - 06:30 AM)">Night Operations (10:00 PM - 06:30 AM)</option>
                                    </select>
                                </div>

                                {/* Joining Date */}
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-[#48716e] mb-1">
                                        Joining Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.joiningDate}
                                        onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                                        className="w-full font-mono text-xs font-semibold text-[#0a2727] bg-transparent border-0 border-b-2 border-[#cce7e2] focus:border-[#0d5c58] outline-none py-1.5 transition-colors cursor-pointer"
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>

                        {/* FORM FOOTER CONTROLS */}
                        <div className="pt-4 border-t border-[#edf5f3] flex items-center justify-between">
                            <span className="text-[11px] text-[#527774]">
                                All credentials will be activated immediately upon saving.
                            </span>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#cce7e2] text-[#48716e] hover:bg-[#f0f8f6] transition-colors cursor-pointer"
                                >
                                    Clear Form
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-xs font-bold rounded-lg bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2"
                                >
                                    <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <line x1="19" y1="8" x2="19" y2="14" />
                                        <line x1="22" y1="11" x2="16" y2="11" />
                                    </svg>
                                    <span>Create Employee</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}