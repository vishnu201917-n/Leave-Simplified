import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [upcoming, setUpcoming] = useState([]);

  // Format date to DD/MM/YYYY
  function formatDateIndian(date) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  }

  // check if leave is upcoming
  function isUpcomingLeave(leave) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const to = new Date(leave.toDate);
    to.setHours(0, 0, 0, 0);

    return to >= today;
  }

  useEffect(() => {
    // Fetch dashboard summary (pending/approved + user details)
    axios
      .get("http://localhost:3000/api/employee/dashboard", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user || {});
          setPending(res.data.pending || 0);
          setApproved(res.data.approved || 0);
        }
      });

    // Fetch ALL leaves → filter upcoming
    axios
      .get("http://localhost:3000/api/employee/leave-history", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          const allLeaves = res.data.leaves || [];

          const upcomingFiltered = allLeaves
            .filter(isUpcomingLeave)
            .sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));

          setUpcoming(upcomingFiltered);
        }
      });
  }, []);

  // ⭐ CALCULATE Remaining Leaves
  const remaining =
    (user.leaveBalance?.sick || 0) +
    (user.leaveBalance?.casual || 0) +
    (user.leaveBalance?.earned || 0);

  return (
    <div className="app-layout">
      <Sidebar role="employee" />

      <div className="main-area">
        <Header user={user} />

        <h1 className="page-title">Employee Dashboard</h1>

        {/* ===== Stats Cards ===== */}
        <div className="card-row">
          <div className="stat-card">
            <div className="stat-title">Pending Requests</div>
            <div className="stat-value">{pending}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Approved Leaves</div>
            <div className="stat-value">{approved}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Remaining Leaves</div>
            <div className="stat-value">{remaining}</div>
          </div>
        </div>

        {/* ===== Upcoming Leaves ===== */}
        <div className="table-box">
          <h2>Upcoming Leaves</h2>

          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {upcoming.length > 0 ? (
                upcoming.map((l, index) => (
                  <tr key={index}>
                    <td>{l.type}</td>
                    <td>{formatDateIndian(l.fromDate)}</td>
                    <td>{formatDateIndian(l.toDate)}</td>
                    <td>{l.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No upcoming leaves
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}






