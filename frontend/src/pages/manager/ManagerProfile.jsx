import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./ManagerSidebar"; 
import Header from "../../components/Header";
import "./manager.css";

export default function ManagerProfile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", department: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manager/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setForm({
          name: res.data.user.name,
          department: res.data.user.department,
        });
      });
  }, []);

  const handleUpdate = async () => {
    const res = await axios.put(
      "http://localhost:3000/api/manager/update-profile",
      form,
      { withCredentials: true }
    );

    if (res.data.success) {
      setUser(res.data.user);
      setEditMode(false);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar role="manager" />

      <div className="main-area">
        <Header user={user} />

        <h1 className="page-title">My Profile</h1>

        <div className="profile-wrapper">

          {/* LEFT : Avatar */}
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name ? user.name.charAt(0).toUpperCase() : "M"}
            </div>

            <h2 className="profile-name">{user.name}</h2>

            <span className="role-chip">{user.role}</span>

            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </div>

          {/* RIGHT : Details */}
          <div className="profile-details">

            <div className="detail-row">
              <label>Name</label>
              <p>{user.name}</p>
            </div>

            <div className="detail-row">
              <label>Email</label>
              <p>{user.email}</p>
            </div>

            <div className="detail-row">
              <label>Department</label>
              <p>{user.department}</p>
            </div>

            <div className="detail-row">
              <label>Role</label>
              <p>{user.role}</p>
            </div>
          </div>
        </div>

        {/* EDIT MODAL */}
        {editMode && (
          <div className="edit-modal">
            <div className="edit-card">

              <h2>Edit Profile</h2>

              <label>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label>Department</label>
              <input
                type="text"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />

              <div className="modal-actions">
                <button onClick={() => setEditMode(false)}>Cancel</button>
                <button className="save-btn" onClick={handleUpdate}>Save</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
