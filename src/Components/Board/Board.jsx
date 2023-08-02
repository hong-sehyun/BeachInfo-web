import React, { useState, useEffect } from 'react';
import { LiaUmbrellaBeachSolid } from 'react-icons/lia'
import AOS from "aos";
import "aos/dist/aos.css";
import './board.css'


const Footer = () => {

  
  useEffect(() => {
    AOS.init({duration: 800})
  }, [])


  const [boards, setBoards] = useState([]);
  const [beaches, setBeaches] = useState([]);
  const [selectedBeach, setSelectedBeach] = useState('');

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
        setBeaches(data.map((beachData) => beachData.beach)); // Extract only the 'beach' property
      })
      .catch((error) => console.error(error));
  }, []);



  const showBeaches = () => {
    return (
      <div>
      <select>
      <option value="" defaultValue>해수욕장</option>
        {beaches.map((beachName) => (
          <option key={beachName.id} value={beachName.beach}>
            {beachName}
          </option>
        ))}
      </select>
    </div>
    );
  };
  


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

    <article data-aos="fade-up">
      <form>
        {showBoards()}
      </form>
      <div id='more'>
        <a href='#'>more ▷ </a>
      </div>
      <div className='txt grid'>
        <label htmlFor="text"></label>
        <input type='text' id='id'></input>
        {showBeaches()}
        <label htmlFor="content"></label>
        <input type='text' id='content'></input>
        <button id='boardbt' type="submit">Submit</button>
      </div>
    </article>


  )
}

export default Footer