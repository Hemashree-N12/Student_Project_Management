import React from 'react';

const Analytics = ({ projects, selectedProjectId }) => {
  const project = projects.find(p => p.id === selectedProjectId);
  
  if (!project) {
    return <div className="analytics-empty">Select a project to view analytics</div>;
  }
  
  const tasks = project.tasks;
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const highPriority = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  const todoCount = tasks.filter(t => t.status === 'todo').length;
  const progressCount = tasks.filter(t => t.status === 'in-progress').length;

  return (
    <div className="analytics-container">
      <h1 className="page-title">📊 Project Analytics</h1>
      
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
            <div className="status-bar todo" style={{ width: `${(todoCount/total)*100 || 0}%` }}>
              To Do ({todoCount})
            </div>
            <div className="status-bar progress" style={{ width: `${(progressCount/total)*100 || 0}%` }}>
              In Progress ({progressCount})
            </div>
            <div className="status-bar done" style={{ width: `${(completed/total)*100 || 0}%` }}>
              Done ({completed})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;