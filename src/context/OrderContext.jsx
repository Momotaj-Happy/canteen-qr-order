import React, { createContext, useContext, useState, useEffect } from 'react';
import { playKitchenChimeSound } from '../utils/audioChimeSynthesizer';

const OrderContext = createContext();

const SYNC_CHANNEL_NAME = 'canteen_qr_orders_channel';
const STORAGE_KEY = 'canteen_qr_orders_state';

// Canteen Menu Catalog with BDT Currency Pricing
export const CANTEEN_MENU_CATALOG = [
  {
    id: 'm1',
    name: 'Special Kacchi Biryani',
    category: 'Meals',
    price: 280,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
    description: 'Fragrant Basmati rice with tender mutton, potato, and authentic spices.',
    badge: 'Popular',
    spicy: false
  },
  {
    id: 'm2',
    name: 'Bhuna Khichuri & Beef',
    category: 'Meals',
    price: 220,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80',
    description: 'Aromatic roasted lentil rice served with slow-cooked spicy beef bhuna.',
    badge: 'Chef Special',
    spicy: true
  },
  {
    id: 'm3',
    name: 'Quarter Grill Chicken & Paratha',
    category: 'Meals',
    price: 180,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=80',
    description: 'Smoky grilled chicken served with 2 hot crispy multi-layered parathas.',
    badge: 'Bestseller',
    spicy: true
  },
  {
    id: 's1',
    name: 'Beef Singara (2 pcs)',
    category: 'Snacks',
    price: 30,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80',
    description: 'Crispy golden pastry stuffed with spicy minced beef potato filling.',
    badge: 'Hot',
    spicy: true
  },
  {
    id: 's2',
    name: 'Chicken Somosa (2 pcs)',
    category: 'Snacks',
    price: 30,
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=500&auto=format&fit=crop&q=80',
    description: 'Triangular crispy pastry packed with seasoned shredded chicken.',
    badge: undefined,
    spicy: false
  },
  {
    id: 'b1',
    name: 'Cold Mango Lassi',
    category: 'Beverages',
    price: 80,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=500&auto=format&fit=crop&q=80',
    description: 'Rich creamy yogurt smoothie blended with ripe mango pulp.',
    badge: 'Refreshing',
    spicy: false
  },
  {
    id: 'b2',
    name: 'Dhakaiya Masala Chai',
    category: 'Beverages',
    price: 20,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
    description: 'Traditional spiced milk tea brewed with cardamom and ginger.',
    badge: undefined,
    spicy: false
  },
  {
    id: 'd1',
    name: 'Shahi Firni',
    category: 'Desserts',
    price: 60,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80',
    description: 'Traditional rice pudding topped with saffron, pistachio and almonds.',
    badge: 'Sweet',
    spicy: false
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return [
      {
        id: 'ord-1001',
        tokenNumber: '#041',
        tableNumber: 'Table 04',
        items: [
          { ...CANTEEN_MENU_CATALOG[0], quantity: 1 },
          { ...CANTEEN_MENU_CATALOG[6], quantity: 2 }
        ],
        totalAmount: 320,
        status: 'Fulfilled',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        fulfilledAt: new Date(Date.now() - 2 * 60000).toISOString(),
        paymentMethod: 'Cash'
      }
    ];
  });

  const [currentActiveOrder, setCurrentActiveOrder] = useState(null);
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('Table 07');
  const [lastChimeOrder, setLastChimeOrder] = useState(null);
  const [tokenCounter, setTokenCounter] = useState(42);

  const broadcastSync = (action, payload) => {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        channel.postMessage({ action, payload, time: Date.now() });
        channel.close();
      }
    } catch (e) {
      console.warn('BroadcastChannel sync notice:', e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [orders]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    let channel;
    try {
      channel = new BroadcastChannel(SYNC_CHANNEL_NAME);

      channel.onmessage = (event) => {
        const { action, payload } = event.data;
        if (action === 'NEW_ORDER') {
          setOrders((prev) => [payload, ...prev]);
          playKitchenChimeSound();
          setLastChimeOrder(payload);
        } else if (action === 'UPDATE_STATUS') {
          setOrders((prev) =>
            prev.map((ord) => (ord.id === payload.id ? { ...ord, status: payload.status } : ord))
          );
          if (currentActiveOrder && currentActiveOrder.id === payload.id) {
            setCurrentActiveOrder((prev) => ({ ...prev, status: payload.status }));
          }
        } else if (action === 'FULFILL_ORDER') {
          setOrders((prev) =>
            prev.map((ord) => (ord.id === payload.id ? { ...ord, status: 'Fulfilled', fulfilledAt: new Date().toISOString() } : ord))
          );
          if (currentActiveOrder && currentActiveOrder.id === payload.id) {
            setCurrentActiveOrder((prev) => ({ ...prev, status: 'Fulfilled' }));
          }
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel listener initialization notice:', e);
    }

    return () => {
      if (channel) channel.close();
    };
  }, [currentActiveOrder]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (cart.length === 0) return null;

    const tokenNum = `#${String(tokenCounter).padStart(3, '0')}`;
    setTokenCounter((prev) => prev + 1);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = {
      id: `ord-${Date.now().toString().slice(-6)}`,
      tokenNumber: tokenNum,
      tableNumber: tableNumber,
      items: [...cart],
      totalAmount: total,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      paymentMethod: 'Cash'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentActiveOrder(newOrder);
    clearCart();

    playKitchenChimeSound();
    setLastChimeOrder(newOrder);
    broadcastSync('NEW_ORDER', newOrder);

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (currentActiveOrder && currentActiveOrder.id === orderId) {
      setCurrentActiveOrder((prev) => ({ ...prev, status: newStatus }));
    }
    broadcastSync('UPDATE_STATUS', { id: orderId, status: newStatus });
  };

  const fulfillOrder = (orderId) => {
    const fulfilledTime = new Date().toISOString();
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'Fulfilled', fulfilledAt: fulfilledTime } : ord))
    );
    if (currentActiveOrder && currentActiveOrder.id === orderId) {
      setCurrentActiveOrder((prev) => ({ ...prev, status: 'Fulfilled' }));
    }
    broadcastSync('FULFILL_ORDER', { id: orderId });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentActiveOrder,
        setCurrentActiveOrder,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        tableNumber,
        setTableNumber,
        placeOrder,
        updateOrderStatus,
        fulfillOrder,
        lastChimeOrder,
        triggerChime: playKitchenChimeSound
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderSystem = () => useContext(OrderContext);
export const useOrder = useOrderSystem;
