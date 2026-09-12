import React from 'react';

export default function DoctorQueueTable({ queue = [], onSelectPatient }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">
        PACIENTES NA FILA
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">
              <th className="py-3 px-4">Senha</th>
              <th className="py-3 px-4">Paciente</th>
              <th className="py-3 px-4">Prioridade</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            {queue.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-blue-600 dark:text-blue-400">
                  {item.id}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                  {item.nome}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md uppercase ${
                      item.prioridade === 'PREFERENCIAL' || item.prioridade === 'PRIORITÁRIO'
                        ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {item.prioridade}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {item.status || 'Aguardando'}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => onSelectPatient(item)}
                    className="bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900/50 uppercase transition-all"
                  >
                    CHAMAR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
