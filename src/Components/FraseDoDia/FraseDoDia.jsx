
import React, { useEffect, useState } from 'react';
import { getFraseMotivacional } from '../../services/frasesApi';

const FraseDoDia = () => {
  const [frase, setFrase] = useState("Carregando...");

  useEffect(() => {
    async function carregar() {
      const texto = await getFraseMotivacional();
      setFrase(texto);
    }
    carregar();
  }, []);

  return (
    <>
    <div className="bg-blue-50 text-gray-800 p-4 rounded-xl shadow-md mb-4 animate-fade-in">
      <h2 className="text-center text-lg italic">"{frase}"</h2>
    </div></>
  );
};

export default FraseDoDia;
