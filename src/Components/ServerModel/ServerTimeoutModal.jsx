import React from "react";
import "./ServerTimeoutModal.css";

const ServerTimeoutModal = ({ show, onClose }) => {
  if (!show) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Server is Busy</h2>
        <p>The server is currently busy. Please try again later.</p>
        <button onClick={onClose} className="modal-button">Close</button>
      </div>
    </div>
  );
};

export default ServerTimeoutModal;
