import React, { useContext } from "react";
import "./HandbagsPage.css";
import { handbagsData } from "../../assets/all_product";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export default function HandbagsPage() {
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="handbags-page-main">
      <div className="handbags-grid-container">
        {handbagsData.map((item) => (
          <div className="handbag-card" key={item.id}>
            <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="handbag-img-box">
                <img src={`/${item.img}`} alt={item.title} />
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
                {/* No size displayed */}
                 {!item.size && <div className="handbag-size">One Size Only</div>}

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
