// src/pages/Main.jsx  (adjust path if your file location differs)
import "../style.css";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { banners as staticBanners } from "../assets/all_product"; // if banners are static
import { imageUrl } from "../utils/imageUrl"; // helper from above

// Import UI assets so bundler includes them
import ArrowLeft from "../../public/img/ArrowLeft.png";
import ArrowRight from "../../public/img/ArrowRight.png";
import FurcoatImg from "../../public/img/furcoat.png";
import BagsImg from ".../../public/img/bags.png";
import CoatbagImg from "../../public/img/coatbag.png";

export default function Main() {
  const { all_product = [], addToCart } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const banners = staticBanners || [];

  const goPrev = () =>
    setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
  const goNext = () =>
    setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);

  const men_featured_ids = [18, 20];
  const women_featured_ids = [8, 9];
  const new_arrivals_ids = [10, 23, 7, 22];

  const pickByIds = (ids) =>
    ids.map((id) => all_product.find((p) => Number(p.id) === Number(id))).filter(Boolean);

  const men_featured = pickByIds(men_featured_ids);
  const women_featured = pickByIds(women_featured_ids);
  const new_arrivals = pickByIds(new_arrivals_ids);

  return (
    <div>
      {/* BANNER */}
      <div
        className="men_women"
        style={{
          backgroundImage: banners[currentIndex]?.image
            ? `url(${banners[currentIndex].image.startsWith("http") ? banners[currentIndex].image : banners[currentIndex].image})`
            : undefined,
        }}
      >
        <div className="fashion-image" onClick={goPrev} style={{ cursor: "pointer" }}>
          <img src={ArrowLeft} alt="Previous" />
        </div>
        <div className="arrow-right" onClick={goNext} style={{ cursor: "pointer" }}>
          <img src={ArrowRight} alt="Next" />
        </div>
        <div className="text-fas">
          <p className="text-1">{banners[currentIndex]?.text1}</p>
          <p className="text-2">{banners[currentIndex]?.text2}</p>
          <div className="for-line">
            <span className="line"></span>
            <span className="for-text">{banners[currentIndex]?.lineText}</span>
            <span className="line"></span>
          </div>
          <p className="text-4">{banners[currentIndex]?.text4}</p>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="quick-links">
        <p>Go quickly to</p>
        <i className="fa-solid fa-arrow-right"></i>
        <Link to="/clothes"><p>Women</p></Link>
        <p>:</p>
        <Link to="/clothes"><p>Clothing</p></Link>
        <p>:</p>
        <Link to="/footwear"><p>Footwear</p></Link>
        <p>:</p>
        <Link to="/handbags"><p>Bags and Wallets</p></Link>
        <p>:</p>
        <Link to="/accessories"> <p>Accessories</p></Link>
        <p>:</p>
        <Link to="/fashion"> <p>Fashion</p></Link>
        <p>:</p>
        <Link to="/fragence"> <p>Fragrances</p></Link>
        <p>:</p>
        <Link to="/cap"><p>Caps & Hats</p></Link>
      </div>

      {/* Category Cards */}
      <div className="card-container">
        <div className="grey-slab"></div>
        <div className="card clothes">
          <div className="card-content">
            <span className="card-title ">CLOTHES</span>
            <button className="card-button" onClick={() => navigate('/clothes')}>Click Here</button>
          </div>
        </div>
        <div className="card footwear">
          <div className="card-content">
            <span className="card-title">FOOTWEAR</span>
            <button className="card-button" onClick={() => navigate('/footwear')}>Click Here</button>
          </div>
        </div>
        <div className="card handbags">
          <div className="card-content">
            <span className="card-title">HAND BAGS</span>
            <button className="card-button" onClick={() => navigate('/handbags')}>Click Here</button>
          </div>
        </div>
      </div>

      {/* MEN row (dynamic) */}
      <div className="men-row">
        <div>
          <div className="headline">MEN</div>
          <div className="line-men"></div>
          <div className="card-men for-men">
            <div className="card-content-men">
              <span className="card-title"></span>
              <button className="card-button" onClick={() => navigate('/men')}>Men</button>
            </div>
          </div>
        </div>

        <div className="products-list">
          {men_featured.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={imageUrl(product.image || product.img)} alt={product.title} />
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
                <img src={imageUrl(product.image || product.img)} alt={product.title} />
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
              <img src={imageUrl(product.image || product.img)} alt={product.title} className="fa-newarrivals-img" />
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
      <div className="grey-box4"> </div>
      <div className="border-down"></div>
      <div className="border-down-1"></div>

      {/* Blog section (unchanged) */}
      <div className="blog-section">
        <div className="blog-header">FROM THE BLOG</div>
        <div className="blog-row">
          <div className="blog-card">
            <div className="blog-imgwrap">
              <img src={FurcoatImg} alt="Blog Image" className="blog-img" />
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
              <img src={BagsImg} alt="Blog Image" className="blog-img" />
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
              <img src={CoatbagImg} alt="Blog Image" className="blog-img" />
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
