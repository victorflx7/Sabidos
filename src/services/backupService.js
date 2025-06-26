import { db } from '../firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Salva dados de backup do usuário no Firestore.
 * @param {string} userId - ID do usuário autenticado.
 * @param {string} frequencia - Frequência escolhida (ex: 'diario', 'mensal', etc).
 */
export const backupUserData = async (userId, frequencia) => {
  try {
    const ref = doc(db, "backups", userId);

    await setDoc(ref, {
      frequencia,
      atualizadoEm: serverTimestamp()
    });

    console.log("Backup salvo com sucesso.");
  } catch (error) {
    console.error("Erro ao salvar dados de backup:", error);
    throw error;
  }
};
