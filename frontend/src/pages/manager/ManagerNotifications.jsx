import { useEffect, useState } from "react";
import axios from "axios";
import ManagerSidebar from "./ManagerSidebar";
import Header from "../../components/Header";
import "./manager.css";

export default function ManagerNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/manager/notifications", {
      withCredentials: true
    })
    .then(res => {
      if (res.data.success) setNotifications(res.data.notifications);
    });
  }, []);

  return (
    <div className="app-layout">
      <ManagerSidebar />

      <div className="main-area">
        <Header user={{ name: "Admin Manager", role: "Manager" }} />

        <h1 className="page-title">Manager Notifications</h1>

        <div className="notif-container">
          {notifications.length === 0 ? (
            <p className="no-notif">No notifications</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} className="notif-card">
                <p className="notif-text">{n.message}</p>
                <p className="notif-time">
                  {new Date(n.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
