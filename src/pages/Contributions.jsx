import React, { useState } from 'react';

const Contributions = ({ projects, currentProject, group, onUpdateProject }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(currentProject?.id || projects[0]?.id || null);
  const project = projects.find(p => p.id === selectedProjectId);

  if (!projects || projects.length === 0) {
    return (
      <div className="contributions-container">
        <div className="empty-state">
          <i className="fas fa-chart-line" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
          <h3>No Projects Yet</h3>
          <p>Create a project to see member contributions</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="contributions-container">
        <div className="empty-state">
          <p>Please select a project</p>
        </div>
      </div>
    );
  }

  // Calculate contribution metrics for each member
  const calculateContributions = () => {
    const contributions = {};
    const allMembers = project.members || group?.members?.map(m => m.name) || [];
    
    allMembers.forEach(member => {
      contributions[member] = {
        name: member,
        tasksCompleted: 0,
        tasksInProgress: 0,
        tasksTodo: 0,
        totalTasks: 0,
        completionRate: 0,
        pointsEarned: 0,
        tasksByPriority: { high: 0, medium: 0, low: 0 },
        recentActivities: [],
        contributionScore: 0
      };
    });
    
    // Analyze tasks
    project.tasks.forEach(task => {
      const assignee = task.assignee;
      if (contributions[assignee]) {
        contributions[assignee].totalTasks++;
        
        if (task.status === 'done') {
          contributions[assignee].tasksCompleted++;
          // Award points based on priority
          const points = task.priority === 'high' ? 10 : task.priority === 'medium' ? 5 : 3;
          contributions[assignee].pointsEarned += points;
        } else if (task.status === 'in-progress') {
          contributions[assignee].tasksInProgress++;
        } else if (task.status === 'todo') {
          contributions[assignee].tasksTodo++;
        }
        
        // Count by priority
        if (task.priority) {
          contributions[assignee].tasksByPriority[task.priority]++;
        }
        
        // Add recent activity
        contributions[assignee].recentActivities.push({
          task: task.title,
          status: task.status,
          priority: task.priority,
          date: new Date().toLocaleDateString()
        });
      }
    });
    
    // Calculate rates and scores
    Object.values(contributions).forEach(member => {
      if (member.totalTasks > 0) {
        member.completionRate = Math.round((member.tasksCompleted / member.totalTasks) * 100);
      }
      
      // Calculate contribution score (0-100)
      member.contributionScore = Math.min(
        100,
        Math.round(
          (member.completionRate * 0.6) +
          ((member.pointsEarned / Math.max(1, member.totalTasks * 10)) * 100 * 0.3) +
          (member.tasksCompleted / Math.max(1, member.totalTasks) * 10)
        )
      );
      
      // Keep only last 5 activities
      member.recentActivities = member.recentActivities.slice(-5);
    });
    
    return Object.values(contributions).sort((a, b) => b.contributionScore - a.contributionScore);
  };
  
  const contributions = calculateContributions();
  const totalPoints = contributions.reduce((sum, m) => sum + m.pointsEarned, 0);
  const totalTasksCompleted = contributions.reduce((sum, m) => sum + m.tasksCompleted, 0);
  
  // Get top contributor
  const topContributor = contributions[0];

  return (
    <div className="contributions-container">
      <div className="contributions-header">
        <h1 className="page-title">
          <i className="fas fa-chart-line"></i> Member Contributions
        </h1>
        <select 
          value={selectedProjectId} 
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="project-selector"
        >
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Team Summary Stats */}
      <div className="contributions-stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-users"></i></div>
          <div className="stat-value">{contributions.length}</div>
          <div className="stat-label">Active Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
          <div className="stat-value">{totalTasksCompleted}</div>
          <div className="stat-label">Tasks Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-trophy"></i></div>
          <div className="stat-value">{totalPoints}</div>
          <div className="stat-label">Total Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-star"></i></div>
          <div className="stat-value">{topContributor?.name || 'N/A'}</div>
          <div className="stat-label">Top Contributor</div>
        </div>
      </div>

      {/* Contributions Leaderboard */}
      <div className="leaderboard-section">
        <h2 className="section-title">
          <i className="fas fa-trophy"></i> Contribution Leaderboard
        </h2>
        <div className="leaderboard">
          {contributions.map((member, index) => (
            <div key={member.name} className={`leaderboard-item rank-${index + 1}`}>
              <div className="rank-badge">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}th`}
              </div>
              <div className="member-info">
                <div className="member-avatar">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="member-details">
                  <div className="member-name">{member.name}</div>
                  <div className="member-stats-mini">
                    {member.tasksCompleted} completed · {member.tasksInProgress} in progress
                  </div>
                </div>
              </div>
              <div className="contribution-score">
                <div className="score-value">{member.contributionScore}</div>
                <div className="score-label">Score</div>
              </div>
              <div className="progress-ring">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="var(--border-solid)" strokeWidth="4"/>
                  <circle 
                    cx="30" cy="30" r="25" fill="none" 
                    stroke={member.contributionScore >= 70 ? '#22c55e' : member.contributionScore >= 40 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="4"
                    strokeDasharray={`${(member.contributionScore / 100) * 157} 157`}
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                  />
                  <text x="30" y="35" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="bold">
                    {member.contributionScore}
                  </text>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Contribution Cards */}
      <div className="detailed-contributions">
        <h2 className="section-title">
          <i className="fas fa-chart-bar"></i> Detailed Contribution Analysis
        </h2>
        <div className="contributions-grid">
          {contributions.map(member => (
            <div key={member.name} className="contribution-card">
              <div className="card-header">
                <div className="member-avatar-large">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="card-title">
                  <h3>{member.name}</h3>
                  <span className={`contribution-level ${member.contributionScore >= 70 ? 'high' : member.contributionScore >= 40 ? 'medium' : 'low'}`}>
                    {member.contributionScore >= 70 ? 'High Contributor' : member.contributionScore >= 40 ? 'Active Member' : 'Getting Started'}
                  </span>
                </div>
              </div>

              {/* Task Breakdown */}
              <div className="task-breakdown">
                <div className="breakdown-item">
                  <span className="breakdown-label">Completed</span>
                  <span className="breakdown-value completed">{member.tasksCompleted}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">In Progress</span>
                  <span className="breakdown-value in-progress">{member.tasksInProgress}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">To Do</span>
                  <span className="breakdown-value todo">{member.tasksTodo}</span>
                </div>
              </div>

              {/* Priority Distribution */}
              <div className="priority-distribution">
                <div className="priority-label">Tasks by Priority</div>
                <div className="priority-bars">
                  <div className="priority-bar high" style={{ width: `${(member.tasksByPriority.high / Math.max(1, member.totalTasks)) * 100}%` }}>
                    {member.tasksByPriority.high > 0 && `H:${member.tasksByPriority.high}`}
                  </div>
                  <div className="priority-bar medium" style={{ width: `${(member.tasksByPriority.medium / Math.max(1, member.totalTasks)) * 100}%` }}>
                    {member.tasksByPriority.medium > 0 && `M:${member.tasksByPriority.medium}`}
                  </div>
                  <div className="priority-bar low" style={{ width: `${(member.tasksByPriority.low / Math.max(1, member.totalTasks)) * 100}%` }}>
                    {member.tasksByPriority.low > 0 && `L:${member.tasksByPriority.low}`}
                  </div>
                </div>
              </div>

              {/* Points Earned */}
              <div className="points-section">
                <div className="points-earned">
                  <i className="fas fa-star"></i>
                  <span>{member.pointsEarned} points earned</span>
                </div>
                <div className="completion-rate">
                  <i className="fas fa-chart-simple"></i>
                  <span>{member.completionRate}% completion rate</span>
                </div>
              </div>

              {/* Recent Activity */}
              <details className="recent-activity">
                <summary>
                  <i className="fas fa-history"></i> Recent Activity ({member.recentActivities.length})
                </summary>
                <div className="activity-list">
                  {member.recentActivities.map((activity, idx) => (
                    <div key={idx} className="activity-item">
                      <span className={`activity-status ${activity.status}`}>
                        {activity.status === 'done' ? '✓' : activity.status === 'in-progress' ? '⟳' : '○'}
                      </span>
                      <span className="activity-task">{activity.task}</span>
                      <span className="activity-priority">{activity.priority}</span>
                    </div>
                  ))}
                  {member.recentActivities.length === 0 && (
                    <div className="no-activity">No recent activity</div>
                  )}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Insights */}
      <div className="insights-section">
        <h2 className="section-title">
          <i className="fas fa-lightbulb"></i> Contribution Insights
        </h2>
        <div className="insights-grid">
          <div className="insight-card">
            <i className="fas fa-chart-line"></i>
            <h4>Team Performance</h4>
            <p>Average completion rate: {Math.round(contributions.reduce((sum, m) => sum + m.completionRate, 0) / contributions.length)}%</p>
          </div>
          <div className="insight-card">
            <i className="fas fa-tasks"></i>
            <h4>Workload Distribution</h4>
            <p>Most active: {topContributor?.name} with {topContributor?.totalTasks} tasks</p>
          </div>
          <div className="insight-card">
            <i className="fas fa-clock"></i>
            <h4>Productivity Score</h4>
            <p>Total points: {totalPoints} across {contributions.length} members</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contributions;