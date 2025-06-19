import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const deleteUserData = functions.auth.user().onDelete(async (user) => {
    const uid = user.uid;
    const db = admin.firestore();
  // Lista de coleções onde o usuário tem dados
  const collectionsToDelete = {
    'resumos': ['dados'], // Coleção principal e subcoleções
    'agenda': ['eventos', 'compromissos'],
    'usuarios': ['dados', 'preferencias']
  };
  
  try {
    // Deletar documentos principais (se existirem)
    const mainDeletions = Object.keys(collectionsToDelete).map(async (collection) => {
      const docRef = db.collection(collection).doc(uid);
      await docRef.delete().catch(() => {}); // Ignora erros se o documento não existir
    });
    
    await Promise.all(mainDeletions);
    
    // Deletar subcoleções
    for (const [collection, subcollections] of Object.entries(collectionsToDelete)) {
      for (const subcollection of subcollections) {
        await deleteCollection(db, `${collection}/${uid}/${subcollection}`);
      }
    }
    
    console.log(`Todos os dados do usuário ${uid} foram deletados com sucesso`);
    return null;
  } catch (error) {
    console.error(`Erro ao deletar dados do usuário ${uid}:`, error);
    throw error;
  }
});

// Função auxiliar para deletar coleções em lotes
async function deleteCollection(db, collectionPath, batchSize = 50) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);
  
  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query.get()
    .then((snapshot) => {
      if (snapshot.size === 0) {
        resolve();
        return;
      }
      
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      return batch.commit().then(() => snapshot.size);
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }
      
      // Recursivamente deleta o próximo lote
    /* global process */
process.nextTick(() => {
  deleteQueryBatch(db, query, batchSize, resolve, reject);
});
    })
    .catch(reject);
}
