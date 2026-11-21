import React from 'react';
import Badge from './Badge';

export default function CurrentCallCard({ call }) {
  if (!call) return null;

  const prioridadeTexto = String(call.prioridade || 'GERAL').toUpperCase();
  const isPreferencial =
    prioridadeTexto.includes('PREFERENCIAL') ||
    prioridadeTexto.includes('PRIORITÁRIO') ||
    prioridadeTexto.includes('PRIORITARIO');

  const senhaFormatada =
    call.senha || (call.id != null ? String(call.id).padStart(3, '0') : '—');

  return (
    <div
      className={`w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border p-8 md:p-14 flex flex-col items-center justify-center transition-all ${
        isPreferencial
          ? 'border-red-300/80 dark:border-red-900/60'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Indicador Visual de Chamada Ativa */}
      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs md:text-sm mb-6">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        CHAMADA ATUAL
      </div>

      {/* Nome do Paciente */}
      <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight mb-4 text-center break-words max-w-full">
        {call.nome || 'Paciente'}
      </h1>

      {/* Badge de Prioridade e Senha Dinâmicos */}
      <div className="mb-8">
        <Badge variant={isPreferencial ? 'preferencial' : 'geral'}>
          SENHA {prioridadeTexto} - {senhaFormatada}
        </Badge>
      </div>

      {/* Bloco do Consultório */}
      <div className="bg-[#005296] text-white text-2xl md:text-5xl font-black py-4 md:py-6 px-8 md:px-16 rounded-2xl shadow-lg uppercase tracking-wide mb-4 text-center">
        {call.consultorio || 'Consultório'}
      </div>

      {/* Orientação */}
      <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 text-center">
        Por favor, dirija-se ao consultório indicado.
      </p>
    </div>
  );
}