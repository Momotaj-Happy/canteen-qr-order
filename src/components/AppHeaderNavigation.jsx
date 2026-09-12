import React from 'react';
import { UtensilsCrossed, ChefHat, QrCode, ShoppingBag, Volume2, Sparkles } from 'lucide-react';
import { useOrderSystem } from '../context/OrderContext';

export const AppHeaderNavigation = ({ activeView, setActiveView, onOpenCart }) => {
  const { cart, currentActiveOrder, orders, triggerChime } = useOrderSystem();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const pendingKitchenCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing').length;

  return (
    <header className="glass-header sticky top-0 z-50 px-4 py-3 border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('customer')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white font-heading">
                Canteen QuickOrder <span className="text-emerald-400 font-normal">QR</span>
              </h1>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-400">Step 1: Scan & Order • Step 2: Token Card • Step 3: Collect</p>
          </div>
        </div>

        {/* View Selection Controls */}
        <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveView('customer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
              activeView === 'customer'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">1. Customer Order Portal</span>
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
            <span className="hidden sm:inline">2. Kitchen Live Display</span>
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
            <span className="hidden sm:inline">3. Counter Fulfillment Terminal</span>
            <span className="sm:hidden">Terminal</span>
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerChime}
            title="Test Kitchen Audio Synthesizer Chime"
            className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {currentActiveOrder && (
            <button
              onClick={() => setActiveView('customer')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Token {currentActiveOrder.tokenNumber}
            </button>
          )}

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

export default AppHeaderNavigation;
