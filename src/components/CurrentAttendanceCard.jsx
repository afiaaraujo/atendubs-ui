import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import Badge from './Badge';

export default function CurrentAttendanceCard({ patient, onFinish }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          {/* BADGE DE STATUS DA CONSULTA */}
          <Badge variant="info">
            Em Atendimento
          </Badge>

          {patient && (
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
              <Clock size={12} />
              {patient.tempo || '0 min'}
            </span>
          )}
        </div>

        {patient ? (
          <>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white my-2">
              {patient.nome}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
              No {patient.consultorio || 'Consultório 02'} (Senha {patient.senha || patient.id})
            </p>
          </>
        ) : (
          <p className="text-slate-400 dark:text-slate-600 my-6">Nenhum atendimento em andamento.</p>
        )}
      </div>

      <button
        onClick={onFinish}
        disabled={!patient}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md uppercase tracking-wide text-sm"
      >
        <CheckCircle2 size={18} />
        FINALIZAR ATENDIMENTO
      </button>
    </div>
  );
}
