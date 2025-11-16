// Popular.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext"; // adjust path if needed
// import "./Popular.css"; // uncomment if you have CSS

export default function Popular() {
  const { all_product = [], addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  // pick exact ids to preserve layout (change these to what you want)
 const men_featured_ids = [18,20]; // example ids for men row
  const women_featured_ids = [8, 9];         // example ids for women area
  const new_arrivals_ids = [10, 23, 7, 22];

  const pickByIds = (ids) =>
    ids
      .map((id) => all_product.find((p) => Number(p.id) === Number(id)))
      .filter(Boolean);

  const men_featured = pickByIds(men_featured_ids);
  const women_featured = pickByIds(women_featured_ids);
  const new_arrivals = pickByIds(new_arrivals_ids);

  return (
    <div>
      {/* MEN row */}
      <div className="men-row">
        <div>
          <div className="headline">MEN</div>
          <div className="line-men"></div>
          <div className="card-men for-men">
            <div className="card-content-men">
              <span className="card-title"></span>
              <button className="card-button" onClick={() => navigate("/men")}>
                Men
              </button>
            </div>
          </div>
        </div>

        <div className="products-list">
          {men_featured.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={product.image || `/${product.img}`} alt={product.title} />
                <div className="product-label">{product.label || ""}</div>
                <div className="product-details">
                  <span className="title">{product.title}</span>
                  <span className="price">{product.price || `Rs. ${product.new_price}`}</span>
                  <span className="subtitle">{product.subtitle}</span>
                  <span className="description">{product.description}</span>
                  <span className="rating">{product.rating}</span>
                </div>
              </Link>
              <button className="add-cart" onClick={() => addToCart(product.id)}>
                Add to cart
              </button>
            </div>
          ))}
        </div>

        <div className="nav-buttons">
          <button className="nav-prev"><i className="fa fa-chevron-left"></i></button>
          <button className="nav-next"><i className="fa fa-chevron-right"></i></button>
        </div>
      </div>

      {/* WOMEN row */}
      <div className="women-row">
        <div className="arrows-1">
          <button className="arrow-btn-1"><i className="fa fa-chevron-left"></i></button>
          <button className="arrow-btn-1"><i className="fa fa-chevron-right"></i></button>
        </div>
        <div>
          <div className="headline-1">WOMEN</div>
          <div className="line-men-1"></div>
        </div>

        <div className="products-list-1">
          <div className="grey-box2"></div>

          {women_featured.map((product) => (
            <div className="product-card-1" key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={product.image || `/${product.img}`} alt={product.title} />
                <div className="product-details">
                  <span className="title">{product.title}</span>
                  <span className="price">{product.price || `Rs. ${product.new_price}`}</span>
                  <div className="stars">{product.rating || "★★★★☆"}</div>
                </div>
              </Link>
              <button className="add-cart-1" onClick={() => addToCart(product.id)}>Add to cart</button>
            </div>
          ))}

          <div className="card-women for-women">
            <div className="card-content-1">
              <span className="card-title-1">FOR WOMEN</span>
              <button className="card-button" onClick={() => navigate('/clothes')}>Click Here</button>
            </div>
          </div>
        </div>
      </div>

      {/* New arrivals */}
      <div className="newarrivals-container">
        <div className="newarrivals-header">
          <span className="tab-active">NEW ARRIVALS</span>
          <span>BEST SELLERS</span>
          <span>POPULAR</span>
          <div className="tab-arrows">
            <button className="tab-arrow-btn"><i className="fa fa-chevron-left"></i></button>
            <button className="tab-arrow-btn"><i className="fa fa-chevron-right"></i></button>
          </div>
        </div>

        <div className="newarrivals-row">
          {new_arrivals.map((product) => (
            <div className="newarrivals-card" key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={product.image || `/${product.img}`} alt={product.title} className="fa-newarrivals-img" />
                <div className="newarrivals-info">
                  <span className="newarrivals-title">{product.title}</span>
                  <span className="newarrivals-price">{product.price || `Rs. ${product.new_price}`}</span>
                  <div className="newarrivals-stars">{product.rating || "★★★★☆"}</div>
                </div>
              </Link>
              <button className="newarrivals-cartbtn" onClick={() => addToCart(product.id)}>Add to cart</button>
            </div>
          ))}
          <div className="grey-box3"></div>
        </div>
      </div>

      <div className="border-up"></div>
      <div className="grey-box4"></div>
      <div className="border-down"></div>
      <div className="border-down-1"></div>

      {/* Blog section */}
      <div className="blog-section">
        <div className="blog-header">FROM THE BLOG</div>
        <div className="blog-row">
          <div className="blog-card">
            <div className="blog-imgwrap">
              <img src="img/furcoat.png" alt="Blog Image" className="blog-img" />
              <div className="blog-date">
                <span className="blog-day">02</span>
                <span className="blog-month">FEB</span>
              </div>
            </div>
            <div className="blog-info">
              <div className="blog-title">CURABITUR LIGULA SAPIEN</div>
              <div className="blog-desc">
                Vestibulum sapien, nisl ac pellentesque mollis, mauris lorem posuere massa, eget luctus mauris magna eu dolor. Curabitur malesuada odio...
              </div>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-imgwrap">
              <img src="img/bags.png" alt="Blog Image" className="blog-img" />
              <div className="blog-date">
                <span className="blog-day">02</span>
                <span className="blog-month">FEB</span>
              </div>
            </div>
            <div className="blog-info">
              <div className="blog-title">CURABITUR LIGULA SAPIEN</div>
              <div className="blog-desc">
                Vestibulum sapien, nisl ac pellentesque mollis, mauris lorem posuere massa, eget luctus mauris magna eu dolor. Curabitur malesuada odio...
              </div>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-imgwrap">
              <img src="img/coatbag.png" alt="Blog Image" className="blog-img" />
              <div className="blog-date">
                <span className="blog-day">02</span>
                <span className="blog-month">FEB</span>
              </div>
            </div>
            <div className="blog-info">
              <div className="blog-title">CURABITUR LIGULA SAPIEN</div>
              <div className="blog-desc">
                Vestibulum sapien, nisl ac pellentesque mollis, mauris lorem posuere massa, eget luctus mauris magna eu dolor. Curabitur malesuada odio...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
