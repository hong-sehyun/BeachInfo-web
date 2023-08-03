import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiaUmbrellaBeachSolid } from 'react-icons/lia';
import "./login.css";

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    var token;
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

      token = response.headers.get("Authorization");
      props.onLoginSuccess(token);
  
      if (token == null) {
        throw new Error('Login failed');
      }
    
      
      // Rest of the code...
      navigate('/member');
  
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
    <main className='loginBody'>
      <h1>Beach Info
        <LiaUmbrellaBeachSolid className="icon" />
      </h1>
      <form onSubmit={handleSubmit}>
        <article>
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
          </div>
        </article>
      </form>
    </main>
  );
};

export default Login;
