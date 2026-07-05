import { Routes, Route } from "react-router-dom";

/* Employee Pages */
import Login from "./pages/Login";
import Dashboard from "./pages/employee/Dashboard";
import LeaveHistory from "./pages/employee/LeaveHistory";
import RequestLeave from "./pages/employee/RequestLeave";
import Policies from "./pages/employee/Policies";
import Notifications from "./pages/employee/Notifications";
import Profile from "./pages/employee/Profile";
import Calendar from "./pages/employee/Calendar";

/* Manager Pages */
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManageRequests from "./pages/manager/ManageRequests";
import ManageEmployees from "./pages/manager/ManageEmployees";
import ManagerPolicies from "./pages/manager/ManagerPolicies";
import ManagerNotifications from "./pages/manager/ManagerNotifications";
import ManagerProfile from "./pages/manager/ManagerProfile";
import "./style.css";
import "./pages/manager/manager.css";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";



function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Employee Routes */}
      <Route path="/employee/dashboard" element={<Dashboard />} />
      <Route path="/employee/leave-history" element={<LeaveHistory />} />
      <Route path="/employee/request-leave" element={<RequestLeave />} />
      <Route path="/employee/policies" element={<Policies />} />
      <Route path="/employee/notifications" element={<Notifications />} />
      <Route path="/employee/profile" element={<Profile />} />
      <Route path="/employee/calendar" element={<Calendar />} />

      {/* Manager Routes */}
      <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      <Route path="/manager/requests" element={<ManageRequests />} />
      <Route path="/manager/employees" element={<ManageEmployees />} />
      <Route path="/manager/policies" element={<ManagerPolicies />} />
      <Route path="/manager/notifications" element={<ManagerNotifications />} />
      <Route path="/manager/profile" element={<ManagerProfile />} />

    </Routes>
  );
}

export default App;

