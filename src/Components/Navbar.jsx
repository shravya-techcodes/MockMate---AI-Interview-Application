import "../Styles/Navbar.css";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Mock Mate Logo" className="logo-img" />
      </div>

      <ul className="nav-links">
        <li>
          <a href="#hero">Home</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
      </ul>

      <div className="nav-buttons">
        <button className="btn-login" onClick={()=> navigate("/login")}>Login</button>
        <button className="btn-signup" onClick={()=> navigate("/signup")}>Sign Up</button>
      </div>
    </nav>
  );
}
