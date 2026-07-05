import { useEffect, useState } from "react";
import axios from "axios";
import ManagerSidebar from "./ManagerSidebar";
import Header from "../../components/Header";
import "./manager.css";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    axios
      .get("http://localhost:3000/api/manager/requests", { withCredentials: true })
      .then((res) => setRequests(res.data.requests))
      .catch(console.error);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = (id, status) => {
    axios
      .post(
        "http://localhost:3000/api/manager/update-request",
        { id, status },
        { withCredentials: true }
      )
      .then(() => fetchRequests())
      .catch(console.error);
  };

  return (
    <div className="app-layout">
      <ManagerSidebar />

      <div className="main-area">
        <Header user={{ name: "Admin Manager", role: "Manager" }} />

        <h1 className="page-title">Leave Requests</h1>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                    No leave requests found
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.user?.name}</td>
                    <td>{req.type}</td>
                    <td>{new Date(req.fromDate).toDateString()}</td>
                    <td>{new Date(req.toDate).toDateString()}</td>
                    <td>{req.reason}</td>

                    {/* STATUS BADGE */}
                    <td>
                      <span
                        className={
                          req.status === "Pending"
                            ? "badge pending"
                            : req.status === "Approved"
                            ? "badge approved"
                            : "badge rejected"
                        }
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* ACTION BUTTONS — ONLY FOR PENDING */}
                    <td>
                      {req.status === "Pending" ? (
                        <>
                          <button
                            className="btn-approve"
                            onClick={() => updateStatus(req._id, "Approved")}
                          >
                            Approve
                          </button>

                          <button
                            className="btn-reject"
                            onClick={() => updateStatus(req._id, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span style={{ color: "#777" }}>—</span>
                      )}
                    </td>
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

