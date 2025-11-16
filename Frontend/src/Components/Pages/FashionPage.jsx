// src/pages/FashionPage/FashionPage.jsx  (adjust path if needed)
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./FashionPage.css";
import { ShopContext } from "../../Context/ShopContext"; // ensure this path + case matches your project

export default function FashionPage() {
  const [menProducts, setMenProducts] = useState([]);
  const navigate = useNavigate();

  // use the context function (no local cart state)
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    fetch("http://localhost:4000/products?category=men&limit=4")
      .then((res) => res.json())
      .then((data) => setMenProducts(data))
      .catch((err) => console.error("Failed to fetch men products:", err));
  }, []);

  function renderCard(item, key) {
    const imgSrc = item.img || item.image || item.imageUrl || "/img/placeholder.png";
    const title = item.title || item.name;
    const price = item.price || item.new_price;
    const oldPrice = item.oldPrice || item.old_price;

    return (
      <div
        className="fashion-card"
        key={key}
        onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
        style={{ cursor: "pointer" }}
      >
        <div className="fashion-img-box">
          <img src={imgSrc} alt={title} />
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
              e.stopPropagation(); // prevent card navigation
              console.log("Add to cart clicked (context):", item.id);
              addToCart(item.id); // call context addToCart with id
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

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
