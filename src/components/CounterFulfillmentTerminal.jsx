import React, { useState } from 'react';
import { QrCode, Camera, CheckCircle2, Banknote, Search, Sparkles, AlertCircle } from 'lucide-react';
import { useOrderSystem } from '../context/OrderContext';

export const CounterFulfillmentTerminal = () => {
  const { orders, fulfillOrder } = useOrderSystem();
  const [scannedInput, setScannedInput] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const unfulfilledOrders = orders.filter((o) => o.status !== 'Fulfilled');

  const handleLookup = (tokenOrPayload) => {
    setSuccessMessage('');
    let queryToken = tokenOrPayload.trim();

    try {
      if (queryToken.startsWith('{')) {
        const parsed = JSON.parse(queryToken);
        if (parsed.token) queryToken = parsed.token;
        else if (parsed.orderId) {
          const match = orders.find((o) => o.id === parsed.orderId);
          if (match) {
            setSelectedOrder(match);
            return;
          }
        }
      }
    } catch (e) {
      // String fallback
    }

    const normalized = queryToken.startsWith('#') ? queryToken : `#${queryToken}`;
    const found = orders.find(
      (o) => o.tokenNumber.toLowerCase() === normalized.toLowerCase() || o.id === queryToken
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      alert(`No active order found for token: "${tokenOrPayload}"`);
    }
  };

  const handleFulfillDone = () => {
    if (!selectedOrder) return;
    fulfillOrder(selectedOrder.id);

    setSuccessMessage(`Order ${selectedOrder.tokenNumber} fulfilled! Cash ৳${selectedOrder.totalAmount} collected.`);
    setSelectedOrder(null);
    setScannedInput('');

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="glass-panel p-6 mb-8 border-cyan-500/30 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <QrCode className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Step 3: Counter Fulfillment Terminal
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Scan customer&apos;s phone screen QR code, collect cash, hand tray, and tap Done.
            </p>
          </div>

          <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit">
            <Camera className="w-4 h-4" /> Terminal Active
          </span>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300 shadow-lg">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Camera Feed & Scanner Interface */}
        <div className="glass-panel p-6 border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-heading mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-cyan-400" /> Counter Camera Scanner Feed
            </h3>

            {/* Simulated Live Camera Scanner Viewport with Laser Line */}
            <div className="relative h-64 bg-slate-950 rounded-2xl border-2 border-dashed border-cyan-500/50 overflow-hidden flex flex-col items-center justify-center p-4">
              
              {/* Laser Sweep Line */}
              <div className="laser-line" />

              {/* Corner Reticle */}
              <div className="w-44 h-44 border-2 border-cyan-400/80 rounded-2xl flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                <QrCode className="w-16 h-16 text-cyan-400/40 animate-pulse" />
              </div>

              <p className="text-xs text-slate-400 mt-4 font-medium text-center z-10">
                Point counter camera at customer&apos;s phone screen
              </p>
            </div>

            {/* Manual Lookup Input */}
            <div className="mt-5 space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Or Enter Token Number / Scan Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter Token e.g. #042 or 041"
                    value={scannedInput}
                    onChange={(e) => setScannedInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white text-xs pl-10 pr-3 py-3 rounded-xl outline-none"
                  />
                </div>
                <button
                  onClick={() => handleLookup(scannedInput)}
                  className="px-4 py-3 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20"
                >
                  Lookup
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <p className="text-xs font-semibold text-slate-400 mb-2">Simulate Customer Phone Scan:</p>
            <div className="flex flex-wrap gap-2">
              {unfulfilledOrders.length === 0 ? (
                <span className="text-xs text-slate-500">No pending tokens to scan</span>
              ) : (
                unfulfilledOrders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => handleLookup(ord.tokenNumber)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-bold hover:bg-cyan-500 hover:text-slate-950 transition-all"
                  >
                    Scan {ord.tokenNumber} ({ord.tableNumber})
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Scanned Order Card & Fulfillment Action */}
        <div className="glass-panel p-6 border-slate-800 flex flex-col justify-between">
          {selectedOrder ? (
            <div>
              <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Scanned Token</span>
                  <h3 className="text-5xl font-black text-white font-heading gradient-text-cyan">
                    {selectedOrder.tokenNumber}
                  </h3>
                  <p className="text-xs text-slate-300 font-bold mt-0.5">{selectedOrder.tableNumber}</p>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                  Status: {selectedOrder.status}
                </span>
              </div>

              <div className="py-4 space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Items to Deliver</p>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-white font-bold">
                      <strong className="text-cyan-400 font-extrabold text-sm mr-2">{item.quantity}x</strong> {item.name}
                    </span>
                    <span className="text-slate-300 font-mono font-bold">৳{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Amount to Collect Highlight Box */}
              <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 my-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Amount to Collect</p>
                    <p className="text-xs text-emerald-400 font-bold">Collect Cash Payment</p>
                  </div>
                </div>
                <span className="text-3xl font-black text-emerald-400 font-heading">
                  ৳{selectedOrder.totalAmount}
                </span>
              </div>

              {/* Tap Done Action Button */}
              <button
                onClick={handleFulfillDone}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <CheckCircle2 className="w-5 h-5" /> Collect Cash & Tap Done (Fulfill Order)
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <QrCode className="w-16 h-16 text-slate-700 mb-4" />
              <h4 className="text-base font-bold text-slate-300">No Token Scanned Yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Scan customer&apos;s phone screen QR code or click a token pill on the left to review items and collect cash payment.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CounterFulfillmentTerminal;
