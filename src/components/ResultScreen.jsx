// import React from 'react';

// const ResultScreen = ({ stats, playerName, onPlayAgain, onHome }) => {
//   let title = "ADVENTURE ENDED";
//   if (stats.status === 'completed') title = "MAZE COMPLETED!";
//   if (stats.status === 'game_over') title = "GAME OVER";

//   return (
//     <div className="result-screen">
//       <div className="result-card">
//         <h1>{title}</h1>
//         <h2>Hero: {playerName}</h2>
//         <div className="stats-box">
//           <p className="final-score">Total Coins: 🪙 {stats.score}</p>
//           <p>Questions Attempted: {stats.attempted}</p>
         
//         </div>
//         <div className="result-actions">
//           <button className="btn-primary" onClick={onPlayAgain}>Play Again</button>
//           <button className="btn-secondary" onClick={onHome}>Back to Home</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultScreen;

// import React, { useState, useEffect } from 'react';

// const ResultScreen = ({ result, onRestart }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const isVictory = result.status === 'completed';

//   useEffect(() => {
//     // We wait 1.5 seconds before showing the score so the player can watch the chest explode!
//     const timer = setTimeout(() => {
//       setShowDetails(true);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="result-screen">
//       <div className="result-card-glass">
        
//         {isVictory ? (
//           /* 🏆 VICTORY ANIMATION */
//           <div className="victory-animation">
//             <div className="chest-container">
//               <img src="/assets/treasure-chest.png" alt="Chest" className="result-chest" />
              
//               {/* The Coin Fountain Explosion! */}
//               <div className="coin-fountain">
//                 {[...Array(12)].map((_, i) => (
//                   <img 
//                     key={i} 
//                     src="/assets/coin.png" 
//                     className={`fountain-coin fc-${i % 6}`} 
//                     alt="coin" 
//                   />
//                 ))}
//               </div>
//             </div>
//             <h1 className="title glow-text-gold">MAZE CONQUERED!</h1>
//           </div>
//         ) : (
//           /* 💀 GAME OVER ANIMATION */
//           <div className="game-over-animation">
//             <img src="/assets/monster.png" alt="Monster" className="result-monster" />
//             <h1 className="title glow-text-red">YOU WERE EATEN!</h1>
//           </div>
//         )}

//         {/* 📊 THE FINAL SCORECARD */}
//         <div className={`score-details ${showDetails ? 'show-details' : ''}`}>
          
//           <div className="stat-box">
//             <span className="stat-label">Final Score</span>
//             <span className="stat-value">
//               {result.score} <img src="/assets/coin.png" className="inline-coin" alt="coins"/>
//             </span>
//           </div>
          
//           <div className="stat-box">
//             <span className="stat-label">Questions Correct</span>
//             <span className="stat-value">{result.correct} / 15</span>
//           </div>

//           <button className="btn-primary pulse-btn mt-4" onClick={onRestart}>
//             Play Again
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ResultScreen;

import React, { useState, useEffect } from 'react';

const ResultScreen = ({ stats, playerName, onPlayAgain, onHome }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isVictory = stats?.status === 'completed';

  useEffect(() => {
    // We wait 1.5 seconds before showing the score so the player can watch the chest explode!
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!stats) return null; // Safety check

  return (
    <div className="result-screen">
      <div className="result-card-glass">
        
        {isVictory ? (
          /* 🏆 VICTORY ANIMATION */
          <div className="victory-animation">
            <div className="chest-container">
              <img src="/assets/treasure-chest.png" alt="Chest" className="result-chest" />
              
              {/* The Coin Fountain Explosion! */}
              <div className="coin-fountain">
                {[...Array(12)].map((_, i) => (
                  <img 
                    key={i} 
                    src="/assets/coin.png" 
                    className={`fountain-coin fc-${i % 6}`} 
                    alt="coin" 
                  />
                ))}
              </div>
            </div>
            <h1 className="title glow-text-gold">MAZE CONQUERED!</h1>
            <p className="subtitle">Amazing job, {playerName}!</p>
          </div>
        ) : (
          /* 💀 GAME OVER ANIMATION */
          <div className="game-over-animation">
            <img src="/assets/monster.png" alt="Monster" className="result-monster" />
            <h1 className="title glow-text-red">YOU WERE EATEN!</h1>
            <p className="subtitle">Better luck next time, {playerName}.</p>
          </div>
        )}

        {/* 📊 THE FINAL SCORECARD */}
        <div className={`score-details ${showDetails ? 'show-details' : ''}`}>
          
          <div className="stat-box">
            <span className="stat-label">Final Score</span>
            <span className="stat-value">
              {stats.score} <img src="/assets/coin.png" className="inline-coin" alt="coins"/>
            </span>
          </div>
          
          <div className="stat-box">
            <span className="stat-label">Questions Correct</span>
            <span className="stat-value">{stats.correct} / 15</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="mt-4">
            <button className="btn-primary pulse-btn" onClick={onPlayAgain}>
              Play Again
            </button>
            <button 
              className="btn-primary pulse-btn" 
              style={{ background: 'linear-gradient(135deg, #666, #444)', boxShadow: '0 5px 15px rgba(0,0,0,0.4)' }} 
              onClick={onHome}
            >
              Back to Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResultScreen;