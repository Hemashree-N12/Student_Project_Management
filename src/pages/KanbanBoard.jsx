import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';
import ProjectDetails from './ProjectDetails';

const KanbanBoard = ({ projects, group, onUpdateProjects }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const currentProject = projects.find(p => p.id === selectedProjectId);

  if (!projects || projects.length === 0) {
    return (
      <div className="kanban-container">
        <div className="empty-state">
          <i className="fas fa-tasks" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
          <h3>No Projects Yet</h3>
          <p>Create a project to start managing tasks</p>
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
      <div className="kanban-container">
        <div className="empty-state">
          <p>Please select a project</p>
        </div>
      </div>
    );
  }

  const columns = {
    'todo': { title: '📋 To Do', color: 'todo' },
    'in-progress': { title: '⚡ In Progress', color: 'progress' },
    'done': { title: '✅ Done', color: 'done' }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = currentProject.tasks.map(t =>
      t.id === taskId ? { ...t, status: newStatus } : t
    );
    const updatedProject = { ...currentProject, tasks: updatedTasks };
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );
    onUpdateProjects(updatedProjects);
  };

  const deleteTask = (taskId) => {
    if (confirm('Delete this task?')) {
      const updatedTasks = currentProject.tasks.filter(t => t.id !== taskId);
      const updatedProject = { ...currentProject, tasks: updatedTasks };
      const updatedProjects = projects.map(p => 
        p.id === currentProject.id ? updatedProject : p
      );
      onUpdateProjects(updatedProjects);
    }
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) {
      alert('Please enter a task title');
      return;
    }
    const assignee = prompt('Assignee name?', group?.members[0]?.name || 'Unassigned') || 'Unassigned';
    const priority = prompt('Priority (low/medium/high)', 'medium') || 'medium';
    const newTask = {
      id: 'task_' + Date.now(),
      title: newTaskTitle,
      status: 'todo',
      assignee: assignee,
      priority: priority
    };
    const updatedProject = { 
      ...currentProject, 
      tasks: [...currentProject.tasks, newTask] 
    };
    const updatedProjects = projects.map(p => 
      p.id === currentProject.id ? updatedProject : p
    );
    onUpdateProjects(updatedProjects);
    setNewTaskTitle('');
  };

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
      <div className="kanban-container">
        <div className="kanban-header">
          <div>
            <h2 className="page-title">Kanban Board</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' }}>
              <select 
                value={selectedProjectId} 
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="project-selector"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button onClick={openProjectDetails} className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                <i className="fas fa-info-circle"></i> Details
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="add-task-form">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="New task title..."
                className="task-input"
                onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
              />
              <button onClick={addNewTask} className="add-task-btn">
                <i className="fas fa-plus"></i> Add Task
              </button>
            </div>
            <button onClick={addNewProject} className="btn-secondary">
              <i className="fas fa-folder-plus"></i> New Project
            </button>
          </div>
        </div>

        <div className="kanban-columns">
          {Object.entries(columns).map(([statusKey, column]) => (
            <div key={statusKey} className={`kanban-column ${column.color}`}>
              <div className="column-header">
                <span>{column.title}</span>
                <span className="task-count">
                  {currentProject.tasks.filter(t => t.status === statusKey).length}
                </span>
              </div>
              <div className="column-tasks">
                {currentProject.tasks
                  .filter(t => t.status === statusKey)
                  .map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={updateTaskStatus}
                      onDelete={deleteTask}
                    />
                  ))}
                {currentProject.tasks.filter(t => t.status === statusKey).length === 0 && (
                  <div className="empty-column">No tasks in {column.title}</div>
                )}
              </div>
            </div>
          ))}
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

export default KanbanBoard;