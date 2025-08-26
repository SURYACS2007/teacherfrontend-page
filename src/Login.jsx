import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // your existing CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Hardcoded credentials
  const validCredentials = {
    staff: 'staff123',
    jpp: 'jpp123',
    dss:'dss123',
    vccff:'vccff123',
    daaa:'daaa123',
    dpcoo:'dpcoo123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lowerUsername = username.toLowerCase(); // Make username case-insensitive

    if (validCredentials[lowerUsername]) {
      if (validCredentials[lowerUsername] === password) {
        // Navigate based on user
        if (lowerUsername === 'staff') {
          navigate('/students');
        } else if (lowerUsername === 'jpp') {
          navigate('/jpstudent');
        } else if (lowerUsername === 'dss') {
          navigate('/dsstudent');
        } else if (lowerUsername === 'vccff') {
          navigate('/vccfstudent');
        } else if (lowerUsername === 'daaa') {
          navigate('/daastudent');
        } else if (lowerUsername === 'dpcoo') {
          navigate('/dpcostudent');
        }
      } else {
        alert('Incorrect password.');
      }
    } else {
      alert('Username not found.');
    }
  };

  return (
    <div className="login-body">
      <div className="login-card">
        <header className="header">
          DHIRAJLAL GANDHI COLLEGE OF TECHNOLOGY
        </header>

        {/* 📢 Upcoming Result Notice */}
        <div className="notice">
          📢 Upcoming Results will be published on 
          <span className="date"> 30th August 2025 At 9 AM</span>
        </div>

        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            required
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit" className="btn-login">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
