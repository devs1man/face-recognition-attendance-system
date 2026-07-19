import DashboardLayout from "../layouts/DashboardLayout";

function Attendance() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Attendance</h1>
      <div className="bg-white rounded-xl shadow p-8">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
          Start Attendance Session
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Attendance;
