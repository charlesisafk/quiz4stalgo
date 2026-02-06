import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../actions/projectActions";

const ProjectCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [userAssigned, setUserAssigned] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const projectCreate = useSelector((state) => state.projectCreate) || {};
  const { loading, error, success } = projectCreate;

  const userLogin = useSelector((state) => state.userLogin) || {};
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userAssignedArray = userAssigned
      .split(",")
      .map((id) => parseInt(id.trim()));
    dispatch(
      createProject(
        projectName,
        projectDescription,
        userAssignedArray,
        startDate,
        endDate,
      ),
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create Project</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>Admin Only</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && (
        <p style={{ color: "green" }}>Project created successfully!</p>
      )}

      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: "15px" }}>
          <label>Project Name:</label>
          <br />
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Project Description:</label>
          <br />
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
            rows="4"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>User Assigned (comma separated IDs):</label>
          <br />
          <input
            type="text"
            value={userAssigned}
            onChange={(e) => setUserAssigned(e.target.value)}
            placeholder="e.g., 1, 2, 3"
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Start Date:</label>
          <br />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>End Date:</label>
          <br />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectCreateScreen;
