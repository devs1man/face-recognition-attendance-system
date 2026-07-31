import api from "./axios";

export const getAttendanceHistory = async () => {
  const response = await api.get("/attendance/history");
  return response.data;
};
