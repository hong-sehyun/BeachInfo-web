import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LiaUmbrellaBeachSolid } from 'react-icons/lia';
import "./login.css";

const Join = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {

        if (!password.trim() && !confirmPassword.trim()) {
            setPasswordMatch(null); 
        } else {
            setPasswordMatch(password === confirmPassword);
        }
    }, [password, confirmPassword]);


    const handleRegister = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            alert('아이디와 비밀번호는 반드시 입력되어야 합니다.');
            return;
        }

        if (!passwordMatch) {
            alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
            return;
        }

        const registerData = {
            username: username,
            password: password,
            role: "ROLE_MEMBER",
            enabled: true
        };

        const url = 'http://localhost:8080/join';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            if (!response.ok) {
                throw new Error('회원가입에 실패했습니다');
            }

            alert('회원가입에 성공했습니다! 로그인을 해주세요.');
            navigate('/login');

        } catch (error) {
            console.error('Error during registration:', error);
        }
    };



    return (
        <main className='body'>
            <Link to="/">
                <h1>Beach Info <LiaUmbrellaBeachSolid className="icon" /></h1>
            </Link>
            <form onSubmit={handleRegister}>
                <article className='article'>
                    <div>
                        <label htmlFor="username">아이디</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">비밀번호 확인</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={passwordMatch ? 'match' : 'not-match'}
                        />
                    </div>
                    {passwordMatch === null && <p>비밀번호를 입력해주세요.</p>}
                    {passwordMatch === false && <p className="error">비밀번호가 일치하지 않습니다. 다시 확인해주세요.</p>}
                    {passwordMatch === true && <p>비밀번호가 일치합니다. 회원가입을 해주세요.</p>}
                    <div></div>
                    <div>
                        <button type="submit">회원가입</button>
                    </div>
                    <p>계정이 이미 있으신가요? <Link to='/login'>로그인</Link></p>
                </article>
            </form>
        </main>
    );
};

export default Join;