import React from 'react';

export default function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700',
    geral: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900/40',
    preferencial: 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900/40',
    
    // Status do Atendimento:
    warning: 'bg-slate-100 dark:bg-slate-800 text-yellow-500 dark:text-yellow-400 border border-yellow-400/60 dark:border-yellow-500/50', // Aguardando (Amarelo)
    info: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40', // Em Atendimento (Azul)
    success: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40', // Concluído (Verde)
  };

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${styles[variant] || styles.default}`}>
      {children}
    </span>
  );
}