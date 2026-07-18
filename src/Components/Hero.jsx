import "../Styles/Hero.css";
import landingImage from "../assets/landingImage.jpeg";
import { useNavigate } from "react-router-dom";

import React from "react";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <div className="hero-badge">✨ AI-Powered Interview Coach</div>

        <h1 className="hero-title">
          Practice Smarter.
          <br />
          Get <span className="highlight">Hired</span> Faster.
        </h1>

        <p className="hero-subtext">
          AI-powered mock interviews with instant feedback to help you crack
          your dream job interview.
        </p>

        <div className="hero-buttons">
          <button className="btn-starting" onClick={() => navigate("/signup")}>
            Get Started →
          </button>
        </div>
      </div>

      <div className="hero-right">
        <img src={landingImage} alt="AI Page Image" className="hero-img" />
      </div>
    </section>
  );
}
