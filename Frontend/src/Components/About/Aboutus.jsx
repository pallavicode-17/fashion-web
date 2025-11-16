import React from "react";
import "./Aboutus.css";  // Create a matching CSS file for styles

function AboutUs() {
  return (
    <div className="about">
    <div className="aboutus-section">
      <h2 className="about-title">About Us</h2>
      <p className="about-subtitle">India's home for brands and style.</p>

      <div className="about-banner">
        <img src="/img/ban.png" alt="Max Fashion Store Banner" className="about-banner-img"/>
      </div>

      <div className="about-main-content">
        <h3 className="about-main-heading">
          International Fashion.<br/>
          Superior Quality. Wide Range.<br/>
          Unmatched Affordability.
        </h3>
        <h4 className="about-main-subheading">For The Young. And the Young at Heart.<br/>That's Us.</h4>
        <p className="about-description">
          Launched in the UAE in May 2004,  Fashion Store is now in over 850+ stores across 20 countries. We opened doors in India in 2006. There has been no looking back. Our reach in the country today extends to 200+ cities, boasting a loyal customer base of close to 15 million. We also provide a hassle-free, 24 x 7 shopping experience.<br/><br/>
          We believe fashion is for everyone. From the Gen Z shopper looking for cutting edge global fashion, to each and everyone in the family seeking quality essentials,  Fashion Store has it all.<br/><br/>
          Led by a passion for fashion, our designers create 1,000+ styles every season. We offer apparel, footwear & accessories to match every occasion, event and pocket for Men, Woman & Kids.<br/><br/>
          Our digital presence spanning 11 million Instagram followers, 1 million Facebook fans, and a Max App downloads - plays a vital role in engaging and serving customers seamlessly from store to home in just a few clicks.
        </p>

        <div className="about-data-row">
          <div className="about-data-card">
            <div className="about-data-num">3.5<span>million+</span></div>
            <div className="about-data-label">products for women and men.</div>
          </div>
          <div className="about-data-card">
            <div className="about-data-num">5.72<span>million+</span></div>
            <div className="about-data-label">sq.ft of retail space dedicated to value fashion.</div>
          </div>
        </div>

        <div className="about-data-row">
          <div className="about-data-card">
            <div className="about-data-num">510<span>+</span></div>
            <div className="about-data-label">stores across over 200+ cities in India.</div>
          </div>
          <div className="about-data-card">
            <div className="about-data-num">9,000</div>
            <div className="about-data-label">helping us deliver value to our customers.</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AboutUs;
