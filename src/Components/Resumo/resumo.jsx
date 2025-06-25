import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, query, getDocs, doc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './resumo.css';
import { registrarEvento } from '../../services/analytics/analyticsEvents'; 
import { incrementarContadorEvento } from '../../services/analytics/analyticsEvents';
import { enviarEventoGTM } from '../../services/analytics/gtm';
import Tesseract from 'tesseract.js';

const Resumo = () => {
  const [resumos, setResumos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [editando, setEditando] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const autosaveTimeout = useRef(null);

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("Usuário não autenticado!");
    return null;
  }

  const uid = user.uid;

  const Desativar = () => setSucesso(false);

  useEffect(() => {
    carregarResumos();
  }, [uid]);

  const carregarResumos = async () => {
    try {
      const q = query(collection(db, "resumos", uid, "dados"));
      const querySnapshot = await getDocs(q);
      const resumosCarregados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResumos(resumosCarregados);
    } catch (error) {
      console.error("Erro ao carregar resumos: ", error);
    }
  };

  const salvarResumo = useCallback(async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (!titulo.trim() || !desc.trim()) {
      alert("Preencha título e descrição.");
      return;
    }

    const dataFormatada = formatarData(new Date());

    try {
      if (editando && idEdicao) {
        await updateDoc(doc(db, "resumos", uid, "dados", idEdicao), {
          titulo,
          desc,
          data: dataFormatada,
          atualizadoEm: new Date().toISOString()
        });
        
        enviarEventoGTM('edicao_resumo', {
          titulo: titulo,
          Conteudo: desc,
          caracteres: desc.length,
          data: new Date().toISOString()
});

        setResumos(resumos.map(resumo => resumo.id === idEdicao ? { ...resumo, titulo, desc, data: dataFormatada } : resumo));
      } else {
        const docRef = await addDoc(collection(db, "resumos", uid, "dados"), {
          titulo,
          desc,
          data: dataFormatada,
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
          favoritos: []
        });

        setResumos([...resumos, { id: docRef.id, titulo, desc, data: dataFormatada, favoritos: [] }]);
        setSucesso(true);
      }

      registrarEvento('criou_resumo', { titulo, Conteudo: desc, caracteres: desc.length, data: new Date().toISOString() });
      incrementarContadorEvento('criou_resumo');

      setTitulo("");
      setDesc("");
      setEditando(false);
      setIdEdicao(null);
    } catch (error) {
      console.error("Erro ao salvar resumo: ", error);
    }
  }, [titulo, desc, editando, idEdicao, resumos, uid]);

  const deletarResumo = async (id) => {
    try {
      await deleteDoc(doc(db, "resumos", uid, "dados", id));
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

  const toggleFavorito = async (resumoId, favoritos = []) => {
    const resumoRef = doc(db, "resumos", uid, "dados", resumoId);
    try {
      if (favoritos.includes(uid)) {
        await updateDoc(resumoRef, { favoritos: arrayRemove(uid) });
        setResumos(resumos.map(r => r.id === resumoId ? { ...r, favoritos: r.favoritos.filter(fav => fav !== uid) } : r));
      } else {
        await updateDoc(resumoRef, { favoritos: arrayUnion(uid) });
        setResumos(resumos.map(r => r.id === resumoId ? { ...r, favoritos: [...(r.favoritos || []), uid] } : r));
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const formatarData = (data) => `${data.getDate()}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setDesc((prev) => prev + "\n[Processando imagem... aguarde]");
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'por');
      setDesc((prevDesc) => prevDesc.replace("[Processando imagem... aguarde]", "") + "\n" + text);
    } catch (error) {
      console.error('Erro no OCR:', error);
      alert('Erro ao processar a imagem. Tente novamente.');
      setDesc((prevDesc) => prevDesc.replace("[Processando imagem... aguarde]", ""));
    }
  };

  useEffect(() => {
    if (autosaveTimeout.current) clearTimeout(autosaveTimeout.current);

    autosaveTimeout.current = setTimeout(() => {
      if (titulo.trim() && desc.trim()) {
        salvarResumo({ preventDefault: () => {} });
      }
    }, 3000);

    return () => clearTimeout(autosaveTimeout.current);
  }, [titulo, desc, salvarResumo]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setDesc((prev) => prev + ' ' + transcript);
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
                    className={`btn_fav ${resumo.favoritos?.includes(uid) ? 'favorito' : ''}`}
                    onClick={() => toggleFavorito(resumo.id, resumo.favoritos || [])}
                    title={resumo.favoritos?.includes(uid) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    ★
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sucesso && (
            <div className='textosucesso' onClick={Desativar}>
              <h1>Seu resumo foi salvo com sucesso!</h1>
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

            <button onClick={handleMicClick} style={{ padding: '10px 20px', backgroundColor: isListening ? '#f44336' : '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
              {isListening ? 'Parar 🎤' : 'Iniciar 🎤'}
            </button>

            <label className="botao-upload">
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              <span>📸 Importar do caderno (foto)</span>
            </label>

            <div style={{ marginTop: '10px', fontSize: '14px', color: '#333' }}>
              <strong><br />Texto ao vivo:</strong>
              <p id="live-text" style={{ background: '#eee', padding: '5px', minHeight: '20px' }}></p>
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
