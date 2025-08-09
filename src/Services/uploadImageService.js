const API_URL = process.env.REACT_APP_API_URL;

export const UploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const res = await fetch(`${API_URL}/users/uploadImage`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Lỗi khi tải lên hình ảnh");
    }

    const data = await res.json();
    return data.url; // Trả về URL của hình ảnh đã tải lên
  } catch (error) {
    console.error("Lỗi khi gọi API UploadImage:", error);
    throw error;
  }
};
