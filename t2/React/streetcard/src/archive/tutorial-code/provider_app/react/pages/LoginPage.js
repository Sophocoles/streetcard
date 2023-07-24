import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/LoginPage.css'

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/rest-auth/login/', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.key);
      onLogin(); // Call the onLogin function passed from App.js
      navigate('/patientSelect');
    } catch (error) {
      setError('Invalid username or password');
      console.log('Login error', error);
    }
  };
  

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setError('Both username and password are required');
    } else {
      handleSubmit(e); // Pass the event object to handleSubmit
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <img src="logo.png" alt="Your Logo" className="logo" />
        <h1>Login</h1>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Login</button>
        <button type="button" className="create-account-button">Create Account</button>
      </form>
      <div className="login-footer">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginPage;
