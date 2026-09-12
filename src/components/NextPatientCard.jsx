import React from 'react';
import { Megaphone } from 'lucide-react';

export default function NextPatientCard({ patient, onCallNext }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
      <div>
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
          PRÓXIMO PACIENTE
        </span>
        {patient ? (
          <>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              {patient.nome}
            </h2>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-200 dark:border-red-900/50">
                {patient.prioridade}
              </span>
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Senha {patient.senha || patient.id}
              </span>
            </div>
          </>
        ) : (
          <p className="text-slate-400 dark:text-slate-600 my-6">Nenhum paciente selecionado na fila.</p>
        )}
      </div>

      <button
        onClick={onCallNext}
        disabled={!patient}
        className="w-full bg-[#005296] hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md uppercase tracking-wide text-sm"
      >
        <Megaphone size={18} />
        CHAMAR PRÓXIMO
      </button>
    </div>
  );
}