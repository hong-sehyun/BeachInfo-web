import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Write = ({ token }) => {

    const isLoggedIn = !!token;
    const navigate = useNavigate();

    const payload = JSON.parse(atob(token.split('.')[1]));
    const sub = payload.sub;
    const [beaches, setBeaches] = useState([]);


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
        beachRef.current = e.target.value
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const boardData = {
            username : sub,
            beach: "asd",
            content: "dsadf"
        }

        try{
            const url = `http://localhost:8080/Boards`

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': token,
                },

                body: JSON.stringify(boardData),
            });

            if (response.ok) {
               console.log('성공') ;
               navigate('/');
            } else{
                console.error(response.status);
            }
            console.log(token);
        }
        catch (error) {
            console.error(error);
        }

    }

    if(!isLoggedIn) {
        navigate('/login');
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
            <form>
            <article onSubmit={handleSubmit}>
                <h1>게시글 작성</h1>
                <div>아이디 : {sub}</div>
                {showBeaches()}
                <label htmlFor="content">
                    <input type="text" id="content" placeholder="내용을 입력하세요" />
                </label>

                <button type="submit">제출</button>
                <Link to="/">홈으로</Link>
                
            </article>
            </form>
            

        </main>
    );
};

export default Write;