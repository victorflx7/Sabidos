import React, { useState, useEffect } from 'react';
import './Flashcard.css';
import { db } from '../../firebase/config';
import {  getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const storage = getStorage(getFirestore());
const auth = getAuth();
const firestore = getFirestore();
   const user = auth.currentUser;
    const userId = user?.uid;


async function enviarImagem() {
  const input = document.getElementById("fotoInput");
  const file = input.files[0];

  if (!file) {
    alert("Selecione uma imagem primeiro!");
    return;
  }

  const storageRef = ref(storage, `users/${userId}.jpg`);

  try {
    // 1. Envia o arquivo pro Storage
    await uploadBytes(storageRef, file);
    
    // 2. Pega a URL de download
    const url = await getDownloadURL(storageRef);

    // 3. Salva a URL no Firestore
    const userRef = doc(db, "usuarios", userId);
    await updateDoc(userRef, {
      fotoPerfilUrl: url
    });

    alert("Imagem enviada com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar imagem:", error);
  }

return (
  <div className="perfil-container">
    <h1>Perfil do Usuário</h1>
    <div className="foto-perfil">
      <img
        src={user?.photoURL || "https://via.placeholder.com/150"}
        alt="Foto de Perfil"
      />
      <input
        type="file"
        id="fotoInput"
        accept="image/*"
        onChange={enviarImagem}
      />
      <img src="{fotoPerfilUrl}" alt="Foto de perfil" />

<input type="file" id="fotoInput" /> 
<button onclick="enviarImagem()">Enviar Imagem</button>


      <button onClick={enviarImagem}>Enviar Imagem</button>
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
