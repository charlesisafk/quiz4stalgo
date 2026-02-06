import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listUsers } from "../actions/userActions";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList) || {};
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin) || {};
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/");
    } else {
      dispatch(listUsers());
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>Admin Only</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <table
        border="1"
        style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>ID</th>
            <th style={{ padding: "10px" }}>Username</th>
            <th style={{ padding: "10px" }}>Email</th>
            <th style={{ padding: "10px" }}>Role</th>
            <th style={{ padding: "10px" }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "10px" }}>{user.id}</td>
                <td style={{ padding: "10px" }}>{user.username}</td>
                <td style={{ padding: "10px" }}>{user.email}</td>
                <td style={{ padding: "10px" }}>{user.role}</td>
                <td style={{ padding: "10px" }}>
                  {user.first_name} {user.last_name}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "10px", textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserListScreen;
