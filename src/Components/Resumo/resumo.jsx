import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config'; // Assuming you have a firebase config file
import './resumo.css';

const Resumo = () => {
  const [resumos, setResumos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [editando, setEditando] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  const salvarResumo = async (e) => {
    e.preventDefault();

    if (titulo.trim() === "" && desc.trim() === "") {
      window.alert("Sem título, nem descrição? Aí você me quebra, sabido!");
      return;
    }

    if (titulo.trim() === "") {
      window.alert("Parece que você esqueceu de inserir um título!");
      return;
    }

    if (desc.trim() === "") {
      window.alert("Parece que você esqueceu de inserir uma descrição!");
      return;
    }

    const agora = new Date();
    const dia = agora.getDate();
    const mes = agora.getMonth() + 1;
    let dataForm = "";

    if (mes < 10) {
      dataForm = `${dia}/0${mes}`;
    } else {
      dataForm = `${dia}/${mes}`;
    }

    if (editando) {
      const resumosAtualizados = [...resumos];
      resumosAtualizados[indexEdicao] = {
        titulo,
        desc,
        data: dataForm,
      };
      setResumos(resumosAtualizados);
      setEditando(false);
      setIndexEdicao(null);
    } else {
      const novoResumo = {
        titulo,
        desc,
        data: dataForm,
      };
      setResumos([...resumos, novoResumo]);
    }

    setTitulo("");
    setDesc("");

    try {
      await addDoc(collection(db, "events"), {
        userId: userId,
        titulo: titulo,
        desc: desc,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Erro ao salvar evento: ", error);
    }
  }

  const delResumo = (indexDel) => {
    const resumosUpd = resumos.filter((resumo, index) => index !== indexDel);
    setResumos(resumosUpd);
  }

  const editResumo = (indexEdt) => {
    const resumoSelec = resumos[indexEdt];
    setTitulo(resumoSelec.titulo);
    setDesc(resumoSelec.desc);
    setEditando(true);
    setIndexEdicao(indexEdt);
  }

  const criarResumo = () => {
    setEditando(false);
    setIndexEdicao(null);
    setTitulo("");
    setDesc("");
  }

  return (
    <>
      <div>
        <main>
          <div className='container'>
            <div className="blocoesquerdo">
              {resumos.map((resumo, index) => (
                <div className="bloquinho" key={index}>
                  {resumo.titulo}
                  <p><br />{resumo.data}</p>
                  <button className='btn_del' onClick={() => delResumo(index)}>X</button>
                  <button className='btn_edt' onClick={() => editResumo(index)}>O</button>
                </div>
              ))}
            </div>
            <div className='blocodireito'>
              <input type="text" className='inputTitulo' placeholder='Título' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
              <textarea type="text" className='inputDesc' placeholder='Digite aqui a descrição' value={desc} onChange={(e) => setDesc(e.target.value)} />
              <button className='botao1' onClick={salvarResumo}>
                <img src="485.svg" className='imagem1' alt="Save" />
              </button>
              <button className='btn_novo' onClick={criarResumo}>+</button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Resumo;