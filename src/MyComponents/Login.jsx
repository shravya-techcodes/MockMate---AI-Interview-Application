import "../Styles/Login.css";
import loginImage from "../assets/loginImage.jpeg";
import React from 'react'

export default function Login() {
  return (
    <div className="container">

        {/*LEFT PANEL*/}
        <div className="left-panel">
            <img src={loginImage} alt="Login Image" className="login-img" />
        </div>

        {/*RIGHT PANEL*/}
        <div className="right-panel">
            <div className="tabs">
                <div className="tab">Login</div>
            </div>

            <h2>Welcome back!</h2>
            <p className="welcome">Login to continue your Interview practice.</p>

            <form>
            <label>Email Address</label>
            <div className="input-group">
                <input type="email" placeholder="Enter your email" />
            </div>

            <label>Password</label>
            <div className="input-group">
                <input type="password" placeholder="Enter your password" />
            </div>

            <div className="forgot">Forgot Password?</div>

            <button type="submit" className="btn-login">LOGIN</button>

            </form>

            <p className="signup-text">Don't have an Account? <a href="#">Sign Up</a></p>
        </div>
    </div>

  )
}
