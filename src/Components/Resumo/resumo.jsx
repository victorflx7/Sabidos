import React, { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './resumo.css';
import { registrarEvento } from '../../services/analytics/analyticsEvents'; 
import { incrementarContadorEvento } from '../../services/analytics/analyticsEvents';

const Resumo = () => {
  const [resumos, setResumos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [editando, setEditando] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null); 
  const [sucesso, setSucesso] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;


  const Desativar = () => {
    setSucesso(false);
  };
  useEffect(() => {
    if (userId) {
      carregarResumos();
    }
    
  }, [userId]);

  const carregarResumos = async () => {
    try {
      const q = query(collection(db, "resumos"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      const resumosCarregados = [];
      querySnapshot.forEach((doc) => {
        resumosCarregados.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setResumos(resumosCarregados);
    } catch (error) {
      console.error("Erro ao carregar resumos: ", error);
    }
  };

  const salvarResumo = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!titulo.trim() && !desc.trim()) {
      window.alert("Sem título, nem descrição? Aí você me quebra, sabido!");
      return;
    }

    if (!titulo.trim()) {
      window.alert("Parece que você esqueceu de inserir um título!");
      return;
    }

    if (!desc.trim()) {
      window.alert("Parece que você esqueceu de inserir uma descrição!");
      return;
    }
    

    const dataFormatada = formatarData(new Date());

    try {
      if (editando && idEdicao) {

        await updateDoc(doc(db, "resumos", idEdicao), {
          titulo,
          desc,
          data: dataFormatada,
          atualizadoEm: new Date().toISOString()
        });

        setResumos(resumos.map(resumo => 
          resumo.id === idEdicao ? { ...resumo, titulo, desc, data: dataFormatada } : resumo
        ));
      } else {
        const docRef = await addDoc(collection(db, "resumos"), {
          userId,
          titulo,
          desc,
          data: dataFormatada,
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
          favoritos: [] 
        });

        setResumos([...resumos, {
          id: docRef.id,
          titulo,
          desc,
          data: dataFormatada,
          favoritos: []
        }]);
          setSucesso(true);
      }
      registrarEvento('criou_resumo', {
        titulo: titulo,
        Conteudo: desc,
        caracteres: desc.length,
        data: new Date().toISOString()
      });
      incrementarContadorEvento('criou_resumo');


      setTitulo("");
      setDesc("");
      setEditando(false);
      setIdEdicao(null);
    } catch (error) {
      console.error("Erro ao salvar resumo: ", error);
    }
  };
  
  const deletarResumo = async (id) => {
    try {
      await deleteDoc(doc(db, "resumos", id));
      setResumos(resumos.filter(resumo => resumo.id !== id));
    } catch (error) {
      console.error("Erro ao deletar resumo: ", error);
    }
  };

  const editarResumo = (id) => {
    const resumoSelecionado = resumos.find(resumo => resumo.id === id);
    if (resumoSelecionado) {
      setTitulo(resumoSelecionado.titulo);
      setDesc(resumoSelecionado.desc);
      setEditando(true);
      setIdEdicao(id);
    }
  };

  // FAVORITOS
  const toggleFavorito = async (resumoId, favoritos = []) => {
    if (!userId) return;
    const resumoRef = doc(db, "resumos", resumoId);
    try {
      if (favoritos.includes(userId)) {
        await updateDoc(resumoRef, {
          favoritos: arrayRemove(userId)
        });
        setResumos(resumos.map(r =>
          r.id === resumoId
            ? { ...r, favoritos: r.favoritos?.filter(fav => fav !== userId) }
            : r
        ));
      } else {
        await updateDoc(resumoRef, {
          favoritos: arrayUnion(userId)
        });
        setResumos(resumos.map(r =>
          r.id === resumoId
            ? { ...r, favoritos: [...(r.favoritos || []), userId] }
            : r
        ));
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const formatarData = (data) => {
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    return `${dia}/${mes < 10 ? '0' + mes : mes}`;
  };

  
  const novoResumo = () => {
    setTitulo("");
    setDesc("");
    setEditando(false);
    setIdEdicao(null);
  };

  const autosaveTimeout = useRef(null);

  useEffect(() => {
    if (!titulo.trim() && !desc.trim()) return; 

    if (autosaveTimeout.current) clearTimeout(autosaveTimeout.current);

    autosaveTimeout.current = setTimeout(() => {
      if (titulo.trim() && desc.trim()) {
        salvarResumo({ preventDefault: () => {} });
      }
    }, 3000);

    return () => clearTimeout(autosaveTimeout.current);
  }, [titulo, desc]);


  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Este navegador não suporta a Web Speech API');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setDesc((prevDesc) => prevDesc + '' + transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      const liveTextDiv = document.getElementById('live-text');
      if (liveTextDiv) liveTextDiv.innerText = interimTranscript;
    };

    recognitionRef.current = recognition;

  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
      
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      document.getElementById('live-text').innerText = '';
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div>
      <main>
        <div className='container'>
          <div className="blocoesquerdo">
            {resumos.map((resumo) => (
              <div className="bloquinho" key={resumo.id}>
                <h3>{resumo.titulo}</h3>
                <p>{resumo.desc}</p>
                <small>{resumo.data}</small>
                <div className="acoes">
                  <button className='btn_del' onClick={() => deletarResumo(resumo.id)}>X</button>
                  <button className='btn_edt' onClick={() => editarResumo(resumo.id)}>O</button>
                  <button
                    className={`btn_fav ${resumo.favoritos?.includes(userId) ? 'favorito' : ''}`}
                    onClick={() => toggleFavorito(resumo.id, resumo.favoritos || [])}
                    title={resumo.favoritos?.includes(userId) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    ★
                  </button>
                </div>
              </div>
            ))}
          </div>
          {sucesso && (
          <div className='textosucesso' onClick={Desativar}>
            <h1>Seu resumo foi salvo com sucesso !</h1>
          </div>
          )}
          <div className='blocodireito'>
            <input 
              type="text" 
              className='inputTitulo' 
              placeholder='Título' 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
            />
            <textarea 
              className='inputDescricao' 
              placeholder='Digite aqui a descrição' 
              value={desc}
              onChange={(e) => setDesc(e.target.value)} 
            />
            <button 
              onClick={handleMicClick}
              style = {{
                padding: '10px 20px',
                backgroundColor: isListening ? '#f44336' : '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              >
                {isListening ? 'Parar 🎤' : 'Iniciar 🎤'}
              </button>

              <div style={{marginTop: '10px', fontSize: '14px', color: '#333'}}>
                <strong>
                  <br />Texto ao vivo:
                </strong>
                <p id="live-text" style={{background: '#eee', padding: '5px', minHeight: '20px'}}></p>
              </div>

            <button className='botao1' onClick={salvarResumo}>
              <img src="485.svg" className='imagem1' alt="Salvar" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resumo;
