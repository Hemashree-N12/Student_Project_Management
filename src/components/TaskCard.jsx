import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav style={{background: "#333", padding: "10px"}}>
      
      <Link to="/project" style={{color: "white", marginRight: "10px"}}>
        Project
      </Link>

      <Link to="/analytics" style={{color: "white", marginRight: "10px"}}>
        Analytics
      </Link>

      <Link to="/chat" style={{color: "white", marginRight: "10px"}}>
        Chat
      </Link>

      <Link to="/profile" style={{color: "white"}}>
        Profile
      </Link>

    </nav>
  )
}

export default Navbar