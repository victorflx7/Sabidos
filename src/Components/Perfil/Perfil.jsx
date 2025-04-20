import React from 'react';
import './Perfil.css';

const Profile = () => {
  return (
    <main className="Perfil">
    <div className="Perfil-container">
      
      <div className="box1">
        <figure>
          <img src="vite.svg" alt="" className="imgPerfil" />
        </figure>
         
        <h1 className="NomePerfil">sjhdfjsydfs</h1>
      </div>
      <div className="box2">
        <div className="info1">
          <h3>Usuario</h3>
          <p>ksdkfjsdjfs</p>
        </div>
        <div className="info2">
          <h3>Email</h3>
          <p>fhsdfis@gmail.com</p>
        </div>
      </div>
    </div>
    </main>
  );
};

export default Profile;