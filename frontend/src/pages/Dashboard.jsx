import DashboardLayout from "../layouts/DashboardLayout";
import Card from "../components/Card";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <Card title="Students" value="0" />
        <Card title="Sessions" value="0" />
        <Card title="Attendance" value="0" />
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
