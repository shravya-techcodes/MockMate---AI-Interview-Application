import "../Styles/Navbar.css";
import logo from "../assets/logo.jpeg";
import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="Mock Mate Logo" className="logo-img" />
        </div>

        <ul className="nav-links">
            <li><a href="#" >Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">About</a></li>
        </ul>

        <div className="nav-buttons">
            <button className="btn-login">Login</button>
            <button className="btn-signup">Sign Up</button>
        </div>
    </nav>
  )
}


