import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAttendanceHistory } from "../api/historyApi";

function AttendanceHistory() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  const filteredHistory = history.filter((record) =>
    record.student_name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getAttendanceHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Attendance History</h1>
      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Student</th>

              <th className="text-left p-3">Session</th>

              <th className="text-left p-3">Confidence</th>

              <th className="text-left p-3">Status</th>

              <th className="text-left p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No attendance records found
                </td>
              </tr>
            ) : (
              filteredHistory.map((record) => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{record.student_name}</td>
                  <td className="p-3">{record.session_id}</td>
                  <td className="p-3">{record.confidence.toFixed(2)}</td>
                  <td className="p-3">{record.status}</td>
                  <td className="p-3">
                    {new Date(record.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
export default AttendanceHistory;
