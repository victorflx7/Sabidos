import React from 'react';
import './Perfil.css';

const Profile = () => {
  return (
    <div className="Perfil-container">
      <div className="box1">
        <figure>
          <img src="./sabidos.jpg" alt="" className="imgPerfil" />
        </figure>
        <h1 className="NomePerfil">sjhdfjsydfs</h1>
      </div>
      <div className="box2">
        <div className="info1">
          <h3>Usuario</h3>
          <p>ksdkfjsdjfs</p>
        </div>
        <div className="info1">
          <h3>Email</h3>
          <p>fhsdfis@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;