import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { LiaUmbrellaBeachSolid } from 'react-icons/lia'
import './board.css'
const BoardDetail = ({ token }) => {
    const { seq } = useParams();
    const [board, setBoard] = useState({});
    const navigate = useNavigate();

    let sub = '';
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        sub = payload.sub;
    }


    useEffect(() => {
        fetch(`http://localhost:8080/Boards/${seq}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`Error fetching board detail for seq: ${seq}`);
            })
            .then(data => {
                setBoard(data);

            })
            .catch(error => {
                console.error(error);

            });
    }, [seq]);


    const handleDelete = async (seq) => {
        try {
            const response = await fetch(`http://localhost:8080/Boards/${seq}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });

            if (response.ok) {
                console.log('Delete Successful');
                navigate('/');

            } else {
                console.error('Delete Failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = () => {
        navigate(`/edit/${seq}`);
    };

    return (
        <main className='detailMain'>
            <Link to="/">
            <h1 className='detailh1'>Beach Info <LiaUmbrellaBeachSolid className="detailicon" /></h1>
            </Link>

        <article>
            <header>
            <hgroup>
                <h2>{board.title}</h2>
                <h3>아이디 : {board.username}</h3>

            </hgroup>

            </header>



            <p>{board.content}</p>

            <img src={`http://localhost:8080/Boards/${seq}/image`} alt="Image" />

            <footer>

            <div className='grid'>
                {token && board.username === sub && (
                    <>
                        <a onClick={handleUpdate}>수정</a>
                        <a onClick={() => handleDelete(board.seq)}>삭제</a>
                    </>
                )}
            </div>

            </footer>
        </article>
        </main>
    );
}

export default BoardDetail