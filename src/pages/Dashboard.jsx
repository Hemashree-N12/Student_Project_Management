import React, { useState } from 'react';

const Dashboard = ({ projects, group, onUpdateProjects }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  
  const currentProject = projects.find(p => p.id === selectedProjectId);
  
  if (!projects || projects.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <i className="fas fa-folder-open" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
          <h3>No Projects Yet</h3>
          <p>This group doesn't have any projects. Create one to get started!</p>
          <button 
            onClick={() => {
              const newProject = {
                id: Date.now().toString(),
                name: 'New Project',
                description: 'Your new project',
                members: group?.members.map(m => m.name) || [],
                tasks: []
              };
              onUpdateProjects([...projects, newProject]);
              setSelectedProjectId(newProject.id);
            }}
            className="btn-primary"
            style={{ marginTop: '1rem' }}
          >
            <i className="fas fa-plus"></i> Create First Project
          </button>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="dashboard-container">
        <div className="empty-state">
          <p>Please select a project</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: currentProject.tasks.length,
    todo: currentProject.tasks.filter(t => t.status === 'todo').length,
    progress: currentProject.tasks.filter(t => t.status === 'in-progress').length,
    done: currentProject.tasks.filter(t => t.status === 'done').length,
  };

  const completionRate = stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100);

  const addNewProject = () => {
    const projectName = prompt('Enter project name:', 'New Project');
    if (projectName) {
      const newProject = {
        id: Date.now().toString(),
        name: projectName,
        description: 'Project description',
        members: group?.members.map(m => m.name) || [],
        tasks: []
      };
      onUpdateProjects([...projects, newProject]);
      setSelectedProjectId(newProject.id);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select 
            value={selectedProjectId} 
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="project-selector"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button onClick={addNewProject} className="btn-secondary">
            <i className="fas fa-plus"></i> New Project
          </button>
        </div>
      </div>

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
        <h3><i className="fas fa-info-circle"></i> {currentProject.name}</h3>
        <p>{currentProject.description}</p>
        
        <div style={{ marginTop: '1rem' }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem' }}>
            {completionRate}% Complete ({stats.done}/{stats.total} tasks)
          </p>
        </div>
        
        <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          <i className="fas fa-users"></i> Team Members
        </h4>
        <div className="team-members">
          {currentProject.members.map((member, i) => (
            <span key={i} className="member-tag">
              <i className="fas fa-user-check"></i> {member}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;