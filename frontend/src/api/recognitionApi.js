import api from "./axios";

export const recognizeFace = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await api.post("/recognition/recognize", formData);
  return response.data;
};
