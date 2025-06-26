import { analytics, logEvent } from "../../firebase/config";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config"



export async function incrementarContadorEvento(evento) {
  try{
  const userRef = doc(db, 'usuarios', userId);
  await updateDoc( userRef, {
  [`Quant${evento.charAt(0).toUpperCase() + evento.slice(1)}`] : increment(1)
  });
} catch (error) {
  console.error(`Erro ao incrementar ${evento}:`, error);
}
}
export function registrarEvento(nome, parametros = {}) {
  if (!analytics) return;
  logEvent(analytics, nome, parametros);
}