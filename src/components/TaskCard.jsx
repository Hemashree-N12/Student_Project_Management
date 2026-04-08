import React from 'react';

const TaskCard = ({ task, onStatusChange, onDelete }) => {
  const statusColors = {
    'todo': 'status-todo',
    'in-progress': 'status-progress',
    'done': 'status-done'
  };
  
  const priorityIcon = {
    'high': 'fa-arrow-up',
    'medium': 'fa-minus',
    'low': 'fa-arrow-down'
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>
        <button onClick={() => onDelete(task.id)} className="task-delete">
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
      <div className="task-badges">
        <span className={`task-status ${statusColors[task.status]}`}>
          {task.status === 'in-progress' ? 'In Progress' : task.status}
        </span>
        <span className="task-priority">
          <i className={`fas ${priorityIcon[task.priority]}`}></i>
          {task.priority}
        </span>
        <span className="task-assignee">
          <i className="fas fa-user-circle"></i>
          {task.assignee}
        </span>
      </div>
      <div className="task-actions">
        <select 
          value={task.status} 
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="task-status-select"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;