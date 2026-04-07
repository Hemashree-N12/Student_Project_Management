import React from "react";

const Dashboard = ({ user }) => {
  const stats = {
    projects: 3,
    tasksCompleted: 12,
    tasksPending: 5,
  };

  return (
    <div style={container}>
      <h1>Dashboard</h1>
      <h3>Welcome, {user} 👋</h3>

      <div style={cardContainer}>
        <div style={card}>
          <h4>Projects</h4>
          <p>{stats.projects}</p>
        </div>

        <div style={card}>
          <h4>Tasks Completed</h4>
          <p>{stats.tasksCompleted}</p>
        </div>

        <div style={card}>
          <h4>Pending Tasks</h4>
          <p>{stats.tasksPending}</p>
        </div>
      </div>
    </div>
  );
};

const container = {
  padding: "20px",
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "10px",
  width: "150px",
  textAlign: "center",
};

export default Dashboard;