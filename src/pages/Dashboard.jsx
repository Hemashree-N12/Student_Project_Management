import React from 'react';

const Dashboard = ({ projects, selectedProjectId, setSelectedProjectId }) => {
  const currentProject = projects.find(p => p.id === selectedProjectId);
  
  const stats = currentProject ? {
    total: currentProject.tasks.length,
    todo: currentProject.tasks.filter(t => t.status === 'todo').length,
    progress: currentProject.tasks.filter(t => t.status === 'in-progress').length,
    done: currentProject.tasks.filter(t => t.status === 'done').length,
  } : { total: 0, todo: 0, progress: 0, done: 0 };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <select 
          value={selectedProjectId} 
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="project-selector"
        >
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {currentProject ? (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-card">
              <div className="stat-value todo">{stats.todo}</div>
              <div className="stat-label">To Do</div>
            </div>
            <div className="stat-card">
              <div className="stat-value progress">{stats.progress}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-card">
              <div className="stat-value done">{stats.done}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>

          <div className="project-info-card">
            <h3><i className="fas fa-users"></i> Team Members</h3>
            <div className="team-members">
              {currentProject.members.map((member, i) => (
                <span key={i} className="member-tag">
                  <i className="fas fa-user-check"></i> {member}
                </span>
              ))}
            </div>
            <p className="project-description">
              <i className="fas fa-info-circle"></i> {currentProject.description}
            </p>
          </div>
        </>
      ) : (
        <div className="empty-state">Select a project to view insights</div>
      )}
    </div>
  );
};

export default Dashboard;