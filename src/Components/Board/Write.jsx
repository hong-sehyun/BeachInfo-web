import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Write = ({ token }) => {

    // const isLoggedIn = !!token;
    // const navigate = useNavigate();

    // const payload = JSON.parse(atob(token.split('.')[1]));
    // const sub = payload.sub;
    // const [beaches, setBeaches] = useState([]);
    // const [content, setContent] = useState(''); 

    // useEffect(() => {
    //     fetch('http://localhost:8080/beaches')
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             setBeaches(data.map((beachData) => beachData.beach));
    //         })
    //         .catch((error) => console.error(error));
    // }, []);

    // const beachRef = useRef();

    // const selectBeach = (e) => {
    //     beachRef.current = e.target.value
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const boardData = {
    //         username: sub,
    //         beach: beaches,
    //         content: content
    //     }

    //     try {
    //         const url = `http://localhost:8080/Boards`

    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': token,
    //             },

    //             body: JSON.stringify(boardData),
    //         });

    //         if (response.ok) {
    //             console.log('성공');
    //             navigate('/');
    //         } else {
    //             console.error(response.status);
    //         }
    //         console.log(token);
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }

    // }

    // if (!isLoggedIn) {
    //     navigate('/login');
    // }

    const isLoggedIn = !!token;
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['Token']);

    console.log('Original Token:', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded Payload:', payload);
    const sub = payload.sub;
    const [beaches, setBeaches] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/beaches')
            .then((resp) => resp.json())
            .then((data) => {
                setBeaches(data.map((beachData) => beachData.beach));
            })
            .catch((error) => console.error(error));
    }, []);

    const beachRef = useRef();

    const selectBeach = (e) => {
        beachRef.current = e.target.value;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const boardData = {
            username: sub,
            beach: beachRef.current,
            content: content,
        };

        try {
            const url = 'http://localhost:8080/Boards';

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(boardData),
            });

            if (response.ok) {
                console.log('Response Status:', response.status); 
                console.log('성공');
                alert('게시글이 성공적으로 작성되었습니다.');
                navigate('/');
            } else {
                console.error(response.status);
            }
            console.log(token);
        } catch (error) {
            console.error(error);
        }
    };

    if (!isLoggedIn) {
        navigate('/login');
        return null;
    }

    const showBeaches = () => {

        const sortedBeaches = beaches.sort((a, b) => a.localeCompare(b));

        return (
            <div>
                <select ref={beachRef} onChange={selectBeach}>
                    <option value="" defaultValue>해수욕장을 선택하세요</option>
                    {sortedBeaches.map((beachName) => (
                        <option key={beachName.id} value={beachName.beach}>
                            {beachName}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    if (!isLoggedIn) {
        navigate('/login');
        return null;
    }

    return (
        <main className='write-body'>
            <form onSubmit={handleSubmit}>
                <article >
                    <h1>게시글 작성</h1>
                    <div>아이디 : {sub}</div>
                    {showBeaches()}
                    <label htmlFor="content">
                        <input
                            type="text"
                            id="content"
                            placeholder="내용을 입력하세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)} 
                        />                
                    </label>

                    <button type="submit">제출</button>
                    <Link to="/">홈으로</Link>

                </article>
            </form>


        </main>
    );
};

export default Write;