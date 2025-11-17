// admin/src/Pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import "./ProductList.css";
import cross_icon from "../../assets/cart_cross_icon.png";
import { imageUrl } from "../../util/imageUrl";// adjust relative path if needed

const API_URL = "https://fashion-web-7skw.onrender.com"; // admin uses direct link

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");



  const fetchAllProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/allproducts`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      setAllProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Check backend or network.");
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to remove this product?")) return;
    setRemovingId(id);
    try {
      const res = await fetch(`${API_URL}/removeproduct`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        throw new Error(txt || `Server returned ${res.status}`);
      }
      // refresh
      await fetchAllProducts();
    } catch (err) {
      console.error("Remove product error:", err);
      alert("Failed to remove product. Check console for details.");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) return <div className="product-list">Loading products…</div>;
  if (error) return <div className="product-list product-list-error">{error}</div>;

  return (
    <div className="product-list">
      <h1>All Products List</h1>

      <div className="products-list-format-main header">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="products-list-allproducts">
        <hr />
        {allProducts.map((product) => (
          <React.Fragment key={product.id ?? product._id}>
            <div className="products-list-format-main product-list-format">
              <img className="product-list-producticon" src={imageUrl(product.image)}
              onError={(e) => (e.currentTarget.style.opacity = 0.6)}
                style={{ width: 64, height: 64, objectFit: "cover" }}
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => removeProduct(product.id)}
                className="product-list-removeicon"
                src={cross_icon}
                alt="remove"
                style={{ cursor: "pointer", opacity: removingId === product.id ? 0.6 : 1 }}
                title="Remove product"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
