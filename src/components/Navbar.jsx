import React from 'react';
import { UtensilsCrossed, ChefHat, QrCode, ShoppingBag, Volume2, Sparkles } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

export const Navbar = ({ activeView, setActiveView, onOpenCart }) => {
  const { cart, currentActiveOrder, orders, triggerChime } = useOrder();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pendingKitchenCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length;

  return (
    <header className="glass-header sticky top-0 z-50 px-4 py-3 border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('customer')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-heading">
                QuickOrder <span className="text-emerald-400 font-normal">QR</span>
              </h1>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live
              </span>
            </div>
            <p className="text-xs text-slate-400">Scan, Pay & Collect • No Login Needed</p>
          </div>
        </div>

        {/* View Switching Navigation Pills */}
        <div className="flex items-center bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveView('customer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
              activeView === 'customer'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">1. Customer View</span>
            <span className="sm:hidden">Customer</span>
          </button>

          <button
            onClick={() => setActiveView('kitchen')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 relative ${
              activeView === 'kitchen'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span className="hidden sm:inline">2. Kitchen Screen</span>
            <span className="sm:hidden">Kitchen</span>
            {pendingKitchenCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {pendingKitchenCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView('staff')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
              activeView === 'staff'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">3. Staff Scanner</span>
            <span className="sm:hidden">Counter</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Synthesizer Test Button */}
          <button
            onClick={triggerChime}
            title="Test Kitchen Audio Chime"
            className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Active Token Badge Quick Jump */}
          {currentActiveOrder && (
            <button
              onClick={() => setActiveView('customer')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Token {currentActiveOrder.tokenNumber}
            </button>
          )}

          {/* Cart Icon Drawer Trigger */}
          {activeView === 'customer' && (
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 transition-all shadow-md shadow-emerald-500/10"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-400 text-slate-950 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                  {totalCartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
