import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/reset/reset-password", {
        email,
        newPassword
      });

      setMsg(res.data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (error) {
      setMsg("Error resetting password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Create New Password</h2>

        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            className="input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button className="btn" type="submit">Reset Password</button>
        </form>

        {msg && <p style={{ color: "white" }}>{msg}</p>}
      </div>
    </div>
  );
}