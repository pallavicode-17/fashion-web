// ProductDetailPage.jsx (frontend)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDisplay from "./ProductDisplay";
const API_URL = "https://fashion-web-backend-nwvl.onrender.com";// <--- ADD THIS

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/product/${id}`)   // <--- REPLACED LOCALHOST
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setErrMsg(null);
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        setErrMsg("Product not found or server error");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (errMsg) return <div>{errMsg}</div>;
  if (!product) return <div>Product not found</div>;

  return <ProductDisplay product={product} />;
};

export default ProductDetailPage;
