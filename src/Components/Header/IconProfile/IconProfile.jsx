import './IconProfile.css'


function IconProfile() {

    return (
      <>
      <div class="oi">
        <img src="icon/IconProfile.svg" alt="sasfasfasf" className='IconProfile' />

            <div class="ProfileModal">
              <div className='divmodal'>
            <img src="icon/IconProfile.svg" alt="sasfasfasf" className='imgmodal' />
                  <button className='gerBtn'>Gerenciar sua Conta </button>
                <button className='logoutBtn'>Sair da Conta</button>
              </div>
            </div>
        </div>
      </>
    )
  }
  
  export default IconProfile