import "../Styles/LoginAndSignUp.css";
import loginImage from "../assets/loginImage.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login Successful!");

        console.log(data);

        // We'll save JWT here in Part 10
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  const navigate = useNavigate();
  return (
    <div className="LogSignContainer">
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

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot">Forgot Password?</div>

          <button type="submit" className="btn-login" onClick={()=>navigate("/dashboard")}>
            LOGIN
          </button>
        </form>

        <p className="signup-text">
          Don't have an Account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
    </div>
  );
}
