import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee/notifications", { withCredentials: true })
      .then((res) => {
        if (res.data.success) setNotifications(res.data.notifications);
      });
  }, []);

  return (
    <div className="app-layout">
      <Sidebar role="employee" />

      <div className="main-area">
        <Header />

        <h1 className="page-title">Notifications</h1>

        <div className="notif-list">
          {notifications.length === 0 ? (
            <p className="no-notif">No notifications yet</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="notif-card">
                <div className="notif-message">{n.message}</div>
                <div className="notif-time">
                  {new Date(n.createdAt).toLocaleString("en-IN")}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


