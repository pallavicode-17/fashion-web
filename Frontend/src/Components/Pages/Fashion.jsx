import React, { useState } from "react";
import "./ClothesPage.css";
import "./HandbagsPage.css" // This is your shared CSS, no extra CSS files needed
import { clothesData } from "../../assets/all_product";
import { handbagsData } from "../../assets/all_product";
import { accessoriesData } from "../../assets/all_product";
// ---- Product data arrays ----




// ---- Main Fashion component ----
export default function Fashion() {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart(prev => [...prev, item]);
  }

  return (
    <div className="fashion-page-main">
      {/* Clothes Section */}
      <h2 style={{marginLeft: 24}}>Clothes</h2>
      <div className="clothes-grid-container">
        {clothesData.map((item, idx) => (
          <div className="clothes-card" key={"clothes_" + idx}>
            <div className="clothes-img-box">
              <img src={item.img} alt={item.title} />
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
              <button className="cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

     

      {/* Handbags Section */}
      <h2 style={{marginLeft: 24}}>Handbags</h2>
       <div className="handbags-page-main">
      <div className="handbags-grid-container">
        {handbagsData.map((item, idx) => (
          <div className="handbag-card" key={idx}>
            <div className="handbag-img-box">
              <img src={item.img} alt={item.title} />
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
              <button className="cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
     
    </div>

      {/* Accessories Section */}
      <h2 style={{marginLeft: 24}}>Accessories</h2>
      <div className="accessories-grid-container">
        {accessoriesData.map((item, idx) => (
          <div className="clothes-card" key={"accessory_" + idx}>
            <div className="clothes-img-box">
              <img src={item.img} alt={item.title} />
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
              <button className="cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Sidebar (shared for all products) */}
     
    </div>
  );
}
