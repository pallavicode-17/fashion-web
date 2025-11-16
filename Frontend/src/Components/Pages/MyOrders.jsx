// src/pages/MyOrders.jsx
import React, { useEffect, useState } from "react";
import "./MyOrders.css";
const API_URL = "https://fashion-web-backend-nwvl.onrender.com";
export default function MyOrders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    if (!token) {
      setError("Please log in to view your orders.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/orders/mine`, {   // <--- UPDATED
          headers: { 
            "Content-Type": "application/json",
            "auth-token": token 
          }
        });

        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!cancelled) setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        if (!cancelled) setError(err.message || "Failed to load orders");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) return <div className="mo-empty">Loading orders…</div>;
  if (error) return <div className="mo-empty mo-error">{error}</div>;
  if (!orders || orders.length === 0) return <div className="mo-empty">You have no orders yet.</div>;

  const toggle = (id) => setExpanded((p) => (p === id ? null : id));
  const formatDate = (s) => {
    try {
      return new Date(s).toLocaleString();
    } catch {
      return s;
    }
  };

  return (
    <div className="mo-container">
      <h1 className="mo-title">My Orders</h1>

      <div className="mo-list">
        {orders.map((order) => (
          <article key={order.id} className="mo-card">
            <header className="mo-card-head">
              <div>
                <div className="mo-order-id">Order <strong>{order.id}</strong></div>
                <div className="mo-date">{formatDate(order.createdAt)}</div>
              </div>

              <div className="mo-head-right">
                <div className={`mo-badge mo-badge-${(order.status || "").toLowerCase().replace(/ /g, "-")}`}>
                  {order.status || "Unknown"}
                </div>
                <div className="mo-total">₹{(order.summary?.total || 0).toFixed(2)}</div>
                <button className="mo-toggle-btn" onClick={() => toggle(order.id)}>
                  {expanded === order.id ? "Hide details" : "View details"}
                </button>
              </div>
            </header>

            {expanded === order.id && (
              <div className="mo-card-body">
                <section className="mo-section">
                  <h4 className="mo-section-title">Items</h4>
                  <div className="mo-items">
                    {order.items?.map((it) => (
                      <div key={it.id + "-" + Math.random()} className="mo-item">
                        <div>
                          <div className="mo-item-name">{it.name}</div>
                          <div className="mo-item-meta">Qty: {it.qty} • ₹{it.price}</div>
                        </div>
                        <div className="mo-item-price">₹{(it.price * it.qty).toFixed(2)}</div>
                      </div>
                    )) || <div className="mo-muted">No items listed</div>}
                  </div>
                </section>

                <section className="mo-section">
                  <h4 className="mo-section-title">Customer</h4>
                  <div className="mo-customer">
                    <div><strong>{order.customer?.name}</strong></div>
                    <div className="mo-muted">{order.customer?.phone} • {order.customer?.email}</div>
                    <div className="mo-muted">{order.customer?.address}, {order.customer?.city} {order.customer?.pincode}</div>
                    <div className="mo-muted">{order.customer?.state}</div>
                  </div>
                </section>

                <section className="mo-section">
                  <h4 className="mo-section-title">Tracking</h4>
                  <div className="mo-track">
                    <div className="mo-track-left">
                      <div className="mo-track-step active">Packed</div>
                      <div className="mo-track-step">Shipped</div>
                      <div className="mo-track-step">Out for delivery</div>
                      <div className="mo-track-step">Delivered</div>
                    </div>
                    <div className="mo-track-right">
                      <div className="mo-muted">Current status:</div>
                      <div className="mo-current">{order.status}</div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
