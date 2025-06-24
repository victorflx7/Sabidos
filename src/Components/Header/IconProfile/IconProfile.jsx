import './IconProfile.css'
import { Link } from 'react-router-dom';


function IconProfile() {

    return (
      <>
      <div class="oi">
        <img src="icon/IconProfile.svg" alt="sasfasfasf" className='IconProfile' />

            <div class="ProfileModal">
              <div className='divmodal'>
            <img src="icon/IconProfile.svg" alt="sasfasfasf" className='imgmodal' />
            <Link to="/Perfil">  <button className='gerBtn'>Gerenciar sua Conta </button></Link>
                <button className='logoutBtn'>Sair da Conta</button>
              </div>
            </div>
        </div>
      </>
    )
  }
  
  export default IconProfile