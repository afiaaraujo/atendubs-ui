import React from 'react';
import { Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between transition-colors">
      {/* Lado Esquerdo: Logo e Título */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold">
          <Plus size={22} strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-sm font-extrabold text-slate-800 dark:text-white tracking-tight leading-none uppercase">
            AtendUBS
          </h1>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            CHAMADA DIGITAL - ROSALINA ROSAL
          </p>
        </div>
      </div>
    </header>
  );
}
