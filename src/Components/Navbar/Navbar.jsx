import React from 'react'
import {LiaUmbrellaBeachSolid} from 'react-icons/lia'
import {BiUserCircle} from 'react-icons/bi'
import './navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const url = `http://localhost:8080/beaches`

  return (
    <nav>
      <ul>
        <li><a href="#" className="secondary">…</a></li>
      </ul>
      <ul className='title'>
        <li>Beach Info</li>
        <LiaUmbrellaBeachSolid className="icon" />
      </ul>
      <ul>
              
        <li><Link to="/login"><BiUserCircle id="UserIcon" /></Link></li>
      </ul>
    </nav>
  )
}

export default Navbar