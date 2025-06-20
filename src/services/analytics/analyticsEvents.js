import { analytics, logEvent } from "../../firebase/config";
import { doc, increment, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config"

export function registrarEvento(nome, parametros = {}) {
  if (!analytics) return;
  logEvent(analytics, nome, parametros);
}

export async function incrementarContadorEvento(evento) {
  const ref = doc(db, "estatisticas", evento);
  await setDoc(ref, { count: increment(1) }, { merge: true });
}
