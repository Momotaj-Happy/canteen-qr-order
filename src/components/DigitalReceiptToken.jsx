import React from 'react';
import { CheckCircle2, Clock, Utensils, QrCode, Sparkles, ArrowLeft, AlertCircle, Banknote } from 'lucide-react';
import { QRCodeRenderer } from '../utils/qrCodeRenderer';
import { useOrderSystem } from '../context/OrderContext';

export const DigitalReceiptToken = ({ order, onNewOrder }) => {
  const { setCurrentActiveOrder } = useOrderSystem();

  if (!order) return null;

  const getStatusDetails = (status) => {
    switch (status) {
      case 'Pending':
        return {
          label: 'Order Sent to Kitchen',
          badgeClass: 'badge-pending',
          icon: Clock,
          color: 'text-amber-400',
          desc: 'Kitchen cook is reviewing your order details.'
        };
      case 'Preparing':
        return {
          label: 'Preparing Meal in Kitchen 🍳',
          badgeClass: 'badge-preparing',
          icon: Utensils,
          color: 'text-cyan-400',
          desc: 'Fresh ingredients are sizzled & cooked now.'
        };
      case 'Ready':
        return {
          label: 'Ready for Collection! 🔔',
          badgeClass: 'badge-ready',
          icon: Sparkles,
          color: 'text-emerald-400',
          desc: 'Head to the counter with this screen.'
        };
      case 'Fulfilled':
        return {
          label: 'Paid & Fulfilled ✅',
          badgeClass: 'badge-fulfilled',
          icon: CheckCircle2,
          color: 'text-slate-400',
          desc: 'Payment received. Enjoy your delicious food!'
        };
      default:
        return {
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
    <div className="max-w-md mx-auto py-6 px-4 animate-in fade-in zoom-in duration-300">
      
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentActiveOrder(null)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </button>
        <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Step 2: Digital Receipt Token
        </span>
      </div>

      {/* Main Digital Token Card */}
      <div className="glass-panel p-6 border-emerald-500/30 relative overflow-hidden shadow-2xl">
        
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Token Header */}
        <div className="text-center pb-5 border-b border-slate-800">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
            {order.tableNumber} • Token Number
          </p>
          <h2 className="text-5xl font-extrabold text-white font-heading tracking-tight text-emerald-400 drop-shadow-md">
            {order.tokenNumber}
          </h2>
          
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className={`badge ${statusInfo.badgeClass}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {statusInfo.label}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">{statusInfo.desc}</p>
        </div>

        {/* Customer QR Code */}
        <div className="py-6 text-center bg-slate-950/60 my-5 rounded-2xl border border-slate-800/80 p-4">
          <p className="text-xs text-slate-400 mb-3 flex items-center justify-center gap-1.5 font-medium">
            <QrCode className="w-4 h-4 text-emerald-400" /> Customer QR Code for Counter Verification
          </p>
          
          <QRCodeRenderer value={qrPayload} size={190} />

          <p className="text-[11px] text-slate-400 mt-3">
            Employee will scan code to collect <strong className="text-emerald-400">৳{order.totalAmount} Cash</strong>
          </p>
        </div>

        {/* Amount Due Breakdown */}
        <div className="space-y-4">
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Amount Due</p>
                <p className="text-xs text-emerald-400 font-semibold">{order.paymentMethod} Payment</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-white font-heading">
                ৳{order.totalAmount}
              </span>
            </div>
          </div>

          <div className="space-y-2 bg-slate-900/60 rounded-xl p-3 border border-slate-800">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Ordered Items</p>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/50 last:border-0">
                <span className="text-slate-300 font-medium">
                  <strong className="text-emerald-400">{item.quantity}x</strong> {item.name}
                </span>
                <span className="text-slate-400">৳{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 space-y-2">
          {order.status === 'Fulfilled' ? (
            <button
              onClick={() => {
                setCurrentActiveOrder(null);
                onNewOrder();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              Order Something Else 🍱
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-amber-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Keep screen open when walking to counter. Staff will scan your QR code.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DigitalReceiptToken;
