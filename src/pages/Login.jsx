import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('demo@collabflow.com');
  const [name, setName] = useState('Demo User');

  const handleSubmit = (e) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    onLogin({ 
      name, 
      email, 
      role: 'Project Member', 
      avatarInitials: initials 
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
          <i className="fas fa-layer-group"></i>
        </div>
        <h2 className="login-title">CollabFlow</h2>
        <p className="login-subtitle">Group Project Management</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-btn">
            Enter Dashboard →
          </button>
        </form>
        
        <p className="login-demo-hint">
          ✨ Demo: any name / email works
        </p>
      </div>
    </div>
  );
};

export default Login;