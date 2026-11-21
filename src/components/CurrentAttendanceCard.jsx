import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import Badge from './Badge';

export default function CurrentAttendanceCard({ patient, onFinish, disabled = false }) {
  const prioridadeUpper = String(patient?.prioridade || 'GERAL').toUpperCase();
  const isPreferencial =
    prioridadeUpper.includes('PREFERENCIAL') ||
    prioridadeUpper.includes('PRIORITÁRIO') ||
    prioridadeUpper.includes('PRIORITARIO');

  const senhaFormatada =
    patient?.senha ||
    (patient?.id != null ? String(patient.id).padStart(3, '0') : '—');

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant="info">
              Em Atendimento
            </Badge>
            {patient && (
              <Badge variant={isPreferencial ? 'preferencial' : 'geral'}>
                {prioridadeUpper}
              </Badge>
            )}
          </div>

          {patient && (
            <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
              <Clock size={12} />
              {patient.tempo || '0 min'}
            </span>
          )}
        </div>

        {patient ? (
          <>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white my-2 break-words">
              {patient.nome || 'Paciente'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
              No {patient.consultorio || 'Consultório'} (Senha {senhaFormatada})
            </p>
          </>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 my-6">
            Nenhum atendimento em andamento.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onFinish?.()}
        disabled={!patient || disabled}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md uppercase tracking-wide text-sm cursor-pointer"
      >
        <CheckCircle2 size={18} />
        {disabled && patient ? 'FINALIZANDO...' : 'FINALIZAR ATENDIMENTO'}
      </button>
    </div>
  );
}