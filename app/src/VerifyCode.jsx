import { useState } from "react";
import axios from "axios";

export default function VerifyCode() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/reset/verify-code", {
        email,
        code
      });

      setMsg(res.data.message);

      setTimeout(() => {
        window.location.href = `/reset-password?email=${email}`;
      }, 1500);

    } catch (error) {
      setMsg("Invalid or expired code");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">Enter Verification Code</h2>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Verification Code"
            className="input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <button className="btn" type="submit">Verify</button>
        </form>

        {msg && <p style={{ color: "white" }}>{msg}</p>}
      </div>
    </div>
  );
}
