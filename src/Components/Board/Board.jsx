import React, { useState, useEffect } from 'react';
import { LiaUmbrellaBeachSolid } from 'react-icons/lia'
import AOS from "aos";
import "aos/dist/aos.css";
import './board.css'
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Board = ({ token }) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log('Decoded Payload:', payload);
  const sub = payload.sub;


  const [cookies] = useCookies(['Token']);
  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])


  const [boards, setBoards] = useState([]);
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/Boards')
      .then((resp) => resp.json())
      .then((data) => setBoards(data))
      .catch((error) => console.error(error));

  }, []);


  useEffect(() => {
    fetch('http://localhost:8080/beaches')
      .then((resp) => resp.json())
      .then((data) => {
        setBeaches(data.map((beachData) => beachData.beach));
      })
      .catch((error) => console.error(error));
  }, []);



  const showBoards = () => {

    return (
      <table>
        <thead>
          <tr>
            <th>Seq</th>
            <th>ID</th>
            <th>Beach</th>
            <th>Content</th>
            <th>Create Date</th>
            <th>수정 / 삭제</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) =>
          // console.log('CurrentUser:', currentUser);
          // console.log('Board Username:', board.username);
          // console.log("Token from cookies:", cookies.Token);
          // console.log("Received token prop:", token);
          (
            <tr key={board.seq}>
              <td>{board.seq}</td>
              <td>{board.username}</td>
              <td>{board.beach}</td>
              <td>{board.content}</td>
              <td>{board.createDate}</td>
              <td>
                <div className='grid'>
                  <a href='#'>수정</a>
                  {board.username === sub && (
                    <a onClick={() => handleDelete(board.seq)}>삭제</a>
                  )}
                </div>
              </td>
            </tr>
          )

          )}
        </tbody>
      </table>
    );
  };

  const handleDelete = async (seq) => {
    try {
      const response = await fetch(`http://localhost:8080/Boards/${seq}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // Add the token here
        },
      });

      if (response.ok) {
        console.log('Delete Successful');
        // Update the board list after deletion
        setBoards(boards.filter((board) => board.seq !== seq));
        // // Refresh the board list after deletion
        // fetchBoards();
      } else {
        console.error('Delete Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchBoards = () => {
  //   fetch('http://localhost:8080/Boards')
  //     .then((resp) => resp.json())
  //     .then((data) => setBoards(data))
  //     .catch((error) => console.error(error));
  // };

  return (

    <article data-aos="fade-up" className='boardArticle'>
      <h2>{sub}님</h2>
      {token ? (
        <form>
          {showBoards()}
        </form>
      ) : (
        <p>Please log in to view the board.</p>
      )}
      <div id='more'>
        <a href='#'>more ▷ </a>
      </div>
      <Link to='/write'>글쓰기</Link>
    </article>


  )
}

export default Board