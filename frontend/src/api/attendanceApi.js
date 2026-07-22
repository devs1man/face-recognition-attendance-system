import api from "./axios";

export const startSession = async () => {
  const response = await api.post("/session/start");
  return response.data;
};

export const endSession = async (sessionId) => {
  const response = await api.post(`/session/end/${sessionId}`);
  return response.data;
};

export const markAttendance = async (sessionId, studentId, confidence) => {
  const response = await api.post("/attendance/mark", {
    session_id: sessionId,
    student_id: studentId,
    confidence: confidence,
  });
  return response.data;
};
