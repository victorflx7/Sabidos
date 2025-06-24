import React, { useEffect, useState } from 'react';
import { carregarEstatisticas } from '../../services/analytics/getEstatisticas';

function AdminEstatisticas() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function buscarDados() {
      const dados = await carregarEstatisticas();
      setStats(dados);
    }

    buscarDados();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">📊 Estatísticas do Sabidos</h1>

      <div className="space-y-2">
        <p>📄 Resumos Criados: <strong>{stats.criou_resumo || 0}</strong></p>
        <p>⏱️ Eventos Criados: <strong>{stats.Add_EventoAgenda || 0}</strong></p>
        <p>✅ FeedBack Enviados: <strong>{stats.Envio_Feedback || 0}</strong></p>
      </div>
    </div>
  );
}

export default AdminEstatisticas;
