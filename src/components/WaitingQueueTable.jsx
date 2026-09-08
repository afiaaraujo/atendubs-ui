import React from 'react';

export default function WaitingQueueTable({ patients = [], onCallPatient }) {
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
                  <td className="py-3 px-2">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isPrioritario
                          ? 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                          : 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400'
                      }`}
                    >
                      {pt.prioridade}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-500 dark:text-slate-400 font-medium">
                    {pt.status || 'Aguardando'}
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