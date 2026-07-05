import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./calendar.css";

export default function CalendarPage() {
  const [user, setUser] = useState({});
  const [leaves, setLeaves] = useState([]);

  // Month & Year
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // ===== INDIAN HOLIDAYS LIST =====
  const indianHolidays = [
    { date: "2025-01-26", name: "Republic Day" },
    { date: "2025-08-15", name: "Independence Day" },
    { date: "2025-10-02", name: "Gandhi Jayanti" },
    { date: "2025-11-14", name: "Diwali" },
    { date: "2025-11-01", name: "Kannada Rajyotsava" },
    { date: "2025-12-25", name: "Christmas" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee/profile", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data.user));

    axios
      .get("http://localhost:3000/api/employee/leave-history", {
        withCredentials: true,
      })
      .then((res) => setLeaves(res.data.leaves));
  }, []);

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Create calendar array
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= totalDays; i++) daysArray.push(i);

  const getLeaveForDay = (date) => {
    const d = new Date(year, month, date).setHours(0, 0, 0, 0);

    return leaves.find((leave) => {
      const from = new Date(leave.fromDate).setHours(0, 0, 0, 0);
      const to = new Date(leave.toDate).setHours(0, 0, 0, 0);
      return d >= from && d <= to;
    });
  };

  const getHolidayName = (day) => {
  const d = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const holiday = indianHolidays.find((h) => h.date === d);
  return holiday ? holiday.name : null;
};

  // Month switching
  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  const today = new Date();

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Header user={user} />
        <h1 className="page-title">Employee Calendar</h1>

        <div className="calendar-container">

          <div className="calendar-header">
            <button className="nav-btn" onClick={prevMonth}>◀</button>
            <span>
              {new Date(year, month).toLocaleString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button className="nav-btn" onClick={nextMonth}>▶</button>
          </div>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div className="calendar-day-name" key={d}>
                {d}
              </div>
            ))}

            {daysArray.map((day, i) => {
              if (!day) return <div key={i} className="calendar-empty"></div>;

              const leave = getLeaveForDay(day);
              const holidayName = getHolidayName(day);

              const isWeekend =
                new Date(year, month, day).getDay() === 0 ||
                new Date(year, month, day).getDay() === 6;

              const dayOfWeek = new Date(year, month, day).getDay();
              const isSunday = dayOfWeek === 0;
              const isSaturday = dayOfWeek === 6;

              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              return (
                <div
                  key={i}
                  className={`calendar-cell
                    ${isToday ? "today" : ""}
                    ${isSunday ? "sunday" : ""}
                    ${isSaturday ? "saturday" : ""}
                    ${holidayName ? "holiday" : ""}
                    ${leave?.status === "Approved" ? "approved" : ""}
                    ${leave?.status === "Pending" ? "pending" : ""}
                    ${leave?.status === "Rejected" ? "rejected" : ""}
                  `}
                >
                  <span>{day}</span>

                  {/* Tooltip for holidays */}
                  {holidayName && (
                    <div className="calendar-tooltip">
                      🎉 <strong>{holidayName}</strong>
                    </div>
                  )}

                  {/* Tooltip for leaves */}
                  {leave && (
                    <div className="calendar-tooltip">
                      <strong>{leave.type}</strong> <br />
                      Status: {leave.status} <br />
                      From: {new Date(leave.fromDate).toLocaleDateString("en-IN")} <br />
                      To: {new Date(leave.toDate).toLocaleDateString("en-IN")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="calendar-legend">
            <div><span className="legend-box approved"></span> Approved Leave</div>
            <div><span className="legend-box pending"></span> Pending Leave</div>
            <div><span className="legend-box rejected"></span> Rejected Leave</div>
            <div><span className="legend-box holiday"></span> Holiday</div>
            <div><span className="legend-box sunday"></span> Sunday</div>
            <div><span className="legend-box saturday"></span> Saturday</div>
            <div><span className="legend-box today"></span> Today</div>
          </div>

        </div>
      </div>
    </div>
  );
}


