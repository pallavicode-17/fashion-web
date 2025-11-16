// src/pages/Fashion.jsx
import React, { useContext } from "react";
import "./ClothesPage.css";
import "./HandbagsPage.css";
import { clothesData, handbagsData, accessoriesData } from "../../assets/all_product";
import { ShopContext } from "../../Context/ShopContext"; // adjust path if needed
import { API_URL } from "../../../config"; // adjust path if config is in src/

export default function Fashion() {
  // use app-wide cart functions from context
  const { addToCart: contextAddToCart } = useContext(ShopContext) || {};

  // helper to build the correct image URL (supports full URLs or server-served images)
  const imageUrl = (img) => {
    if (!img) return "";
    // if already an absolute URL, return as-is
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    // if image path already looks like /images/..., prefix with API_URL
    if (img.startsWith("/")) return `${API_URL}${img}`;
    // otherwise, attempt to prefix with API_URL/images (common pattern)
    return `${API_URL}/images/${img}`;
  };

  // unified click handler that prefers context addToCart, falls back to local behaviour
  const handleAddToCart = (item) => {
    if (typeof contextAddToCart === "function") {
      // convert to minimal payload that shop expects (id, name, price, qty=1)
      const payload = {
        id: item.id ?? item.productId ?? Math.floor(Math.random() * 1e9),
        name: item.title || item.name || "Product",
        new_price: item.price || item.new_price || 0,
        qty: 1,
        image: imageUrl(item.img),
      };
      contextAddToCart(payload.id); // your ShopContext's addToCart expects itemId — call accordingly
      // if your context addToCart expects a full object, replace the above with contextAddToCart(payload)
    } else {
      console.warn("addToCart not found in ShopContext. Implemented locally fallback.");
      // fallback: simple local alert
      alert("Added to cart (local fallback).");
    }
  };

  return (
    <div className="fashion-page-main">
      {/* Clothes Section */}
      <h2 style={{ marginLeft: 24 }}>Clothes</h2>
      <div className="clothes-grid-container">
        {clothesData.map((item, idx) => (
          <div className="clothes-card" key={item.id ?? "clothes_" + idx}>
            <div className="clothes-img-box">
              <img src={imageUrl(item.img)} alt={item.title} />
              {item.badge && <div className="clothes-badge">{item.badge}</div>}
              {item.rating && <div className="clothes-rating">{item.rating}</div>}
              {item.size && <div className="clothes-size">Size: {item.size}</div>}
            </div>

            <div className="clothes-details">
              <div className="clothes-title">{item.title}</div>
              <div className="clothes-subtitle">{item.subtitle}</div>
              <div className="clothes-price-row">
                <span className="clothes-price">{item.price}</span>
                <span className="clothes-oldprice">{item.oldPrice}</span>
                <span className="clothes-off">{item.off}</span>
              </div>
              {item.label && <div className="clothes-label">{item.label}</div>}
              <button className="cart-btn" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Handbags Section */}
      <h2 style={{ marginLeft: 24 }}>Handbags</h2>
      <div className="handbags-page-main">
        <div className="handbags-grid-container">
          {handbagsData.map((item, idx) => (
            <div className="handbag-card" key={item.id ?? "handbag_" + idx}>
              <div className="handbag-img-box">
                <img src={imageUrl(item.img)} alt={item.title} />
                {item.rating && <div className="handbag-rating">{item.rating}</div>}
                {item.color && <div className="handbag-color">Color: {item.color}</div>}
              </div>
              <div className="handbag-details">
                <div className="handbag-title">{item.title}</div>
                <div className="handbag-subtitle">{item.subtitle}</div>
                <div className="handbag-price-row">
                  <span className="handbag-price">{item.price}</span>
                  <span className="handbag-oldprice">{item.oldPrice}</span>
                  <span className="handbag-off">{item.off}</span>
                </div>
                {item.label && <div className="handbag-label">{item.label}</div>}
                <button className="cart-btn" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessories Section */}
      <h2 style={{ marginLeft: 24 }}>Accessories</h2>
      <div className="accessories-grid-container">
        {accessoriesData.map((item, idx) => (
          <div className="clothes-card" key={item.id ?? "accessory_" + idx}>
            <div className="clothes-img-box">
              <img src={imageUrl(item.img)} alt={item.title} />
              {item.rating && <div className="clothes-rating">{item.rating}</div>}
            </div>
            <div className="clothes-details">
              <div className="clothes-title">{item.title}</div>
              <div className="clothes-subtitle">{item.subtitle}</div>
              <div className="clothes-price-row">
                <span className="clothes-price">{item.price}</span>
                <span className="clothes-oldprice">{item.oldPrice}</span>
                <span className="clothes-off">{item.off}</span>
              </div>
              {item.label && <div className="clothes-label">{item.label}</div>}
              <button className="cart-btn" onClick={() => handleAddToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
