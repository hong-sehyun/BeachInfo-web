import Board from '../Board/Board'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import { useCookies } from "react-cookie";

import React from 'react'

const Main = ({ token }) => {

  const [cookies, setCookie, removeCookie] = useCookies(['Token']);
  return (
    <main className='appmain'>
    <Navbar />
    <Home />
     {cookies.Token && <Board token={cookies.Token} />} 
    </main>
  )
}

export default Main