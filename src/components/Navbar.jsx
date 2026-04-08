import React from 'react';

const NavBar = ({ activeTab, setActiveTab, onLogout, user }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chalkboard-user' },
    { id: 'kanban', label: 'Kanban', icon: 'fa-table-columns' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-chart-line' },
    { id: 'chatroom', label: 'Chat', icon: 'fa-comments' },
    { id: 'profile', label: 'Profile', icon: 'fa-user-circle' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-folder-tree"></i>
        <span>CollabFlow</span>
      </div>
      <div className="navbar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <div className="navbar-user">
        <div className="user-avatar">
          {user.avatarInitials}
        </div>
        <span className="user-name">{user.name}</span>
        <button onClick={onLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;