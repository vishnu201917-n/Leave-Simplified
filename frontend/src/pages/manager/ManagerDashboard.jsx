import { useEffect, useState } from "react";
import axios from "axios";
import ManagerSidebar from "./ManagerSidebar";
import Header from "../../components/Header";
import "./manager.css";

export default function ManagerDashboard() {
  const [data, setData] = useState({
    pendingCount: 0,
    approvedCount: 0,
    employeeCount: 0,
    pendingRequests: [],
    approvedLeaves: [],
    employeeList: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manager/dashboard", { withCredentials: true })
      .then((res) => {
        // Backend returns only counts – not lists
        const { pending, approved, employees } = res.data;

        setData((prev) => ({
          ...prev,
          pendingCount: pending,
          approvedCount: approved,
          employeeCount: employees,
        }));
      })
      .catch(console.error);

    // Fetch pending + approved + employee list separately
    axios
      .get("http://localhost:3000/api/manager/requests", { withCredentials: true })
      .then((res) => {
        const all = res.data.requests || [];

        setData((prev) => ({
          ...prev,
          pendingRequests: all.filter((x) => x.status === "Pending"),
          approvedLeaves: all.filter((x) => x.status === "Approved"),
        }));
      })
      .catch(console.error);

    axios
      .get("http://localhost:3000/api/manager/employees", { withCredentials: true })
      .then((res) => {
        setData((prev) => ({
          ...prev,
          employeeList: res.data.employees || [],
        }));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="app-layout">
      <ManagerSidebar />

      <div className="main-area">
        <Header user={{ name: "Admin Manager", role: "Manager" }} />

        <h1 className="page-title">Manager Dashboard</h1>

        {/* ====== STATS CARDS ====== */}
        <div className="card-row">
          <div className="stat-card">
            <div className="stat-title">Pending Requests</div>
            <div className="stat-value">{data.pendingCount}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Approved Leaves</div>
            <div className="stat-value">{data.approvedCount}</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">Total Employees</div>
            <div className="stat-value">{data.employeeCount}</div>
          </div>
        </div>

        {/* ===== Pending Requests ===== */}
        <div className="table-box">
          <h2>Pending Leave Requests</h2>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {data.pendingRequests.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: "center" }}>No pending requests</td></tr>
              ) : (
                data.pendingRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.user?.name}</td>
                    <td>{req.type}</td>
                    <td>{new Date(req.fromDate).toLocaleDateString("en-IN")}</td>
                    <td>{new Date(req.toDate).toLocaleDateString("en-IN")}</td>
                    <td>{req.reason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Approved Leaves ===== */}
        <div className="table-box">
          <h2>Approved Leaves</h2>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {data.approvedLeaves.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: "center" }}>No approved leaves</td></tr>
              ) : (
                data.approvedLeaves.map((req) => (
                  <tr key={req._id}>
                    <td>{req.user?.name}</td>
                    <td>{req.type}</td>
                    <td>{new Date(req.fromDate).toLocaleDateString("en-IN")}</td>
                    <td>{new Date(req.toDate).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Employee List ===== */}
        <div className="table-box">
          <h2>All Employees</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.employeeList.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: "center" }}>No employees</td></tr>
              ) : (
                data.employeeList.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}




