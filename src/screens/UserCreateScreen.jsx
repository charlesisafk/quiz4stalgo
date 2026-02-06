import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../actions/userActions";

const UserCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const userCreate = useSelector((state) => state.userCreate) || {};
  const { loading, error, success } = userCreate;

  const userLogin = useSelector((state) => state.userLogin) || {};
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(firstName, lastName, username, email, role, password));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create User</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>Admin Only</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && <p style={{ color: "green" }}>User created successfully!</p>}

      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: "15px" }}>
          <label>First Name:</label>
          <br />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Last Name:</label>
          <br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Username:</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Role:</label>
          <br />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserCreateScreen;
