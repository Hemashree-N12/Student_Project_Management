function ProjectDetails() {

  const project = {
    title: "Student Project Management System",
    description: "This project helps students manage tasks and collaborate.",
    members: ["Hemashree", "Dareen", "Charishma", "Chethan"],
    tasks: [
      { name: "Login Page", status: "Completed" },
      { name: "Dashboard UI", status: "In Progress" },
      { name: "Chatroom", status: "Pending" }
    ]
  }

  return (
    <div className="container mt-4">
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <h4>Team Members</h4>
      <ul>
        {project.members.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>

      <h4>Tasks</h4>
      <ul>
        {project.tasks.map((task, index) => (
          <li key={index}>
            {task.name} - <b>{task.status}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectDetails