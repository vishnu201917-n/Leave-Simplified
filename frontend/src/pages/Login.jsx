import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message);
        return;
      }

      // redirect based on role
      if (res.data.role === "employee") {
        navigate("/employee/dashboard");
      } else if (res.data.role === "manager") {
        navigate("/manager/dashboard");
      }

    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <h1 className="logo">LeaveSimplified</h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {error && <p className="error">{error}</p>}

        <a className="forgot-link" href="/forgot-password">Forgot Password?</a>

        <p className="contact-hr">Don't have an account? Contact HR</p>
      </div>
    </div>
  );
}
