// ProductDisplay.jsx
import React, { useState, useContext, useEffect } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";

function normalizeImg(src) {
  // If the src is falsy, return placeholder
  if (!src) return "/img/placeholder.png";

  // If src already is a full URL (http or https) return as-is
  if (/^https?:\/\//i.test(src)) return src;

  // If src starts with a slash, keep it
  if (src.startsWith("/")) return src;

  // Otherwise treat as relative under public and return "/<src>"
  return "/" + src;
}

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [];

  // product may use different field names: image, img, imageUrl etc.
  if (!product) return <div>Loading product...</div>;

  // Build images array from possible fields (or single image fallback)
  if (product.images && Array.isArray(product.images) && product.images.length) {
    images.push(...product.images);
  } else if (product.image) {
    images.push(product.image);
  } else if (product.img) {
    images.push(product.img);
  } else if (product.imageUrl) {
    images.push(product.imageUrl);
  }

  // if no images at all, push placeholder
  if (images.length === 0) images.push("/img/placeholder.png");

  useEffect(() => {
    // set initial selected image normalized
    setSelectedImage(normalizeImg(images[0]));
  }, [product]); // when product changes, reset selection

  return (
    <div className="productDisplay">
      <div className="productdisplay-left">
        {/* <div className="productdisplay-img-list">
          {images.map((src, i) => (
            <img
              key={i}
              src={normalizeImg(src)}
              alt={`${product.name || product.title} ${i + 1}`}
              onClick={() => setSelectedImage(normalizeImg(src))}
              className="thumbnail-img"
              style={{ cursor: "pointer", marginBottom: 12, width: 80 }}
            />
          ))}
        </div> */}

          <div className="product-display-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="product-display-img">
            <img className='product-display-img-main' src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.title || product.name}</h1>

        <div className="productdisplay-right-stars">
          <span>{product.rating}</span>
          <p>{product.label}</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            {product.oldPrice || product.old_price ? `Rs. ${product.oldPrice || product.old_price}` : ""}
          </div>

          <div className="productdisplay-right-price-new">
            {product.price || product.new_price ? `Rs. ${product.price || product.new_price}` : ""}
          </div>
        </div>

        <div className="productdisplay-right-description">
          {product.description || product.subtitle || "No description available."}
        </div>

        {product.size && (
          <div className="productdisplay-right-size">
            <h4>Select Size</h4>
            <div className="productdisplay-right-sizes">
              <div>{product.size}</div>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            if (!product.id && product._id) {
              // support mongodb _id as fallback
              addToCart(product._id);
            } else {
              addToCart(product.id);
            }
          }}
          className="add-to-cart-btn"
        >
          ADD TO CART
        </button>

        <p className="productdisplay-right-category">
          <span>Category: </span>
          {product.category || "No category set"}
        </p>

        <p className="productdisplay-right-category">
          <span>Tags: </span>
          {product.label || product.off || product.subtitle || "No tags"}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
