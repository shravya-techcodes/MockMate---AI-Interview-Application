import "../Styles/LoginAndSignUp.css";
import loginImage from "../assets/loginImage.jpeg";
import React from "react";

export default function SignUp() {
  return (
    <div className="container">
      {/*LEFT PANEL*/}
      <div className="left-panel">
        <img src={loginImage} alt="Login Image" className="login-img" />
      </div>

      {/*RIGHT PANEL*/}
      <div className="right-panel">
        <div className="tabs">
          <div className="tab">Sign Up</div>
        </div>
        <h2>Create your account to get started!</h2>

        <form>
          <label>Full Name</label>
          <div className="input-group">
            <input type="text" placeholder="Enter your full name" />
          </div>

          <label>Email Address</label>
          <div className="input-group">
            <input type="email" placeholder="Enter your email" />
          </div>

          <label>Password</label>
          <div className="input-group">
            <input type="password" placeholder="Create a password" />
          </div>
          <p className="hint">At least 8 characters with letters and numbers.</p>

          <label>Confirm Password</label>
          <div className="input-group">
            <input type="password" placeholder="Confirm your password" />
          </div>

          <button type="submit" className="btn-login">
            Create Account
          </button>
        </form>

        <p className="signup-text">
          Already have an account? <a href="#">Login</a>
        </p>
      </div>
    </div>
  );
}
