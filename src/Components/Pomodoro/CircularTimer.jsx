import React, { useState, useEffect } from 'react';
import './CircularTimer.css'; // Criaremos este arquivo depois

const CircularTimer = () => {
  const [time, setTime] = useState(0); // Tempo em segundos
  const [isActive, setIsActive] = useState(false);

  // Efeito para o cronômetro
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, time]);

  // Funções para controlar o cronômetro
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
  };

  // Formatar o tempo (MM:SS)
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calcular o progresso do círculo (0-100)
  const progress = (time % 60) / 60 * 100; // Baseado em segundos (0-60)

  return (
    <div className="timer-container">
      <div className="circular-progress" style={{ background: `conic-gradient(#4CAF50 ${progress}%, #ddd ${progress}% 100%)` }}>
        <div className="progress-content">
          <span>{formatTime()}</span>
        </div>
      </div>
      <div className="timer-controls">
        <button onClick={toggleTimer}>
          {isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={resetTimer}>Resetar</button>
      </div>
    </div>
  );
};

export default CircularTimer;