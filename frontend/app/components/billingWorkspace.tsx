import React, { useState, useMemo, useEffect, useRef } from "react";

// Mock Product Catalogue with categories and stock details
const INITIAL_PRODUCTS = [
  {
    id: "SKU-7701",
    name: "Fortune Mustard Oil 1L (Box x 12)",
    category: "Edible Oils",
    price: 1400,
    stock: 240,
    unit: "Cartons",
    barcode: "8901234567701",
  },
  {
    id: "SKU-8924",
    name: "Basmati Rice Royal (30kg Bag)",
    category: "Grains",
    price: 2680,
    stock: 68,
    unit: "Bags",
    barcode: "8901234568924",
  },
  {
    id: "SKU-4412",
    name: "Tata Iodized Salt (1kg x 25 Pkt)",
    category: "Spices",
    price: 625,
    stock: 410,
    unit: "Bundles",
    barcode: "8901234564412",
  },
  {
    id: "SKU-9903",
    name: "Refined Sugar M-30 (50kg Bag)",
    category: "Grains",
    price: 1980,
    stock: 95,
    unit: "Bags",
    barcode: "8901234569903",
  },
  {
    id: "SKU-3120",
    name: "Catch Coriander Powder (500g x 20)",
    category: "Spices",
    price: 1250,
    stock: 120,
    unit: "Boxes",
    barcode: "8901234563120",
  },
  {
    id: "SKU-6582",
    name: "Saffola Gold Pro Healthy Blend 5L",
    category: "Edible Oils",
    price: 990,
    stock: 185,
    unit: "Cans",
    barcode: "8901234566582",
  },
  {
    id: "SKU-1194",
    name: "Aashirvaad Shudh Chakki Atta 10kg",
    category: "Grains",
    price: 435,
    stock: 310,
    unit: "Bags",
    barcode: "8901234561194",
  },
  {
    id: "SKU-5541",
    name: "Everest Kasuri Methi 100g Pack",
    category: "Spices",
    price: 85,
    stock: 400,
    unit: "Pcs",
    barcode: "8901234565541",
  },
];

// Helper to format currency
const formatINR = (val) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
};

// Generates a mock UUID
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Generate formatted current timestamp
const getFormattedDateTime = () => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = monthNames[d.getMonth()];
  const year = String(d.getFullYear()).slice(-2);
  let hours = d.getHours();
  const mins = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const strHours = String(hours).padStart(2, "0");
  return `${day} : ${month} : ${year} - ${strHours} : ${mins} ${ampm}`;
};

export default function BillingWorkspace() {
  const [bills, setBills] = useState([
    {
      id: "bill-1",
      uuid: "a6d2b45e-991f-4b0e-b7f3-e38fa9180c44",
      createdAt: "22 : Sep : 26 - 09 : 36 PM",
      customerName: "Rajesh Kumar",
      customerMobile: "+91 98110 24982",
      accountRef: "CUST-9018-DL",
      status: "Ready for Dispatch",
      paymentMode: "UPI Instant Settlement",
      previousDues: 22250,
      paidAmount: 45000,
      overallDiscount: 0,
      items: [
        {
          sku: "SKU-7701",
          name: "Fortune Mustard Oil 1L (Box x 12)",
          qty: 15,
          unitPrice: 1400,
          discount: 300,
        },
        {
          sku: "SKU-8924",
          name: "Basmati Rice Royal (30kg Bag)",
          qty: 10,
          unitPrice: 2680,
          discount: 800,
        },
        {
          sku: "SKU-9903",
          name: "Refined Sugar M-30 (50kg Bag)",
          qty: 8,
          unitPrice: 1980,
          discount: 240,
        },
      ],
    },
    {
      id: "bill-2",
      uuid: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
      createdAt: "22 : Sep : 26 - 09 : 45 PM",
      customerName: "Anil Sharma",
      customerMobile: "+91 97123 44550",
      accountRef: "CUST-4109-HR",
      status: "Draft",
      paymentMode: "Cash on Delivery",
      previousDues: 0,
      paidAmount: 0,
      overallDiscount: 0,
      items: [
        {
          sku: "SKU-4412",
          name: "Tata Iodized Salt (1kg x 25 Pkt)",
          qty: 5,
          unitPrice: 625,
          discount: 50,
        },
      ],
    },
    {
      id: "bill-3",
      uuid: "e234b678-bcde-4321-9876-0123456789ab",
      createdAt: "22 : Sep : 26 - 10 : 02 PM",
      customerName: "Vikram Malhotra",
      customerMobile: "+91 99990 00000",
      accountRef: "CUST-8831-DL",
      status: "On-Hold",
      paymentMode: "UPI Instant Settlement",
      previousDues: 0,
      paidAmount: 0,
      overallDiscount: 0,
      items: [],
    },
  ]);

  const [activeBillId, setActiveBillId] = useState("bill-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [closeConfirmModal, setCloseConfirmModal] = useState(null);
  const [printModalBill, setPrintModalBill] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const searchInputRef = useRef(null);

  // Active bill accessor
  const activeBill = useMemo(() => {
    return bills.find((b) => b.id === activeBillId) || bills[0];
  }, [bills, activeBillId]);

  const billMetrics = useMemo(() => {
    if (!activeBill) return { subtotal: 0, discount: 0, totalAmount: 0, currentDue: 0, netDues: 0 };

    let subtotal = 0;
    let itemsDiscount = 0;

    activeBill.items.forEach((item) => {
      subtotal += item.qty * item.unitPrice;
      itemsDiscount += item.discount || 0;
    });

    const totalDiscount = itemsDiscount + (Number(activeBill.overallDiscount) || 0);
    const totalAmount = Math.max(0, subtotal - totalDiscount);
    const paid = Number(activeBill.paidAmount) || 0;
    const currentDue = Math.max(0, totalAmount - paid);
    const netDues = (activeBill.previousDues || 0) + currentDue;

    return {
      subtotal,
      discount: totalDiscount,
      totalAmount,
      paid,
      currentDue,
      netDues,
    };
  }, [activeBill]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCreateNewBill = () => {
    const newId = `bill-${Date.now()}`;
    const newBill = {
      id: newId,
      uuid: generateUUID(),
      createdAt: getFormattedDateTime(),
      customerName: "New Customer",
      customerMobile: "+91 ",
      accountRef: `CUST-${Math.floor(1000 + Math.random() * 9000)}-DL`,
      status: "Draft",
      paymentMode: "UPI Instant Settlement",
      previousDues: 0,
      paidAmount: 0,
      overallDiscount: 0,
      items: [],
    };

    setBills((prev) => [...prev, newBill]);
    setActiveBillId(newId);
    showToast("Opened new bill tab");
  };

  const handleRequestCloseTab = (e, billId) => {
    e.stopPropagation();
    const targetBill = bills.find((b) => b.id === billId);
    if (!targetBill) return;

    if (targetBill.items.length > 0) {
      setCloseConfirmModal(targetBill);
    } else {
      finalizeCloseBill(billId);
    }
  };

  const finalizeCloseBill = (billId) => {
    if (bills.length === 1) {
      const freshId = `bill-${Date.now()}`;
      const freshBill = {
        id: freshId,
        uuid: generateUUID(),
        createdAt: getFormattedDateTime(),
        customerName: "New Customer",
        customerMobile: "+91 ",
        accountRef: "CUST-DESK",
        status: "Draft",
        paymentMode: "Cash on Delivery",
        previousDues: 0,
        paidAmount: 0,
        overallDiscount: 0,
        items: [],
      };
      setBills([freshBill]);
      setActiveBillId(freshId);
    } else {
      const remaining = bills.filter((b) => b.id !== billId);
      setBills(remaining);
      if (activeBillId === billId) {
        setActiveBillId(remaining[remaining.length - 1].id);
      }
    }
    setCloseConfirmModal(null);
    showToast("Tab closed");
  };

  const updateActiveBill = (updates) => {
    setBills((prev) =>
      prev.map((b) => (b.id === activeBillId ? { ...b, ...updates } : b))
    );
  };

  const handleAddItemToActive = (product) => {
    if (!activeBill) return;

    const existingIndex = activeBill.items.findIndex(
      (item) => item.sku === product.id
    );

    let updatedItems;
    if (existingIndex > -1) {
      updatedItems = activeBill.items.map((item, idx) =>
        idx === existingIndex ? { ...item, qty: item.qty + 1 } : item
      );
      showToast(`Updated ${product.name.split(" ")[0]} quantity to ${updatedItems[existingIndex].qty}`);
    } else {
      const newItem = {
        sku: product.id,
        name: product.name,
        qty: 1,
        unitPrice: product.price,
        discount: 0,
      };
      updatedItems = [...activeBill.items, newItem];
      showToast(`Added ${product.name.split(" ")[0]}`);
    }

    updateActiveBill({
      items: updatedItems,
      status: activeBill.status === "On-Hold" ? "Draft" : activeBill.status,
    });
  };

  const handleUpdateItemQty = (sku, newQty) => {
    const qty = Math.max(1, parseInt(newQty) || 1);
    const updated = activeBill.items.map((i) =>
      i.sku === sku ? { ...i, qty } : i
    );
    updateActiveBill({ items: updated });
  };

  const handleUpdateItemDiscount = (sku, newDiscount) => {
    const disc = Math.max(0, parseInt(newDiscount) || 0);
    const updated = activeBill.items.map((i) =>
      i.sku === sku ? { ...i, discount: disc } : i
    );
    updateActiveBill({ items: updated });
  };

  const handleRemoveItem = (sku) => {
    const updated = activeBill.items.filter((i) => i.sku !== sku);
    updateActiveBill({ items: updated });
    showToast("Item removed");
  };

  const handleToggleHold = () => {
    const newStatus = activeBill.status === "On-Hold" ? "Draft" : "On-Hold";
    updateActiveBill({ status: newStatus });
    showToast(newStatus === "On-Hold" ? "Bill placed on hold" : "Draft resumed");
  };

  const handleCompleteBill = () => {
    if (activeBill.items.length === 0) {
      showToast("Cannot complete an empty bill");
      return;
    }
    updateActiveBill({ status: "Ready for Dispatch" });
    setPrintModalBill(activeBill);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "t") {
        e.preventDefault();
        handleCreateNewBill();
      }
      if (e.key === "F2") {
        e.preventDefault();
        searchInputRef.current?.focus();
        showToast("Search focused (F2)");
      }
      if (e.key === "F4") {
        e.preventDefault();
        handleToggleHold();
      }
      if (e.key === "F8") {
        e.preventDefault();
        handleCompleteBill();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBill, bills]);

  const categories = ["All", "Edible Oils", "Grains", "Spices"];

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((prod) => {
      const matchCat =
        selectedCategory === "All" || prod.category === selectedCategory;
      const matchSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.barcode.includes(searchQuery);
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen w-full bg-[#e6f4f1] text-[#0a2727] flex flex-col antialiased selection:bg-[#0d5c58] selection:text-white">
      {/* Font pairing: Quicksand for clean UI and Fira Code for tabular data/UUIDs */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
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
            ::-webkit-scrollbar {
              width: 5px;
              height: 5px;
            }
            ::-webkit-scrollbar-track {
              background: transparent;
            }
            ::-webkit-scrollbar-thumb {
              background: #cce7e2;
              border-radius: 9999px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #0d5c58;
            }
          `,
        }}
      />

      { }
      <header className="w-full bg-[#e6f4f1]/95 backdrop-blur-md px-6 py-2.5 border-b border-[#cce7e2] flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0d5c58] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm">
            W
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-[#0a2727] flex items-center gap-2">
              Apex Billing Terminal
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#d7ede7] text-[#0d5c58] font-bold rounded">
                v2.6 WMS
              </span>
            </span>
            <span className="text-[10px] text-[#48716e] font-medium">
              Counter POS & Live Dispatch Desk
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#d9eee9] px-3 py-1 rounded-lg border border-[#cce7e2] text-[#48716e]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono">STATION #04 READY</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#527774] border-r border-[#cce7e2] pr-3 mr-1">
            <span className="font-mono bg-[#d9eee9] px-1.5 py-0.5 rounded text-[10px] text-[#0d5c58]">
              F2
            </span>
            <span>Scan</span>
            <span className="font-mono bg-[#d9eee9] px-1.5 py-0.5 rounded text-[10px] text-[#0d5c58] ml-1.5">
              F4
            </span>
            <span>Hold</span>
            <span className="font-mono bg-[#d9eee9] px-1.5 py-0.5 rounded text-[10px] text-[#0d5c58] ml-1.5">
              F8
            </span>
            <span>Print</span>
          </div>

          <button
            type="button"
            onClick={handleCreateNewBill}
            className="flex items-center gap-1.5 bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 shadow-xs cursor-pointer"
            title="Create a new bill draft tab (Ctrl+T)"
          >
            <svg
              className="w-3.5 h-3.5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                d="M12 5v14M5 12h14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>New Bill</span>
            <span className="text-[10px] font-mono opacity-80 pl-0.5 hidden sm:inline">
              (Ctrl+T)
            </span>
          </button>
        </div>
      </header>

      { }
      <nav className="w-full bg-[#dcf1ec]/80 px-6 pt-2 border-b border-[#cce7e2] flex items-center gap-1.5 overflow-x-auto select-none shrink-0 scrollbar-none">
        <div className="flex items-center gap-1 pb-1.5">
          {bills.map((bill) => {
            const isActive = bill.id === activeBillId;
            const displayName = bill.customerName?.trim() || "New Customer";

            return (
              <div
                key={bill.id}
                onClick={() => setActiveBillId(bill.id)}
                className={`group relative flex items-center h-8 px-3 rounded-lg text-xs transition-all duration-150 cursor-pointer ${isActive
                  ? "bg-white text-[#0a2727] font-bold shadow-xs border border-[#cce7e2]"
                  : "bg-[#e5f4f0]/90 text-[#48716e] hover:bg-white/80 hover:text-[#0a2727] border border-transparent"
                  }`}
                style={{ maxWidth: "210px" }}
              >
                {/* Active Indicator dot */}
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 mr-2 transition-colors ${isActive ? "bg-[#0d5c58]" : "bg-transparent group-hover:bg-[#a0cbbf]"
                    }`}
                />

                {/* Single line only: Personal Name of the Customer */}
                <span className="truncate text-xs leading-none whitespace-nowrap pr-1.5">
                  {displayName}
                </span>

                {/* Subtle Close '✕' Button */}
                <button
                  type="button"
                  onClick={(e) => handleRequestCloseTab(e, bill.id)}
                  className="ml-auto opacity-0 group-hover:opacity-100 hover:bg-rose-100/70 hover:text-rose-700 text-[#527774] rounded p-0.5 transition-all duration-150 shrink-0"
                  title="Close Tab"
                >
                  <svg
                    className="w-3 h-3 stroke-current"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    fill="none"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            );
          })}

          {/* Clean '+' button to add new bill tab */}
          <button
            type="button"
            onClick={handleCreateNewBill}
            className="h-8 w-8 rounded-lg border border-dashed border-[#a3d2ca] bg-[#eef8f5] hover:bg-white text-[#0d5c58] transition-all hover:border-[#0d5c58] flex items-center justify-center shrink-0 cursor-pointer"
            title="Open new bill tab (Ctrl+T)"
          >
            <svg
              className="w-3.5 h-3.5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path
                d="M12 5v14M5 12h14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Floating feedback toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-6 z-50 bg-[#0a2727] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2 border border-[#0d5c58]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      { }
      <main className="flex-1 p-4 lg:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start overflow-hidden">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: PRODUCT SELECTION WORKSPACE (5 Cols)                         */}
        {/* ========================================================================= */}
        <section className="lg:col-span-5 bg-white rounded-2xl border border-[#cce7e2] p-4 lg:p-5 shadow-xs flex flex-col h-[calc(100vh-8.4rem)]">
          {/* Workspace Title */}
          <div className="flex items-center justify-between pb-3 border-b border-[#edf5f3]">
            <div>
              <h2 className="text-sm font-bold text-[#0a2727] flex items-center gap-1.5">
                Product Selector
                <span className="text-[10px] font-mono text-[#0d5c58] bg-[#d7ede7] px-1.5 py-0.5 rounded font-semibold">
                  {filteredProducts.length} items
                </span>
              </h2>
              <p className="text-[11px] text-[#527774]">
                Adding to:{" "}
                <span className="font-bold text-[#0d5c58]">
                  {activeBill?.customerName || "Customer"}
                </span>
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-[#d7ede7] text-[#0d5c58] px-2 py-0.5 rounded-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              LIVE INVENTORY
            </span>
          </div>

          {/* Search Input Bar */}
          <div className="mt-3 relative flex items-center bg-[#f6fbf9] border border-[#cce7e2] rounded-lg transition-all duration-200 hover:border-[#0d5c58]/60 focus-within:border-[#0d5c58] focus-within:ring-1 focus-within:ring-[#0d5c58] shadow-xs">
            <div className="flex items-center pl-2.5 pr-1.5 gap-1.5 pointer-events-none shrink-0 border-r border-[#cce7e2] my-1">
              <span className="font-mono text-[10px] font-bold tracking-wider bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.5 rounded">
                PRD
              </span>
              <svg
                className="w-3.5 h-3.5 fill-none stroke-current text-[#48716e]"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path
                  d="m21 21-4.3-4.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code, name or scan barcode (F2)..."
              className="w-full px-3 py-2 bg-transparent text-xs text-[#0a2727] placeholder:text-[#80a5a2] outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="pr-2.5 text-xs text-[#527774] hover:text-[#0a2727]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-[11px] shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded transition-colors text-xs font-semibold cursor-pointer ${selectedCategory === cat
                  ? "bg-[#0d5c58] text-white shadow-xs"
                  : "bg-[#f6fbf9] hover:bg-[#eef8f5] text-[#345c59] border border-[#cce7e2]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Items List */}
          <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1">
            {filteredProducts.length === 0 ? (
              <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-[#527774]">
                <p className="text-xs font-semibold">No inventory matches found</p>
                <p className="text-[10px] mt-0.5">Try a different name or SKU code</p>
              </div>
            ) : (
              filteredProducts.map((product) => {
                const inCart = activeBill?.items.find(
                  (i) => i.sku === product.id
                );
                return (
                  <div
                    key={product.id}
                    className={`group p-2.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs flex items-center justify-between ${inCart
                      ? "border-[#0d5c58]/40 bg-[#f4faf8]"
                      : "border-[#cce7e2] bg-white hover:border-[#0d5c58]"
                      }`}
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] bg-[#d7ede7] text-[#0d5c58] px-1.5 py-0.2 rounded font-semibold">
                          {product.id}
                        </span>
                        <span className="text-xs font-bold text-[#0a2727] group-hover:text-[#0d5c58] transition-colors line-clamp-1">
                          {product.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#527774] flex items-center gap-3">
                        <span>
                          Stock:{" "}
                          <strong className="text-[#0a2727]">
                            {product.stock} {product.unit}
                          </strong>
                        </span>
                        <span>•</span>
                        <span>
                          Unit:{" "}
                          <strong className="font-mono text-[#0d5c58]">
                            {formatINR(product.price)}
                          </strong>
                        </span>
                        {inCart && (
                          <span className="font-mono text-[10px] bg-[#0d5c58] text-white px-1.5 rounded">
                            {inCart.qty} in bill
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddItemToActive(product)}
                      className="px-3 py-1.5 rounded-lg bg-[#f0f8f6] hover:bg-[#0d5c58] text-[#0d5c58] hover:text-white border border-[#cce7e2] text-xs font-bold transition-all duration-150 flex items-center gap-1 active:scale-95 shrink-0 cursor-pointer"
                    >
                      <span>Add</span>
                      <span className="text-sm leading-none">+</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Selector Bottom Bar */}
          <div className="mt-2 pt-2.5 border-t border-[#edf5f3] flex items-center justify-between text-[11px] text-[#527774] shrink-0">
            <span>
              Bill:{" "}
              <strong className="text-[#0a2727]">
                {activeBill?.customerName || "Customer"}
              </strong>
            </span>
            <span className="font-mono text-[#0d5c58] font-semibold">
              Barcode scan ready (F2)
            </span>
          </div>
        </section>

        { }
        {/* ========================================================================= */}
        {/* RIGHT COLUMN: REAL-TIME INVOICE & DISPATCH WORKSPACE (7 Cols)              */}
        {/* ========================================================================= */}
        <section className="lg:col-span-7 bg-white rounded-2xl border border-[#cce7e2] p-5 lg:p-6 shadow-xs flex flex-col h-[calc(100vh-8.4rem)] overflow-y-auto">
          {/* Header row: Bill UUID and Formatted Date */}
          <div className="pb-3 border-b border-[#edf5f3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block">
                  Bill Number (UUID)
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase ${activeBill?.status === "On-Hold"
                    ? "bg-amber-100 text-amber-800"
                    : activeBill?.status === "Ready for Dispatch"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-blue-100 text-blue-800"
                    }`}
                >
                  {activeBill?.status}
                </span>
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#0d5c58] select-all">
                {activeBill?.uuid}
              </span>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block">
                Billing Date & Time
              </span>
              <span className="font-mono text-xs font-bold text-[#0a2727]">
                {activeBill?.createdAt}
              </span>
            </div>
          </div>

          {/* Customer Details: Editable Customer Name and Mobile Number */}
          <div className="py-3 border-b border-[#edf5f3] grid grid-cols-1 sm:grid-cols-2 gap-3.5 shrink-0">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block mb-1">
                Customer Name (Person)
              </label>
              <input
                type="text"
                value={activeBill?.customerName || ""}
                onChange={(e) =>
                  updateActiveBill({ customerName: e.target.value })
                }
                placeholder="e.g. Rajesh Kumar"
                className="w-full text-xs font-bold text-[#0a2727] bg-[#f6fbf9] border border-[#cce7e2] focus:border-[#0d5c58] rounded-lg px-2.5 py-1.5 outline-none transition-colors"
              />
              <span className="text-[10px] text-[#527774] mt-0.5 block">
                Ledger Account:{" "}
                <span className="font-mono">{activeBill?.accountRef}</span>
              </span>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#48716e] block mb-1">
                Customer Mobile Number
              </label>
              <input
                type="text"
                value={activeBill?.customerMobile || ""}
                onChange={(e) =>
                  updateActiveBill({ customerMobile: e.target.value })
                }
                placeholder="+91 98XXX XXXXX"
                className="w-full font-mono text-xs font-bold text-[#0a2727] bg-[#f6fbf9] border border-[#cce7e2] focus:border-[#0d5c58] rounded-lg px-2.5 py-1.5 outline-none transition-colors"
              />
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  Verified Contact
                </span>
                <span className="text-[10px] text-[#527774]">
                  Prev. Dues:{" "}
                  <strong className="font-mono text-rose-700">
                    {formatINR(activeBill?.previousDues || 0)}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          { }
          <div className="mt-3 flex-1 flex flex-col min-h-[180px]">
            <div className="text-xs font-bold text-[#0a2727] mb-2 flex items-center justify-between shrink-0">
              <span className="flex items-center gap-2">
                <span>Billed Items List</span>
                <span className="font-normal text-[#527774] text-[11px]">
                  (Direct inline editing)
                </span>
              </span>
              <span className="font-mono text-[10px] text-[#48716e] bg-[#eef8f5] px-2 py-0.5 rounded border border-[#cce7e2]">
                {activeBill?.items.length} Lines •{" "}
                {activeBill?.items.reduce((s, i) => s + i.qty, 0)} Units
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#cce7e2] flex-1">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f0f8f6] border-b border-[#cce7e2] text-[#48716e] text-[10px] uppercase font-semibold">
                    <th className="py-2 px-3">Product Code</th>
                    <th className="py-2 px-3">Product Name</th>
                    <th className="py-2 px-2 text-center">Quantity</th>
                    <th className="py-2 px-3 text-right">Unit Price</th>
                    <th className="py-2 px-3 text-right">Discount</th>
                    <th className="py-2 px-3 text-right">Subtotal</th>
                    <th className="py-2 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf5f3] bg-white">
                  {activeBill?.items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-10 text-center text-[#527774] text-xs"
                      >
                        <p className="font-semibold text-sm text-[#0a2727]">
                          Invoice is currently empty
                        </p>
                        <p className="text-[11px] mt-1">
                          Select products from the left catalogue or scan a barcode
                        </p>
                      </td>
                    </tr>
                  ) : (
                    activeBill?.items.map((item) => {
                      const itemTotal =
                        item.qty * item.unitPrice - (item.discount || 0);
                      return (
                        <tr
                          key={item.sku}
                          className="transition-colors duration-150 hover:bg-[#eef8f5] group"
                        >
                          <td className="py-2 px-3 font-mono text-[11px] text-[#0d5c58] font-bold whitespace-nowrap">
                            {item.sku}
                          </td>
                          <td className="py-2 px-3 font-semibold text-[#0a2727]">
                            {item.name}
                          </td>
                          <td className="py-2 px-2 text-center whitespace-nowrap">
                            <div className="inline-flex items-center border border-[#cce7e2] rounded-md bg-[#f6fbf9]">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateItemQty(item.sku, item.qty - 1)
                                }
                                className="px-1.5 py-0.5 text-xs text-[#48716e] hover:bg-[#cce7e2] rounded-l"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.qty}
                                onChange={(e) =>
                                  handleUpdateItemQty(item.sku, e.target.value)
                                }
                                className="w-9 text-center font-mono font-bold text-xs bg-transparent outline-none"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateItemQty(item.sku, item.qty + 1)
                                }
                                className="px-1.5 py-0.5 text-xs text-[#48716e] hover:bg-[#cce7e2] rounded-r"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-2 px-3 font-mono text-right text-[#0a2727] whitespace-nowrap">
                            {formatINR(item.unitPrice)}
                          </td>
                          <td className="py-2 px-3 font-mono text-right text-emerald-700 whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1">
                              <span>₹</span>
                              <input
                                type="number"
                                min="0"
                                value={item.discount}
                                onChange={(e) =>
                                  handleUpdateItemDiscount(
                                    item.sku,
                                    e.target.value
                                  )
                                }
                                className="w-14 text-right font-mono bg-[#f6fbf9] border border-[#cce7e2] focus:border-[#0d5c58] rounded px-1 py-0.5 text-[11px] outline-none"
                              />
                            </div>
                          </td>
                          <td className="py-2 px-3 font-mono text-right font-bold text-[#0a2727] whitespace-nowrap">
                            {formatINR(itemTotal)}
                          </td>
                          <td className="py-2 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.sku)}
                              className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                              title="Delete Item"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          { }
          <div className="mt-4 pt-3 border-t border-[#edf5f3] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
            <div className="text-[11px] text-[#527774] space-y-1.5 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span>Payment Mode:</span>
                <select
                  value={activeBill?.paymentMode || "UPI Instant Settlement"}
                  onChange={(e) =>
                    updateActiveBill({ paymentMode: e.target.value })
                  }
                  className="bg-[#f6fbf9] border border-[#cce7e2] rounded px-2 py-0.5 text-xs text-[#0a2727] font-semibold outline-none"
                >
                  <option>UPI Instant Settlement</option>
                  <option>Cash on Delivery</option>
                  <option>Bank RTGS / NEFT</option>
                  <option>Cheque Deposit</option>
                  <option>Customer Account Ledger</option>
                </select>
              </div>
              <div>
                Dispatch Status:{" "}
                <strong className="text-emerald-700 font-semibold">
                  {activeBill?.status === "Ready for Dispatch"
                    ? "Gate Pass Ready"
                    : "Draft Pending"}
                </strong>
              </div>
            </div>

            {/* Financial Ledger 2-Column Table */}
            <div className="w-full sm:w-80 rounded-xl border border-[#cce7e2] overflow-hidden bg-[#f6fbf9] shrink-0">
              <table className="w-full text-xs border-collapse">
                <tbody className="divide-y divide-[#cce7e2]/70">
                  <tr>
                    <td className="py-1.5 px-3 text-[#48716e] font-semibold">
                      Total Amount
                    </td>
                    <td className="py-1.5 px-3 font-mono text-right font-bold text-[#0a2727]">
                      {formatINR(billMetrics.totalAmount)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-3 text-[#48716e] font-semibold flex items-center justify-between">
                      <span>Paid Amount</span>
                      <span className="text-[10px] text-[#0d5c58] font-normal">
                        (Edit)
                      </span>
                    </td>
                    <td className="py-1.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="font-mono text-xs">₹</span>
                        <input
                          type="number"
                          value={activeBill?.paidAmount || 0}
                          onChange={(e) =>
                            updateActiveBill({ paidAmount: e.target.value })
                          }
                          className="w-24 text-right font-mono font-bold text-[#0d5c58] bg-white border border-[#cce7e2] focus:border-[#0d5c58] rounded px-1.5 py-0.5 text-xs outline-none"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-3 text-[#48716e] font-semibold">
                      Due on this order
                    </td>
                    <td className="py-1.5 px-3 font-mono text-right font-bold text-amber-900 bg-amber-50/50">
                      {formatINR(billMetrics.currentDue)}
                    </td>
                  </tr>
                  <tr className="bg-[#ebf7f4]">
                    <td className="py-2 px-3 text-[#0d5c58] font-bold">
                      Total Pending Dues
                    </td>
                    <td className="py-2 px-3 font-mono text-right font-bold text-rose-700 text-sm">
                      {formatINR(billMetrics.netDues)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          { }
          <div className="mt-4 pt-3 border-t border-[#edf5f3] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={(e) => handleRequestCloseTab(e, activeBillId)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              Close Current Tab
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleToggleHold}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${activeBill?.status === "On-Hold"
                  ? "border-amber-400 bg-amber-50 text-amber-900 font-bold"
                  : "border-[#cce7e2] text-[#48716e] hover:bg-[#f0f8f6] hover:text-[#0a2727]"
                  }`}
                title="Shortcut: F4"
              >
                {activeBill?.status === "On-Hold"
                  ? "Resume Draft (F4)"
                  : "Hold Draft (F4)"}
              </button>

              <button
                type="button"
                onClick={handleCompleteBill}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-[#0d5c58] hover:bg-[#094643] active:scale-95 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                title="Shortcut: F8"
              >
                <span>Complete & Print Bill (F8)</span>
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    d="m9 18 6-6-6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </main>

      { }
      {closeConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#cce7e2] p-5 max-w-sm w-full shadow-xl">
            <h3 className="text-sm font-bold text-[#0a2727] mb-1">
              Discard Billed Order?
            </h3>
            <p className="text-xs text-[#527774] mb-4">
              Tab for <strong>"{closeConfirmModal.customerName}"</strong> has{" "}
              {closeConfirmModal.items.length} items. Closing this tab will discard
              the current draft.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setCloseConfirmModal(null)}
                className="px-3.5 py-1.5 rounded-lg border border-[#cce7e2] text-xs font-semibold text-[#48716e] hover:bg-[#f0f8f6]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => finalizeCloseBill(closeConfirmModal.id)}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
              >
                Close & Discard
              </button>
            </div>
          </div>
        </div>
      )}

      {printModalBill && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#cce7e2] p-6 max-w-lg w-full shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-[#edf5f3]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#0d5c58] text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0a2727]">
                    Invoice Clearance Receipt
                  </h3>
                  <p className="text-[10px] text-[#527774]">Apex Warehouse Dispatch Desk</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPrintModalBill(null)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 overflow-y-auto flex-1 text-xs">
              <div className="bg-[#f6fbf9] p-3 rounded-xl border border-[#cce7e2] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#527774]">Invoice UUID:</span>
                  <span className="font-mono text-[#0d5c58] font-bold text-[11px]">
                    {printModalBill.uuid}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#527774]">Customer Name:</span>
                  <span className="font-bold text-[#0a2727]">
                    {printModalBill.customerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#527774]">Mobile:</span>
                  <span className="font-mono text-[#0a2727]">
                    {printModalBill.customerMobile}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#527774]">Date & Time:</span>
                  <span className="font-mono text-[#0a2727]">
                    {printModalBill.createdAt}
                  </span>
                </div>
              </div>

              <div className="border border-[#cce7e2] rounded-xl overflow-hidden">
                <table className="w-full text-[11px]">
                  <thead className="bg-[#f0f8f6] text-[#48716e]">
                    <tr>
                      <th className="py-1.5 px-2.5 text-left">Item</th>
                      <th className="py-1.5 px-2 text-center">Qty</th>
                      <th className="py-1.5 px-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#edf5f3]">
                    {printModalBill.items.map((i) => (
                      <tr key={i.sku}>
                        <td className="py-1.5 px-2.5 font-medium">{i.name}</td>
                        <td className="py-1.5 px-2 font-mono text-center">{i.qty}</td>
                        <td className="py-1.5 px-2.5 font-mono text-right font-bold">
                          {formatINR(i.qty * i.unitPrice - (i.discount || 0))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#ebf7f4] p-3 rounded-xl border border-[#cce7e2] flex justify-between items-center">
                <span className="font-bold text-[#0d5c58]">Total Amount Paid:</span>
                <span className="font-mono text-base font-bold text-[#0a2727]">
                  {formatINR(printModalBill.paidAmount)}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#edf5f3] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setPrintModalBill(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#cce7e2] text-[#48716e] hover:bg-[#f0f8f6]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                  showToast("Invoice sent to printer");
                }}
                className="px-5 py-2 text-xs font-bold rounded-lg bg-[#0d5c58] hover:bg-[#094643] text-white flex items-center gap-1.5 shadow-sm"
              >
                <svg
                  className="w-3.5 h-3.5 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                  <path d="M6 14h12v8H6z" />
                </svg>
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}