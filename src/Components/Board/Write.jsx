import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams  } from 'react-router-dom';
import { LiaUmbrellaBeachSolid } from 'react-icons/lia'

// import { useCookies } from 'react-cookie';

const Write = ({ token, mode = "write"}) => {

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

    const { seq } = useParams();
    console.log('Original Token:', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded Payload:', payload);
    const sub = payload.sub;


    const [beaches, setBeaches] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        fetch('http://localhost:8080/beaches')
            .then((resp) => resp.json())
            .then((data) => {
                setBeaches(data.map((beachData) => beachData.beach));
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (mode === "edit" && seq) {
            fetch(`http://localhost:8080/Boards/${seq}`)
                .then(response => response.json())
                .then(data => {
                    // setBeaches(data.beachRef.current)
                    setTitle(data.title);
                    setContent(data.content);
                    setSelectedFile(data.selectedFile);
                    console.log('Type of selectedFile:', typeof data.selectedFile);
                })
                .catch(error => console.error('Failed to fetch board for editing:', error));
        }
    }, [mode, seq]);
    const beachRef = useRef();

    const selectBeach = (e) => {
        beachRef.current = e.target.value;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const boardData = {
        //     username: sub,
        //     beach: beachRef.current,
        //     content: content,
        //     image: selectedFile,
        // };

        const formData = new FormData();

        formData.append('username', sub);
        formData.append('beach', beachRef.current);
        formData.append('title', title);
        formData.append('content', content);
        if (selectedFile) {
            formData.append('image', selectedFile, selectedFile.name);
        }

        try {
            const url = mode === "edit" ? `http://localhost:8080/Boards/${seq}` : 'http://localhost:8080/Boards';
            const method = mode === "edit" ? "PUT" : "POST"

            const response = await fetch(url, {
                method: method,
                headers: { Authorization: token },
                body: formData,
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
            <Link to="/">
                <h1 className='detailh1'>Beach Info <LiaUmbrellaBeachSolid className="detailicon" /></h1>
            </Link>
            <form onSubmit={handleSubmit}>
                <article >
                    <hgroup>
                    <h2>게시글 작성</h2>
                    <h3>아이디 : {sub}</h3>

                    </hgroup>
                    {showBeaches()}

                    <label>
                        <input type="file" onChange={handleImageChange} />
                    </label>
                    {/* 제목 */}
                    <label>
                        <input
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label htmlFor="content">
                        <textarea
                            type="text"
                            id="content"
                            placeholder="내용을 입력하세요"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>

                    <button type="submit">제출</button>
    

                </article>
            </form>


        </main>
    );
};

export default Write;