import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import RegisterFace from "./pages/RegisterFace";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import AttendanceHistory from "./pages/AttendanceHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/register-face" element={<RegisterFace />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/attendance-history" element={<AttendanceHistory />} />
    </Routes>
  );
}

export default App;
