import React, { useContext } from "react";
import "./CartItem.css";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartValue } = useContext(ShopContext);
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

      {all_product.map((e) => {
        const qty = cartItems?.[e.id] || 0;
        if (qty > 0) {
          return (
            <div className="cartitems-row" key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img className="carticon-product-icon" src={e.image} alt={e.name} />
                <p>{e.name}</p>
                <p>RS.{e.new_price}</p>

                {/* quantity (you had this as a button; keep it or replace with input if desired) */}
                <button className="cartitems-quantity" aria-label={`Quantity of ${e.name}`}>
                  {qty}
                </button>

                <p>Rs.{e.new_price * qty}</p>

                {/* Remove button — use the map variable `e` */}
                <div>
                  <button
                    className="remove-btn"
                    title="Remove item"
                    aria-label={`Remove ${e.name} from cart`}
                    onClick={() => removeFromCart(e.id)}
                  >
                    &times;
                  </button>
                </div>
              </div>

              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{cartValue}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>{cartValue === 0 || cartValue > 800 ? "Free" : "$100"}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs.{cartValue === 0 || cartValue > 800 ? cartValue : cartValue + 100}</h3>
            </div>
          </div>
         
<button onClick={() => navigate("/placeorder")}>PROCEED TO CHECKOUT</button>

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
