import React from 'react'
import { Link } from 'react-router-dom';

import './home.css'
// import Header from '../../Components/Header/Header'
// import Naveg from '../../Components/Naveg'


export default function Home() {
  return (
    <div className="container">
      <div className="bloco esquerda">
        <img src="frame2.svg" className='logo1'/>
        <p className='texto1'>Organize seus estudos <br /> de forma <span className="sublinhado">fácil</span></p>
        <button className='botao'>
          <a>Cadastre-se ! É grátis</a>
        </button>
        <a className='sub'><br />Já tem uma conta? Entre !</a>
      </div>
      <div className="bloco direita">
        <p className='texto2'>Trabalhe de qualquer lugar</p>
        <div className='bloco2'>
        <img src="logo2.svg" className='logo2'/>
        <a className='texto3'><br />
        Mantenha as informações<br></br>importantes à mão; suas<br></br>notas sincronizam<br></br>automaticamente em todos<br></br>os seus dispositivos.</a></div>
        </div>
    </div>
  )
}