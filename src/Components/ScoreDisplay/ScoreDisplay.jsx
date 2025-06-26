import React, { useEffect, useState } from 'react';
import { useScore } from '../../context/ScoreContext';
import './ScoreDisplay.css';

const ScoreDisplay = () => {
  const { score } = useScore();
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (score !== displayScore) {
      setIsAnimating(true);
      
      
      const increment = score > displayScore ? 1 : -1;
      const timer = setInterval(() => {
        setDisplayScore(prev => {
          if ((increment > 0 && prev >= score) || (increment < 0 && prev <= score)) {
            clearInterval(timer);
            setIsAnimating(false);
            return score;
          }
          return prev + increment;
        });
      }, 30);
      
      return () => clearInterval(timer);
    }
  }, [score, displayScore]);

  return (
    <div className={`score-display ${isAnimating ? 'animating' : ''}`}>
      <div className="score-icon">🏆</div>
      <div className="score-value">{displayScore}</div>
      <div className="score-label">Pontos</div>
    </div>
  );
};

export default ScoreDisplay;