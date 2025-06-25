import './IconProfile.css';
import { Link } from 'react-router-dom';
import { logoutUsuario } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { backupUserData } from "../../../services/backupService";
import { useState } from 'react';

function IconProfile() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [frequencia, setFrequencia] = useState('');

  const handleLogout = async () => {
    await logoutUsuario();
    navigate("/login");
  };

  const handleBackupClick = () => {
    setShowModal(true);
  };

  const confirmarBackup = async () => {
    const user = getAuth().currentUser;
    if (user) {
      try {
        await backupUserData(user.uid, frequencia);
 
        alert(`Backup (${frequencia}) feito com sucesso!`);
      } catch (error) {
        console.error("Erro ao fazer backup:", error);
        alert("Erro ao fazer backup.");
      }
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="oi">
        <img src="icon/IconProfile.svg" alt="Foto de perfil" className='IconProfile' />
        <div className="ProfileModal">
          <div className='divmodal'>
            <img src="icon/IconProfile.svg" alt="Foto modal" className='imgmodal' />
            <Link to="/Perfil">
              <button className='gerBtn'>Gerenciar sua Conta</button>
            </Link>
            <button className='logoutBtn' onClick={handleLogout}>Sair da Conta</button>
            <button className='backupBtn' onClick={handleBackupClick}> Fazer Backup</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modalBackup">
          <div className="modalContent">
            <h3>📁 Escolha uma frequência de backup</h3>

            <div className="radio-option">
              <input
                type="radio"
                id="diario"
                value="diario"
                name="frequencia"
                onChange={(e) => setFrequencia(e.target.value)}
              />
              <label htmlFor="diario">Diário</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="semanal"
                value="semanal"
                name="frequencia"
                onChange={(e) => setFrequencia(e.target.value)}
              />
              <label htmlFor="semanal">Semanal</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="mensal"
                value="mensal"
                name="frequencia"
                onChange={(e) => setFrequencia(e.target.value)}
              />
              <label htmlFor="mensal">Mensal</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="nenhum"
                value="nenhum"
                name="frequencia"
                onChange={(e) => setFrequencia(e.target.value)}
              />
              <label htmlFor="nenhum">Nunca</label>
            </div>

            <div className="modal-buttons">
              <button className="confirm" disabled={!frequencia} onClick={confirmarBackup}>Confirmar</button>
              <button className="cancel" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IconProfile;
