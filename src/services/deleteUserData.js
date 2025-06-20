import * as functions from "firebase-functions";
import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) initializeApp();
const db = getFirestore();

export const deleteUserData = functions.auth.user().onDelete(async (user) => {
  const uid = user.uid;
  const colecoes = ['resumos', 'agenda', 'usuarios'];

  console.log(`Iniciando exclusão do usuário ${uid}...`);

  try {
    for (const colecao of colecoes) {
      const subRef = db.collection(`${colecao}/${uid}/dados`);
      const snapshot = await subRef.get();

      const batch = db.batch();
      snapshot.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
    }

    await db.doc(`usuarios/${uid}`).delete();
    console.log(`Usuário ${uid} removido com sucesso.`);
  } catch (err) {
    console.error("Erro:", err);
  }
});
