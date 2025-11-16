import React from "react";
import "./Features.css";
import { features } from "../../assets/all_product";


function Features() {
  return (
    <div className="feature">
    <div className="features-section">
      <h2 className="features-title">Why Shop With Us?</h2>
      <p className="features-subtitle">Enjoy India’s best brand experience—great quality meets great value.</p>
      <div className="features-grid">
        {features.map((feature, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-content">
              <h3 className="feature-heading">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Features;
