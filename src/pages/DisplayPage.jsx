import React from 'react';
import CurrentCallCard from '../components/CurrentCallCard';
import RecentCallsList from '../components/RecentCallsList';
import AudioAlert from '../components/AudioAlert';

export default function DisplayPage({ currentCall, lastCalls = [] }) {
  // Dados de apoio caso nenhuma prop seja enviada
  const activeCall = currentCall || {
    nome: 'MARIA SANTOS',
    senha: 'P002',
    prioridade: 'PREFERENCIAL',
    consultorio: 'CONSULTÓRIO 02',
  };

  const history = lastCalls.length > 0 ? lastCalls : [
    { id: '0001', nome: 'João Silva', consultorio: 'Consultório 01' },
    { id: '0003', nome: 'José Alves', consultorio: 'Consultório 03' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 md:p-8 flex flex-col justify-between transition-colors">
      {/* Alerta Sonoro de Chamada */}
      <AudioAlert triggerKey={activeCall.senha || activeCall.nome} />

      {/* Chamada Principal (Componente) */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto">
        <CurrentCallCard call={activeCall} />
      </div>

      {/* Lista do Rodapé (Componente) */}
      <RecentCallsList calls={history} />
    </div>
  );
}
