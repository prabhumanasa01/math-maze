import React from 'react';

const Notification = ({ playerName, feedback }) => {
  const successMessages = [`Well done, ${playerName}!`, `Fabulous job, ${playerName}!`, `Brilliant, ${playerName}!`, `You're on fire, ${playerName}!`];
  const errorMessages = [`Oops! Not quite.`, `Keep going, ${playerName}!`, `Let's try the next challenge.`];
  const randomMsg = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (feedback.type === 'success') {
    return (
      <div className="notification success">
        <div className="coin-burst">
          <img src="/assets/coin.png" width="30" alt="coin" />
          <img src="/assets/coin.png" width="30" alt="coin" />
          <img src="/assets/coin.png" width="30" alt="coin" />
        </div>
        <h3>{randomMsg(successMessages)}</h3>
        <p className="coin-reward">+{feedback.coins} coins!</p>
      </div>
    );
  }

  return (
    <div className="notification error">
      <h3>{feedback.warning ? "Careful! One more mistake ends the game." : randomMsg(errorMessages)}</h3>
      <p>+0 coins</p>
    </div>
  );
};

export default Notification;