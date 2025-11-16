import React from "react";
import "./BlogSection.css";
import { blogs } from "../../assets/all_product";
// adjust path to where your blogs array is

const BlogSection = () => (
  <div className="blog">
    <div className="blog-list-container">
      <h2 className="blog-main-title">Fashion Stores Loves</h2>
      <div className="blog-category-row">
        <span>Categories: Fashion</span> |
        <span>Author: Jin</span>
      </div>
      {blogs.map((blog, idx) => (
        <article className="blog-card-list" key={blog.id || idx}>
          <div className="blog-meta-row">
            <h3 className="blog-title-1">{blog.title}</h3>
            <span className="blog-date-1">{blog.date}</span>
            <span className="blog-author">by {blog.author}</span>
            <div className="blog-social">
              <button className="blog-share-btn" aria-label="Share on Facebook">
                <i className="fa-brands fa-facebook"></i>
              </button>
              <button className="blog-share-btn" aria-label="Share on Twitter">
                <i className="fa-brands fa-twitter"></i>
              </button>
            </div>
          </div>
          {blog.image && (
            <img className="blog-list-image" src={blog.image} alt={blog.title} />
          )}
          <div className="blog-summary">
            {blog.summary}
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default BlogSection;
