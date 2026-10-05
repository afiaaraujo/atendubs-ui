import React from 'react';

export default function ProductivityTable({ data }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div>
        <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">
          Produtividade por Profissional
        </h3>
        <p className="text-[11px] text-slate-400">Desempenho da equipe médica e triagem no período</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Profissional</th>
              <th className="py-2.5 px-3">Especialidade</th>
              <th className="py-2.5 px-3 text-center">Atendimentos</th>
              <th className="py-2.5 px-3 text-right">Tempo Médio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">{row.profissional}</td>
                <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{row.especialidade}</td>
                <td className="py-3 px-3 text-center font-bold text-blue-600 dark:text-blue-400">{row.atendimentos}</td>
                <td className="py-3 px-3 text-right font-medium text-slate-700 dark:text-slate-300">{row.tempoMedio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
