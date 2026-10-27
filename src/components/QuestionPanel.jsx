import React from 'react';

const QuestionPanel = ({ question, timeLeft, onAnswer, disabled }) => {
  if (!question) return null;

  return (
    <div className="question-panel">
      <div className="timer-bar-container">
        <div 
          className={`timer-bar ${timeLeft <= 5 ? 'timer-danger' : ''}`} 
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        ></div>
      </div>
      <div className="timer-text">⏳ {timeLeft}s remaining</div>
      
      <div className="question-content">
        <span className="category-badge">{question.category}</span>
        <h2 className="question-text">{question.question}</h2>
        
        <div className="options-grid">
          {question.options.map((option, index) => (
            <button 
              key={index} 
              className="btn-option" 
              onClick={() => onAnswer(option)}
              disabled={disabled}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;