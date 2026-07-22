import { useState, useRef } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { startSession, endSession, markAttendance } from "../api/attendanceApi";
import Camera from "../components/attendance/Camera";
import { recognizeFace } from "../api/recognitionApi";

function Attendance() {
  const [session, setSession] = useState(null);
  const markedStudents = useRef(new Set());

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

  const handleFrameCapture = async (blob) => {
    try {
      const result = await recognizeFace(blob);
      if (result.recognized_students.length === 0) {
        return;
      }

      for (const student of result.recognized_students) {
        console.log("Recognized: ", student);

        if (markedStudents.current.has(student.student_id)) {
          continue;
        }
        console.log("Marking attendance for:", student.student_id);
        await markAttendance(
          session.session_id,
          student.student_id,
          student.similarity,
        );
        markedStudents.current.add(student.student_id);
      }
    } catch (err) {
      console.error(err);
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
            <Camera onFrameCapture={handleFrameCapture} />
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
