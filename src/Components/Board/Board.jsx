import React, { useState, useEffect } from 'react';
import { LiaUmbrellaBeachSolid } from 'react-icons/lia'
import AOS from "aos";
import "aos/dist/aos.css";
import './board.css'
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Board = ({ token }) => {
  // const payload = JSON.parse(atob(token.split('.')[1]));
  // console.log('Decoded Payload:', payload);
  // const sub = payload.sub;
  let sub = '';
  let role = '';
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    sub = payload.sub;
    role = payload.role;
  }

  console.log('Token:', token);
  console.log('Role:', role);

  // 글쓰기 버튼 클릭시 경고창
  const writeClick = () => {
    if (token) {
      window.location.href = "/write";
    } else {
      alert("로그인을 해주세요");
    }
  };



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

  const handleDelete = async (seq) => {
    const userConfirmed = window.confirm('정말로 삭제하시겠습니까?');

    if (!userConfirmed) {
        return; 
    }
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
        setBoards(boards.filter((board) => board.seq !== seq));
        // fetchBoards();
      } else {
        console.error('Delete Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch('http://localhost:8080/Boards', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.ok) {
        console.log('Delete All Successful');
        setBoards([]);  
      } else {
        console.error('Delete All Failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showBoards = () => {

    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Seq</th>
            <th scope="col">ID</th>
            <th scope="col">Beach</th>
            <th scope="col">title</th>
            <th scope="col">Create Date</th>
            <th scope="col"></th>
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
              
              <th scope="row">{board.seq}</th>
              
              <td>{board.username}</td>
              <td>{board.beach}</td>
              <td><Link to={`/boards/${board.seq}`}>{board.title}</Link></td>
              <td>{board.createDate}</td>
              <td>
                <div className='grid'>

                  {token && board.username === sub && (
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

  // const handleDelete = async (seq) => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/Boards/${seq}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: token, // Add the token here
  //       },
  //     });

  //     if (response.ok) {
  //       console.log('Delete Successful');
  //       // Update the board list after deletion
  //       setBoards(boards.filter((board) => board.seq !== seq));
  //       // // Refresh the board list after deletion
  //       // fetchBoards();
  //     } else {
  //       console.error('Delete Failed');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const fetchBoards = () => {
  //   fetch('http://localhost:8080/Boards')
  //     .then((resp) => resp.json())
  //     .then((data) => setBoards(data))
  //     .catch((error) => console.error(error));
  // };

  return (

    // <article data-aos="fade-up" className='boardArticle'>
    //   <h2>{sub}님</h2>
    //   {token ? (
    //     <form>
    //       {showBoards()}
    //     </form>
    //   ) : (
    //     <p>Please log in to view the board.</p>
    //   )}
    //   <div id='more'>
    //     <a href='#'>more ▷ </a>
    //   </div>
    //   <Link to='/write'>글쓰기</Link>
    // </article>

    <article className='articleTable' data-aos="fade-up" >
      <h2>{token ? `${sub}님` : '게스트'}</h2>
      {showBoards()}


      {role === "ROLE_ADMIN" && (
        <button onClick={handleDeleteAll}>Delete All Posts</button>
      )}
      <a onClick={writeClick} className="writeLink">글쓰기</a>
    </article>
  )
}

export default Board