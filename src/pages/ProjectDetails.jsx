import React from 'react';

const ProjectDetails = ({ project, onClose, onUpdateProject }) => {
  if (!project) return null;

  const addMember = () => {
    const newMember = prompt('Enter member name:');
    if (newMember && !project.members.includes(newMember)) {
      onUpdateProject({
        ...project,
        members: [...project.members, newMember]
      });
    }
  };

  const removeMember = (memberToRemove) => {
    if (confirm(`Remove ${memberToRemove} from project?`)) {
      onUpdateProject({
        ...project,
        members: project.members.filter(m => m !== memberToRemove)
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="project-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{project.name}</h2>
          <button onClick={onClose} className="close-modal">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="details-section">
            <h3><i className="fas fa-info-circle"></i> Description</h3>
            <p>{project.description}</p>
          </div>
          
          <div className="details-section">
            <h3><i className="fas fa-users"></i> Team Members</h3>
            <div className="members-list">
              {project.members.map((member, i) => (
                <div key={i} className="member-item">
                  <span><i className="fas fa-user"></i> {member}</span>
                  <button onClick={() => removeMember(member)} className="remove-member">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
              <button onClick={addMember} className="add-member-btn">
                <i className="fas fa-plus"></i> Add Member
              </button>
            </div>
          </div>
          
          <div className="details-section">
            <h3><i className="fas fa-tasks"></i> Task Summary</h3>
            <div className="task-summary">
              <div className="summary-item">
                <span className="summary-label">Total Tasks:</span>
                <span className="summary-value">{project.tasks.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Completed:</span>
                <span className="summary-value done">
                  {project.tasks.filter(t => t.status === 'done').length}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">In Progress:</span>
                <span className="summary-value progress">
                  {project.tasks.filter(t => t.status === 'in-progress').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;