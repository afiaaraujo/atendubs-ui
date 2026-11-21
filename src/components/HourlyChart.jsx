import React, { useMemo } from 'react';

const HORAS_PADRAO = [8, 9, 10, 11, 14, 15, 16, 17];

export default function HourlyChart({ patients = [] }) {
  const { bars, maxCount } = useMemo(() => {
    const countsByHour = new Map(HORAS_PADRAO.map((hour) => [hour, 0]));

    (Array.isArray(patients) ? patients : []).forEach((pt) => {
      if (!pt?.criadoEm) return;
      const date = pt.criadoEm instanceof Date ? pt.criadoEm : new Date(pt.criadoEm);
      if (Number.isNaN(date.getTime())) return;

      const hour = date.getHours();
      countsByHour.set(hour, (countsByHour.get(hour) || 0) + 1);
    });

    const orderedHours = Array.from(countsByHour.keys()).sort((a, b) => a - b);
    const highest = Math.max(0, ...Array.from(countsByHour.values()));

    const computedBars = orderedHours.map((hour) => {
      const count = countsByHour.get(hour) || 0;
      const heightPercent = highest > 0 ? Math.round((count / highest) * 100) : 0;
      return {
        hour,
        label: `${String(hour).padStart(2, '0')}h`,
        count,
        heightPercent,
        isPeak: highest > 0 && count === highest,
      };
    });

    return { bars: computedBars, maxCount: highest };
  }, [patients]);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">
            Demanda Horária
          </h3>
          <p className="text-[11px] text-slate-400">
            Volume de pacientes por hora do dia
          </p>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-900/40">
          Atualizado em tempo real
        </span>
      </div>

      {maxCount === 0 ? (
        <div className="h-44 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500">
          Nenhum registro no período selecionado para exibir no gráfico.
        </div>
      ) : (
        <div className="h-44 flex items-end justify-between gap-2 sm:gap-3 pt-6 pb-2 px-2 sm:px-4 border-b border-slate-100 dark:border-slate-800">
          {bars.map((bar) => (
            <div
              key={bar.hour}
              className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end min-w-0"
              title={`${bar.label}: ${bar.count} ${bar.count === 1 ? 'paciente' : 'pacientes'}`}
            >
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {bar.count}
              </span>
              <div
                className={`w-full rounded-t-sm transition-all duration-300 ${
                  bar.isPeak ? 'bg-red-500' : 'bg-blue-600'
                }`}
                style={{
                  height: `${bar.count > 0 ? Math.max(bar.heightPercent, 8) : 0}%`,
                }}
              />
              <span className="text-[10px] text-slate-400 font-medium">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}