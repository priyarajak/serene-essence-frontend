import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-container">
      <h1 className="brand-title" style={{fontWeight: '200'}}>SERENE ESSENCE</h1>
      <img src='/images/model_candle.png' alt="Serene Essence Banner" className="hero-image" />
    </div>
  );
};

export default HeroSection;
