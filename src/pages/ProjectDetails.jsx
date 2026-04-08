import React, { useState } from 'react';

const ProjectDetails = ({ project, onUpdateProject, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);

  if (!project) return null;

  const handleSave = () => {
    onUpdateProject(editedProject);
    setIsEditing(false);
  };

  const calculateDaysRemaining = () => {
    if (!project.endDate) return null;
    const today = new Date();
    const endDate = new Date(project.endDate);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = () => {
    const daysRemaining = calculateDaysRemaining();
    if (daysRemaining < 0) return 'overdue';
    if (daysRemaining < 7) return 'urgent';
    return 'ontrack';
  };

  const daysRemaining = calculateDaysRemaining();
  const statusColor = getStatusColor();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="project-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <i className="fas fa-project-diagram"></i> 
            {isEditing ? 'Edit Project' : project.name}
          </h2>
          <button onClick={onClose} className="close-btn">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          {!isEditing ? (
            // View Mode
            <>
              {/* Project Status Banner */}
              {daysRemaining !== null && (
                <div className={`project-status-banner ${statusColor}`}>
                  {daysRemaining < 0 ? (
                    <>
                      <i className="fas fa-exclamation-triangle"></i>
                      Project Overdue by {Math.abs(daysRemaining)} days
                    </>
                  ) : daysRemaining < 7 ? (
                    <>
                      <i className="fas fa-hourglass-half"></i>
                      Urgent! {daysRemaining} days remaining
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check-circle"></i>
                      On Track - {daysRemaining} days remaining
                    </>
                  )}
                </div>
              )}

              {/* Project Details Grid */}
              <div className="project-details-grid">
                <div className="detail-item">
                  <label><i className="fas fa-tag"></i> Project Name</label>
                  <p>{project.name}</p>
                </div>
                
                <div className="detail-item">
                  <label><i className="fas fa-align-left"></i> Description</label>
                  <p>{project.description || 'No description provided'}</p>
                </div>
                
                <div className="detail-item">
                  <label><i className="fas fa-calendar-alt"></i> Start Date</label>
                  <p>{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}</p>
                </div>
                
                <div className="detail-item">
                  <label><i className="fas fa-calendar-check"></i> End Date</label>
                  <p>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}</p>
                </div>
                
                <div className="detail-item">
                  <label><i className="fas fa-chart-line"></i> Progress</label>
                  <div className="detail-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${project.progress || 0}%` }}></div>
                    </div>
                    <span>{project.progress || 0}% Complete</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <label><i className="fas fa-flag-checkered"></i> Priority</label>
                  <p className={`priority-badge ${project.priority || 'medium'}`}>
                    {project.priority || 'Medium'}
                  </p>
                </div>
                
                <div className="detail-item">
                  <label><i className="fas fa-dollar-sign"></i> Budget</label>
                  <p>{project.budget ? `$${project.budget.toLocaleString()}` : 'Not specified'}</p>
                </div>
                
                <div className="detail-item">
                  <label><i className="fas fa-building"></i> Department</label>
                  <p>{project.department || 'Not specified'}</p>
                </div>
              </div>

              {/* Team Members Section */}
              <div className="details-section">
                <h3><i className="fas fa-users"></i> Team Members ({project.members?.length || 0})</h3>
                <div className="team-members-grid">
                  {project.members?.map((member, idx) => (
                    <div key={idx} className="team-member-card">
                      <div className="member-avatar-small">
                        {member.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{member}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Milestones */}
              <div className="details-section">
                <h3><i className="fas fa-flag-checkered"></i> Milestones</h3>
                {project.milestones && project.milestones.length > 0 ? (
                  <div className="milestones-list">
                    {project.milestones.map((milestone, idx) => (
                      <div key={idx} className={`milestone-item ${milestone.completed ? 'completed' : ''}`}>
                        <i className={`fas ${milestone.completed ? 'fa-check-circle' : 'fa-circle'}`}></i>
                        <div>
                          <strong>{milestone.name}</strong>
                          <small>Due: {new Date(milestone.dueDate).toLocaleDateString()}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No milestones set</p>
                )}
              </div>

              {/* Project Resources */}
              <div className="details-section">
                <h3><i className="fas fa-link"></i> Resources</h3>
                {project.resources && project.resources.length > 0 ? (
                  <div className="resources-list">
                    {project.resources.map((resource, idx) => (
                      <a key={idx} href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                        <i className="fas fa-external-link-alt"></i> {resource.name}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No resources added</p>
                )}
              </div>

              <div className="modal-buttons">
                <button onClick={() => setIsEditing(true)} className="btn-primary">
                  <i className="fas fa-edit"></i> Edit Project
                </button>
              </div>
            </>
          ) : (
            // Edit Mode
            <div className="edit-project-form">
              <div className="form-group">
                <label>Project Name *</label>
                <input
                  type="text"
                  value={editedProject.name}
                  onChange={(e) => setEditedProject({...editedProject, name: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editedProject.description}
                  onChange={(e) => setEditedProject({...editedProject, description: e.target.value})}
                  className="form-input"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={editedProject.startDate || ''}
                    onChange={(e) => setEditedProject({...editedProject, startDate: e.target.value})}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={editedProject.endDate || ''}
                    onChange={(e) => setEditedProject({...editedProject, endDate: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={editedProject.priority || 'medium'}
                    onChange={(e) => setEditedProject({...editedProject, priority: e.target.value})}
                    className="form-input"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Budget ($)</label>
                  <input
                    type="number"
                    value={editedProject.budget || ''}
                    onChange={(e) => setEditedProject({...editedProject, budget: parseInt(e.target.value)})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={editedProject.department || ''}
                  onChange={(e) => setEditedProject({...editedProject, department: e.target.value})}
                  className="form-input"
                />
              </div>

              <div className="modal-buttons">
                <button onClick={() => setIsEditing(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;