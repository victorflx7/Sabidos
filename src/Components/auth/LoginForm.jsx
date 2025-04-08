import React, { useState } from 'react';
import { fazerLogin } from '../../services/authService';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fazerLogin(email, senha);
      // Redireciona após login (use navigate ou estado global)
    } catch (error) {
      setErro("Falha no login: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={senha} 
        onChange={(e) => setSenha(e.target.value)} 
        placeholder="Senha" 
      />
      <button type="submit">Entrar</button>
      {erro && <p className="erro">{erro}</p>}
      <Link to="/cadastro">Criar conta</Link>
    </form>
  );
}

export default Login;