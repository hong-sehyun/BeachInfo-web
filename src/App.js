import React from 'react'
import './App.css'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

const App = () => {
  
  return (
    <main className='appmain'>
      <Navbar />
      <Home />
      <Footer />

    </main>
  )
}

export default App
