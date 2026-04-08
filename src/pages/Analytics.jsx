import React, { useState } from 'react';

const Analytics = ({ projects, group }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const currentProject = projects.find(p => p.id === selectedProjectId);

  if (!projects || projects.length === 0) {
    return (
      <div className="analytics-container">
        <div className="empty-state">
          <i className="fas fa-chart-line" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
          <h3>No Data to Display</h3>
          <p>Create a project to see analytics</p>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="analytics-container">
        <div className="empty-state">
          <p>Please select a project</p>
        </div>
      </div>
    );
  }

  const tasks = currentProject.tasks;
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const highPriority = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const progressCount = tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div className="analytics-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title">📊 Project Analytics</h1>
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
      
      <div className="analytics-grid">
        <div className="analytics-card">
          <div className="analytics-label">Completion Rate</div>
          <div className="analytics-value">{percent}%</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percent}%` }}></div>
          </div>
          <div className="analytics-subtext">{completed} of {total} tasks done</div>
        </div>
        
        <div className="analytics-card">
          <div className="analytics-label">⚠️ Open High-Priority</div>
          <div className="analytics-value warning">{highPriority}</div>
          <div className="analytics-subtext">Tasks needing immediate attention</div>
        </div>
        
        <div className="analytics-card full-width">
          <div className="analytics-label">Task Distribution by Status</div>
          <div className="status-distribution">
            <div className="status-bar todo" style={{ width: `${total === 0 ? 0 : (todoCount/total)*100}%` }}>
              To Do ({todoCount})
            </div>
            <div className="status-bar progress" style={{ width: `${total === 0 ? 0 : (progressCount/total)*100}%` }}>
              In Progress ({progressCount})
            </div>
            <div className="status-bar done" style={{ width: `${total === 0 ? 0 : (completed/total)*100}%` }}>
              Done ({completed})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;