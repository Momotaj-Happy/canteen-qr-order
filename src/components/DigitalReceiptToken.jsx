import React from 'react';
import { CheckCircle2, Clock, Utensils, QrCode, Sparkles, ArrowLeft, AlertCircle, Banknote, ShieldCheck, Printer } from 'lucide-react';
import { QRCodeRenderer } from '../utils/qrCodeRenderer';
import { useOrderSystem } from '../context/OrderContext';

export const DigitalReceiptToken = ({ order, onNewOrder }) => {
  const { setCurrentActiveOrder } = useOrderSystem();

  if (!order) return null;

  const getStatusDetails = (status) => {
    switch (status) {
      case 'Pending':
        return {
          step: 1,
          label: 'Order Sent to Kitchen',
          badgeClass: 'badge-pending',
          icon: Clock,
          color: 'text-amber-400',
          desc: 'Cook is reviewing your order details.'
        };
      case 'Preparing':
        return {
          step: 2,
          label: 'Preparing Meal in Kitchen 🍳',
          badgeClass: 'badge-preparing',
          icon: Utensils,
          color: 'text-cyan-400',
          desc: 'Fresh ingredients are sizzled & cooked now.'
        };
      case 'Ready':
        return {
          step: 3,
          label: 'Ready for Collection! 🔔',
          badgeClass: 'badge-ready',
          icon: Sparkles,
          color: 'text-emerald-400',
          desc: 'Head to the counter with this screen.'
        };
      case 'Fulfilled':
        return {
          step: 4,
          label: 'Paid & Fulfilled ✅',
          badgeClass: 'badge-fulfilled',
          icon: CheckCircle2,
          color: 'text-slate-400',
          desc: 'Payment received. Enjoy your delicious food!'
        };
      default:
        return {
          step: 1,
          label: status,
          badgeClass: 'badge-pending',
          icon: Clock,
          color: 'text-amber-400',
          desc: 'Processing order...'
        };
    }
  };

  const statusInfo = getStatusDetails(order.status);
  const StatusIcon = statusInfo.icon;

  const qrPayload = JSON.stringify({
    orderId: order.id,
    token: order.tokenNumber,
    amount: order.totalAmount,
    table: order.tableNumber
  });

  return (
    <div className="max-w-md mx-auto py-8 px-4 animate-in fade-in zoom-in duration-300">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentActiveOrder(null)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </button>
        <span className="text-xs bg-slate-900/90 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-bold shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Live Receipt Pass
        </span>
      </div>

      {/* Ticket Container */}
      <div className="glass-panel border-emerald-500/40 relative overflow-hidden shadow-2xl ticket-edge">
        
        {/* Top Metallic Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-center border-b border-slate-800 flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Canteen Order Token
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
            {order.tableNumber}
          </span>
        </div>

        {/* Main Token Display Header */}
        <div className="p-6 text-center border-b border-dashed border-slate-800/80">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
            Your Pickup Token Number
          </p>
          <h2 className="text-6xl font-black font-heading tracking-tight gradient-text-emerald drop-shadow-lg py-1">
            {order.tokenNumber}
          </h2>
          
          {/* Status Badge */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className={`badge ${statusInfo.badgeClass}`}>
              <StatusIcon className="w-4 h-4" />
              {statusInfo.label}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">{statusInfo.desc}</p>

          {/* Progress Tracker Bar */}
          <div className="mt-5 grid grid-cols-4 gap-1.5">
            {[
              { num: 1, label: 'Order' },
              { num: 2, label: 'Cook' },
              { num: 3, label: 'Ready' },
              { num: 4, label: 'Collect' }
            ].map((st) => (
              <div key={st.num} className="text-center">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    statusInfo.step >= st.num
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_#10b981]'
                      : 'bg-slate-800'
                  }`}
                />
                <span className={`text-[10px] font-bold mt-1 block ${statusInfo.step >= st.num ? 'text-emerald-400' : 'text-slate-600'}`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer QR Code Container */}
        <div className="p-6 text-center bg-slate-950/80 my-2">
          <p className="text-xs text-slate-300 mb-3 flex items-center justify-center gap-1.5 font-bold">
            <QrCode className="w-4 h-4 text-emerald-400" /> Scan QR Code at Counter to Collect Tray
          </p>
          
          <div className="inline-block p-3 bg-white rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
            <QRCodeRenderer value={qrPayload} size={195} />
          </div>

          <p className="text-xs text-slate-400 mt-3 font-medium">
            Staff will scan this QR to collect <strong className="text-emerald-400 font-extrabold text-sm">৳{order.totalAmount} Cash</strong>
          </p>
        </div>

        {/* Order Details & Amount Breakdown */}
        <div className="p-6 space-y-4">
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Amount Due</p>
                <p className="text-xs text-emerald-400 font-bold">{order.paymentMethod} Payment</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white font-heading tracking-tight">
                ৳{order.totalAmount}
              </span>
            </div>
          </div>

          {/* Ordered Item List */}
          <div className="space-y-2 bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Items Ordered</span>
              <span>Subtotal</span>
            </div>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/40 last:border-0">
                <span className="text-slate-200 font-semibold">
                  <strong className="text-emerald-400 font-extrabold text-sm mr-1.5">{item.quantity}x</strong> {item.name}
                </span>
                <span className="text-slate-300 font-mono font-bold">৳{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions & Print Receipt */}
        <div className="p-6 pt-0 space-y-3">
          {order.status === 'Fulfilled' ? (
            <button
              onClick={() => {
                setCurrentActiveOrder(null);
                onNewOrder();
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Order Something Else 🍱
            </button>
          ) : (
            <div className="flex items-center gap-2.5 bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-amber-300 text-xs font-medium">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
              <span>Keep screen open when walking to counter. Staff will scan your QR code.</span>
            </div>
          )}

          <button
            onClick={() => window.print()}
            className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Save / Print Digital Ticket Pass
          </button>
        </div>

      </div>
    </div>
  );
};

export default DigitalReceiptToken;
