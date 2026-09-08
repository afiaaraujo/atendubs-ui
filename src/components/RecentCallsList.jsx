import React from 'react';

export default function RecentCallsList({ calls = [] }) {
  if (calls.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <h3 className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
        ÚLTIMAS CHAMADAS
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {calls.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md">
                {item.id || item.senha}
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
  );
}