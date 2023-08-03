import React, { useState } from 'react';
import './App.css'
import Main from './Components/Main/Main'
import Login from './Components/Login/Login'
import MemberPage from './Components/Login/MemberPage'

import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState('');

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setToken(token);
  };

  // Function to handle logout and set isLoggedIn to false
  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* The main page */}
        <Route path='/' element={<Main />} />

        {/* The login page */}
        <Route
          path='/login'
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path='/member'
          element={<MemberPage token={token} />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App
