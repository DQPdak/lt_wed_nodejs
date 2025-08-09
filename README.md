# 1. tạo fe

- npx create-react-app "tên project"

# 2. kết nối với BE

## 1. tạo file .env cho fe

- chứa biến: REACT_APP_API_URL=http://localhost:3000/api

- lưu ý có thể thây giá trị cho phù hợp với môi trường chạy của BE

## 2. tạo thư mục services

- thư mục chứa các file gọi API

### 1. tạo file services cho user

- file chứa các hàm gọi API

- code mẫu cho dạng get:
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

- code mẫu cho dạng post:
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

- trong đó:
  - throw: báo lỗi ra console và dừng chương trình
  - console.log: báo lỗi ra console
  - fetch: là một hàm có sẵn trong js dùng để gửi req đến server (API) và nhận dữ liệu phản hồi
  - method: là phương thức tác động vào API mặc định là get
  - chỉ có post và put thì mới có giá trị header và body trong fetch

## 3. tạo thư mục component để dùng API

- chứa các file tạo các thành phần có thể tái sử dụng

### 1. tạo file userlist

- code:
  import React, { useEffect, useState } from "react";
  import { getAllUsers } from "../Services/userService";

function UserList() {
const [users, setUsers] = useState([]);

useEffect(() => {
getAllUsers()
.then((data) => setUsers(data))
.catch((error) => console.error("Error fetching users:", error));
}, []);

return (

<div>
<h2>Danh sách người dùng</h2>
<ul>
{users.map((user) => (
<li key={user._id}>
{user.name} - {user.tel}
</li>
))}
</ul>
</div>
);
}

export default UserList;

- trong đó:
  - useEffect: hoạt động gần giống vòng lập, sẽ chạy khi các component được hiển thị
  - then: là phương thức dùng để trả về giá trị cho 1 promise(giá trị khi gọi API) trong js
  - map: phương thức duyệt qua từng phần tử trong mảng

### 2. tạo file SignupForm

- code:
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

# 3. routes

## 1. tải thư viện react-router-dom

- câu lệnh: npm install react-router-dom

## 2. tạo thư mục routes

- nơi lưu các file chứa các đường dẫn

- code cơ bản cho file routes:
  import Home from "../pages/Home";
  import About from "../pages/About";
  import Users from "../pages/Users";

const routes = [
{ path: "/", element: <Home /> },
{ path: "/about", element: <About /> },
{ path: "/users", element: <Users /> },
];

export default routes;

## 3. tạo thư mục pages

- nơi chứa các cấu hình của trang

- code cơ bản:
  export default function Users() {
  return <h1>Danh sách người dùng</h1>;
  }

## 4. các dùng

### 1. trong thanh navbar

- code cơ bản:
  import { Link } from "react-router-dom";

  export default function Navbar() {
  return (
  <nav>
  <Link to="/">Trang chủ</Link> <Link to="/about">Giới thiệu</Link>
  </nav>
  );
  }

### 2. trong file app.js

- phải có:

  - import Navbar from "./components/navbar";
    import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
    import routes from "./routes/routes.js";

  - <Router>
        <Navbar />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>

# 4. nhúng font

- nhúng vào file index.css
- cách nhúng:
  - @import url(link font)
  - body{
    font-family: tên font
    }

# 5. nhúng bootstrap

## 1. cài bootstrap

- câu lệnh: npm install bootstrap

## 2. khai báo thư viện trong index.js

- import 'bootstrap/dist/css/bootstrap.min.css';

# 6. sử lý ảnh

## 1. tạo file service cho upload ảnh

- code có dạng:
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

- trong đó: append có tác dụng gôm biến được truyền vào trường khóa nếu muốn truyền nhiều file thì gọi append nhiều lần

## 2. tạo file component để dùng

- code:
  import { useState } from "react";
  import { UploadImage } from "../Services/uploadImageService";

export default function ImageUploader() {
const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const [loading, setLoading] = useState(false);

const handleFileChange = (e) => {
const file = e.target.files[0];
setImage(file);
setPreview(URL.createObjectURL(file)); // tạo link hiện file từ file
};

const handleUpload = async () => {
if (!image) {
alert("Vui lòng chọn ảnh!");
return;
}

    setLoading(true);
    try {
      const data = await UploadImage(image); // gọi API lúc này hàm sẽ trả về url
      if (data) {
        alert("Upload thành công!");
        setPreview(data); // Link Cloudinary
      } else {
        alert("Upload thất bại!");
      }
    } catch (err) {
      alert("Lỗi khi upload ảnh!");
    } finally {
      setLoading(false);
    }

};

return (

<div style={{ padding: "20px" }}>
<input type="file" accept="image/*" onChange={handleFileChange} />
{preview && (
<div style={{ marginTop: "10px" }}>
<img src={preview} alt="Preview" width="300" />
</div>
)}
<br />
<button onClick={handleUpload} disabled={loading}>
{loading ? "Đang upload..." : "Upload"}
</button>
</div>
);
}
