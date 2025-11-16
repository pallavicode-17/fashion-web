import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";


const Hero = () => {

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hand-hand-icon">
          <p>new</p>
          <img src="/img/hand_icon.png" alt="hand icon" />

        </div>
        <p>Collections</p>
        <p>for everyone </p>
        <div className="hero-latest-btn">
          <div><Link to ="/newcollection">Latest Collection</Link></div>
          <img src="/img/arrow.png" alt="arrow" />
        </div>
      </div>
      <div className="hero_right">
        <img src="/img/Kido.png" alt="hero_image" />
      </div>
    </div>
  );
};

export default Hero;