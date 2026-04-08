import React from 'react';

const NavBar = ({ activeTab, setActiveTab, onLogout, user, currentGroup, onResetDemo, theme, toggleTheme }) => {
  const navItems = [
    { id: 'groups', label: 'Groups', icon: 'fa-users', showAlways: true },
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chalkboard-user', requireGroup: true },
    { id: 'kanban', label: 'Kanban', icon: 'fa-table-columns', requireGroup: true },
    { id: 'contributions', label: 'Contributions', icon: 'fa-chart-line', requireGroup: true }, // ADD THIS
    { id: 'analytics', label: 'Analytics', icon: 'fa-chart-simple', requireGroup: true },
    { id: 'chatroom', label: 'Chat', icon: 'fa-comments', requireGroup: true },
    { id: 'profile', label: 'Profile', icon: 'fa-user-circle', showAlways: true }
  ];

  const visibleItems = navItems.filter(item => 
    item.showAlways || (item.requireGroup && currentGroup)
  );

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-folder-tree"></i>
        <span>CollabFlow</span>
      </div>
      
      {currentGroup && (
        <div className="current-group-badge">
          <i className="fas fa-users"></i>
          <span>{currentGroup.name}</span>
        </div>
      )}
      
      <div className="navbar-nav">
        {visibleItems.map(item => (
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
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="theme-toggle-btn" title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          <span className="reset-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
        
        {/* Reset Demo Button */}
        <button onClick={onResetDemo} className="reset-demo-btn" title="Reset to Demo Data">
          <i className="fas fa-sync-alt"></i>
          <span className="reset-text">Reset</span>
        </button>
        
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