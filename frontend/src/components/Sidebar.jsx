import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaCamera,
  FaClipboardCheck,
  FaChartBar,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        Face Attendance
      </div>

      <nav className="flex flex-col p-4 gap-2">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/students"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
        >
          <FaUserGraduate />
          Students
        </Link>

        <Link
          to="/register-face"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
        >
          <FaCamera />
          Register Face
        </Link>

        <Link
          to="/attendance"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
        >
          <FaClipboardCheck />
          Attendance
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700"
        >
          <FaChartBar />
          Reports
        </Link>
      </nav>
    </aside>
  );
}
export default Sidebar;
