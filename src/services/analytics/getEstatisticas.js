import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export async function carregarEstatisticas() {
  const estatisticasRef = collection(db, "estatisticas");
  const snapshot = await getDocs(estatisticasRef);

  const resultado = {};
  snapshot.forEach(doc => {
    resultado[doc.id] = doc.data().count || 0;
  });

  return resultado;
}
