import React from 'react';

const QuitModal = ({ score, qNum, onResume, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Leave the maze?</h2>
        <p>Are you sure you want to quit your current adventure?</p>
        <div className="modal-stats">
          <p>Current Coins: 🪙 {score}</p>
          <p>Current Question: {qNum} / 15</p>
        </div>
        <div className="modal-actions">
          <button className="btn-primary" onClick={onResume}>Continue Playing</button>
          <button className="btn-secondary" onClick={onConfirm}>Quit Game</button>
        </div>
      </div>
    </div>
  );
};

export default QuitModal;