import axios from 'axios';

export async function getFraseMotivacional() {
  try {
    const res = await axios.get(
      `https://api.allorigins.win/get?url=${encodeURIComponent("https://zenquotes.io/api/today")}`
    );

    const json = JSON.parse(res.data.contents);
    const frase = json[0]?.q;
    const autor = json[0]?.a;

    return `${frase} — ${autor}`;
  } catch (error) {
    console.warn("Erro ao buscar frase, usando fallback.");
    return "Você é capaz! Continue estudando 💪";
  }
}
