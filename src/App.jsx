import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import KanbanBoard from './pages/KanbanBoard';
import Analytics from './pages/Analytics';
import Chatroom from './pages/Chatroom';
import Profile from './pages/Profile';
import Login from './pages/Login';
import GroupManager from './components/GroupManager';
import Contributions from './pages/Contributions';
import './styles/app.css';
import './styles/main.css';

// ========== DEMO DATA WITH ENHANCED PROJECT DETAILS ==========
const DEMO_GROUPS = [
  {
    id: 'group1',
    name: '🚀 AI Research Project',
    joinCode: 'AI2024',
    createdBy: 'Dr. Smith',
    createdAt: '2026-01-15T10:00:00Z',
    members: [
      { id: 'user1', name: 'Dr. Smith', role: 'admin' },
      { id: 'user2', name: 'Alice Chen', role: 'member' },
      { id: 'user3', name: 'Bob Wilson', role: 'member' },
      { id: 'user4', name: 'Carol Davis', role: 'member' }
    ]
  },
  {
    id: 'group2',
    name: '💻 Web Dev Bootcamp',
    joinCode: 'WEB123',
    createdBy: 'Prof. Johnson',
    createdAt: '2026-02-01T14:30:00Z',
    members: [
      { id: 'user5', name: 'Prof. Johnson', role: 'admin' },
      { id: 'user2', name: 'Alice Chen', role: 'member' },
      { id: 'user6', name: 'David Lee', role: 'member' }
    ]
  },
  {
    id: 'group3',
    name: '🎨 Design Team Weekly',
    joinCode: 'DESIGN',
    createdBy: 'Sarah Parker',
    createdAt: '2026-02-10T09:15:00Z',
    members: [
      { id: 'user7', name: 'Sarah Parker', role: 'admin' },
      { id: 'user8', name: 'Mike Ross', role: 'member' },
      { id: 'user9', name: 'Emma Watson', role: 'member' },
      { id: 'user10', name: 'James Lee', role: 'member' }
    ]
  }
];

const DEMO_MESSAGES = {
  'group1': [
    { id: 'msg1', sender: 'Dr. Smith', senderId: 'user1', text: 'Welcome to the AI Research Project! 🤖', timestamp: '10:00 AM', avatar: 'DS' },
    { id: 'msg2', sender: 'Alice Chen', senderId: 'user2', text: 'Excited to work on the neural network architecture!', timestamp: '10:05 AM', avatar: 'AC' },
    { id: 'msg3', sender: 'Bob Wilson', senderId: 'user3', text: 'I can handle the data preprocessing', timestamp: '10:10 AM', avatar: 'BW' },
    { id: 'msg4', sender: 'Carol Davis', senderId: 'user4', text: 'Let me know when we start the experiments', timestamp: '10:15 AM', avatar: 'CD' },
    { id: 'msg5', sender: 'Dr. Smith', senderId: 'user1', text: 'First milestone: Complete literature review by Friday', timestamp: '10:20 AM', avatar: 'DS' }
  ],
  'group2': [
    { id: 'msg6', sender: 'Prof. Johnson', senderId: 'user5', text: 'Welcome to Web Dev Bootcamp! 🌐', timestamp: '09:00 AM', avatar: 'PJ' },
    { id: 'msg7', sender: 'Alice Chen', senderId: 'user2', text: 'Looking forward to learning React!', timestamp: '09:05 AM', avatar: 'AC' },
    { id: 'msg8', sender: 'David Lee', senderId: 'user6', text: 'Anyone interested in forming a study group?', timestamp: '09:10 AM', avatar: 'DL' },
    { id: 'msg9', sender: 'Prof. Johnson', senderId: 'user5', text: 'First project due next week - build a todo app', timestamp: '09:15 AM', avatar: 'PJ' }
  ],
  'group3': [
    { id: 'msg10', sender: 'Sarah Parker', senderId: 'user7', text: 'Welcome Design Team! 🎨', timestamp: '11:00 AM', avatar: 'SP' },
    { id: 'msg11', sender: 'Mike Ross', senderId: 'user8', text: 'I have some mockups ready for review', timestamp: '11:05 AM', avatar: 'MR' },
    { id: 'msg12', sender: 'Emma Watson', senderId: 'user9', text: 'The color palette looks great!', timestamp: '11:10 AM', avatar: 'EW' }
  ]
};

const DEMO_PROJECTS = {
  'group1': [
    {
      id: 'proj1',
      name: 'Neural Network Implementation',
      description: 'Build a CNN for image classification using PyTorch with high accuracy',
      startDate: '2024-01-20',
      endDate: '2024-03-15',
      priority: 'high',
      budget: 50000,
      department: 'AI Research',
      progress: 65,
      members: ['Dr. Smith', 'Alice Chen', 'Bob Wilson', 'Carol Davis'],
      milestones: [
        { name: 'Literature Review', dueDate: '2024-02-01', completed: true },
        { name: 'Data Collection', dueDate: '2024-02-10', completed: true },
        { name: 'Model Implementation', dueDate: '2024-02-25', completed: false },
        { name: 'Testing & Evaluation', dueDate: '2024-03-10', completed: false }
      ],
      resources: [
        { name: 'PyTorch Documentation', link: 'https://pytorch.org/docs' },
        { name: 'Dataset Repository', link: 'https://kaggle.com/datasets' }
      ],
      tasks: [
        { id: 't1', title: 'Literature Review on CNNs', status: 'done', assignee: 'Alice Chen', priority: 'high' },
        { id: 't2', title: 'Data Collection & Preprocessing', status: 'done', assignee: 'Bob Wilson', priority: 'high' },
        { id: 't3', title: 'Implement CNN Architecture', status: 'in-progress', assignee: 'Dr. Smith', priority: 'high' },
        { id: 't4', title: 'Training Pipeline', status: 'in-progress', assignee: 'Alice Chen', priority: 'medium' },
        { id: 't5', title: 'Model Evaluation', status: 'todo', assignee: 'Carol Davis', priority: 'medium' },
        { id: 't6', title: 'Hyperparameter Tuning', status: 'todo', assignee: 'Bob Wilson', priority: 'low' },
        { id: 't7', title: 'Final Report', status: 'todo', assignee: 'Dr. Smith', priority: 'high' }
      ]
    },
    {
      id: 'proj2',
      name: 'Research Paper Submission',
      description: 'Write and submit paper to NeurIPS conference',
      startDate: '2024-02-01',
      endDate: '2024-03-30',
      priority: 'high',
      budget: 10000,
      department: 'Research',
      progress: 45,
      members: ['Dr. Smith', 'Alice Chen', 'Bob Wilson'],
      milestones: [
        { name: 'Abstract Submission', dueDate: '2024-02-15', completed: true },
        { name: 'First Draft', dueDate: '2024-03-01', completed: false },
        { name: 'Peer Review', dueDate: '2024-03-20', completed: false }
      ],
      resources: [
        { name: 'NeurIPS Guidelines', link: 'https://neurips.cc/guidelines' }
      ],
      tasks: [
        { id: 't8', title: 'Abstract Writing', status: 'done', assignee: 'Dr. Smith', priority: 'high' },
        { id: 't9', title: 'Methodology Section', status: 'done', assignee: 'Alice Chen', priority: 'high' },
        { id: 't10', title: 'Results & Analysis', status: 'in-progress', assignee: 'Bob Wilson', priority: 'high' },
        { id: 't11', title: 'Paper Formatting', status: 'todo', assignee: 'Alice Chen', priority: 'medium' },
        { id: 't12', title: 'Peer Review', status: 'todo', assignee: 'Dr. Smith', priority: 'medium' }
      ]
    }
  ],
  'group2': [
    {
      id: 'proj3',
      name: 'E-Commerce Website',
      description: 'Full-stack e-commerce platform with React and Node.js',
      startDate: '2024-02-10',
      endDate: '2024-04-20',
      priority: 'high',
      budget: 75000,
      department: 'Web Development',
      progress: 35,
      members: ['Prof. Johnson', 'Alice Chen', 'David Lee'],
      milestones: [
        { name: 'UI Design Complete', dueDate: '2024-02-25', completed: true },
        { name: 'Frontend Development', dueDate: '2024-03-15', completed: false },
        { name: 'Backend Integration', dueDate: '2024-04-05', completed: false }
      ],
      resources: [
        { name: 'React Documentation', link: 'https://react.dev' },
        { name: 'Node.js Guide', link: 'https://nodejs.org' }
      ],
      tasks: [
        { id: 't13', title: 'UI/UX Design', status: 'done', assignee: 'Alice Chen', priority: 'high' },
        { id: 't14', title: 'React Components', status: 'in-progress', assignee: 'David Lee', priority: 'high' },
        { id: 't15', title: 'State Management (Redux)', status: 'in-progress', assignee: 'Prof. Johnson', priority: 'medium' },
        { id: 't16', title: 'Backend API', status: 'todo', assignee: 'David Lee', priority: 'high' },
        { id: 't17', title: 'Database Integration', status: 'todo', assignee: 'Prof. Johnson', priority: 'medium' },
        { id: 't18', title: 'Testing & Deployment', status: 'todo', assignee: 'Alice Chen', priority: 'low' }
      ]
    }
  ],
  'group3': [
    {
      id: 'proj4',
      name: 'Mobile App UI Redesign',
      description: 'Complete redesign of the mobile banking app with modern UI/UX',
      startDate: '2024-02-15',
      endDate: '2024-03-25',
      priority: 'medium',
      budget: 30000,
      department: 'Design',
      progress: 55,
      members: ['Sarah Parker', 'Mike Ross', 'Emma Watson', 'James Lee'],
      milestones: [
        { name: 'User Research', dueDate: '2024-02-20', completed: true },
        { name: 'Wireframes', dueDate: '2024-03-01', completed: true },
        { name: 'High-Fidelity Mockups', dueDate: '2024-03-15', completed: false }
      ],
      resources: [
        { name: 'Figma Design System', link: 'https://figma.com' },
        { name: 'UI Guidelines', link: 'https://material.io' }
      ],
      tasks: [
        { id: 't19', title: 'User Research', status: 'done', assignee: 'Emma Watson', priority: 'high' },
        { id: 't20', title: 'Wireframing', status: 'done', assignee: 'Mike Ross', priority: 'high' },
        { id: 't21', title: 'High-Fidelity Mockups', status: 'in-progress', assignee: 'Sarah Parker', priority: 'high' },
        { id: 't22', title: 'Design System', status: 'in-progress', assignee: 'James Lee', priority: 'medium' },
        { id: 't23', title: 'Prototype', status: 'todo', assignee: 'Mike Ross', priority: 'medium' },
        { id: 't24', title: 'User Testing', status: 'todo', assignee: 'Emma Watson', priority: 'low' }
      ]
    }
  ]
};

const DEMO_USER = {
  id: 'current_user',
  name: 'Alex Morgan',
  email: 'alex@collabflow.com',
  role: 'Project Manager',
  avatarInitials: 'AM'
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(DEMO_USER);
  const [activeTab, setActiveTab] = useState('groups');
  const [currentGroup, setCurrentGroup] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('collabflow_theme');
    return savedTheme || 'light';
  });
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('collabflow_groups');
    if (saved) {
      return JSON.parse(saved);
    }
    localStorage.setItem('collabflow_groups', JSON.stringify(DEMO_GROUPS));
    return DEMO_GROUPS;
  });
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('collabflow_all_messages');
    if (saved) {
      return JSON.parse(saved);
    }
    localStorage.setItem('collabflow_all_messages', JSON.stringify(DEMO_MESSAGES));
    return DEMO_MESSAGES;
  });
  
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('collabflow_all_projects');
    if (saved) {
      return JSON.parse(saved);
    }
    localStorage.setItem('collabflow_all_projects', JSON.stringify(DEMO_PROJECTS));
    return DEMO_PROJECTS;
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('collabflow_theme', theme);
  }, [theme]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('collabflow_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('collabflow_all_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('collabflow_all_projects', JSON.stringify(projects));
  }, [projects]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const generateJoinCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const createGroup = (groupName, userName) => {
    const joinCode = generateJoinCode();
    const newGroup = {
      id: Date.now().toString(),
      name: groupName,
      joinCode: joinCode,
      createdBy: userName,
      members: [{ id: user.id, name: userName, role: 'admin' }],
      createdAt: new Date().toISOString()
    };
    
    setGroups(prev => [...prev, newGroup]);
    setCurrentGroup(newGroup);
    
    setMessages(prev => ({ ...prev, [newGroup.id]: [] }));
    setProjects(prev => ({ 
      ...prev, 
      [newGroup.id]: [{
        id: 'default',
        name: 'Getting Started',
        description: 'Your new project - add tasks to begin!',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        priority: 'medium',
        budget: 0,
        department: 'General',
        progress: 0,
        members: [userName],
        milestones: [],
        resources: [],
        tasks: [
          { id: 'default1', title: 'Welcome to your new group!', status: 'todo', assignee: userName, priority: 'medium' }
        ]
      }]
    }));
    
    return joinCode;
  };

  const joinGroup = (joinCode, userName) => {
    const group = groups.find(g => g.joinCode === joinCode.toUpperCase());
    if (!group) {
      throw new Error('Invalid join code');
    }
    
    if (group.members.some(m => m.id === user.id)) {
      throw new Error('You are already a member of this group');
    }
    
    const updatedGroup = {
      ...group,
      members: [...group.members, { id: user.id, name: userName, role: 'member' }]
    };
    
    setGroups(prev => prev.map(g => g.id === group.id ? updatedGroup : g));
    setCurrentGroup(updatedGroup);
    
    return updatedGroup;
  };

  const leaveGroup = (groupId) => {
    const group = groups.find(g => g.id === groupId);
    if (group && group.members.length > 1) {
      const updatedGroup = {
        ...group,
        members: group.members.filter(m => m.id !== user.id)
      };
      setGroups(prev => prev.map(g => g.id === groupId ? updatedGroup : g));
    } else {
      setGroups(prev => prev.filter(g => g.id !== groupId));
    }
    
    if (currentGroup?.id === groupId) {
      setCurrentGroup(null);
      setActiveTab('groups');
    }
  };

  const sendChatMessage = (groupId, text) => {
    const newMsg = {
      id: Date.now().toString(),
      sender: user.name,
      senderId: user.id,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: user.avatarInitials
    };
    
    const currentMsgs = messages[groupId] || [];
    const updatedMsgs = [...currentMsgs, newMsg];
    setMessages(prev => ({ ...prev, [groupId]: updatedMsgs }));
  };

  const updateGroupProjects = (groupId, newProjects) => {
    setProjects(prev => ({ ...prev, [groupId]: newProjects }));
  };

  const updateSingleProject = (groupId, updatedProject) => {
    const currentProjects = projects[groupId] || [];
    const updatedProjects = currentProjects.map(p =>
      p.id === updatedProject.id ? updatedProject : p
    );
    setProjects(prev => ({ ...prev, [groupId]: updatedProjects }));
  };

  const handleLogin = (userData) => {
    setUser({ ...userData, id: Date.now().toString() });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentGroup(null);
    setActiveTab('groups');
  };

  const resetToDemoData = () => {
    if (confirm('Reset all data to demo state? This will delete any custom data.')) {
      localStorage.setItem('collabflow_groups', JSON.stringify(DEMO_GROUPS));
      localStorage.setItem('collabflow_all_messages', JSON.stringify(DEMO_MESSAGES));
      localStorage.setItem('collabflow_all_projects', JSON.stringify(DEMO_PROJECTS));
      setGroups(DEMO_GROUPS);
      setMessages(DEMO_MESSAGES);
      setProjects(DEMO_PROJECTS);
      setCurrentGroup(null);
      setActiveTab('groups');
      alert('Demo data restored!');
    }
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
        currentGroup={currentGroup}
        onResetDemo={resetToDemoData}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main className="main-content">
        {activeTab === 'groups' && (
          <GroupManager
            groups={groups}
            currentGroup={currentGroup}
            onCreateGroup={createGroup}
            onJoinGroup={joinGroup}
            onSelectGroup={setCurrentGroup}
            onLeaveGroup={leaveGroup}
            userName={user.name}
            userId={user.id}
          />
        )}
        
        {currentGroup && activeTab === 'dashboard' && (
          <Dashboard
            projects={projects[currentGroup.id] || []}
            group={currentGroup}
            onUpdateProjects={(newProjects) => updateGroupProjects(currentGroup.id, newProjects)}
          />
        )}
        
        {currentGroup && activeTab === 'kanban' && (
          <KanbanBoard
            projects={projects[currentGroup.id] || []}
            group={currentGroup}
            onUpdateProjects={(newProjects) => updateGroupProjects(currentGroup.id, newProjects)}
          />
        )}
        
        {currentGroup && activeTab === 'contributions' && (
          <Contributions
            projects={projects[currentGroup.id] || []}
            currentProject={projects[currentGroup.id]?.[0]}
            group={currentGroup}
            onUpdateProject={(updatedProject) => updateSingleProject(currentGroup.id, updatedProject)}
          />
        )}
        
        {currentGroup && activeTab === 'analytics' && (
          <Analytics
            projects={projects[currentGroup.id] || []}
            group={currentGroup}
          />
        )}
        
        {currentGroup && activeTab === 'chatroom' && (
          <Chatroom
            messages={messages[currentGroup.id] || []}
            onSendMessage={(text) => sendChatMessage(currentGroup.id, text)}
            group={currentGroup}
            user={user}
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