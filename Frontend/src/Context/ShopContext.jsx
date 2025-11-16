// src/Context/ShopContext.jsx  (merge into your existing file)
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  const cart = {};
  for (let i = 0; i <= 300; i++) cart[i] = 0;
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_product, setAll_Product] = useState([]);
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem("orders");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    // load products (existing)
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAll_Product(data))
      .catch((err) => console.error("Failed to fetch products:", err));

    // load server-side cart if needed (existing logic)
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) setCartItems(data);
        })
        .catch((err) => console.error("Failed to load user cart:", err));
    }
  }, []);

  // cart functions (existing)
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    // optional server sync...
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) }));
  };
  const clearCart = () => {
  setCartItems(getDefaultCart());
  // if you persist cart in localStorage, remove it:
  localStorage.removeItem("cart");
  // optionally persist to server if logged in (call /clearcart)
};

  const getTotalCartValue = () => {
    let total = 0;
    for (const key in cartItems) {
      const qty = cartItems[key];
      if (qty > 0) {
        const product = all_product.find((p) => Number(p.id) === Number(key));
        if (product && product.new_price) total += product.new_price * qty;
      }
    }
    return total;
  };
  const getTotalCartItems = () => Object.values(cartItems).reduce((acc, v) => acc + (v || 0), 0);

  // Orders API for app-wide use
  const addOrder = (orderPayload) => {
    const id = orderPayload.id || `ord_${Date.now()}`;
    const order = {
      id,
      status: orderPayload.status || "Order Packed",
      createdAt: orderPayload.createdAt || new Date().toISOString(),
      items: orderPayload.items || [],
      summary: orderPayload.summary || {},
      customer: orderPayload.customer || {},
      paymentMethod: orderPayload.paymentMethod || "cod",
      meta: orderPayload.meta || {},
    };
    setOrders((prev) => [order, ...prev]);
    return id;
  };

  const updateOrder = (orderId, patch = {}) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === orderId ? { ...o, ...patch } : o));
      return next;
    });
  };

  const removeOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const getOrders = () => orders;

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartValue,
    getTotalCartItems,
    addOrder,
    updateOrder,
    removeOrder,
    getOrders,
    orders,
    setOrders, // expose if admin wants to replace all
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
