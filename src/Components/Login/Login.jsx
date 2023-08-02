import React from 'react'
import {LiaUmbrellaBeachSolid} from 'react-icons/lia'
import "./login.css"
const Login = () => {
    return (
        <main className='loginBody'>
            <h1>Beach Info
        <LiaUmbrellaBeachSolid className="icon" /></h1>
            <article>
                <div className='loginInput flex'>
                    <label for="Username">
                        아이디
                        <input type="text" id="Username" placeholder="아이디" required />
                    </label>
                    <label for="password">
                        비밀번호
                        <input type="text" id="password" placeholder="비밀번호" required />
                    </label>
                </div>
                <div>
                    <button type="submit">
                        로그인
                    </button>
                </div>
            </article>
        </main>
    )
}

export default Login