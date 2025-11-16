import React, { useContext } from "react";
import "./ClothesPage.css";
import { clothesData } from "../../assets/all_product";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export default function ClothesPage() {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="clothes-page-main">
      <div className="clothes-grid-container">
        {clothesData.map((item) => (
          <div className="clothes-card" key={item.id}>
            <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="clothes-img-box">
                <img src={`/${item.img}`} alt={item.title} />
                {/* {item.badge && <div className="clothes-badge">{item.badge}</div>} */}
                {item.rating && <div className="clothes-rating">{item.rating}</div>}
                {/* {item.size && <div className="clothes-size">Size: {item.size}</div>} */}
              </div>
              <div className="clothes-details">
                <div className="clothes-title">{item.title}</div>
                <div className="clothes-subtitle">{item.subtitle}</div>
                <div className="clothes-price-row">
                  <span className="clothes-price">{item.price}</span>
                  <span className="clothes-oldprice">{item.oldPrice}</span>
                  <span className="clothes-off">{item.off}</span>
                </div>
                {/* {item.label && <div className="clothes-label">{item.label}</div>} */}
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
