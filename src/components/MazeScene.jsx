import React from 'react';

const MazeScene = ({ feedback, currentIndex = 0, totalQuestions = 15, strikes = 0 }) => {
  const isSuccess = feedback?.type === 'success';
  const isError = feedback?.type === 'error';

  // 🛠️ LEVEL DESIGNER: Adjust these 15 points to map the dirt paths of your custom background!
  const path = [
    { left: 5,  top: 15 }, // Step 1 (Start)
    { left: 15, top: 15 }, // Step 2
    { left: 25, top: 20 }, // Step 3
    { left: 25, top: 40 }, // Step 4
    { left: 35, top: 40 }, // Step 5
    { left: 45, top: 50 }, // Step 6
    { left: 55, top: 60 }, // Step 7
    { left: 65, top: 60 }, // Step 8
    { left: 75, top: 50 }, // Step 9
    { left: 75, top: 30 }, // Step 10
    { left: 85, top: 20 }, // Step 11
    { left: 90, top: 35 }, // Step 12
    { left: 90, top: 55 }, // Step 13
    { left: 85, top: 75 }, // Step 14
    { left: 95, top: 90 }  // Step 15 (End point / Treasure)
  ];

  // Keep character safely inside array bounds
  const safeIndex = Math.min(currentIndex, path.length - 1);
  const charPos = path[safeIndex];
  
  // Monster Chase Logic based on Strikes
  // Monster Chase Logic
  let monsterPos = { left: charPos.left, top: charPos.top }; 
  let monsterOpacity = 0;
  let monsterScale = 1; // Normal size

  if (strikes === 1) {
    monsterPos = { left: charPos.left - 15, top: charPos.top - 15 }; // Further away!
    monsterOpacity = 1;
    monsterScale = 1; // Stays small
  } else if (strikes === 2) {
    monsterPos = { left: charPos.left - 8, top: charPos.top - 8 };  // Getting closer
    monsterOpacity = 1;
    monsterScale = 1; // Stays small
  } else if (strikes >= 3) {
    monsterPos = charPos; // Overlaps character completely
    monsterOpacity = 1;
    monsterScale = 1.8; // Grows BIG to eat the character!
  }

  return (
    <div className="maze-scene-grid">
      
      {/* 1. THE TREASURE (Always at the very last coordinate) */}
      <div className="maze-entity" style={{ left: `${path[path.length - 1].left}%`, top: `${path[path.length - 1].top}%` }}>
        <img src="/assets/treasure-chest.png" alt="Treasure" className="sprite" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
        <span className="fallback-sprite" style={{ display: 'none' }}>📦</span>
      </div>

      {/* 2. ALL REMAINING DOORS LINED UP ON THE PATH */}
      {path.map((pos, index) => {
        // Hide doors we already passed, and don't put a door on the treasure chest
        if (index <= currentIndex || index === path.length - 1) return null; 
        
        // Only the door directly in front of the player animates open
        const isActiveGate = (index === currentIndex + 1);

        return (
          <div 
            key={index}
            className={`maze-entity ${isActiveGate && isSuccess ? 'gate-open' : ''}`}
            style={{ 
              left: `${pos.left}%`, 
              top: `${pos.top}%`,
              zIndex: 1
            }}
          >
           <img src="/assets/gate.png" alt="Gate" className="sprite gate-sprite" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            <span className="fallback-sprite" style={{ display: 'none' }}>🚪</span>
          </div>
        );
      })}

      {/* 3. THE MONSTER */}
      {/* 3. THE MONSTER */}
      <div 
        className="maze-entity"
        style={{ 
          left: `${monsterPos.left}%`, 
          top: `${monsterPos.top}%`,
          opacity: monsterOpacity,
          transform: `translate(-50%, -50%) scale(${monsterScale})`, /* Applies the scale! */
          zIndex: 3
        }}
      >
        <img src="/assets/monster.png" alt="Monster" className="sprite monster-sprite" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
        <span className="fallback-sprite" style={{ display: 'none' }}>👾</span>
      </div>

      {/* 4. THE CHARACTER */}
      <div 
        className={`maze-entity ${isSuccess ? 'bounce' : ''} ${isError ? 'shake' : ''}`}
        style={{ 
          left: `${charPos.left}%`, 
          top: `${charPos.top}%`,
          opacity: strikes >= 3 ? 0 : 1, // Character disappears if eaten!
          zIndex: 2
        }}
      >
        <img src="/assets/character.png" alt="Character" className="sprite" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
        <span className="fallback-sprite" style={{ display: 'none' }}>🏃</span>
      </div>
      
    </div>
  );
};

export default MazeScene;