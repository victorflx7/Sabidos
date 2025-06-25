export function enviarEventoGTM(evento, dados = {}) {
  if (!window || !window.dataLayer) return;
  window.dataLayer.push({
    event: evento,
    ...dados
  });
}
