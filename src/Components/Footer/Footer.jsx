import React, { useState, useEffect } from 'react';
import { LiaUmbrellaBeachSolid } from 'react-icons/lia'
import './footer.css'


const Footer = () => {

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/Boards')
      .then((response) => response.json())
      .then((data) => setBoards(data))
      .catch((error) => console.error( error));
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
          {boards.map((board) => (
            <tr key={board.seq}>
              <td>{board.seq}</td>
              <td>{board.id}</td>
              <td>{board.beach}</td>
              <td>{board.content}</td>
              <td>{board.createDate}</td>
              <td>
                <div className='grid'>
                <a href='#'>수정</a>
                <a href='#'>삭제</a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (

    <article>
      <form>
      {showBoards()}
      </form>
      <div id='more'>
        <a href='#'>more ▷ </a>
      </div>
      <div className='txt grid'>
        <label for="text"></label>
        <input type='text' id='id'></input>
        <input type='text' id='content'></input>
        <button type="submit">Submit</button>
      </div>
    </article>


  )
}

export default Footer