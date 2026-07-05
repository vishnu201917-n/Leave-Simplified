import axios from "axios";
import { useEffect, useState } from "react";
import ManagerSidebar from "./ManagerSidebar";
import Header from "../../components/Header";
import "./manager.css";

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/manager/employees", { withCredentials: true })
      .then((res) => setEmployees(res.data.employees));
  }, []);

  return (
    <div className="app-layout">
      <ManagerSidebar />

      <div className="main-area">
        <Header title="Employees" />

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Dept</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((e) => (
                <tr key={e._id}>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.department}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
