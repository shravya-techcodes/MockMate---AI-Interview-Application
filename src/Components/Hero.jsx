import "../Styles/Hero.css";
import landingImage from "../assets/landingImage.jpeg";

import React from 'react'

export default function Hero() {
  return (
    <section className="hero">
        <div className="hero-left">
            <div className="hero-badge">✨ AI-Powered Interview Coach</div>

            <h1 className="hero-title">
            Practice Smarter.<br />
            Get <span className="highlight">Hired</span> Faster.</h1>

            <p className="hero-subtext">
            AI-powered mock interviews with instant feedback
            to help you crack your dream job interview.</p>

            <div className="hero-buttons">
                <button className="btn-primary">Get Started →</button>
                <button className="btn-secondary">▷ See How It Works</button>
            </div>
        </div>

        <div className="hero-right">
            <img src={landingImage} alt="AI Page Image" className="hero-img" />
        </div>
    </section>
  )
}
