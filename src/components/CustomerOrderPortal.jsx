import React, { useState } from 'react';
import { Search, Plus, Minus, Flame, Sparkles, ShoppingBag, X, ArrowRight, QrCode, Utensils, Award } from 'lucide-react';
import { useOrderSystem, CANTEEN_MENU_CATALOG } from '../context/OrderContext';
import { DigitalReceiptToken } from './DigitalReceiptToken';

export const CustomerOrderPortal = ({ isCartOpen, setIsCartOpen }) => {
  const {
    cart,
    addToCart,
    updateQuantity,
    tableNumber,
    setTableNumber,
    placeOrder,
    currentActiveOrder
  } = useOrderSystem();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (currentActiveOrder) {
    return <DigitalReceiptToken order={currentActiveOrder} onNewOrder={() => setIsCartOpen(false)} />;
  }

  const categories = ['All', 'Meals', 'Snacks', 'Beverages', 'Desserts'];

  const filteredItems = CANTEEN_MENU_CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantityInCart = (id) => {
    const found = cart.find((i) => i.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Hero Header & Table QR Scanner Banner */}
      <div className="glass-panel p-6 mb-8 border-emerald-500/30 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" /> Step 1: Scan & Order Portal
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• No App Installation Needed</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
              Fresh Canteen Menu <span className="gradient-text-emerald">Instant Ordering</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Scan your table QR code, select items, and tap Place Order. Get your pickup token immediately on screen!
            </p>
          </div>

          {/* Table QR Simulator Controls */}
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 flex flex-col gap-2 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" /> Scanned Table QR Code
            </span>
            <select
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="bg-slate-900 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs px-3 py-2 rounded-xl outline-none cursor-pointer hover:border-emerald-400 transition-colors shadow-inner"
            >
              <option value="Table 01">Table 01 (Front Hall)</option>
              <option value="Table 04">Table 04 (Window Lounge)</option>
              <option value="Table 07">Table 07 (Center Hall)</option>
              <option value="Table 12">Table 12 (Terrace)</option>
              <option value="Takeaway Counter">Takeaway / Express Counter</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Kacchi, Singara, Tea..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-emerald-500 text-white placeholder-slate-500 text-xs pl-10 pr-4 py-3 rounded-xl outline-none transition-colors"
          />
        </div>
      </div>

      {/* Food Items Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const qty = getItemQuantityInCart(item.id);

          return (
            <div
              key={item.id}
              className="glass-panel group overflow-hidden border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div>
                {/* Image Box */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.badge && (
                      <span className="bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-lg">
                        {item.badge}
                      </span>
                    )}
                    {item.spicy && (
                      <span className="bg-rose-500/90 text-white font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-0.5 shadow-md">
                        <Flame className="w-3 h-3" /> Spicy
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-extrabold text-white text-base font-heading group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Footer Price & Controls */}
              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Price</span>
                  <p className="text-xl font-black text-emerald-400 font-heading">
                    ৳{item.price}
                  </p>
                </div>

                {qty > 0 ? (
                  <div className="flex items-center gap-2 bg-slate-950 border border-emerald-500/40 p-1.5 rounded-xl shadow-inner">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-extrabold text-sm text-emerald-400 px-1.5">{qty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center hover:bg-emerald-400 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Add to Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Mobile Cart Bar */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-4 right-4 z-40 max-w-md mx-auto animate-in slide-in-from-bottom duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black p-4 rounded-2xl shadow-2xl shadow-emerald-500/40 flex items-center justify-between hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-950/25 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-slate-950" />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-900 font-extrabold">{cartCount} Items Selected</p>
                <p className="text-base font-black font-heading">Total: ৳{cartTotal}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs bg-slate-950 text-emerald-400 px-3.5 py-2 rounded-xl font-bold">
              View Order Summary <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* Cart Slide-out Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-extrabold text-white font-heading">Order Summary</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-12">Your cart is currently empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white">{item.name}</p>
                          <p className="text-xs text-emerald-400 font-extrabold">৳{item.price} x {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold px-1 text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-emerald-400 hover:text-emerald-300"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>৳{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>VAT & Tax</span>
                    <span className="text-emerald-400 font-medium">Included</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Payment Method</span>
                    <span className="text-amber-400 font-bold">Cash at Counter</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                    <span>Total Amount</span>
                    <span className="text-emerald-400">৳{cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    placeOrder();
                    setIsCartOpen(false);
                  }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  Place Order & Get Token <Sparkles className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerOrderPortal;
