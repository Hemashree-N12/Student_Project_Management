import React, { useState } from 'react';

const GroupManager = ({ 
  groups, 
  currentGroup, 
  onCreateGroup, 
  onJoinGroup, 
  onSelectGroup, 
  onLeaveGroup,
  userName,
  userId 
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      setError('Please enter a group name');
      return;
    }
    const code = onCreateGroup(groupName, userName);
    setGeneratedCode(code);
    setError('');
  };

  const handleJoinGroup = () => {
    if (!joinCode.trim()) {
      setError('Please enter a join code');
      return;
    }
    try {
      onJoinGroup(joinCode, userName);
      setJoinCode('');
      setShowJoinModal(false);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Join code copied to clipboard!');
  };

  return (
    <div className="group-manager">
      <div className="group-header">
        <h1 className="page-title">Your Groups</h1>
        <div className="group-actions">
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <i className="fas fa-plus"></i> Create Group
          </button>
          <button onClick={() => setShowJoinModal(true)} className="btn-secondary">
            <i className="fas fa-sign-in-alt"></i> Join Group
          </button>
        </div>
      </div>

      <div className="groups-grid">
        {groups.length === 0 ? (
          <div className="empty-groups">
            <i className="fas fa-users empty-icon"></i>
            <p>You haven't joined any groups yet</p>
            <p className="empty-subtitle">Create a new group or join an existing one using a join code</p>
          </div>
        ) : (
          groups.map(group => (
            <div 
              key={group.id} 
              className={`group-card ${currentGroup?.id === group.id ? 'active' : ''}`}
              onClick={() => onSelectGroup(group)}
            >
              <div className="group-card-header">
                <h3>{group.name}</h3>
                <span className="member-count">
                  <i className="fas fa-users"></i> {group.members.length}
                </span>
              </div>
              <div className="group-card-body">
                <p className="join-code">
                  <i className="fas fa-key"></i> Code: {group.joinCode}
                </p>
                <p className="created-by">
                  Created by: {group.createdBy}
                </p>
                <p className="created-date">
                  {new Date(group.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="group-card-footer">
                <div className="members-list">
                  {group.members.slice(0, 3).map(member => (
                    <span key={member.id} className="member-badge">
                      {member.name}
                    </span>
                  ))}
                  {group.members.length > 3 && (
                    <span className="member-badge more">
                      +{group.members.length - 3}
                    </span>
                  )}
                </div>
                {group.members.some(m => m.id === userId) && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to leave this group?')) {
                        onLeaveGroup(group.id);
                      }
                    }}
                    className="leave-btn"
                  >
                    Leave
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => { setShowCreateModal(false); setGeneratedCode(''); setError(''); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Group</h2>
              <button onClick={() => setShowCreateModal(false)} className="close-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              {!generatedCode ? (
                <>
                  <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="modal-input"
                    autoFocus
                  />
                  {error && <p className="error-message">{error}</p>}
                  <div className="modal-buttons">
                    <button onClick={handleCreateGroup} className="btn-primary">
                      Create Group
                    </button>
                  </div>
                </>
              ) : (
                <div className="code-display">
                  <i className="fas fa-check-circle success-icon"></i>
                  <p>Group created successfully!</p>
                  <div className="code-box">
                    <span>{generatedCode}</span>
                    <button onClick={copyToClipboard} className="copy-btn">
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                  <p className="code-instruction">
                    Share this code with others to join your group
                  </p>
                  <button 
                    onClick={() => {
                      setShowCreateModal(false);
                      setGroupName('');
                      setGeneratedCode('');
                      setError('');
                    }}
                    className="btn-primary"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {showJoinModal && (
        <div className="modal-overlay" onClick={() => { setShowJoinModal(false); setJoinCode(''); setError(''); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Join Group</h2>
              <button onClick={() => setShowJoinModal(false)} className="close-btn">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Enter Join Code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="modal-input"
                autoFocus
              />
              {error && <p className="error-message">{error}</p>}
              <div className="modal-buttons">
                <button onClick={handleJoinGroup} className="btn-primary">
                  Join Group
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManager;