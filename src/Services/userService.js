const API_URL = process.env.REACT_APP_API_URL;

export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users/getALLUser`);
  if (!res.ok) {
    throw new Error("lỗi khi gọi API getAllUsers");
  }
  const data = await res.json();
  if (!data) {
    console.error("Không có dữ liệu trả về từ API getAllUsers");
  }
  return data;
};

export async function loginUser(tel, password) {
  try {
    const res = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tel, password }),
    });

    if (!res.ok) {
      throw new Error("Đăng nhập thất bại!");
    }

    return await res.json(); // trả về dữ liệu từ backend
  } catch (err) {
    console.error("Lỗi khi gọi API:", err);
    throw err;
  }
}
