import React from 'react'
import './App.css'
// import Footer from './Components/Footer/Footer'
// import Home from './Components/Home/Home'
// import Navbar from './Components/Navbar/Navbar'
import Main from './Components/Main/Main'
import Login from './Components/Login/Login'
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>




  )
}

export default App
