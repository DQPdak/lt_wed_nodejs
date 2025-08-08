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
