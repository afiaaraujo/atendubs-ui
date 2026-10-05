import React, { useState } from 'react';
import Header from '../components/Header';
import MetricsSummary from '../components/MetricsSummary';
import ReportFilters from '../components/ReportFilters';
import HourlyChart from '../components/HourlyChart';
import ProductivityTable from '../components/ProductivityTable';

export default function DashboardPage() {
  const [dataInicio, setDataInicio] = useState('2026-01-21');
  const [dataFim, setDataFim] = useState('2026-01-23');
  const [profissional, setProfissional] = useState('Todos');
  const [prioridade, setPrioridade] = useState('Todas');

  const metrics = {
    atendidos: 52,
    emEspera: 8,
    tempoMedio: '32 min',
  };

  const productivity = [
    { profissional: 'Dr. Ricardo Silva', especialidade: 'Clínico Geral', atendimentos: 24, tempoMedio: '18 min' },
    { profissional: 'Dra. Amanda Costa', especialidade: 'Pediatria', atendimentos: 18, tempoMedio: '22 min' },
    { profissional: 'Enfª Cláudia Ramos', especialidade: 'Triagem / Acolhimento', atendimentos: 45, tempoMedio: '06 min' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      <Header />

      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        <div>
          <h1 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Indicadores de Hoje
          </h1>
        </div>

        {/* Resumo dos Indicadores */}
        <MetricsSummary metrics={metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Coluna de Filtros à Esquerda */}
          <div className="lg:col-span-5">
            <ReportFilters
              dataInicio={dataInicio}
              setDataInicio={setDataInicio}
              dataFim={dataFim}
              setDataFim={setDataFim}
              profissional={profissional}
              setProfissional={setProfissional}
              prioridade={prioridade}
              setPrioridade={setPrioridade}
            />
          </div>

          {/* Coluna de Gráficos e Tabelas à Direita */}
          <div className="lg:col-span-7 space-y-6">
            <HourlyChart />
            <ProductivityTable data={productivity} />
          </div>
        </div>
      </main>
    </div>
  );
}