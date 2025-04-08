import React from 'react'
import { Link } from 'react-router-dom';
import './cadastro.css'
function Cadastro() {
  return (
    <>
    <div className="cadastro-container">
      <header className="headerL">
        <img 
          className="logoL" 
          src="./frame2.jpg" 
          alt="logoExtensa" 
          width="409px" 
          height="153px" 
        />
      </header>
      
      <nav>
      <Link to="/login"><a  id="b1">Login</a></Link>
        <a id="b2" className="luz">Cadastro</a>
      </nav>

      <main id="cad" className="s">
        <div id="d1">
          <form action="">
            <input className="inputL" type="text" placeholder="Usuario" />
            <input className="inputL" type="email" placeholder="E-mail" />
            <input 
              className="inputL" 
              type="password" 
              name="passwor1" 
              id="password1" 
              placeholder="Senha" 
            />
            <input 
              className="inputL" 
              type="password" 
              name="password2" 
              id="password2" 
              placeholder="Confirme sua senha" 
            />
          </form>
        </div>
        
        <div id="d2">
          <a >
            <button id="btn" className="buttonLL">Cadastrar</button>
          </a>
        </div>
        
        <div id="d4">
          <p id="p">
            Ao criar uma conta, você concorda com os <br /> nossos
            <a href="" id="a"> Termos do serviço</a> e com a nossa 
            <a href="" id="a">Política <br /> de privacidade.</a>
          </p>
        </div>
      </main>
      
      
    </div>
    <Link to="/dashboard">Entrar</Link>
    </>
  )
}

export default Cadastro

