// src/utils/imageUrl.js
const API_URL = "https://fashion-web-7skw.onrender.com";
// ← set this to your actual backend hostname that serves /images

export function imageUrl(img) {
  if (!img) return "";                // no image
  if (typeof img !== "string") return "";

  // If already absolute to another host, use it
  if (img.startsWith("http://") || img.startsWith("https://")) {
    // if it's a leftover localhost URL, rewrite it to your deployed backend host
    if (img.includes("localhost") || img.includes("127.0.0.1")) {
      // try extracting filename portion after /images/
      const parts = img.split("/images/");
      if (parts[1]) return `${API_URL}/images/${parts[1]}`;
      // fallback: remove protocol+host and build from filename
      const name = img.split("/").pop();
      return `${API_URL}/images/${name}`;
    }
    return img;
  }

  // If it starts with a slash, treat as relative to backend host
  if (img.startsWith("/")) {
    // if already /images/ keep same; else prefix
    return img.startsWith("/images/") ? `${API_URL}${img}` : `${API_URL}${img}`;
  }

  // If it's just a filename (product_123.png), serve from /images/
  return `${API_URL}/images/${encodeURIComponent(img)}`;
}
