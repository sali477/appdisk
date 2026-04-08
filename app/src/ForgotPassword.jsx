import { useState } from "react";
import "./login.css"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/api/reset/send-code", {
      email
    });

    alert(res.data.message);

    
    window.location.href = `/verify-code?email=${email}`;

  } catch (error) {
    alert("Email not found");
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn" type="submit">
            Send Reset code
          </button>
        </form>

        <button
          className="back-btn"
          onClick={() => window.location.href = "/login"}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
