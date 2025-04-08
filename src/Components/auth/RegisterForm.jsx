import React, { useState } from 'react';
import { cadastrarUsuario } from '../../services/authService';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cadastrarUsuario(email, senha);
      // Redireciona após cadastro
    } catch (error) {
      setErro("Erro no cadastro: " + error.message);
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
      <button type="submit">Cadastrar</button>
      {erro && <p className="erro">{erro}</p>}
      <Link to="/login">Já tem conta? Faça login</Link>
    </form>
  );
}

export default Register;