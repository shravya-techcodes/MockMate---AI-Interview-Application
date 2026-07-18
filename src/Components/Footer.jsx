import "../Styles/Footer.css";
import gitlogo from "../assets/gitlogo.jpeg";
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img
            src="/icon.jpeg"
            alt="Mock Mate Logo"
            className="footer-logo-img"
          />
          <span className="footer-logo-text">
            Mock<span className="highlight">Mate</span>
          </span>
        </div>

        <a href="#" className="footer-github">
          <img src={gitlogo} alt="GitHub" className="github-icon" />
        </a>
      </div>

      <p className="footer-tagline">"Practice today, ace tomorrow🪄"</p>

      <hr className="footer-divider" />

      <p className="footer-copyright">© 2024 Mock Mate. All rights reserved.</p>
    </footer>
  );
}
