import { useState } from "react";
import axios from "axios";
import "./auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSend = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/forgot-password",
        { email }
      );
      console.log("RESET LINK =", res.data.resetLink);
      setMsg(res.data.message);
    } catch (err) {
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSend}>Send Reset Link</button>

        {msg && <p className="auth-message">{msg}</p>}
      </div>
    </div>
  );
}
