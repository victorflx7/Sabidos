import React, { useState } from 'react';
import { fazerLogin, loginWithGoogle } from '../../services/authService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result =  await fazerLogin(email, senha);
      // Redireciona após login (use navigate ou estado global)
      if (result.success) {
        alert('Login realizado com sucesso!');
        navigate('/dashboard'); // Redireciona para página interna
      } else {
        setErro(result.error);
      }
    } catch (error) {
      setErro("Falha no login: " + error.message);
    }
  };

   const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        alert('Login com Google realizado com sucesso!');
        navigate('/dashboard');
      } else {
        setErro(result.error);
      }
    } catch (error) {
      setErro("Erro ao logar com Google: " + error.message);
    } finally {
      setLoading(false);
    }
  };


 return (
    <div className="login-container">
      <header className="headerL">
        <img className="logoL" src="LogoLogin.svg" alt="logoExtensa" width="409px" height="153px" />
      </header>
      <br />
      <nav>
        <a id="b1" className="luz">Login</a>
        <Link to="/cadastro" id="b2">Cadastro</Link>
      </nav>
      <main id="login">
        <div id="d1">
          <form onSubmit={handleSubmit} className='formlog'>
            <input className="inputL" type="text" placeholder="Usuário" />
            <input
              className="inputL"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="inputL"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button type="submit" className="buttonLL" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            {/* Botão para login com Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="buttonLL"
              style={{
                marginTop: '10px',
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              disabled={loading}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google logo"
                width="20"
                height="20"
              />
              {loading ? 'Entrando...' : 'Entrar com Google'}
            </button>

            {erro && <p className="erro">{erro}</p>}
          </form>
        </div>

        <div id="d3-log"></div>
        <div id="d4-log">
          <p id="p">Ainda não possui uma conta?</p>
        </div>
        <div id="d5-log">
          <Link to="/cadastro" id="a">Cadastre-se</Link>
        </div>
      </main>
    </div>
  );
}

export default Login;