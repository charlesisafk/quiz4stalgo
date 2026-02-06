import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin) || {};
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto" }}>
      <h1>Login</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <form onSubmit={submitHandler}>
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
          style={{ padding: "10px 20px", cursor: "pointer", width: "100%" }}
        >
          Login
        </button>
      </form>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
        }}
      >
        <h3>Test Credentials:</h3>
        <p>
          <strong>Admin:</strong> admin / admin123
        </p>
        <p>
          <strong>Manager:</strong> manager / manager123
        </p>
        <p>
          <strong>User:</strong> user / user123
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
