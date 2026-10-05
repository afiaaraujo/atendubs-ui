import React from 'react';
import Badge from './Badge';

export default function WaitingQueueTable({ patients = [], onCallPatient }) {
  // Função auxiliar para mapear o status do paciente para a variante correta do Badge
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Em Atendimento':
        return 'info';      // Azul
      case 'Concluído':
      case 'Atendido':
        return 'success';   // Verde
      case 'Aguardando':
      default:
        return 'warning';   // Amarelo
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full transition-colors">
      {/* Cabeçalho da Tabela */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide">
            PACIENTES AGUARDANDO
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Lista de pacientes na fila de triagem
          </p>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {patients.length} pacientes aguardando
        </span>
      </div>

      {/* Corpo da Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold uppercase">
              <th className="pb-3 px-2">Senha</th>
              <th className="pb-3 px-2">Paciente</th>
              <th className="pb-3 px-2">CPF</th>
              <th className="pb-3 px-2">Prioridade</th>
              <th className="pb-3 px-2">Status</th>
              <th className="pb-3 px-2 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {patients.map((pt) => {
              const isPrioritario = pt.prioridade === 'Prioritário' || pt.prioridade === 'Preferencial';
              const statusAtual = pt.status || 'Aguardando';

              return (
                <tr key={pt.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-2 font-bold text-slate-700 dark:text-slate-300">
                    {pt.senha}
                  </td>
                  <td className="py-3 px-2 font-semibold text-slate-800 dark:text-white">
                    {pt.nome}
                  </td>
                  <td className="py-3 px-2 text-slate-400 dark:text-slate-500">
                    {pt.cpf}
                  </td>
                  
                  {/* BADGE DE PRIORIDADE */}
                  <td className="py-3 px-2">
                    <Badge variant={isPrioritario ? 'preferencial' : 'geral'}>
                      {pt.prioridade}
                    </Badge>
                  </td>

                  {/* BADGE DE STATUS DINÂMICO */}
                  <td className="py-3 px-2">
                    <Badge variant={getStatusVariant(statusAtual)}>
                      {statusAtual}
                    </Badge>
                  </td>

                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => onCallPatient && onCallPatient(pt.id)}
                      className="px-3 py-1.5 bg-[#005296] hover:bg-[#004077] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-[11px] rounded transition-all uppercase shadow-sm"
                    >
                      CHAMAR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}