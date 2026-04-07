const tasks = {
  todo: [
    { id: 1, title: "Define user personas", tag: "Research", tagColor: "#a5b4fc", assignee: "AR" },
    { id: 2, title: "Set up CI/CD pipeline", tag: "DevOps", tagColor: "#fcd34d", assignee: "SM" },
    { id: 3, title: "Write onboarding copy", tag: "Content", tagColor: "#6ee7b7", assignee: "PK" },
    { id: 4, title: "Audit accessibility issues", tag: "QA", tagColor: "#f9a8d4", assignee: "LN" },
  ],
  inProgress: [
    { id: 5, title: "Redesign settings page", tag: "Design", tagColor: "#a5b4fc", assignee: "AM", progress: 60 },
    { id: 6, title: "Integrate Stripe billing", tag: "Backend", tagColor: "#fcd34d", assignee: "RV", progress: 35 },
    { id: 7, title: "Mobile nav component", tag: "Frontend", tagColor: "#6ee7b7", assignee: "SM", progress: 80 },
  ],
  done: [
    { id: 8, title: "User interview sessions", tag: "Research", tagColor: "#a5b4fc", assignee: "PK" },
    { id: 9, title: "Fix auth token bug", tag: "Backend", tagColor: "#fcd34d", assignee: "RV" },
    { id: 10, title: "Launch beta waitlist", tag: "Growth", tagColor: "#f9a8d4", assignee: "LN" },
    { id: 11, title: "Typography system", tag: "Design", tagColor: "#a5b4fc", assignee: "AM" },
  ],
};

const columns = [
  { key: "todo", label: "To Do", accent: "#6b7280", count: tasks.todo.length },
  { key: "inProgress", label: "In Progress", accent: "#fbbf24", count: tasks.inProgress.length },
  { key: "done", label: "Done", accent: "#6ee7b7", count: tasks.done.length },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500&display=swap');

  .kb-root {
    min-height: 100vh;
    background: #0c0d11;
    font-family: 'Inter', sans-serif;
    padding: 2.5rem 1.5rem;
  }

  .kb-header {
    margin-bottom: 2.5rem;
  }

  .kb-title {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: #f0ede8;
    letter-spacing: -0.03em;
    margin: 0;
  }

  .kb-subtitle {
    font-size: 0.82rem;
    color: #4b5563;
    margin-top: 4px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .kb-col {
    background: #13151c;
    border: 1px solid #1e2130;
    border-radius: 16px;
    padding: 1.25rem;
    min-height: 500px;
  }

  .col-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .col-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #9ca3af;
  }

  .col-badge {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 2px 9px;
    border-radius: 99px;
    background: #1e2130;
    color: #6b7280;
  }

  .col-accent-bar {
    height: 2px;
    border-radius: 99px;
    margin-bottom: 1.25rem;
    opacity: 0.6;
  }

  .task-card {
    background: #1a1c26;
    border: 1px solid #252838;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 0.75rem;
    transition: transform 0.15s ease, border-color 0.15s ease;
    cursor: default;
  }

  .task-card:hover {
    transform: translateY(-2px);
    border-color: #353848;
  }

  .task-card.is-done {
    opacity: 0.6;
  }

  .task-tag {
    font-size: 0.65rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 99px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: transparent;
    border: 1px solid;
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .task-title {
    font-size: 0.875rem;
    color: #d1cfc9;
    font-weight: 400;
    line-height: 1.45;
    margin: 0;
  }

  .task-title.done-title {
    text-decoration: line-through;
    color: #6b7280;
  }

  .task-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.75rem;
  }

  .assignee-chip {
    width: 26px; height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, #312e81, #1e3a5f);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.58rem; font-weight: 700; color: #a5b4fc;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0;
  }

  .progress-wrap {
    flex: 1;
    margin-left: 0.75rem;
  }

  .progress-bar-bg {
    height: 4px;
    background: #252838;
    border-radius: 99px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #fbbf24, #f59e0b);
  }

  .progress-pct {
    font-size: 0.65rem;
    color: #6b7280;
    margin-top: 3px;
    text-align: right;
  }

  .done-check {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #14532d;
    border: 1px solid #166534;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.6rem;
  }

  .summary-bar {
    display: flex;
    gap: 1.5rem;
    background: #13151c;
    border: 1px solid #1e2130;
    border-radius: 12px;
    padding: 1rem 1.5rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .summary-item {
    font-size: 0.8rem;
    color: #6b7280;
  }

  .summary-item span {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    margin-right: 4px;
  }
`;

function TaskCard({ task, isDone, isInProgress }) {
  return (
    <div className={`task-card${isDone ? " is-done" : ""}`}>
      <span
        className="task-tag"
        style={{ color: task.tagColor, borderColor: task.tagColor + "55" }}
      >
        {task.tag}
      </span>
      <p className={`task-title${isDone ? " done-title" : ""}`}>{task.title}</p>
      <div className="task-footer">
        <div className="assignee-chip">{task.assignee}</div>

        {isInProgress && task.progress != null && (
          <div className="progress-wrap">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${task.progress}%` }} />
            </div>
            <div className="progress-pct">{task.progress}%</div>
          </div>
        )}

        {isDone && (
          <div className="done-check" style={{ marginLeft: "auto" }}>✓</div>
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard() {
  const total = tasks.todo.length + tasks.inProgress.length + tasks.done.length;
  const doneRatio = Math.round((tasks.done.length / total) * 100);

  return (
    <>
      <style>{style}</style>
      <div className="kb-root">
        <div className="container-fluid" style={{ maxWidth: 1100 }}>

          <div className="kb-header">
            <h1 className="kb-title">Sprint Board</h1>
            <div className="kb-subtitle">Q2 · Week 14 · Nova Dashboard Project</div>
          </div>

          <div className="summary-bar">
            <div className="summary-item"><span>{total}</span>total tasks</div>
            <div className="summary-item"><span style={{ color: "#fbbf24" }}>{tasks.inProgress.length}</span>in flight</div>
            <div className="summary-item"><span style={{ color: "#6ee7b7" }}>{tasks.done.length}</span>completed</div>
            <div className="summary-item"><span style={{ color: "#a5b4fc" }}>{doneRatio}%</span>sprint progress</div>
          </div>

          <div className="row g-4">
            {columns.map((col) => (
              <div className="col-12 col-md-4" key={col.key}>
                <div className="kb-col">
                  <div className="col-header">
                    <span className="col-title">{col.label}</span>
                    <span className="col-badge">{col.count}</span>
                  </div>
                  <div
                    className="col-accent-bar"
                    style={{ background: col.accent }}
                  />
                  {tasks[col.key].map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isDone={col.key === "done"}
                      isInProgress={col.key === "inProgress"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
