import React, { useContext, useState } from "react";
import "./FootwearPage.css";
import { footwearData } from "../../assets/all_product";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export default function FootwearPage() {
  const {addToCart} =useContext(ShopContext);
  

  return (
    
    <div className="footwear-page-main">
      <div className="footwear-grid-container">
        {footwearData.map((item, idx) => (
          <div className="footwear-card" key={item.id}>
  <Link to={`/product/${item.id}`}>
    <div className="footwear-img-box">
      <img src={`/${item.img}`} alt={item.title} />
      {item.rating && <div className="footwear-rating">{item.rating}</div>}
      {item.size && <div className="footwear-size">Size: {item.size}</div>}
    </div>
    <div className="footwear-details">
      <div className="footwear-title">{item.title}</div>
      <div className="footwear-subtitle">{item.subtitle}</div>
      <div className="footwear-price-row">
        <span className="footwear-price">{item.price}</span>
        <span className="footwear-oldprice">{item.oldPrice}</span>
        <span className="footwear-off">{item.off}</span>
      </div>
      {item.label && <div className="footwear-label">{item.label}</div>}
    </div>
  </Link>
  <button className="cart-btn" onClick={() => addToCart(item.id)}>
    Add to Cart
  </button>
</div>

        ))}
      </div>

     
    </div>
  );
}
