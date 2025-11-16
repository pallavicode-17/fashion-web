// admin/src/Pages/AdminOrders.jsx
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../Context/ShopContext"; // << adjust relative path to match your project
// import "./PlaceOrder.css"; // optional styles

const STATUS_OPTIONS = ["Order Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const { orders = [], updateOrder, removeOrder, setOrders } = useContext(ShopContext);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    // Fetch orders from backend to keep admin in sync with server (optional)
    // If you already persist orders in localStorage via context, this is optional.
    (async () => {
      try {
        const res = await fetch("http://localhost:4000/orders");
        if (res.ok) {
          const data = await res.json();
          if (typeof setOrders === "function") setOrders(data);
        } else {
          console.warn("Failed to fetch orders from server:", res.status);
        }
      } catch (err) {
        console.warn("Error fetching orders:", err);
      }
    })();
  }, [setOrders]);

  const toggleExpand = (id) => setExpandedOrder((p) => (p === id ? null : id));

  if (!orders || orders.length === 0) {
    return (
      <div className="placeorder-container">
        <h1>Orders</h1>
        <div className="card">
          <p className="empty">No orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="placeorder-container">
      <h1>All Orders</h1>
      <div style={{ display: "grid", gap: 16 }}>
        {orders.map((order) => (
          <div key={order.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>Order ID: {order.id}</div>
                <div style={{ color: "var(--muted)", marginTop: 6 }}>Placed: {new Date(order.createdAt).toLocaleString()}</div>

                <div style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 700 }}>Customer</div>
                  <div style={{ color: "var(--muted)", marginTop: 4 }}>
                    <div>{order.customer?.name}</div>
                    <div>{order.customer?.phone} • {order.customer?.email}</div>
                    <div>{order.customer?.address}, {order.customer?.city} {order.customer?.pincode}</div>
                    <div>{order.customer?.state}</div>
                  </div>
                </div>
              </div>

              <div style={{ minWidth: 180, textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>Status</div>

                <select
                  value={order.status}
                  onChange={(e) => updateOrder(order.id, { status: e.target.value })}
                  style={{ marginTop: 8, padding: "8px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                <div style={{ marginTop: 12 }}>
                  <button className="btn btn-secondary" onClick={() => toggleExpand(order.id)} style={{ marginRight: 8 }}>
                    {expandedOrder === order.id ? "Hide items" : "View items"}
                  </button>

                  <button
                    className="btn"
                    onClick={() => {
                      if (window.confirm("Delete this order?")) removeOrder(order.id);
                    }}
                    style={{ background: "#ef4444", color: "#fff", borderRadius: 8, padding: "8px 12px", border: "none" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {expandedOrder === order.id && (
              <>
                <hr style={{ margin: "12px 0" }} />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>Items</div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {order.items.map((it) => (
                      <div key={it.id} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{it.name}</div>
                          <div style={{ color: "var(--muted)", fontSize: 13 }}>Qty: {it.qty}</div>
                        </div>
                        <div style={{ fontWeight: 700 }}>₹{(it.price * it.qty).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr style={{ margin: "12px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "var(--muted)" }}>Total</div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>₹{(order.summary?.total || 0).toFixed(2)}</div>
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>Payment: {order.paymentMethod || "N/A"}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
