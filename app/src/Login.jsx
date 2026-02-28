import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
   
    alert("Login attempt: " + email);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2> Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder=" Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn" type="submit">Login</button>
        </form>

        <div className="links-row">
          <Link to="/register" className="link">Register</Link>
          <span className="sep">|</span>
          <Link to="/forgot-password" className="link">Forgot password?</Link>
        </div>

        <div className="footer">© 2025 Student Portal – Tous droits réservés</div>
      </div>
    </div>
  );
}
