import React, { useState } from 'react';
import { ChefHat, Volume2, Clock, CheckCircle2, Utensils, Bell, Sparkles, AlertCircle } from 'lucide-react';
import { useOrderSystem } from '../context/OrderContext';

export const KitchenLiveDisplay = () => {
  const { orders, updateOrderStatus, triggerChime } = useOrderSystem();
  const [filterStatus, setFilterStatus] = useState('Active');

  const activeOrders = orders.filter((o) => {
    if (filterStatus === 'Active') return o.status !== 'Fulfilled';
    return o.status === filterStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return { label: 'New Ticket', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
      case 'Preparing':
        return { label: 'Cooking Now 🍳', bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' };
      case 'Ready':
        return { label: 'Ready for Collection 🔔', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
      default:
        return { label: 'Fulfilled', bg: 'bg-slate-800 text-slate-400 border-slate-700' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 mb-8 border-amber-500/30 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <ChefHat className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Step 2: Kitchen Live Display System
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Synthesizer audio chime sounds automatically when a customer places an order.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerChime}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              <Volume2 className="w-4 h-4" /> Test Chime Sound
            </button>

            {/* Filter Pills */}
            <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
              {['Active', 'Pending', 'Preparing', 'Ready', 'Fulfilled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    filterStatus === st ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Grid Stream */}
      {activeOrders.length === 0 ? (
        <div className="glass-panel p-12 text-center max-w-md mx-auto my-12">
          <Utensils className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-300">No active kitchen tickets</h3>
          <p className="text-xs text-slate-500 mt-1">
            Incoming customer orders from Table QR codes will chime and appear here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOrders.map((order) => {
            const badge = getStatusBadge(order.status);

            return (
              <div
                key={order.id}
                className={`glass-panel p-6 relative overflow-hidden transition-all duration-300 ${
                  order.status === 'Pending'
                    ? 'border-amber-500/60 shadow-amber-500/20 shadow-2xl'
                    : 'border-slate-800'
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                      {order.tableNumber}
                    </span>
                    <h3 className="text-4xl font-black text-white font-heading gradient-text-amber">
                      {order.tokenNumber}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-2 flex items-center justify-end gap-1 font-mono">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Items Ticket */}
                <div className="space-y-2 mb-6 min-h-[110px]">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-950/80 p-3 rounded-xl text-xs border border-slate-800">
                      <span className="text-slate-200 font-bold">
                        <strong className="text-amber-400 font-black text-base mr-2">{item.quantity}x</strong> {item.name}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded">{item.category}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Preparing')}
                      className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 uppercase tracking-wider"
                    >
                      <Utensils className="w-4 h-4" /> Start Preparing 🍳
                    </button>
                  )}

                  {order.status === 'Preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Ready')}
                      className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 uppercase tracking-wider"
                    >
                      <Bell className="w-4 h-4" /> Mark Ready for Pickup 🔔
                    </button>
                  )}

                  {order.status === 'Ready' && (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold text-xs text-center flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4 animate-spin" /> Customer Notified • Waiting for Counter Scan
                    </div>
                  )}

                  {order.status === 'Fulfilled' && (
                    <div className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Order Completed
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default KitchenLiveDisplay;
