import React, { useState } from "react";
import "./cap.css"; // Reuse your main shop CSS
import { caphatsData } from "../../assets/all_product";

export default function Caphats() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  return (
    <div className="caphats-page-main">
      <h2 style={{marginLeft: 24}}>Caps & Hats</h2>
      <div className="clothes-grid-container">
        {caphatsData.map((item, idx) => (
          <div className="clothes-card" key={idx}>
            <div className="clothes-img-box">
              <img src={item.img} alt={item.title} />
              {item.rating && <div className="clothes-rating">{item.rating}</div>}
              {item.color && <div className="clothes-label">{item.color}</div>}
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
              <button className="cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}
