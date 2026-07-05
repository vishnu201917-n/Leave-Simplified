import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>LeaveSimplified</h2>

      <Link to="/employee/dashboard">Dashboard</Link>
      <Link to="/employee/leave-history">Leave History</Link>
      <Link to="/employee/request-leave">Request Leave</Link>
      <Link to="/employee/calendar">Calendar</Link>
      <Link to="/employee/notifications">Notifications</Link>
      <Link to="/employee/policies">Leave Policies</Link>
      <Link to="/employee/profile">Profile</Link>
    </div>
  );
}

