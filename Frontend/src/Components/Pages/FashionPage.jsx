// src/pages/FashionPage/FashionPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./FashionPage.css";
import { ShopContext } from "../../Context/ShopContext";
import { imageUrl } from "../../utils/imageUrl"; // <-- helper
import placeholderImg from "../../assets/img/placeholder.png"; // add this file

export default function FashionPage() {
  const [menProducts, setMenProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetch(`https://fashion-web-7skw.onrender.com/products?category=men&limit=4`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setMenProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch men products:", err);
        if (!cancelled) setError("Failed to load products. Try again later.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function renderCard(item, key) {
    const imgSrc = imageUrl(item.image || item.img || item.imageUrl || "");
    const title = item.title || item.name || "Product";
    const price = item.price ?? item.new_price ?? 0;
    const oldPrice = item.oldPrice ?? item.old_price ?? null;

    return (
      <div
        className="fashion-card"
        key={key}
        onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
        style={{ cursor: "pointer" }}
      >
        <div className="fashion-img-box">
          <img
            src={imgSrc || placeholderImg}
            alt={title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholderImg;
              e.currentTarget.style.opacity = 0.9;
            }}
          />
          {item.rating && <div className="fashion-rating">{item.rating}</div>}
          {item.color && <div className="fashion-color">{item.color}</div>}
          {item.size && <div className="fashion-size">Size: {item.size}</div>}
          {item.badge && <div className="fashion-badge">{item.badge}</div>}
        </div>

        <div className="fashion-details" onClick={(e) => e.stopPropagation()}>
          <div className="fashion-title">{title}</div>
          <div className="fashion-subtitle">{item.subtitle}</div>
          <div className="fashion-price-row">
            <span className="fashion-price">Rs.{price}</span>
            {oldPrice && <span className="fashion-oldprice">Rs.{oldPrice}</span>}
            {item.off && <span className="fashion-off">{item.off}</span>}
          </div>

          {item.notes && <div className="fashion-label">{item.notes}</div>}
          {item.label && <div className="fashion-label">{item.label}</div>}

          <button
            type="button"
            className="cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (typeof addToCart === "function") {
                // your ShopContext earlier expected addToCart(itemId)
                addToCart(item.id ?? item._id ?? item);
              } else {
                console.warn("addToCart not found in ShopContext");
              }
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="fashion-main">Loading products…</div>;
  if (error) return <div className="fashion-main" style={{ color: "red" }}>{error}</div>;

  return (
    <div className="fashion-main">
      <section>
        <h2>Men</h2>
        <div className="fashion-grid-container">
          {menProducts.map((item, idx) => renderCard(item, `men-${idx}`))}
        </div>
      </section>
    </div>
  );
}
