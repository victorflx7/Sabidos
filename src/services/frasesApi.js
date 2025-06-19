import axios from 'axios';

export async function getFraseMotivacional() {
  try {
    const res = await axios.get('https://zenquotes.io/api/today');
    const frase = res.data[0]?.q;
    const autor = res.data[0]?.a;
    return `${frase} — ${autor}`;
  } catch (error) {
    console.warn("Erro ao buscar frase, usando fallback.");
    return "Você é capaz! Continue estudando 💪";
  }
}
