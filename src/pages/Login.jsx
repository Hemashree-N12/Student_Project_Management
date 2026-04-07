import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    onLogin(name);
  };

  return (
    <div style={container}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={input}
      />
      <button onClick={handleLogin} style={button}>
        Login
      </button>
    </div>
  );
};

const container = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "120px",
};

const input = {
  padding: "10px",
  margin: "10px",
  width: "220px",
};

const button = {
  padding: "10px 20px",
  cursor: "pointer",
};

export default Login;