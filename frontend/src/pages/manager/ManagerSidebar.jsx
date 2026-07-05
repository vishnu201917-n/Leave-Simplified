import { NavLink } from "react-router-dom";
import "./manager.css";

export default function ManagerSidebar() {
  return (
    <div className="sidebar">
      <h2>Manager Panel</h2>

      <NavLink to="/manager/dashboard">Dashboard</NavLink>
      <NavLink to="/manager/requests">Leave Requests</NavLink>
      <NavLink to="/manager/employees">Employees</NavLink>
      <NavLink to="/manager/policies">Policies</NavLink>
      <NavLink to="/manager/notifications">Notifications</NavLink>
      <NavLink to="/manager/profile">Profile</NavLink>
    </div>
  );
}

