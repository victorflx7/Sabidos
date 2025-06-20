import React, { useState, useEffect, useRef } from 'react';
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase/config'; 
import './CircularTimer.css';

const ProgressoCircular = () => {
 
  const [tempo, setTempo] = useState(0);
  const [tempoMaximo, setTempoMaximo] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [entrada, setEntrada] = useState('15:00');
  const [modoDescanso, setModoDescanso] = useState(false);
  
  
  const [ciclos, setCiclos] = useState(3);
  const [cicloAtual, setCicloAtual] = useState(0);
  const [tempoDescansoCurto, setTempoDescansoCurto] = useState('5:00');
  const [tempoDescansoLongo, setTempoDescansoLongo] = useState(15);
  const [temposTrabalho, setTemposTrabalho] = useState([]);
  const [temposDescanso, setTemposDescanso] = useState([]);

 
  const audioFoco = useRef(null);
  const audioDescanso = useRef(null);
  const audioLongo = useRef(null);
  
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    let intervalo = null;

    if (ativo && !pausado && tempo > 0) {
      intervalo = setInterval(() => {
        setTempo((t) => t - 1);
      }, 1000);
    } else if (tempo === 0 && ativo && !pausado) {
      if (!modoDescanso) {
        
        audioFoco.current?.play();
        setTemposTrabalho([...temposTrabalho, formatarTempo(tempoMaximo)]);
        iniciarDescanso();
      } else {
        
        setTemposDescanso([...temposDescanso, formatarTempo(tempoMaximo)]);
        
        if (cicloAtual < ciclos - 1) {
          
          audioDescanso.current?.play();
          iniciarFoco();
          setCicloAtual(cicloAtual + 1);
        } else {
         
          audioLongo.current?.play();
          iniciarDescansoLongo();
        }
      }
    }

    return () => clearInterval(intervalo);
  }, [ativo, pausado, tempo, cicloAtual, ciclos]);

  const converterParaSegundos = (tempoStr) => {
    const [minutos, segundos] = tempoStr.split(':').map(Number);
    return minutos * 60 + segundos;
  };

  const iniciarFoco = () => {
    const segundos = converterParaSegundos(entrada);
    setTempo(segundos);
    setTempoMaximo(segundos);
    setModoDescanso(false);
    setAtivo(true);
  };

  const iniciarDescanso = () => {
    const segundos = converterParaSegundos(tempoDescansoCurto);
    setTempo(segundos);
    setTempoMaximo(segundos);
    setModoDescanso(true);
  };

  const iniciarDescansoLongo = () => {
    const segundos = tempoDescansoLongo * 60;
    setTempo(segundos);
    setTempoMaximo(segundos);
    setModoDescanso(true);
  };

  const resetar = () => {
    setAtivo(false);
    setTempo(0);
    setTempoMaximo(0);
    setModoDescanso(false);
    setCicloAtual(0);
    setPausado(false);
    setTemposTrabalho([]);
    setTemposDescanso([]);
  };

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const progresso = tempoMaximo > 0 ? (tempo / tempoMaximo) * 100 : 0;
  const corFundo = modoDescanso ? '#1E90FF' : '#C52333';
  const corProgresso = modoDescanso ? '#A8D3FF' : '#ECB5B9';

  const salvarDadosPomodoro = async () => {
    try {
      await addDoc(collection(db, "pomodoro"), {
        userId,
        ciclosConcluidos: ciclos,
        temposTrabalho,
        temposDescanso,
        data: new Date().toLocaleDateString('pt-BR'),
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro ao salvar pomodoro:", error);
    }
  };

  
  const renderizarCiclos = () => {
    const items = [];
    for (let i = 0; i < ciclos; i++) {
      items.push(
        <div key={`trabalho-${i}`} className={`ciclo-box ${i < cicloAtual ? 'completo' : ''} ${!modoDescanso && i === cicloAtual ? 'ativo' : ''}`}>
          🍅
        </div>
      );
      
      if (i < ciclos - 1) {
        items.push(
          <div key={`descanso-${i}`} className={`ciclo-box ${i < cicloAtual ? 'completo' : ''} ${modoDescanso && i === cicloAtual ? 'ativo' : ''}`}>
            😌
          </div>
        );
      } else {
        items.push(
          <div key="descanso-longo" className={`ciclo-box ${cicloAtual >= ciclos ? 'ativo' : ''}`}>
            🛌
          </div>
        );
      }
    }
    return items;
  };

  return (
    <div className="pomodoro-container">
      <div className="config-container">
        <div className="config-box">
          <label>Trabalho Focado</label>
          <input
            type="text"
            placeholder="MM:SS"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
          />
        </div>
        
        <div className="config-box">
          <label>Nº de Ciclos</label>
          <input
            type="number"
            value={ciclos}
            onChange={(e) => setCiclos(Number(e.target.value))}
            min="1"
          />
        </div>

        <div className="config-box">
          <label>Descanso Curto</label>
          <input
            type="text"
            placeholder="MM:SS"
            value={tempoDescansoCurto}
            onChange={(e) => setTempoDescansoCurto(e.target.value)}
          />
        </div>

        <div className="config-box">
          <label>Descanso Longo (min)</label>
          <input
            type="number"
            value={tempoDescansoLongo}
            onChange={(e) => setTempoDescansoLongo(Number(e.target.value))}
            min="1"
          />
        </div>
      </div>

      <div className="timer-container">
        <audio ref={audioFoco} src="/som-foco.mp3" />
        <audio ref={audioDescanso} src="/som-descanso.mp3" />
        <audio ref={audioLongo} src="/som-descanso-longo.mp3" />

        <div className="circular-progress">
          <svg width="230" height="230" viewBox="0 0 130 130">
            <g transform="translate(65, 65)">
              <circle cx="0" cy="0" r="45" fill={corFundo} />
              <circle
                cx="0"
                cy="0"
                r="55"
                fill="none"
                stroke={corProgresso}
                strokeWidth="8"
                strokeDasharray="345.6"
                strokeDashoffset={(1 - progresso / 100) * 345.6}
                strokeLinecap="round"
                transform="rotate(-90)"
              />
              <text className="timer-text" x="0" y="-20">
                {formatarTempo(tempo)}
              </text>
              <text className="timer-emoji" x="0" y="16">
                {modoDescanso ? '😌' : '🍅'}
              </text>
            </g>
          </svg>
        </div>

        <div className="timer-controls">
          <button className="botaoiniciar" onClick={iniciarFoco} disabled={ativo}>
            Iniciar
          </button>
          <div className='botaobaixo'>
          <button onClick={() => setPausado(!pausado)} disabled={!ativo}>
            {pausado ? 'Continuar' : 'Pausar'}
          </button>
          <button onClick={resetar}>Resetar</button>
        </div>
        </div>
      </div>

      <div className="ciclos-container">
        {renderizarCiclos()}
      </div>
    </div>
  );
};

export default ProgressoCircular;