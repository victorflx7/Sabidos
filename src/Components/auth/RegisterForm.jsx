import React, { useState } from 'react';
import { cadastrarUsuario } from '../../services/authService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './cadastro.css'

function Register() {
 const [dadosUsuario, setDadosUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validações
    if (dadosUsuario.senha !== dadosUsuario.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const result =  await cadastrarUsuario(
        dadosUsuario.nome,
        dadosUsuario.email,
        dadosUsuario.senha
      );
      if (result.success) {
        alert('Cadastro realizado com sucesso!');
        navigate('/dashboard'); // Redireciona para página interna
      } else {
        setErro(result.error);
      }
      // Redirecionar após cadastro
    } catch (error) {
      setErro(error.message);
    }
  };

return (
    <>
    <div className="cadastro-container">
      <header className="headerL">
        <img 
          className="logoL" 
          src="LogoLogin.svg"
          alt="logoExtensa" 
          width="409px" 
          height="153px" 
        />
      </header>
      <br />
      <nav>
      <Link to="/login" id="b1">Login </Link>
        <a id="b2" className="luz">Cadastro</a>
      </nav>

      <main id="cad" className="s">
        <div id="d1">
          <form onSubmit={handleSubmit} className="formcad">
            <input className="inputL"
             type="text" 
             value={dadosUsuario.nome}
             onChange={(e) => setDadosUsuario({...dadosUsuario, nome: e.target.value})}
             required
             placeholder="Usuario" 
             />

            <input className="inputL" 
            type="email" 
            value={dadosUsuario.email}
            onChange={(e) => setDadosUsuario({...dadosUsuario, email: e.target.value})}
            required
            placeholder="E-mail"
             />

            <input 
              className="inputL" 
              type="password" 
              name="passwor1" 
              id="password1"
              value={dadosUsuario.senha}
              onChange={(e) => setDadosUsuario({...dadosUsuario, senha: e.target.value})}
              required
              placeholder="Senha" 
            />
            <input 
              className="inputL" 
              type="password" 
              name="password2" 
              id="password2" 
              value={dadosUsuario.confirmarSenha}
              onChange={(e) => setDadosUsuario({...dadosUsuario, confirmarSenha: e.target.value})}
              required
              placeholder="Confirme sua senha" 
            />
        <div id="d2-cad">
          <button type="submit" className="buttonCC"disabled={loading}>
         {loading ? 'Cadastrando....'  : 'Cadastrar'}
            </button>
          {erro && <p className="erro">{erro}</p>}
        </div>
          </form>
        </div>
        
        
        <div id="d4-cad">
          <p id="p">
            Ao criar uma conta, você concorda com os <br /> nossos
            <a href="" id="a"> Termos do serviço</a> e com a nossa 
            <a href="" id="a">Política <br /> de privacidade.</a>
          </p>
          <Link to="/login">Já tem conta? Faça login</Link>
        </div>
      </main>
      
      
    </div>
    <Link to="/dashboard">Entrar</Link>
    </>
  )

}

export default Register;