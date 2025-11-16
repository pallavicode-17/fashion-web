import React, { useState } from "react";
import "./AccessoriesPage.css";
import { accessoriesData } from "../../assets/all_product";
import { Link } from "react-router-dom";

export default function AccessoriesPage() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  return (
    <div className="accessories-page-main">
      <div className="accessories-grid-container">
        {accessoriesData.map((item, idx) => (
          <div className="accessories-card" key={idx}>
            <div className="accessories-img-box">
              <img src={item.img} alt={item.title} />
              {item.rating && <div className="accessories-rating">{item.rating}</div>}
              {item.color && <div className="accessories-color">Color: {item.color}</div>}
            </div>
            <div className="accessories-details">
              <div className="accessories-title">{item.title}</div>
              <div className="accessories-subtitle">{item.subtitle}</div>
              <div className="accessories-price-row">
                <span className="accessories-price">{item.price}</span>
                <span className="accessories-oldprice">{item.oldPrice}</span>
                <span className="accessories-off">{item.off}</span>
              </div>
              {item.label && <div className="accessories-label">{item.label}</div>}
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
