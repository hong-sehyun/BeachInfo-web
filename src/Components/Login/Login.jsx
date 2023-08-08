import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { LiaUmbrellaBeachSolid } from 'react-icons/lia';
import "./login.css";

// useCookies를 사용하지 않은 것
// const Login = (props) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     var token;
//     const loginData = {
//       username: username,
//       password: password,
//     };
  
//     const url = 'http://localhost:8080/';
//     try {
//       const response = await fetch(`${url}login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginData),
        
//       });

//       console.log("Authorization :" + response.headers.get("Authorization"));

//       token = response.headers.get("Authorization");
//       props.onLoginSuccess(token);
  
//       if (token == null) {
//         throw new Error('Login failed');
//       }
    
      
//       navigate('/member');
  
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.');
//     }
//   };
const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['Token']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    const url = 'http://localhost:8080/';
    try {
      const response = await fetch(`${url}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      console.log("Authorization :" + response.headers.get("Authorization"));
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const token = response.headers.get('Authorization');
      if (token) {
        setCookie('Token', token, { path: '/' });
        props.onLoginSuccess(token);
        navigate('/member');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.');
    }
  };

  return (
    <main className='body'>
      <Link to="/">
      <h1>Beach Info <LiaUmbrellaBeachSolid className="icon" /></h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <article className='article'>
          <div className='loginInput flex'>
            <label htmlFor="Username">
              아이디
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" />
            </label>
            <label htmlFor="password">
              비밀번호
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" />
            </label>
          </div>
          <div>
            <button type="submit">
              로그인
            </button>
            <p>계정이 없으신가요? Beach Info에 <Link to='/join'>가입</Link>하세요! </p>
          </div>
        </article>
      </form>
    </main>
  );
};

export default Login;
