import api from "./axios";

export const recognizeFace = async (imageBlob) => {
  const formData = new FormData();
  formData.append("file", imageBlob, "frame.jpg");

  const response = await api.post("/recognition/recognize", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
