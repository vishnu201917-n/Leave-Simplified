import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./policies.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function LeavePolicies() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee/profile", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user));
  }, []);

  const policies = [
    {
      title: "Casual Leave",
      days: "12 Days / Year",
      icon: "📝",
      description:
        "Casual Leave can be used for short, urgent personal matters that cannot be planned in advance.",
      points: [
        "Can be used for personal reasons or emergencies",
        "Cannot exceed 2–3 days at a time",
        "Requires prior approval if possible",
      ],
      color: "#007bff",
    },
    {
      title: "Sick Leave",
      days: "10 Days / Year",
      icon: "🤒",
      description:
        "Sick Leave is provided when you are medically unfit to report to work.",
      points: [
        "Medical certificate required for 2+ days",
        "Hospitalisation proof may be required",
        "Inform manager at earliest",
      ],
      color: "#28a745",
    },
    {
      title: "Earned Leave",
      days: "15 Days / Year",
      icon: "🌴",
      description:
        "Earned Leave is planned leave for vacations, travel, or long personal engagements.",
      points: [
        "Can be carried forward (up to 30 days)",
        "Apply at least 7 days in advance",
        "Encashment available depending on HR rules",
      ],
      color: "#ffc107",
    },
    {
      title: "Maternity Leave",
      days: "26 Weeks",
      icon: "👶",
      description:
        "Maternity Leave is granted to all eligible female employees as per government law.",
      points: [
        "26 weeks of paid leave",
        "Mandatory medical documents required",
        "Can combine with additional unpaid leave",
      ],
      color: "#e83e8c",
    },
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Header user={user} />
        <h1 className="page-title">Leave Policies</h1>

        <div className="policy-grid">
          {policies.map((p, index) => (
            <div
              className="policy-card"
              key={index}
              style={{ borderTopColor: p.color }}
            >
              <div className="policy-icon">{p.icon}</div>
              <div className="policy-content">
                <h2>{p.title}</h2>
                <div className="policy-days" style={{ color: p.color }}>
                  {p.days}
                </div>

                <p className="policy-desc">{p.description}</p>

                <ul className="policy-points">
                  {p.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
