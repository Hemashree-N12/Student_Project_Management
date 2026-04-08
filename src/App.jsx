import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import Analytics from './pages/Analytics';
import Chatroom from './pages/Chatroom';
import Profile from './pages/Profile';
import Login from './pages/Login';
import './styles/app.css';
import './styles/main.css';

// Mock data
const defaultProjects = [
  { 
    id: 'proj1', 
    name: 'Design System Overhaul', 
    description: 'Revamp UI components and design tokens', 
    members: ['Alex', 'Jamie', 'Taylor'], 
    tasks: [
      { id: 't1', title: 'Create color palette', status: 'done', assignee: 'Alex', priority: 'high' },
      { id: 't2', title: 'Typography scale', status: 'in-progress', assignee: 'Jamie', priority: 'medium' },
      { id: 't3', title: 'Component library', status: 'todo', assignee: 'Taylor', priority: 'low' },
    ]
  },
  { 
    id: 'proj2', 
    name: 'Mobile App Sprint', 
    description: 'React Native core features', 
    members: ['Sam', 'Jordan', 'Casey'], 
    tasks: [
      { id: 't4', title: 'Auth flow', status: 'todo', assignee: 'Sam', priority: 'high' },
      { id: 't5', title: 'API integration', status: 'in-progress', assignee: 'Jordan', priority: 'high' },
    ]
  }
];

const defaultChatMessages = [
  { id: 'msg1', sender: 'Alex', text: 'Great progress on the design system!', timestamp: '10:24 AM', avatar: 'A' },
  { id: 'msg2', sender: 'Jamie', text: 'Typography scale almost done 🎨', timestamp: '10:45 AM', avatar: 'J' },
  { id: 'msg3', sender: 'Taylor', text: 'Let\'s sync tomorrow for components', timestamp: '11:00 AM', avatar: 'T' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ 
    name: 'Alex Morgan', 
    email: 'alex@collabflow.com', 
    role: 'Project Lead', 
    avatarInitials: 'AM' 
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('collabflow_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProjects[0]?.id || null);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('collabflow_chat');
    return saved ? JSON.parse(saved) : defaultChatMessages;
  });

  useEffect(() => {
    localStorage.setItem('collabflow_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('collabflow_chat', JSON.stringify(messages));
  }, [messages]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const updateProjectTasks = (projId, newTasks) => {
    setProjects(prev => prev.map(p => 
      p.id === projId ? { ...p, tasks: newTasks } : p
    ));
  };

  const sendChatMessage = (text) => {
    const newMsg = {
      id: 'msg' + Date.now(),
      sender: user.name,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: user.avatarInitials
    };
    setMessages(prev => [...prev, newMsg]);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <NavBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        user={user} 
      />
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            projects={projects} 
            selectedProjectId={selectedProjectId} 
            setSelectedProjectId={setSelectedProjectId} 
          />
        )}
        {activeTab === 'kanban' && (
          <KanbanBoard 
            projectId={selectedProjectId} 
            projects={projects} 
            updateProject={updateProjectTasks} 
          />
        )}
        {activeTab === 'analytics' && (
          <Analytics 
            projects={projects} 
            selectedProjectId={selectedProjectId} 
          />
        )}
        {activeTab === 'chatroom' && (
          <Chatroom 
            messages={messages} 
            onSendMessage={sendChatMessage} 
          />
        )}
        {activeTab === 'profile' && (
          <Profile user={user} setUser={setUser} />
        )}
      </main>
    </div>
  );
}

export default App;