import React from 'react';

const Modal = ({ onClose, item }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <header>
          <h2>{item.beach} 해수욕장</h2>
          <h3>{item.address}</h3>
        </header>
        <div>
          <ul>
            <li>개장일 {item.open}</li>
            <li>폐장일 {item.close}</li>
          </ul>
          <span>
            <button onClick={onClose}>Close</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;