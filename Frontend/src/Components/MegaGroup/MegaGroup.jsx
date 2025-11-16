import React from "react";
import "./MegaGroup.css";
import { groupBrands } from "../../assets/all_product";
import { stats } from "../../assets/all_product";
function MegaGroup() {
  return (
    <div className="mega-group-section">
      <h2 className="mega-group-title">Mega Group</h2>
      <p className="mega-group-intro">
        Proudly uniting global brands and millions of customers, we bring the best in style, home, and value together—across sectors, across the world.
      </p>
      
      <div className="mega-group-stats">
        {stats.map((stat, idx) => (
          <div className="mega-group-stat-card" key={idx}>
            <div className="mega-group-stat-value">{stat.value}</div>
            <div className="mega-group-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <h3 className="mega-group-brands-title">Group Brands</h3>
      <div className="mega-group-brands">
        {groupBrands.map((brand, idx) => (
          <div className="mega-group-brand-card" key={idx}>
            <img src={brand.logo} alt={brand.name} className="mega-group-brand-logo" />
            <div className="mega-group-brand-info">
              <div className="mega-group-brand-name">{brand.name}</div>
              <div className="mega-group-brand-desc">{brand.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mega-group-footer">
        <p>
          Our journey continues, powered by innovation, diversity, and our commitment to shaping the future of retail and beyond.
        </p>
      </div>
    </div>
  );
}

export default MegaGroup;
