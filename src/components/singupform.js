// src/components/LoginForm.jsx
import { useState } from "react";
import { loginUser } from "../Services/userService";

export default function SignupForm() {
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // tránh reload trang

    try {
      const data = await loginUser(tel, password);
      setMessage(`Đăng nhập thành công! Xin chào ${data.name}`);
    } catch (err) {
      setMessage("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Số điện thoại:</label>
        <input
          type="text"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
      </div>

      <div>
        <label>Mật khẩu:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Đăng nhập</button>

      {message && <p>{message}</p>}
    </form>
  );
}
