import { useState, useRef } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { startSession, endSession, markAttendance } from "../api/attendanceApi";
import Camera from "../components/attendance/Camera";
import { recognizeFace } from "../api/recognitionApi";

function Attendance() {
  const [session, setSession] = useState(null);
  const markedStudents = useRef(new Set());
  const [presentStudents, setPresentStudents] = useState([]);

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
      markedStudents.current.clear();
      setPresentStudents([]);
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
        setPresentStudents((prev) => [...prev, student]);
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
            <div className="grid grid-cols-2 gap-8">
              <Camera onFrameCapture={handleFrameCapture}></Camera>
              <div className="bg-gray-100 rounded-xl p-5">
                <h2 className="text-xl font-bold mb-4">Present Students</h2>
                {presentStudents.length === 0 ? (
                  <p className="text-gray-500">No students recognized yet.</p>
                ) : (
                  <div className="space-y-3">
                    {presentStudents.map((student) => (
                      <div
                        key={student.student_id}
                        className="bg-white rounded-lg shadow p-3 flex justify-between"
                      >
                        <div>
                          <p className="font-semibold">
                            {student.student_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            ID: {student.student_id}
                          </p>
                        </div>
                        <div className="text-green-600 font-bold">
                          ✓ Present
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
