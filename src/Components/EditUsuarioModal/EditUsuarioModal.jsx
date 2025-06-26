import React, { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase/config";
import './EditUsuarioModal.css'

export default function EditUsuarioModal({ onClose }) {
    const auth = getAuth();
    const user = auth.currentUser;
    const [nome, setNome] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const docRef = doc(db, "usuarios", user.uid);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                const data = snap.data();
                setNome(data.nome || '');
            }
        };
        fetchUser();
    }, [user.uid]);

    const salvarPreferencias = async () => {
        await updateDoc(doc(db, "usuarios", user.uid), {
            nome,
        });
        onClose();
    };
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Preferências do Usuário</h2>

                <label>
                    Nome:
                    <input value={nome} onChange={e => setNome(e.target.value)} />
                </label>

                <h3>Atividade:</h3>
                <p>🧠 Horas estudadas: 2</p>
                <p>🧾 Notas escritas: 17</p>
                <p>📅 Eventos criados: 20</p>
                <p>🃏 Flashcards: 6</p>

                <div className="botoes">
                    <button onClick={salvarPreferencias}>Salvar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
