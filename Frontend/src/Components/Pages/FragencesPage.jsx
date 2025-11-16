import React, { useContext } from "react";
import "./FragrancesPage.css";
//import { fragrancesData } from "../../assets/all_product";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export default function FragrancesPage() {
   const { all_product = [] } = useContext(ShopContext);
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate
  const fragence_by_ids = [24,25,26];
   const pickByIds = (ids) =>
    ids.map((id) => all_product.find((p) => Number(p.id) === Number(id))).filter(Boolean);

  const fragence_by_id= pickByIds(fragence_by_ids);

  return (
    <div className="fragrance-page-main">
      <h2 className="fragrance-heading">Fragrances</h2>
 <div className="products-list">
          {fragence_by_id.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={product.image || `/${product.img}`} alt={product.title} />
                <div className="product-label">{product.label || ""}</div>
                <div className="product-details">
                  <span className="title">{product.title}</span>
                  <span className="price">{product.price || `Rs. ${product.new_price}`}</span>
                  <span className="subtitle">{product.subtitle}</span>
                  <span className="description">{product.description}</span>
                  <div className="stars">{product.rating || "★★★★☆"}</div>
                </div>
              </Link>
              <button className="add-cart" onClick={() => addToCart(product.id)}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
    </div>
  );
}
