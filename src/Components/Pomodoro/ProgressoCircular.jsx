import React, { useState, useEffect, useRef } from 'react';
import './CircularTimer.css'

const ProgressoCircular = () => {
  const [tempo, setTempo] = useState(0);
  const [tempoMaximo, setTempoMaximo] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [entrada, setEntrada] = useState('');
  const [modoDescanso, setModoDescanso] = useState(false);
  const [ciclos, setCiclos] = useState(3);
  const [cicloAtual, setCicloAtual] = useState(0);
  const [tempoDescansoCurto, setTempoDescansoCurto] = useState(5);
  const [tempoDescansoLongo, setTempoDescansoLongo] = useState(15);

  const audioFoco = useRef(null);
  const audioDescanso = useRef(null);
  const audioLongo = useRef(null);

  useEffect(() => {
    let intervalo = null;

    if (ativo && !pausado && tempo > 0) {
      intervalo = setInterval(() => {
        setTempo((t) => t - 1);
      }, 1000);
    } else if (tempo === 0 && ativo && !pausado) {
      if (!modoDescanso) {
        audioFoco.current?.play();
        iniciarDescanso();
      } else {
        const proximoCiclo = cicloAtual + 1;
        if (proximoCiclo < ciclos) {
          audioDescanso.current?.play();
          iniciarFoco();
          setCicloAtual(proximoCiclo);
        } else {
          audioLongo.current?.play();
          iniciarDescansoLongo();
        }
      }
    }

    return () => clearInterval(intervalo);
  }, [ativo, pausado, tempo, modoDescanso]);

  const iniciarFoco = () => {
    const partes = entrada.split(':');
    const minutos = parseInt(partes[0], 10) || 0;
    const segundos = parseInt(partes[1], 10) || 0;
    const total = minutos * 60 + segundos;

    setTempo(total);
    setTempoMaximo(total);
    setModoDescanso(false);
    setAtivo(true);
  };

  const iniciarDescanso = () => {
    const segundos = tempoDescansoCurto * 60;
    setTempo(segundos);
    setTempoMaximo(segundos);
    setModoDescanso(true);
  };

  const iniciarDescansoLongo = () => {
    const segundos = tempoDescansoLongo * 60;
    setTempo(segundos);
    setTempoMaximo(segundos);
    setModoDescanso(true);
    setCicloAtual(0); // Resetar
  };

  const resetar = () => {
    setAtivo(false);
    setTempo(0);
    setTempoMaximo(0);
    setEntrada('');
    setModoDescanso(false);
    setCicloAtual(0);
    setPausado(false);
  };

  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const progresso = tempoMaximo > 0 ? (tempo / tempoMaximo) * 100 : 0;
  const corFundo = modoDescanso ? '#1E90FF' : '#C52333';
  const corProgresso = modoDescanso ? '#A8D3FF' : '#ECB5B9';

  return (
    <>
    <div className='pomo-container' style={{ display: 'flex', alignItems: 'center', height: '80vh' ,justifyContent: 'space-around'}}>
      <div style={{ display: 'flex', alignItems: 'center', height: '80vh' ,justifyContent: 'space-around', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: "column",alignItems: 'center'}}><label >Trabalho Focado</label>
      <input
          type="text"
          placeholder="MM:SS"
          value={entrada}
          onChange={(e) => setEntrada(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}
        /></div>
        <div style={{display: 'flex', flexDirection: "column",alignItems: 'center'}}><label >Nº de Ciclo</label>
        <input
          type="number"
          value={ciclos}
          onChange={(e) => setCiclos(Number(e.target.value))}
          placeholder="Ciclos"
          
          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}

        /></div>

        <div style={{display: 'flex', flexDirection: "column",alignItems: 'center'}}><label >Descanso Curto</label>
        <input
          type="number"
          value={tempoDescansoCurto}
          onChange={(e) => setTempoDescansoCurto(Number(e.target.value))}
          placeholder="Descanso Curto"
          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}

        />
        </div>
        <div style={{display: 'flex', flexDirection: "column",alignItems: 'center'}}><label >Descanso Longo</label>
        <input
          type="number"
          value={tempoDescansoLongo}
          onChange={(e) => setTempoDescansoLongo(Number(e.target.value))}
          placeholder="Descanso Longo"
          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}

        /></div>

    </div>
    <div style={{ textAlign: 'center' }}>
      <audio ref={audioFoco} src="/som-foco.mp3" />
      <audio ref={audioDescanso} src="/som-descanso.mp3" />
      <audio ref={audioLongo} src="/som-descanso-longo.mp3" />

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
          <text x="0" y="-20" textAnchor="middle" style={{ fill: '#6E1C1C', stroke: '#601717', strokeWidth: 1.38, fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700 }}>
            {formatarTempo(tempo)}
          </text>
          <text x="0" y="16" textAnchor="middle" style={{ fill: '#6E1C1C', stroke: '#601717', strokeWidth: 1.38, fontFamily: 'Inter, sans-serif', fontSize: '40px', fontWeight: 700 }}>
            {modoDescanso ? '😌' : '🍅'}
          </text>
        </g>
      </svg>

      <div style={{ marginTop: '1rem' }}>
       <div className='botaocima'>
        <button onClick={iniciarFoco} className='botaoiniciar'>
          Iniciar
        </button>
        </div>
        <div className='botaobaixo'>
        <button className='botaobaixo1'onClick={() => setPausado(!pausado)} style={{ marginRight: '0.5rem' }}>
          {pausado ? 'Continuar' : 'Pausar'}
        </button>
        <button className='botaobaixo2'onClick={resetar}>Resetar</button>
        </div>
      </div>
    </div>

    <div>
      <div          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}
      ></div>
      <div          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}
      ></div>
      <div          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}
      ></div>
      <div          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}
      ></div>
      <div          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}
      ></div>
      <div          style={{ padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '80px', textAlign: 'center' }}
      ></div>
    </div>
    </div>
    </>
     );
};

export default ProgressoCircular;
