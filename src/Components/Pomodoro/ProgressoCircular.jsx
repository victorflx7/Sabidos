import React, { useState, useEffect } from 'react';

const ProgressoCircular = () => {
  const [progresso, setProgresso] = useState(100); // Começa em 100%
  
  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgresso(progressoAnterior => {
        if (progressoAnterior <= 0) {
          clearInterval(intervalo);
          return 0;
        }
        return progressoAnterior - 1; // Diminui 1% a cada intervalo
      });
    }, 100); // Atualiza a cada 100 milissegundos (0.1 segundos)
    
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="200" height="200" viewBox="0 0 100 100">
        {/* Círculo de fundo (cinza) */}
        <circle
          cx="50" 
          cy="50"
          r="40"
          fill="none"
          stroke="#eee"
          strokeWidth="8"
        />
        
        {/* Círculo de progresso (verde) */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="8"
          strokeDasharray="251.2"  // Circunferência = 2 * π * raio (2 * 3.14 * 40)
          strokeDashoffset={251.2 - (progresso / 100) * 251.2} // Controla o quanto aparece
          strokeLinecap="round"
        />
        
        {/* Texto com porcentagem */}
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="20"
          fill="#333"
        >
          {progresso}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressoCircular;