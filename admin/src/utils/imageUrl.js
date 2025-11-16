// admin/src/utils/imageUrl.js
// small helper to normalize product.image values for admin UI
export const API_URL = "https://fashion-web-7skw.onrender.com"; // keep same constant as in admin pages

export function imageUrl(img) {
  if (!img) return "";
  // rewrite leftover localhost urls to deployed host
  if (typeof img === "string" && img.includes("localhost")) {
    const parts = img.split("/images/");
    if (parts[1]) return `${API_URL}/images/${parts[1]}`;
  }
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  if (img.startsWith("/")) return `${API_URL}${img}`;
  // plain filename
  return `${API_URL}/images/${img}`;
}
