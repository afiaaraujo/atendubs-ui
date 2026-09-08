import React from 'react';
import { Plus, LogOut } from 'lucide-react';

export default function Header({ onLogout }) {
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

      {/* Lado Direito: Botão Sair afastado da borda pra não bater no ícone do Tema */}
      <button
        type="button"
        onClick={onLogout}
        className="mr-14 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 font-bold text-xs shadow-md border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all whitespace-nowrap"
        title="Encerrar sessão"
      >
        <LogOut size={16} />
        <span>Sair</span>
      </button>
    </header>
  );
}