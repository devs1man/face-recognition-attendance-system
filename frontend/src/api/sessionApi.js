import api from "./axios";

export const startSession = async () => {
  const response = await api.post("/session/start");
  return response.data;
};

export const endSession = async (sessionId) => {
  const response = await api.post(`/session/end/${sessionId}`);
  return response.data;
};
