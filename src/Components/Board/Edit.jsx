import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBoard = ({ token }) => {
  const { seq } = useParams();
  const navigate = useNavigate();
  console.log('Original Token:', token);
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log('Decoded Payload:', payload);
  const sub = payload.sub;
  const [board, setBoard] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    // Fetch the current board details to populate the form
    fetch(`http://localhost:8080/Boards/${seq}`)
      .then(response => response.json())
      .then(data => setBoard(data))
      .catch(error => console.error('Failed to fetch board:', error));
  }, [seq]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBoard(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/Boards/${seq}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(board)
      });
      if (response.ok) {
        console.log('Update Successful');
        navigate(`/Boards/${seq}`);
      } else {
        console.error('Update Failed');
      }
    } catch (error) {
      console.error('Failed to update board:', error);
    }
  };

  return (
    <div>
      <h1>Edit Board</h1>
      <h3>{sub}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={board.title}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={board.content}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditBoard;
