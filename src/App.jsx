import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import ProjectDetails from "./pages/ProjectDetails"
import Analytics from "./pages/Analytics"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/project" element={<ProjectDetails />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App