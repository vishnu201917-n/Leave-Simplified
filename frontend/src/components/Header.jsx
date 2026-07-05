import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch logged-in user from backend session
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch(() => {});
  }, []);

  const logout = async () => {
    await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
    navigate("/login");
  };

  return (
    <div className="top-header">
      {/* LEFT SIDE — WELCOME TEXT */}
      <div style={{ fontSize: "22px", fontWeight: "600" }}>
        {user ? (
          <>
            Welcome, {user.name}{" "}
            <span style={{ fontSize: "16px", opacity: 0.8 }}>
              ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})
            </span>
          </>
        ) : (
          "LeaveSimplified"
        )}
      </div>

      {/* RIGHT SIDE — LOGOUT BUTTON */}
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
}


