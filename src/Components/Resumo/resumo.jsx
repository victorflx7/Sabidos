import React from 'react'
import './resumo.css'

const resumo = () => {
  return (
    <div>
      <main>
        <div className='container'>
          <div className='blocoesquerdo'>
            <div className='bloquinho'>Aula de Química
            <p><br></br>04/02</p>
              </div>
            <div className='bloquinho'>Aula de Biologia
            <p><br></br>04/02</p>
            </div>
            <div className='bloquinho'>Aula de História
            <p><br></br>04/02</p>
            </div>
            <div className='bloquinho'>Aula de Química
            <p><br></br>04/02</p>
              </div>
              <div className='bloquinho'>Aula de Química
            <p><br></br>04/02</p>
              </div>
              <div className='bloquinho'>Aula de Química
            <p><br></br>04/02</p>
              </div>
              <div className='bloquinho'>Aula de Química
            <p><br></br>04/02</p>
              </div>
          </div>
        <div className='blocodireito'>
        <input type="text" className='input' placeholder='Título'/>
        <input type="text" className='input2' placeholder='Digite aqui a descrição'/>  
        <button className='botao1'>
          <img src="485.svg" className='imagem1'/></button>
        </div>
        </div>
      </main>
    </div>
  )
}

export default resumo
