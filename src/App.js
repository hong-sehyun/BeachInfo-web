import React, { useState } from 'react';
import './App.css'
import Main from './Components/Main/Main'
import Login from './Components/Login/Login'
import MemberPage from './Components/Login/MemberPage'
import Join from './Components/Login/Join'
import Write from './Components/Board/Write'
import Board from './Components/Board/Board'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [token, setToken] = useState('');

  // const handleLoginSuccess = (token) => {
  //   setIsLoggedIn(true);
  //   setToken(token);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setToken('');
  // };
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);

  const handleLoginSuccess = (token) => {
    setIsLoggedIn(true);
    setCookie('Token', token, { path: '/' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeCookie('Token', { path: '/' });
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/login'
          element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route 
          path='/board' 
          element={<Board token={cookies.Token} />} />
        <Route
          path='/member'
          element={<MemberPage token={cookies.Token} />} />
        <Route
          path='/join'
          element={<Join element={<Join />} />} />
        <Route
          path='/write'
          element={<Write token={cookies.Token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
