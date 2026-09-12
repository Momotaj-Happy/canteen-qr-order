import React, { useState } from 'react';
import { OrderProvider } from './context/OrderContext';
import { Navbar } from './components/Navbar';
import { CustomerMenu } from './components/CustomerMenu';
import { KitchenDashboard } from './components/KitchenDashboard';
import { StaffScanner } from './components/StaffScanner';
import { Sparkles, Info, ExternalLink } from 'lucide-react';

function AppContent() {
  const [activeView, setActiveView] = useState('customer'); // customer, kitchen, staff
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      
      <div>
        {/* Navigation Top Bar */}
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Demo Mode Guide Banner */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 text-xs text-slate-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> SDLC Live Demo
              </span>
              <span>
                <strong>Tip:</strong> Open 2 or 3 browser windows side-by-side to test real-time sync across Customer, Kitchen, and Counter Staff!
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-slate-400">
              <span className={activeView === 'customer' ? 'text-emerald-400 font-bold' : ''}>1. Customer Scan</span>
              <span>→</span>
              <span className={activeView === 'kitchen' ? 'text-amber-400 font-bold' : ''}>2. Kitchen Chime</span>
              <span>→</span>
              <span className={activeView === 'staff' ? 'text-cyan-400 font-bold' : ''}>3. Staff Collect</span>
            </div>
          </div>
        </div>

        {/* Main View Area */}
        <main>
          {activeView === 'customer' && (
            <CustomerMenu isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          )}

          {activeView === 'kitchen' && (
            <KitchenDashboard />
          )}

          {activeView === 'staff' && (
            <StaffScanner />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 px-4 text-center text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-medium text-slate-300">Canteen Quick-Order & QR Token Fulfillment System</p>
          </div>
          <p className="text-slate-400">
            GitHub Repository: <a href="https://github.com/Momotaj-Happy/canteen-qr-order" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Momotaj-Happy/canteen-qr-order</a>
          </p>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  );
}
