// src/utils/imageUrl.js
const API_URL = "https://fashion-web-7skw.onrender.com";

export function imageUrl(img) {
  if (!img) return "";
  // rewrite leftover localhost to deployed host
  if (img.includes("localhost")) {
    const parts = img.split("/images/");
    if (parts[1]) return `${API_URL}/images/${parts[1]}`;
  }
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/")) return `${API_URL}${img}`;
  return `${API_URL}/images/${img}`;
}
