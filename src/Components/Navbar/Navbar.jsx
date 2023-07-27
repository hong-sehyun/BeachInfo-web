import React from 'react'
import {LiaUmbrellaBeachSolid} from 'react-icons/lia'
import './navbar.css'

const Navbar = () => {
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
        <li><a href="#" className="secondary">…</a></li>
      </ul>
    </nav>
  )
}

export default Navbar