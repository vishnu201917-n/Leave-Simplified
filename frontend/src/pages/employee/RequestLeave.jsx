import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function RequestLeave() {
  const [form, setForm] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
    contact: "",
  });

  const [attachment, setAttachment] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", form.type);
    formData.append("fromDate", form.fromDate);
    formData.append("toDate", form.toDate);
    formData.append("reason", form.reason);
    formData.append("contact", form.contact);

    if (attachment) {
      formData.append("attachment", attachment);
    }

    const res = await axios.post(
      "http://localhost:3000/api/employee/applyLeave",
      formData,
      { withCredentials: true }
    );

    alert(res.data.success ? "Leave Applied Successfully!" : "Failed to apply leave");
  };

  return (
    <div className="app-layout">
      <Sidebar role="employee" />
      <div className="main-area">
        <Header />

        <h1 className="page-title">Request Leave</h1>

        <form className="leave-form" onSubmit={handleSubmit}>
          <label>Leave Type</label>
          <select name="type" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Vacation">Vacation</option>
          </select>

          <div className="date-row">
            <div style={{ flex: 1 }}>
              <label>From Date</label>
              <input
                type="date"
                name="fromDate"
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>To Date</label>
              <input
                type="date"
                name="toDate"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Reason</label>
          <textarea
            name="reason"
            placeholder="Explain your reason..."
            onChange={handleChange}
            required
          ></textarea>

          <label>Emergency Contact</label>
          <input
            type="text"
            name="contact"
            placeholder="Phone number / alternative contact"
            onChange={handleChange}
            required
          />

          <label>Upload Attachment (Optional)</label>
          <input
            type="file"
            className="file-upload"
            onChange={(e) => setAttachment(e.target.files[0])}
          />

          <button type="submit" className="btn-primary">Submit Request</button>
        </form>
      </div>
    </div>
  );
}


