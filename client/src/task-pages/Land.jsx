import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Land.css";

const Land = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/sign"); // Redirect to the sign-in page
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to MyBrand</h1>
        <p className="hero-subtitle">Your success is our priority. Join us today!</p>
        <button className="cta-button" onClick={handleClick}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Land;