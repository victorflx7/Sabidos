import React from 'react';
import './Perfil.css';

const Profile = () => {
  return (
    <main className="Perfil">
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
      </div>
    </div>
    </main>
  );
};

export default Profile;