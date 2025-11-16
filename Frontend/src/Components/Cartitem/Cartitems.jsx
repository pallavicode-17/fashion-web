// src/components/CartItem/CartItem.jsx
import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../utils/imageUrl"; // <- adjust path if needed
import placeholderImg from "../../assets/img/placeholder.png"; // optional local fallback

const CartItems = () => {
  const { all_product = [], cartItems = {}, removeFromCart, getTotalCartValue } = useContext(ShopContext);
  const cartValue = getTotalCartValue();
  const navigate = useNavigate();

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <hr />

      {all_product.map((product) => {
        const qty = cartItems?.[product.id] || 0;
        if (qty <= 0) return null;

        // build safe image src using helper
        const src = imageUrl(product.image || product.img || "");

        return (
          <div className="cartitems-row" key={product.id ?? product._id}>
            <div className="cartitems-format cartitems-format-main">
              <img
                className="carticon-product-icon"
                src={src}
                alt={product.name || "Product"}
                onError={(e) => {
                  // fallback to placeholder if image fails to load
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholderImg;
                }}
                style={{ width: 64, height: 64, objectFit: "cover" }}
              />
              <p>{product.name}</p>
              <p>RS.{product.new_price}</p>

              <button
                className="cartitems-quantity"
                aria-label={`Quantity of ${product.name}`}
                title={`Quantity: ${qty}`}
              >
                {qty}
              </button>

              <p>Rs.{(product.new_price || 0) * qty}</p>

              <div>
                <button
                  className="remove-btn"
                  title={`Remove ${product.name}`}
                  aria-label={`Remove ${product.name} from cart`}
                  onClick={() => removeFromCart(product.id)}
                >
                  &times;
                </button>
              </div>
            </div>

            <hr />
          </div>
        );
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{cartValue.toFixed ? cartValue.toFixed(2) : cartValue}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{cartValue === 0 || cartValue > 800 ? "Free" : "Rs. 100"}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>
                Rs.
                {cartValue === 0 || cartValue > 800
                  ? cartValue.toFixed ? cartValue.toFixed(2) : cartValue
                  : (cartValue + 100).toFixed ? (cartValue + 100).toFixed(2) : cartValue + 100}
              </h3>
            </div>
          </div>

          <button onClick={() => navigate("/placeorder")} className="proceed-btn">
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here.</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
