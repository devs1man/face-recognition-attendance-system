import api from "./axios";

export const startSession = async () => {
  const response = await api.post("/attendance/session/start");
  return response.data;
};

export const endSession = async (sessionId) => {
  const reposnse = await api.post(`/attendance/session/${sessionId}/end`);
  return response.data;
};
