// admin/src/Pages/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const API_URL = "https://fashion-web-7skw.onrender.com"; // admin uses direct link

const AddProduct = () => {
  const navigate = useNavigate?.() || null;
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });
  const [loading, setLoading] = useState(false);

  const imageHandler = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!productDetails.name.trim()) return "Enter product title";
    if (!productDetails.new_price || isNaN(Number(productDetails.new_price))) return "Enter a valid offer price";
    if (!productDetails.old_price || isNaN(Number(productDetails.old_price))) return "Enter a valid old price";
    if (!productDetails.category) return "Select a category";
    if (!imageFile) return "Please upload a product image";
    return "";
  };

  const Add_Product = async () => {
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    setLoading(true);

    try {
      // 1) Upload image
      const formData = new FormData();
      formData.append("product", imageFile);

      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: "POST",
        // DO NOT set Content-Type here — browser will set multipart boundary
        body: formData,
      });

      if (!uploadRes.ok) {
        const txt = await uploadRes.text().catch(() => null);
        throw new Error(txt || `Image upload failed (status ${uploadRes.status})`);
      }

      const uploadJson = await uploadRes.json();
      if (!uploadJson?.success || !uploadJson?.image_url) {
        throw new Error(uploadJson?.message || "Upload response invalid");
      }

      // 2) Post product data
      const productPayload = {
        ...productDetails,
        image: uploadJson.image_url,
        new_price: Number(productDetails.new_price),
        old_price: Number(productDetails.old_price),
      };

      const addRes = await fetch(`${API_URL}/addproduct`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });

      if (!addRes.ok) {
        const txt = await addRes.text().catch(() => null);
        throw new Error(txt || `Add product failed (status ${addRes.status})`);
      }

      const addJson = await addRes.json();
      if (addJson.success) {
        alert("Product added successfully");
        // redirect to product list
        if (navigate) navigate("/list-product");
        else window.location.replace("/list-product");
      } else {
        throw new Error(addJson.error || "Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err);
      alert(err.message || "Failed to add product. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>

      <div className="add-product-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>

      <div className="add-product-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="Bag">Bags</option>
          <option value="Accessories">Accessories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Hats">Hats</option>
          <option value="Footwear">FootWear</option>
          <option value="Fragrances">Fragrences</option>
        </select>
      </div>

      <div className="add-product-itemfield">
        <label htmlFor="file-input" style={{ cursor: "pointer" }}>
          <img
            src={previewUrl || upload_area}
            className="add-product-thumbnail-img"
            alt="upload preview"
            style={{ maxWidth: 240, objectFit: "cover" }}
          />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" accept="image/*" hidden />
      </div>

      <button
        onClick={Add_Product}
        className="add-product-btn"
        disabled={loading}
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Adding product..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
