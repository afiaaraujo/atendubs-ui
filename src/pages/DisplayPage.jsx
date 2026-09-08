import React, { useState, useEffect } from 'react';

export default function DisplayPanel({ currentCall, lastCalls = [] }) {
  // Exemplo de estado inicial baseado no protótipo se nenhuma props for passada
  const activeCall = currentCall || {
    nome: 'MARIA SANTOS',
    senha: 'P002',
    prioridade: 'PREFERENCIAL',
    consultorio: 'CONSULTÓRIO 02',
  };

  const history = lastCalls.length > 0 ? lastCalls : [
    { id: '0001', nome: 'João Silva', consultorio: 'Consultório 01' },
    { id: '0003', nome: 'José Alves', consultorio: 'Consultório 03' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 md:p-8 flex flex-col justify-between transition-colors">
      {/* Container Principal da Chamada Atual */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-14 flex flex-col items-center justify-center transition-all">
          
          {/* Topo - Indicador Visual */}
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs md:text-sm mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            CHAMADA ATUAL
          </div>

          {/* Nome do Paciente */}
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            {activeCall.nome}
          </h1>

          {/* Badge da Senha / Prioridade */}
          <div className="inline-block bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-bold text-xs md:text-sm px-4 py-1.5 rounded-full uppercase tracking-wider mb-8">
            SENHA {activeCall.prioridade} - {activeCall.senha}
          </div>

          {/* Bloco de Destino / Consultório */}
          <div className="bg-[#005296] text-white text-2xl md:text-5xl font-black py-4 md:py-6 px-8 md:px-16 rounded-2xl shadow-lg uppercase tracking-wide mb-4">
            {activeCall.consultorio}
          </div>

          {/* Mensagem de Instrução */}
          <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
            Por favor, dirija-se ao consultório indicado
          </p>
        </div>
      </div>

      {/* Seção Inferior - Últimas Chamadas */}
      <div className="w-full max-w-5xl mx-auto mt-6">
        <h3 className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
          ÚLTIMAS CHAMADAS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
                  {item.id}
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {item.nome}
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                {item.consultorio}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
