import React from 'react';
import { Users, Clock, UserCheck } from 'lucide-react';

export default function MetricsSummary({ metrics }) {
  const {
    atendidos = 0,
    emEspera = 0,
    tempoMedio = '0 min',
  } = metrics || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Atendidos</p>
          <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-1">
            {atendidos}
          </h2>
          <p className="text-[11px] text-slate-400 mt-1">Pacientes com atendimento concluído</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <UserCheck size={24} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Em Espera</p>
          <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mt-1">
            {emEspera}
          </h2>
          <p className="text-[11px] text-slate-400 mt-1">Aguardando na fila da recepção</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
          <Users size={24} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
        <div className="min-w-0 pr-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tempo Médio</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white mt-1 break-words">
            {tempoMedio}
          </h2>
          <p className="text-[11px] text-slate-400 mt-1">Estimativa entre chegada e consulta</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <Clock size={24} />
        </div>
      </div>
    </div>
  );
}
