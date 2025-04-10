import React from 'react'
import { Link } from 'react-router-dom';

import './home.css'



export default function Home() {


  return (
    <div className="home-container">
     
      <main>
        
          <h1>Bem-vindo ao Sabidos</h1>
          <li><Link to="/cadastro">Cadastre se agora</Link></li>
          <li><Link to="/login">Faça login</Link></li>
        
      </main>
    </div>
  )
}