import React, { useState } from 'react';
import ProjectDetails from './ProjectDetails';

const Dashboard = ({ projects, group, onUpdateProjects }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
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
                startDate: new Date().toISOString().split('T')[0],
                endDate: '',
                priority: 'medium',
                budget: 0,
                department: 'General',
                progress: 0,
                members: group?.members.map(m => m.name) || [],
                milestones: [],
                resources: [],
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
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        priority: 'medium',
        budget: 0,
        department: 'General',
        progress: 0,
        members: group?.members.map(m => m.name) || [],
        milestones: [],
        resources: [],
        tasks: []
      };
      onUpdateProjects([...projects, newProject]);
      setSelectedProjectId(newProject.id);
    }
  };

  const openProjectDetails = () => {
    setSelectedProject(currentProject);
    setShowProjectDetails(true);
  };

  const updateProject = (updatedProject) => {
    const updatedProjects = projects.map(p =>
      p.id === updatedProject.id ? updatedProject : p
    );
    onUpdateProjects(updatedProjects);
    setSelectedProject(updatedProject);
  };

  return (
    <>
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
            <button onClick={openProjectDetails} className="btn-primary">
              <i className="fas fa-info-circle"></i> View Details
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3><i className="fas fa-info-circle"></i> {currentProject.name}</h3>
            <button onClick={openProjectDetails} className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
              <i className="fas fa-external-link-alt"></i> Full Details
            </button>
          </div>
          <p>{currentProject.description}</p>
          
          <div style={{ marginTop: '1rem' }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${completionRate}%` }}></div>
            </div>
            <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem' }}>
              {completionRate}% Complete ({stats.done}/{stats.total} tasks)
            </p>
          </div>
          
          {/* Project Date Info */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {currentProject.startDate && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <i className="fas fa-calendar-alt"></i> Start: {new Date(currentProject.startDate).toLocaleDateString()}
              </div>
            )}
            {currentProject.endDate && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <i className="fas fa-calendar-check"></i> Due: {new Date(currentProject.endDate).toLocaleDateString()}
              </div>
            )}
            {currentProject.priority && (
              <div style={{ fontSize: '0.75rem' }}>
                <span className={`priority-badge ${currentProject.priority}`}>
                  {currentProject.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            )}
          </div>
          
          <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            <i className="fas fa-users"></i> Team Members
          </h4>
          <div className="team-members">
            {currentProject.members?.map((member, i) => (
              <span key={i} className="member-tag">
                <i className="fas fa-user-check"></i> {member}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {showProjectDetails && (
        <ProjectDetails
          project={selectedProject}
          onUpdateProject={updateProject}
          onClose={() => setShowProjectDetails(false)}
        />
      )}
    </>
  );
};

export default Dashboard;