import { Link, useNavigate } from "react-router-dom";
import "../Styles/DashboardNav.css";
import logo from "../assets/logo.jpeg";
import React from "react";

export default function DashboardNav() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = ()=> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  }
  return (
    <nav className="dashnavbar">
      <div className="dashnav-logo">
        <img src={logo} alt="Mock Mate Logo" className="dashlogo-img" />
      </div>

      <div className="dashHome">
        <Link to="/dashboard"><i className="fa-solid fa-house icon"></i>Overview</Link>
      </div>

      <div className="user-dropdown">
        <div className="user-toggle">
          <span>Hello, {user.full_name}</span>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
        <ul className="dropdown-menu">
          <li className="profile">
            <a href="#">
              <i className="fa-solid fa-user"></i> Profile
            </a>
          </li>
          <li className="logout">
            <a href="#" className="logout" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
