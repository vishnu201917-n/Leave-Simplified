import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./auth.css";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3000/api/auth/reset-password/${token}`,
        { password }
      );
      setMsg(res.data.message);
    } catch (err) {
      setMsg("Reset failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>

        <label>New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button onClick={handleReset}>Reset Now</button>

        {msg && <p className="auth-message">{msg}</p>}
      </div>
    </div>
  );
}
