import './IconProfile.css'
import { Link } from 'react-router-dom';

import { logoutUsuario } from "../../../services/authService";
import { useNavigate } from 'react-router-dom';


function IconProfile() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUsuario();
    navigate("/login")
  };

  return (
    <>
      <div class="oi">
        <img src="icon/IconProfile.svg" alt="sasfasfasf" className='IconProfile' />

        <div class="ProfileModal">
          <div className='divmodal'>
            <img src="icon/IconProfile.svg" alt="sasfasfasf" className='imgmodal' />
            <Link to="/Perfil">  <button className='gerBtn'>Gerenciar sua Conta </button></Link>
            <button className='logoutBtn' onClick={handleLogout}>Sair da Conta</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default IconProfile