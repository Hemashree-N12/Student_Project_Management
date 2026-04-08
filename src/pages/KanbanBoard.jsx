import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';

const KanbanBoard = ({ projectId, projects, updateProject }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return <div className="kanban-empty">Select a project first</div>;
  }

  const columns = {
    'todo': { title: '📋 To Do', color: 'todo' },
    'in-progress': { title: '⚡ In Progress', color: 'progress' },
    'done': { title: '✅ Done', color: 'done' }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = project.tasks.map(t =>
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    updateProject(project.id, updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = project.tasks.filter(t => t.id !== taskId);
    updateProject(project.id, updatedTasks);
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) return;
    const assignee = prompt('Assignee name?', 'Unassigned') || 'Unassigned';
    const priority = prompt('Priority (low/medium/high)', 'medium') || 'medium';
    const newTask = {
      id: 'task_' + Date.now(),
      title: newTaskTitle,
      status: 'todo',
      assignee: assignee,
      priority: priority
    };
    updateProject(project.id, [...project.tasks, newTask]);
    setNewTaskTitle('');
  };

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <h2 className="page-title">{project.name} · Kanban Board</h2>
        <div className="add-task-form">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title..."
            className="task-input"
          />
          <button onClick={addNewTask} className="add-task-btn">
            <i className="fas fa-plus"></i> Add Task
          </button>
        </div>
      </div>

      <div className="kanban-columns">
        {Object.entries(columns).map(([statusKey, column]) => (
          <div key={statusKey} className={`kanban-column ${column.color}`}>
            <div className="column-header">
              <span>{column.title}</span>
              <span className="task-count">
                {project.tasks.filter(t => t.status === statusKey).length}
              </span>
            </div>
            <div className="column-tasks">
              {project.tasks
                .filter(t => t.status === statusKey)
                .map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={updateTaskStatus}
                    onDelete={deleteTask}
                  />
                ))}
              {project.tasks.filter(t => t.status === statusKey).length === 0 && (
                <div className="empty-column">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;