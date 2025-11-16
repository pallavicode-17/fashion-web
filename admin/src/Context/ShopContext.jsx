// admin/src/Context/ShopContext.jsx
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  const cart = {};
  for (let i = 0; i <= 300; i++) cart[i] = 0;
  return cart;
};

const ShopContextProvider = ({ children }) => {
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

  // expose functions you need
  const addOrder = (order) => setOrders((p) => [order, ...p]);
  const clearCart = () => setCartItems(getDefaultCart());
  const getTotalCartValue = () => {
    let total = 0;
    for (const k in cartItems) {
      const qty = cartItems[k];
      if (qty > 0) {
        const prod = all_product.find((p) => Number(p.id) === Number(k));
        if (prod) total += prod.new_price * qty;
      }
    }
    return total;
  };
  const getTotalCartItems = () => Object.values(cartItems).reduce((a, v) => a + (v || 0), 0);

  const contextValue = {
    all_product,
    cartItems,
    setCartItems,
    addOrder,
    clearCart,
    getTotalCartValue,
    getTotalCartItems,
    orders,
    setOrders,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
