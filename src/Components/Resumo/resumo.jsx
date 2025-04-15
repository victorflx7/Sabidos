import React, { useState } from 'react'
import './resumo.css'


const resumo = () => {
  const [resumos, setResumos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");

  const salvarResumo = () => {

    if (titulo.trim() === "" && desc.trim() === ""){
      window.alert("Sem título, nem descrição? Aí você me quebra, sabido!")
    return;
    }

    if (titulo.trim() === ""){
      window.alert("Parece que você esqueceu de inserir um título!")
      return;
    };

    if (desc.trim() === ""){
      window.alert("Parece que você esqueceu de inserir uma descrição!")
      return;
    };


    const agora = new Date();
    const dia = agora.getDate();
    const mes = agora.getMonth() + 1;
    const dataForm = `${dia}/${mes}`;
    const novoResumo = {
      titulo,
      desc,
      data: dataForm,
    };
    setResumos ([...resumos, novoResumo]);
    setTitulo("");
    setDesc("");
  }
  return (
    <div>
      <main>
        <div className='container'>
          <div className="blocoesquerdo">
            {resumos.map((resumo, index) => (
            <div className="bloquinho" key={index}>
              {resumo.titulo}
              <p><br />{resumo.data}</p>
            </div>
            ))}
          </div>
          <div className='blocodireito'>
          <input type="text" className='inputTitulo' placeholder='Título' value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
          <input type="text" className='inputDesc' placeholder='Digite aqui a descrição' value={desc} onChange={(e) => setDesc(e.target.value)}/>  
          <button className='botao1' onClick={salvarResumo}>
            <img src="485.svg" className='imagem1'/>
          </button>
        </div>
        </div>
      </main>
    </div>
  )
}

export default resumo;
