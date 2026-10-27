
import React, { useState } from 'react';

const WelcomeScreen = ({ onPlay }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isStarting, setIsStarting] = useState(false);

  const handlePlay = () => {
    if (!name.trim()) {
      setError('Please enter your name to start the adventure!');
      return;
    }
    setIsStarting(true);
    // Wait for the unlock/fade animation to finish
    setTimeout(() => {
      onPlay(name);
    }, 1200);
  };

  return (
    <div className={`welcome-screen ${isStarting ? 'fade-out' : ''}`}>
      
      {/* Animated Floating Coins in the background */}
      <div className="floating-coins-container">
        {[...Array(6)].map((_, i) => (
          <img 
            key={i} 
            src="/assets/coin.png" 
            className={`float-coin coin-pos-${i + 1}`} 
            alt="" 
          />
        ))}
      </div>

      {/* The Main Frosted Glass Card */}
      <div className="welcome-card-glass">
        <h1 className="title glow-text">MATH MAZE</h1>
        <p className="subtitle">Think fast. Collect coins. Find your way out.</p>
        
        {/* Animated Treasure Chest Centerpiece */}
        <div className={`treasure-centerpiece ${isStarting ? 'chest-unlock' : 'chest-breathe'}`}>
          <div className="treasure-glow"></div>
          <img src="/assets/treasure-chest.png" alt="Treasure" className="hero-chest" />
        </div>

        <div className="input-group">
          <input 
            type="text" 
            className="hero-input"
            placeholder="Enter your hero name..." 
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            maxLength={15}
          />
          {error && <p className="error-text bounce-in">{error}</p>}
        </div>
        
        <button className={`btn-primary pulse-btn ${isStarting ? 'clicked' : ''}`} onClick={handlePlay}>
          {isStarting ? 'Entering Maze...' : 'Play Game'}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;