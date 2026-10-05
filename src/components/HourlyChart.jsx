import React from 'react';

export default function HourlyChart() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">
            Demanda Horária (Preview)
          </h3>
          <p className="text-[11px] text-slate-400">Volume de pacientes por hora do dia</p>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-900/40">
          Atualizado em tempo real
        </span>
      </div>

      <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div className="w-full bg-blue-600 rounded-t-sm" style={{ height: '40%' }}></div>
          <span className="text-[10px] text-slate-400 font-medium">08h</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div className="w-full bg-blue-600 rounded-t-sm" style={{ height: '70%' }}></div>
          <span className="text-[10px] text-slate-400 font-medium">09h</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div className="w-full bg-blue-600 rounded-t-sm" style={{ height: '50%' }}></div>
          <span className="text-[10px] text-slate-400 font-medium">10h</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div className="w-full bg-red-500 rounded-t-sm" style={{ height: '95%' }}></div>
          <span className="text-[10px] text-slate-400 font-medium">11h</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div className="w-full bg-blue-600 rounded-t-sm" style={{ height: '65%' }}></div>
          <span className="text-[10px] text-slate-400 font-medium">14h</span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div className="w-full bg-blue-600 rounded-t-sm" style={{ height: '35%' }}></div>
          <span className="text-[10px] text-slate-400 font-medium">15h</span>
        </div>
      </div>
    </div>
  );
}