import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProjectDetails } from "../actions/projectActions";
import { listTasks } from "../actions/taskActions";

function DetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projectDetails = useSelector((state) => state.projectDetails) || {};
  const {
    loading: projectLoading,
    error: projectError,
    project,
  } = projectDetails;

  const taskList = useSelector((state) => state.taskList) || {};
  const { loading: taskLoading, error: taskError, tasks } = taskList;

  const userLogin = useSelector((state) => state.userLogin) || {};
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      dispatch(getProjectDetails(id));
      dispatch(listTasks(id));
    }
  }, [dispatch, id, userInfo, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
        ← Go Back
      </Link>

      <h1 style={{ marginTop: "20px" }}>Project Details</h1>

      {projectLoading ? (
        <p>Loading project...</p>
      ) : projectError ? (
        <p style={{ color: "red" }}>Error: {projectError}</p>
      ) : project ? (
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "30px",
          }}
        >
          <h2>{project.project_name}</h2>
          <p>
            <strong>Description:</strong> {project.project_description}
          </p>
          <p>
            <strong>Status:</strong> {project.status}
          </p>
          <p>
            <strong>Hours Consumed:</strong> {project.hours_consumed || 0} hours
          </p>
          <p>
            <strong>Start Date:</strong> {project.start_date}
          </p>
          <p>
            <strong>End Date:</strong> {project.end_date}
          </p>
          <p>
            <strong>Assigned Users:</strong>{" "}
            {project.user_assigned?.join(", ") || "None"}
          </p>
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Project Tasks</h2>
        {(userInfo?.role === "admin" || userInfo?.role === "manager") && (
          <Link to={`/project/${id}/createtask`}>
            <button
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Create Task
            </button>
          </Link>
        )}
      </div>

      {taskLoading ? (
        <p>Loading tasks...</p>
      ) : taskError ? (
        <p style={{ color: "red" }}>Error: {taskError}</p>
      ) : (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Task Name</th>
              <th style={{ padding: "10px" }}>Description</th>
              <th style={{ padding: "10px" }}>Status</th>
              <th style={{ padding: "10px" }}>Start Date</th>
              <th style={{ padding: "10px" }}>End Date</th>
              <th style={{ padding: "10px" }}>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td style={{ padding: "10px" }}>{task.task_name}</td>
                  <td style={{ padding: "10px" }}>{task.task_description}</td>
                  <td style={{ padding: "10px" }}>{task.status}</td>
                  <td style={{ padding: "10px" }}>{task.start_date}</td>
                  <td style={{ padding: "10px" }}>{task.end_date}</td>
                  <td style={{ padding: "10px" }}>
                    {task.user_assigned?.join(", ") || "None"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ padding: "10px", textAlign: "center" }}
                >
                  No tasks found for this project
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DetailScreen;
