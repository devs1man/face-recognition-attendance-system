import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { startSession, endSession } from "../api/attendanceApi";

function Attendance() {
  const [session, setSession] = useState(null);

  const handleStartSession = async () => {
    try {
      const data = await startSession();
      setSession(data);
    } catch (error) {
      console.error(error);
      alert("Failed to start session");
    }
  };

  const handleEndSession = async () => {
    try {
      await endSession(session.session_id);
      setSession(null);
    } catch (error) {
      console.error(error);
      alert("Failed to end session");
    }
  };
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Attendance Session</h1>
      <div className="bg-white rounded-xl shadow p-8">
        {!session ? (
          <button
            onClick={handleStartSession}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Start Attendance Session
          </button>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Session Started</h2>
              <p>Session ID: {session.session_id}</p>

              <p>Status : {session.status}</p>
            </div>
            <button
              onClick={handleEndSession}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              End Session
            </button>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Attendance;
