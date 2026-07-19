import api from "./axios";

export const registerFace = async (studentId) => {
  const response = await api.post(`/face/register/${studentId}`);
  return response.data;
};
