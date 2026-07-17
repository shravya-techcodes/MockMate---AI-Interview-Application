import "../Styles/LoginAndSignUp.css";
import loginImage from "../assets/loginImage.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {

const [full_name, setFullname] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            full_name,
            email,
            password,
        }),
    });

  const data = await response.json();
  alert(data.message);

if (response.ok) {
    setFullname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
}

};

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

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <div className="input-group">
            <input type="text" placeholder="Enter your full name" value={full_name} onChange={(e)=>setFullname(e.target.value)} required />
          </div>

          <label>Email Address</label>
          <div className="input-group">
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>

          <label>Password</label>
          <div className="input-group">
            <input type="password" placeholder="Create a password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <p className="hint">At least 8 characters with letters and numbers.</p>

          <label>Confirm Password</label>
          <div className="input-group">
            <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn-login">
            Create Account
          </button>
        </form>

        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
