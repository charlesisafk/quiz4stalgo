import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProjects } from "../actions/projectActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const projectList = useSelector((state) => state.projectList) || {};
  const { loading, error, projects } = projectList;

  const userLogin = useSelector((state) => state.userLogin) || {};
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listProjects());
    }
  }, [dispatch, userInfo]);

  const getFilteredProjects = () => {
    if (!projects || !userInfo) return [];

    if (userInfo.role === "admin") {
      return projects;
    } else {
      return projects.filter(
        (project) =>
          project.user_assigned && project.user_assigned.includes(userInfo.id),
      );
    }
  };

  const filteredProjects = getFilteredProjects();

  if (!userInfo) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Welcome to Project Management System</h1>
        <p>
          Please <Link to="/login">login</Link> to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard - {userInfo?.role}</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <table border="1" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.project_name}</td>
                <td>{project.status}</td>
                <td>{project.start_date}</td>
                <td>{project.end_date}</td>
                <td>
                  <Link to={`/project/${project.id}`}>
                    <button style={{ padding: "5px 10px", cursor: "pointer" }}>
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomeScreen;
