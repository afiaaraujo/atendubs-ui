import React from 'react';
import { Megaphone } from 'lucide-react';
import Badge from './Badge';

export default function NextPatientCard({ patient, onCallNext, disabled = false }) {
  const prioridadeTexto = String(patient?.prioridade || 'GERAL').toUpperCase();
  const isPreferencial =
    Boolean(patient) &&
    (prioridadeTexto.includes('PREFERENCIAL') ||
      prioridadeTexto.includes('PRIORITÁRIO') ||
      prioridadeTexto.includes('PRIORITARIO'));

  const senhaFormatada =
    patient?.senha ||
    (patient?.id != null ? String(patient.id).padStart(3, '0') : '—');

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors">
      <div>
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
          PRÓXIMO PACIENTE
        </span>
        {patient ? (
          <>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 break-words">
              {patient.nome || 'Paciente'}
            </h2>
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <Badge variant={isPreferencial ? 'preferencial' : 'geral'}>
                {prioridadeTexto}
              </Badge>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Senha {senhaFormatada}
              </span>
            </div>
          </>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 my-6">
            Nenhum paciente selecionado na fila.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onCallNext?.()}
        disabled={!patient || disabled}
        className="w-full bg-[#005296] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md uppercase tracking-wide text-sm cursor-pointer"
      >
        <Megaphone size={18} />
        {disabled && patient ? 'CHAMANDO...' : 'CHAMAR PRÓXIMO'}
      </button>
    </div>
  );
}
