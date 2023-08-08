import React from 'react'
import {LiaUmbrellaBeachSolid} from 'react-icons/lia'
import {BiUserCircle, BiLogOut} from 'react-icons/bi'
import './navbar.css'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';


const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);
  // const url = `http://localhost:8080/beaches`
  const handleLogout = () => {

    removeCookie('Token', { path: '/' });

    window.location.href = '/';
  };
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
              
  
        <details role="list" dir="rtl">
        <summary aria-haspopup="listbox" role="link"><BiUserCircle id="UserIcon" /></summary>
        <ul role="listbox">
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/member">마이페이지</Link></li>
          <li><Link to='/join'>회원가입</Link></li>
          <li><a onClick={handleLogout}>로그아웃 <BiLogOut /></a></li>
          
          
        </ul>
      </details>
      </ul>
    </nav>
  )
}

export default Navbar