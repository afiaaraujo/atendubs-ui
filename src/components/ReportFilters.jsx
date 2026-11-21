import React from 'react';
import { Filter, Download, FileSpreadsheet, FileText, Eye } from 'lucide-react';

export default function ReportFilters({
  dataInicio,
  setDataInicio,
  dataFim,
  setDataFim,
  profissional,
  setProfissional,
  prioridade,
  setPrioridade,
  professionals = [],
  onGenerateReport,
  onExportPdf,
  onExportExcel,
  onPreviewReport,
}) {
  const getCurrentFilters = () => ({
    dataInicio,
    dataFim,
    profissional,
    prioridade,
  });

  const handleGenerate = () => {
    onGenerateReport?.(getCurrentFilters());
  };

  const handlePdf = () => {
    if (onExportPdf) {
      onExportPdf(getCurrentFilters());
    } else {
      window.print();
    }
  };

  const handleExcel = () => {
    onExportExcel?.(getCurrentFilters());
  };

  const handlePreview = () => {
    onPreviewReport?.(getCurrentFilters());
  };

  const professionalList = Array.isArray(professionals) ? professionals : [];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Filter size={18} className="text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">
            Filtros de Relatório
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="filtro-data-inicio" className="block text-xs font-semibold text-slate-500 mb-1">
              Data Início
            </label>
            <input
              id="filtro-data-inicio"
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="filtro-data-fim" className="block text-xs font-semibold text-slate-500 mb-1">
              Data Fim
            </label>
            <input
              id="filtro-data-fim"
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="filtro-profissional" className="block text-xs font-semibold text-slate-500 mb-1">
            Profissional
          </label>
          <select
            id="filtro-profissional"
            value={profissional}
            onChange={(e) => setProfissional(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todos">Todos os Profissionais</option>
            {professionalList.map((prof) => (
              <option key={prof} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filtro-prioridade" className="block text-xs font-semibold text-slate-500 mb-1">
            Prioridade
          </label>
          <select
            id="filtro-prioridade"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todas">Todas as Prioridades</option>
            <option value="GERAL">Geral</option>
            <option value="PREFERENCIAL">Preferencial</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Gerar Relatório
        </button>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handlePdf}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400 rounded-xl text-xs font-bold border border-red-200 dark:border-red-900/40 transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Exportar PDF</span>
          </button>
          <button
            type="button"
            onClick={handleExcel}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-900/40 transition-colors cursor-pointer"
          >
            <FileSpreadsheet size={14} />
            <span>Exportar Excel</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">
          Relatórios Disponíveis
        </h3>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Atendimentos por período</p>
              <p className="text-[10px] text-slate-400">Filtro de entradas e saída do sistema</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handlePreview}
            className="px-3 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Eye size={12} />
            Visualizar
          </button>
        </div>
      </div>
    </div>
  );
}