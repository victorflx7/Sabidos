import React, { createContext, useState, useContext } from 'react';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  
  const addScore = (points) => {
    setScore(prevScore => prevScore + points);
  };

  return (
    <ScoreContext.Provider value={{ score, addScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  return useContext(ScoreContext);
};