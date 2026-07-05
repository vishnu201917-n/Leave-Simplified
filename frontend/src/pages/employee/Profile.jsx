import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    department: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setEditData({
          name: res.data.user.name,
          department: res.data.user.department,
        });
      });
  }, []);

  const saveChanges = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/employee/update-profile",
        editData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.user);
        setShowEdit(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Header user={user} />
        <h1 className="page-title">My Profile</h1>

        <div className="profile-wrapper">

          {/* LEFT SIDE */}
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <h2 className="profile-name">{user.name}</h2>
            <span className="role-chip">{user.role}</span>
          </div>

          {/* RIGHT SIDE */}
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

            <button className="edit-btn" onClick={() => setShowEdit(true)}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* EDIT MODAL */}
        {showEdit && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>Edit Profile</h2>

              <label>Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />

              <label>Department</label>
              <input
                type="text"
                value={editData.department}
                onChange={(e) =>
                  setEditData({ ...editData, department: e.target.value })
                }
              />

              <div className="modal-actions">
                <button className="save-btn" onClick={saveChanges}>Save</button>
                <button className="cancel-btn" onClick={() => setShowEdit(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
