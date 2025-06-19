import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const FeedbackForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarFeedback = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "feedbacks"), {
        nome,           
        email: email || null,  
        mensagem,      
        data: serverTimestamp()  
      });
      alert("Feedback enviado!");
      
      setNome("");
      setEmail("");
      setMensagem("");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar. Tente novamente.");
    }
  };

  return (
    <form onSubmit={enviarFeedback}>
      
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome *"
        required
      />

      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail (opcional)"
      />

      
      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Seu feedback *"
        required
        rows={4}
      />

      <button type="submit">Enviar</button>
    </form>
  );
};