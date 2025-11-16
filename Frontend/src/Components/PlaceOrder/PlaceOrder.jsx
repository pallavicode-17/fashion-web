// admin/src/Pages/PlaceOrder.jsx
import React, { useContext, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./PlaceOrder.css";
import { ShopContext } from "../../Context/ShopContext"; // adjust path if needed
const API_URL = "https://fashion-web-backend-nwvl.onrender.com"; // keep this import OR define const here, not both

export default function PlaceOrder() {
  const navigate = useNavigate();

  // context (make sure provider is mounted)
  const {
    all_product,
    cartItems,
    getTotalCartValue,
    getTotalCartItems,
    addOrder,
    clearCart,
  } = useContext(ShopContext);

  // form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // totals
  const subtotal = useMemo(
    () => getTotalCartValue() || 0,
    [getTotalCartValue, cartItems, all_product]
  );
  const shipping = useMemo(() => (subtotal > 1000 || subtotal === 0 ? 0 : 50), [subtotal]);
  const tax = useMemo(() => +(subtotal * 0.05).toFixed(2), [subtotal]);
  const total = useMemo(() => +(subtotal + shipping + tax).toFixed(2), [subtotal, shipping, tax]);
  const itemCount = useMemo(() => getTotalCartItems(), [getTotalCartItems, cartItems]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validateForm() {
    if (!form.name.trim()) return "Enter full name";
    if (!form.phone.trim() || form.phone.trim().length < 7) return "Enter a valid phone number";
    if (!form.address.trim()) return "Enter shipping address";
    if (itemCount === 0) return "Your cart is empty";
    return "";
  }

  const buildItemsFromContext = () => {
    const items = [];
    for (const key in cartItems) {
      const qty = cartItems[key];
      if (!qty || qty <= 0) continue;
      const product = all_product.find((p) => Number(p.id) === Number(key));
      items.push({
        id: Number(key),
        name: product?.name || "Unknown",
        price: product?.new_price || 0,
        qty,
      });
    }
    return items;
  };

  const token = localStorage.getItem("auth-token");

  async function placeOrder(e) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!token) {
      // not logged in -> redirect to login and optionally save cart or intended path
      alert("You must be logged in to place an order.");
      navigate("/login"); // adjust login route
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const items = buildItemsFromContext();
    const payload = {
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      },
      items,
      summary: { subtotal, shipping, tax, total },
      paymentMethod: form.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      let serverData = null;

      // use API_URL from import (or set const above if you prefer)
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Server responded ${res.status}`);
      }

      serverData = await res.json();

      if (typeof addOrder === "function") {
        const id = serverData?.id || undefined;
        await addOrder({ ...payload, id });
      }

      if (typeof clearCart === "function") clearCart();

      setSuccessMsg("Order placed successfully!");

      setTimeout(() => navigate("/orders"), 700);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to place order. Try again later.");
    } finally {
      setLoading(false);
    }
  } // <-- THIS closes placeOrder

  return (
    <div className="placeorder-container">
      <h1>Place Order</h1>
      <div className="placeorder-grid">
        <div>
          <form onSubmit={placeOrder} className="card">
            <h2>Shipping Details</h2>
            <div className="form-grid">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="input" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" className="input" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" />
              <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="input" />
              <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
              <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input" />
            </div>

            <div style={{ marginTop: 10 }}>
              <textarea name="address" value={form.address} onChange={handleChange} placeholder="Full address" className="input" rows={3} />
            </div>

            <div style={{ marginTop: 12 }}>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>Payment Method</label>
              <div className="payment-group">
                <label><input type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === "cod"} onChange={handleChange} /> Cash on Delivery</label>
                <label><input type="radio" name="paymentMethod" value="card" checked={form.paymentMethod === "card"} onChange={handleChange} /> Card</label>
                <label><input type="radio" name="paymentMethod" value="upi" checked={form.paymentMethod === "upi"} onChange={handleChange} /> UPI</label>
              </div>
            </div>

            {error && <div className="alert error">{error}</div>}
            {successMsg && <div className="alert success">{successMsg}</div>}

            <div style={{ marginTop: 14, display: "flex", gap: 12 }}>
              <button type="submit" disabled={loading} className="btn btn-primary">{loading ? "Placing order..." : "Place Order"}</button>
              <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
            </div>
          </form>
        </div>

        <aside className="card order-summary">
          <h2>Order Summary</h2>
          <div className="row"><div style={{display:"flex",justifyContent:"space-between"}}><span>Items</span><span>{itemCount}</span></div></div>
          <div className="row"><div style={{display:"flex",justifyContent:"space-between"}}><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div></div>
          <div className="row"><div style={{display:"flex",justifyContent:"space-between"}}><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span></div></div>
          <div className="row"><div style={{display:"flex",justifyContent:"space-between"}}><span>Tax (5%)</span><span>₹{tax.toFixed(2)}</span></div></div>
          <div className="row total"><div style={{display:"flex",justifyContent:"space-between"}}><span>Total</span><span>₹{total.toFixed(2)}</span></div></div>

          <div className="small">By placing the order you agree to our <Link to="/terms" style={{textDecoration:"underline"}}>Terms</Link> and <Link to="/privacy" style={{textDecoration:"underline"}}>Privacy Policy</Link>.</div>
        </aside>
      </div>
    </div>
  );
}
