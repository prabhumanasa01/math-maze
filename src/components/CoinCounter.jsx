import React from 'react';

const CoinCounter = ({ score }) => {
  return (
    <div className="coins">
      🪙 {score} Coins
    </div>
  );
};

export default CoinCounter;