import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { startSession } from "mongoose";
import { endSession } from "../api/attendanceApi";

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
}

export default Attendance;
