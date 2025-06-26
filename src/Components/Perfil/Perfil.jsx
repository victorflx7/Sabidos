import React, { useState } from 'react';
import EditUsuarioModal from '../EditUsuarioModal/EditUsuarioModal';
import './Perfil.css';

const Profile = () => {
  const [mostrarModal, setMostrarModal] = useState(false)
  return (
    <main className="Perfil">
      {mostrarModal && <EditUsuarioModal onClose={() => setMostrarModal(false)} />}
    <div className="Perfil-container">
      
      <div className="box1">
        <figure>
          <img src="alex.svg" alt="" className="imgPerfil" />
          <img src="edit.svg" className='img2'></img>
        </figure>
        <h1 className="NomePerfil">Alex Cardoso</h1>
      </div>
      <div className="box2">
        <div className="info1">
          <h3 className='user'>Usuário</h3>
          <p className='user2'>@Alex123</p>
        </div>
        <div className="info2">
          <h3 className='email'>Email</h3>
          <p className='email2'>alexxx@gmail.com</p>
        </div>
      <div className='preferencias-perfil'><button onClick={() => setMostrarModal(true)}>Preferências</button></div>
      </div>
    </div>
    </main>
  );
};

export default Profile;