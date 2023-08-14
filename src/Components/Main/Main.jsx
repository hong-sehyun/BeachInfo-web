import { useEffect } from 'react';
import Board from '../Board/Board'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

import { useCookies } from "react-cookie";
import { HiOutlineChevronDown } from 'react-icons/hi'
import AOS from "aos";
import "aos/dist/aos.css";
import './main.css';

import React from 'react'

const Main = ({ token }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);
  return (
    <main className='scroll-container'>
      <div id="section1">
        <Navbar token={cookies.Token} />
        <a href='#section2' id='scrolldown'><HiOutlineChevronDown/></a>
      </div>

      <div id="section2">
        <Home className='hm' />
      </div>
      <div id="section3">

        <Board token={cookies.Token} />
      </div>
      <Footer/>
    </main>
  )
}

export default Main