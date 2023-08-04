import React, { useState } from 'react';
import './App.css'
import Main from './Components/Main/Main'
import Login from './Components/Login/Login'
import MemberPage from './Components/Login/MemberPage'
import Join from './Components/Login/Join'
import Write from './Components/Board/Write'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState('');

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setToken(token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/login'
          element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path='/member'
          element={<MemberPage token={token} />} />
        <Route
          path='/join'
          element={<Join element={<Join />}  />} />
      <Route
          path='/write'
          element={<Write token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
