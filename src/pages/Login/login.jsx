import React from 'react'
import { Link } from 'react-router-dom';
import './login.css'
function Login() {
  return (
    <>
     <h1>Login</h1>
    <li><Link to="/cadastro">Cadastro</Link></li>
    <li><Link to="/dashboard">Entrar</Link></li>
     
    </>
  )
}

export default Login
