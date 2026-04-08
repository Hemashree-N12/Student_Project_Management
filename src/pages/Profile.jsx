import React, { useState } from 'react';

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role
  });

  const handleSave = () => {
    const initials = formData.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    setUser({
      ...user,
      ...formData,
      avatarInitials: initials
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header-card">
        <div className="profile-avatar">
          {user.avatarInitials}
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-role">{user.role}</p>
        <p className="profile-email">{user.email}</p>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="edit-profile-btn"
        >
          <i className="fas fa-pen"></i> Edit Profile
        </button>
      </div>

      {isEditing && (
        <div className="profile-edit-card">
          <h3>Update Information</h3>
          <div className="edit-form">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Full name"
              className="edit-input"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email"
              className="edit-input"
            />
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              placeholder="Role"
              className="edit-input"
            />
            <button onClick={handleSave} className="save-btn">
              Save Changes
            </button>
          </div>
        </div>
      )}

      <div className="preferences-card">
        <h3>⚙️ Preferences</h3>
        <p className="preferences-text">
          Notifications, theme, and language settings (frontend demo)
        </p>
      </div>
    </div>
  );
};

export default Profile;