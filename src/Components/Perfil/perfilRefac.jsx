import React, { useState } from 'react';
import './Flashcard.css';
import { db, app } from '../../firebase/config'; // certifique-se de exportar 'app' na sua config
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const storage = getStorage(app);
const auth = getAuth();
const firestore = getFirestore(app);

export default function Perfil() {
  const user = auth.currentUser;
  const userId = user?.uid;
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState(null);

  async function enviarImagem(e) {
    const file = e.target.files[0];
    if (!file || !userId) {
      alert("Selecione uma imagem primeiro!");
      return;
    }

    const storageRef = ref(storage, `users/${userId}.jpg`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const userRef = doc(db, "usuarios", userId);
      await updateDoc(userRef, {
        fotoPerfilUrl: url
      });

      setFotoPerfilUrl(url);
      alert("Imagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
  }

  return (
    <div className="perfil-container">
      <h1>Perfil do Usuário</h1>
      <div className="foto-perfil">
        <img
          src={fotoPerfilUrl || user?.photoURL || "https://via.placeholder.com/150"}
          alt="Foto de Perfil"
        />
        <input
          type="file"
          id="fotoInput"
          accept="image/*"
          onChange={enviarImagem}
        />
      </div>
      <div className="info-perfil">
        <h2>Informações do Usuário</h2>
        <p><strong>ID:</strong> {userId}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Nome:</strong> {user?.displayName || "Não definido"}</p>
        <p><strong>Data de Criação:</strong> {user?.metadata.creationTime}</p>
        <p><strong>Último Login:</strong> {user?.metadata.lastSignInTime}</p>
      </div>
    </div>
  );
}
