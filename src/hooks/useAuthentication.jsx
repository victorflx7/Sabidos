import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../services/authService';

const LoginPage = () => {
const navigate = useNavigate();


  const handleGoogleLogin = async () => {
    try {
       const result = await loginWithGoogle();
      
    if (result.success) {
        alert("Login com Google realizado com sucesso!");
        navigate('/dashboard'); // redireciona para a página principal
      } else {
        alert("Erro ao logar com Google: " + result.error);
      }
    } catch (err) {
      alert("Erro inesperado ao logar com Google.");
      console.error(err);
    }
  };

  return (
    <div>
      {/* botão de login padrão */}
      
      <button onClick={handleGoogleLogin}>
        Entrar com Google
      </button>
    </div>
  );
};

export default LoginPage;