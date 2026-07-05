import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function LeaveHistory() {
  const [user, setUser] = useState({});
  const [leaves, setLeaves] = useState([]);

  // 👉 Indian Date Format
  function formatDateIndian(date) {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee/leave-history", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          setLeaves(res.data.leaves);
        }
      });
  }, []);

  return (
    <div className="app-layout">
      <Sidebar role="employee" />

      <div className="main-area">
        <Header user={user} />

        <h1 className="page-title">Leave History</h1>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {leaves.length > 0 ? (
                leaves.map((l, i) => (
                  <tr key={i}>
                    <td>{l.type}</td>
                    <td>{formatDateIndian(l.fromDate)}</td>
                    <td>{formatDateIndian(l.toDate)}</td>
                    <td>{l.reason}</td>
                    <td>{l.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Leave Records Found
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


