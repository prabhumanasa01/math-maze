import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, result
  const [playerName, setPlayerName] = useState('');
  const [finalStats, setFinalStats] = useState(null);

  const startGame = (name) => {
    setPlayerName(name);
    setGameState('playing');
  };

  const endGame = (stats) => {
    setFinalStats(stats);
    setGameState('result');
  };

  const resetToHome = () => {
    setGameState('welcome');
    setPlayerName('');
    setFinalStats(null);
  };

  return (
    <div className="app-container">
      {gameState === 'welcome' && <WelcomeScreen onPlay={startGame} />}
      {gameState === 'playing' && <GameScreen playerName={playerName} onEndGame={endGame} />}
      {gameState === 'result' && <ResultScreen stats={finalStats} playerName={playerName} onPlayAgain={() => setGameState('playing')} onHome={resetToHome} />}
    </div>
  );
}

export default App;