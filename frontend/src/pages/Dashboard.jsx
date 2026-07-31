import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardApi";

import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";

function Dashboard() {
  const [stats, setStats] = useState({
    total_students: 0,
    total_sessions: 0,
    today_attendance: 0,
    active_session: false,
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        console.log(data);
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6">
        <Card title="Students" value={stats.total_students} />
        <Card title="Sessions" value={stats.total_sessions} />
        <Card title="Today's Attendance" value={stats.today_attendance} />
        <Card
          title="Active Session"
          value={stats.active_session ? "Running" : "Stopped"}
        />
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Acitivity</h2>
        <ul className="space-y-3">
          <li>✅Student Registered</li>
          <li>✅Attendance Started</li>
          <li>✅Face Registered</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
