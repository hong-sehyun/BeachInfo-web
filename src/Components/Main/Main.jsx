import Board from '../Board/Board'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'

import React from 'react'

const Main = () => {
  return (
    <main className='appmain'>
    <Navbar />
    <Home />
    <Board />
    </main>
  )
}

export default Main