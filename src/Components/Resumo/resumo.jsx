import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './resumo.css';

const Resumo = () => {
  const [resumos, setResumos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null); // Agora vamos usar o ID do documento
  const [sucesso, setSucesso] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  const Desativar = () => {
    setSucesso(false);
    

  };

  // Carrega os resumos do Firestore quando o componente monta ou quando o userId muda
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
    e.preventDefault();

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
        // Atualiza no Firestore
        await updateDoc(doc(db, "resumos", idEdicao), {
          titulo,
          desc,
          data: dataFormatada,
          atualizadoEm: new Date().toISOString()
        });
        
        // Atualiza localmente
        setResumos(resumos.map(resumo => 
          resumo.id === idEdicao ? { ...resumo, titulo, desc, data: dataFormatada } : resumo
        ));
      } else {
        // Adiciona novo no Firestore
        const docRef = await addDoc(collection(db, "resumos"), {
          userId,
          titulo,
          desc,
          data: dataFormatada,
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString()
        });
        
        // Adiciona localmente
        setResumos([...resumos, {
          id: docRef.id,
          titulo,
          desc,
          data: dataFormatada
        }]); 
        setSucesso(true);
      }

      // Limpa o formulário
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
      // Remove do Firestore
      await deleteDoc(doc(db, "resumos", id));
      
      // Remove localmente
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
            <button className='botao1' onClick={salvarResumo}>
              <img src="485.svg" className='imagem1' alt="Salvar" />
            </button>
            <button className='btn_novo' onClick={novoResumo}>+</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resumo;