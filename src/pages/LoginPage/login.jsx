import React from 'react'
import { Link } from 'react-router-dom';
import './login.css'
function Login() {
  return (
    <>
     <div className="login-container">
      <header className="headerL">
        <img className="logoL" src="./sabidos.jpg" alt="logoExtensa" width="409px" height="153px" />
      </header>
      <nav>
        <a id="b1" className="luz">Login</a>
        <Link to="/cadastro"><a id="b2">Cadastro</a> </Link>
      </nav>
      <main id="login" className="">
        <div id="d1">
          <form action="">
            <input className="inputL" type="text" placeholder="Usuario" />
            <input className="inputL" type="email" name="" id="" placeholder="E-mail" />
            <input className="inputL" type="password" name="password" id="password" placeholder="Senha" />
          </form>
        </div>
        <div id="d2">
        <Link to="/dashboard">
          <a href="./homeInterna.html">
            <button id="btn" className="buttonLL">Entrar</button>
          </a></Link>
        </div>
        <div id="d3">
          <input id="check checkbox2" type="checkbox" name=""  />
          <label htmlFor="checkbox2">Lembra conta</label>
        </div>
        <div id="d4">
          <p id="p">Ainda não possui uma conta?</p>
        </div>
        <div id="d5">
        <Link to="/cadastro">
          <a href="./CadastroSabidos.html" id="a">Cadastre-se</a>
        </Link>
        </div>
      </main>
      
    </div>
    
     
    </>
  )
}

export default Login
