import { useEffect, React } from 'react'
import { LiaUmbrellaBeachSolid } from 'react-icons/lia'
import { BiUserCircle, BiLogOut, BiLogIn } from 'react-icons/bi'
import './navbar.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';


const Navbar = ({ token }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['Token']);
  // const url = `http://localhost:8080/beaches`
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])
  const handleLogout = () => {

    removeCookie('Token', { path: '/' });

    window.location.href = '/';
  };



  return (
    <main className='main-container' data-aos="fade-up">

        <div className='user'>
          {/* <BiUserCircle id="UserIcon" />  */}

          {!token && <Link to="/login" className='sp'><BiUserCircle className="UserIcon" /> 로그인</Link>}
          {/* <li><Link to='/join'>회원가입</Link></li> */}
          {token && <a onClick={handleLogout} className='sp'><BiLogOut className="UserIcon" /> 로그아웃</a>}
        </div>

      <nav className='navbar-container'>

        <ul>
          <li className='li1'></li>
        </ul>
        <ul className='title' >
          <li data-aos="fade-up">Beach Info <LiaUmbrellaBeachSolid className="icon" /></li>

        </ul>


        <ul>
          <li className='li1'></li>
        </ul>
      </nav>
      {/* <div className='scroll-container'>
        <Link to="/home">스크롤</Link>
      </div> */}
    </main>
  )
}

export default Navbar