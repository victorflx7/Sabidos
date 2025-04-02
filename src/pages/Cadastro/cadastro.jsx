import React from 'react'
import { Link } from 'react-router-dom';
import './cadastro.css'
function Cadastro() {
  return (
    <>
      <h1>Cadastro</h1>
      <li><Link to="/login">Login</Link></li>
       <li><Link to="/dashboard">Entrar</Link></li>
    </>
  )
}

export default Cadastro

