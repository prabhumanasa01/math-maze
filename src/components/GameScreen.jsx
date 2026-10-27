import React, { useState, useEffect } from 'react';
import { questionBank } from '../data/questions';
import { shuffleAndSelect } from '../utils/shuffleQuestions';
import { calculateScore } from '../utils/scoring';
import { useTimer } from '../hooks/useTimer';
import MazeScene from './MazeScene';
import QuestionPanel from './QuestionPanel';
import Notification from './Notification';
import QuitModal from './QuitModal';
import CoinCounter from './CoinCounter';

const GameScreen = ({ playerName, onEndGame }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showQuit, setShowQuit] = useState(false);
  const [feedback, setFeedback] = useState(null); 

  useEffect(() => {
    const count = Math.min(15, questionBank.length); 
    setQuestions(shuffleAndSelect(questionBank, count));
  }, []);

  const handleTimeout = () => {
    if(isPaused || feedback) return;
    handleAnswer(null, true);
  };

  const { timeLeft, resetTimer, elapsed } = useTimer(30, isPaused || feedback !== null, handleTimeout);

  const handleAnswer = (selectedOption, isTimeout = false) => {
    const currentQ = questions[currentIndex];
    const isCorrect = !isTimeout && selectedOption === currentQ.correctAnswer;
    
    if (isCorrect) {
      const coinsEarned = calculateScore(elapsed);
      setScore(prev => prev + coinsEarned);
      setStrikes(0);
      setFeedback({ type: 'success', coins: coinsEarned });
    } else {
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      
      if (newStrikes >= 3) {
        // Show the error feedback so the UI flashes while the monster attacks
        setFeedback({ type: 'error', coins: 0, warning: true, isGameOver: true });
        
        // Wait 1.5 seconds so the monster animation can finish, THEN open the result page!
        setTimeout(() => {
          onEndGame({ 
            status: 'game_over', 
            score: score, 
            correct: currentIndex, 
            attempted: currentIndex + 1 
          });
        }, 1500);
        return; // Stops the rest of the code from running so it doesn't try to go to the next question
      }
      
      setFeedback({ type: 'error', coins: 0, warning: newStrikes === 2 });
    }

    // This runs for correct answers, or strikes 1 and 2
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        resetTimer();
      } else {
        onEndGame({ status: 'completed', score, correct: currentIndex + 1, attempted: 15 });
      }
    }, 2000); 
  };

  if (questions.length === 0) return <div>Loading Maze...</div>;

  return (
    <div className="game-screen">
      <div className="hud">
        <div className="hud-left">
          <span className="player-name">{playerName}</span>
          <span className="progress">Q: {currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="hud-right">
          <CoinCounter score={score} />
          <button className="btn-quit" onClick={() => { setIsPaused(true); setShowQuit(true); }}>Quit</button>
        </div>
      </div>

      <div className="game-main">
        <MazeScene 
          feedback={feedback} 
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          strikes={strikes} 
        />
        <QuestionPanel 
          question={questions[currentIndex]} 
          timeLeft={timeLeft} 
          onAnswer={handleAnswer} 
          disabled={feedback !== null}
        />
      </div>

      {feedback && <Notification playerName={playerName} feedback={feedback} />}
      {showQuit && <QuitModal score={score} qNum={currentIndex+1} onResume={() => { setShowQuit(false); setIsPaused(false); }} onConfirm={() => onEndGame({ status: 'quit', score, correct: currentIndex, attempted: currentIndex })} />}
    </div>
  );
};

export default GameScreen;