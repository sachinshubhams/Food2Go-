import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (item, restaurant) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1, restaurant }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    if (cartItems.length === 0) return 0;
    return cartItems[0].restaurant?.deliveryFee || 2.99;
  };

  const getTax = () => {
    return getCartTotal() * 0.08;
  };

  const getGrandTotal = () => {
    return getCartTotal() + getDeliveryFee() + getTax();
  };

  const placeOrder = (orderDetails) => {
    const order = {
      id: Date.now(),
      items: [...cartItems],
      ...orderDetails,
      subtotal: getCartTotal(),
      deliveryFee: getDeliveryFee(),
      tax: getTax(),
      total: getGrandTotal(),
      status: 'placed',
      timestamp: new Date().toISOString()
    };
    setOrderHistory(prev => [order, ...prev]);
    clearCart();
    return order;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getDeliveryFee,
    getTax,
    getGrandTotal,
    placeOrder,
    orderHistory
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
