import React, { useState, useEffect } from 'react';

const CircleProgressBar = ({ duration = 10 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - (100 / (duration * 10)); // Divide em 10 atualizações por segundo
      });
    }, 100); // Atualiza a cada 100ms

    return () => clearInterval(interval);
  }, [duration]);

  // Calcula o comprimento da circunferência (2πr) e quanto deve ser "desenhado"
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Fundo do círculo (opcional) */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="10"
        />
        {/* Círculo de progresso */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#4CAF50"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 60 60)" // Começa do topo
        />
        {/* Texto com porcentagem */}
        <text
          x="60"
          y="65"
          textAnchor="middle"
          fontSize="20"
          fill="#333"
        >
          {Math.round(progress)}%
        </text>
      </svg>
    </div>
  );
};

export default CircleProgressBar;