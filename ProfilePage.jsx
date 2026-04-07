import { useState } from "react";

const user = {
  name: "Arjun Mehta",
  email: "arjun.mehta@studio.dev",
  role: "Senior Product Designer",
  avatar: "AM",
  joined: "March 2022",
  projects: 24,
  tasksCompleted: 138,
  tasksTotal: 160,
  hoursLogged: 1240,
  skills: [
    { label: "UI Design", pct: 92 },
    { label: "Prototyping", pct: 78 },
    { label: "Research", pct: 65 },
    { label: "Frontend Dev", pct: 50 },
  ],
  recentProjects: [
    { name: "Nova Dashboard", status: "Active", color: "#6ee7b7" },
    { name: "Sync Mobile App", status: "Review", color: "#fcd34d" },
    { name: "Atlas CMS", status: "Done", color: "#a5b4fc" },
  ],
};

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .profile-root {
    min-height: 100vh;
    background: #0e0f14;
    color: #e8e6e1;
    font-family: 'DM Sans', sans-serif;
    padding: 2.5rem 1.5rem;
  }

  .profile-card {
    background: #16181f;
    border: 1px solid #2a2d38;
    border-radius: 20px;
    padding: 2.5rem;
  }

  .avatar {
    width: 80px; height: 80px;
    background: linear-gradient(135deg, #6ee7b7 0%, #3b82f6 100%);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Serif Display', serif;
    font-size: 1.8rem; color: #0e0f14; font-weight: 700;
    flex-shrink: 0;
  }

  .username {
    font-family: 'DM Serif Display', serif;
    font-size: 1.75rem; margin: 0; color: #f0ede8; letter-spacing: -0.02em;
  }

  .role-badge {
    display: inline-block;
    background: #1e2030; border: 1px solid #3a3d50;
    border-radius: 20px; padding: 3px 12px;
    font-size: 0.72rem; color: #9ca3af; letter-spacing: 0.08em; text-transform: uppercase;
    margin-top: 4px;
  }

  .stat-box {
    background: #1a1c25;
    border: 1px solid #252836;
    border-radius: 14px;
    padding: 1.4rem 1.2rem;
    text-align: center;
  }

  .stat-num {
    font-family: 'DM Serif Display', serif;
    font-size: 2.1rem; color: #f0ede8; line-height: 1;
  }

  .stat-label {
    font-size: 0.72rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;
  }

  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1rem; color: #9ca3af; margin-bottom: 1rem;
    letter-spacing: 0.04em;
  }

  .progress-track {
    background: #1a1c25; border-radius: 99px; height: 6px; overflow: hidden;
  }

  .progress-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, #6ee7b7, #3b82f6);
    transition: width 0.8s cubic-bezier(.16,1,.3,1);
  }

  .skill-label { font-size: 0.82rem; color: #c9c5be; }
  .skill-pct { font-size: 0.75rem; color: #6b7280; }

  .project-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #1e2030;
  }
  .project-row:last-child { border-bottom: none; }

  .project-dot {
    width: 9px; height: 9px; border-radius: 50%; margin-right: 10px; flex-shrink: 0;
  }

  .project-name { font-size: 0.88rem; color: #d1cfc9; }

  .status-pill {
    font-size: 0.68rem; padding: 2px 10px; border-radius: 20px;
    background: #1e2030; color: #9ca3af; letter-spacing: 0.07em; text-transform: uppercase;
  }

  .tasks-ring-wrap { position: relative; display: inline-flex; align-items: center; justify-content: center; }
  .tasks-ring-label {
    position: absolute;
    text-align: center;
  }
  .tasks-big { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #f0ede8; line-height: 1; }
  .tasks-small { font-size: 0.65rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.07em; }

  .divider { border-color: #252836; margin: 1.5rem 0; }
`;

const radius = 42;
const circ = 2 * Math.PI * radius;

export default function ProfilePage() {
  const pct = user.tasksCompleted / user.tasksTotal;
  const dash = pct * circ;

  return (
    <>
      <style>{style}</style>
      <div className="profile-root">
        <div className="container" style={{ maxWidth: 860 }}>

          {/* Header */}
          <div className="profile-card mb-4">
            <div className="d-flex align-items-center gap-4 flex-wrap">
              <div className="avatar">{user.avatar}</div>
              <div className="flex-grow-1">
                <h1 className="username">{user.name}</h1>
                <span className="role-badge">{user.role}</span>
                <div className="mt-2" style={{ fontSize: "0.82rem", color: "#6b7280" }}>
                  {user.email} &nbsp;·&nbsp; Joined {user.joined}
                </div>
              </div>
            </div>

            <hr className="divider" />

            {/* Stats */}
            <div className="row g-3">
              {[
                { num: user.projects, label: "Projects" },
                { num: user.tasksCompleted, label: "Tasks Done" },
                { num: user.hoursLogged, label: "Hours Logged" },
                { num: "4.9★", label: "Avg Rating" },
              ].map((s) => (
                <div className="col-6 col-sm-3" key={s.label}>
                  <div className="stat-box">
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {/* Skills Progress */}
            <div className="col-md-7">
              <div className="profile-card h-100">
                <div className="section-title">Skill Proficiency</div>
                <div className="d-flex flex-column gap-3">
                  {user.skills.map((sk) => (
                    <div key={sk.label}>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="skill-label">{sk.label}</span>
                        <span className="skill-pct">{sk.pct}%</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${sk.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="divider" />

                <div className="section-title">Task Completion</div>
                <div className="d-flex align-items-center gap-4">
                  <div className="tasks-ring-wrap">
                    <svg width="110" height="110" viewBox="0 0 110 110">
                      <circle cx="55" cy="55" r={radius} fill="none" stroke="#1a1c25" strokeWidth="10" />
                      <circle
                        cx="55" cy="55" r={radius} fill="none"
                        stroke="url(#grad)" strokeWidth="10"
                        strokeDasharray={`${dash} ${circ}`}
                        strokeLinecap="round"
                        transform="rotate(-90 55 55)"
                      />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6ee7b7" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="tasks-ring-label">
                      <div className="tasks-big">{Math.round(pct * 100)}%</div>
                      <div className="tasks-small">Done</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.82rem", color: "#9ca3af" }}>
                      <span style={{ color: "#6ee7b7", fontWeight: 600 }}>{user.tasksCompleted}</span> completed
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: 4 }}>
                      <span style={{ color: "#f87171", fontWeight: 600 }}>{user.tasksTotal - user.tasksCompleted}</span> remaining
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#9ca3af", marginTop: 4 }}>
                      <span style={{ color: "#e8e6e1", fontWeight: 600 }}>{user.tasksTotal}</span> total tasks
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Projects */}
            <div className="col-md-5">
              <div className="profile-card h-100">
                <div className="section-title">Recent Projects</div>
                {user.recentProjects.map((p) => (
                  <div className="project-row" key={p.name}>
                    <div className="d-flex align-items-center">
                      <div className="project-dot" style={{ background: p.color }} />
                      <span className="project-name">{p.name}</span>
                    </div>
                    <span className="status-pill">{p.status}</span>
                  </div>
                ))}

                <hr className="divider" />

                <div className="section-title">Activity Overview</div>
                <div className="d-flex gap-2 flex-wrap">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const intensity = Math.random();
                    const bg = intensity > 0.7 ? "#6ee7b7" : intensity > 0.4 ? "#2d6a56" : "#1a1c25";
                    return (
                      <div
                        key={i}
                        style={{ width: 14, height: 14, borderRadius: 3, background: bg }}
                        title={`Day ${i + 1}`}
                      />
                    );
                  })}
                </div>
                <div style={{ fontSize: "0.7rem", color: "#4b5563", marginTop: 8 }}>Last 28 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
