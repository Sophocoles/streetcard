// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/rest-auth/logout/');
      onLogout(); // Call the onLogout function passed from App.js
      navigate('/providerLogin');
    } catch (error) {
      console.log('Logout error', error);
    }
  };

  return (
    <nav>
      {/* Add any additional navbar items here */}
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
