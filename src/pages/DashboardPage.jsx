import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import MetricsSummary from '../components/MetricsSummary';
import ReportFilters from '../components/ReportFilters';
import HourlyChart from '../components/HourlyChart';
import ProductivityTable from '../components/ProductivityTable';
import { patientService } from '../services/patientService';

const SOCKET_URL = 'http://localhost:3001';

const toLocalDateKey = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTodayDate = () => toLocalDateKey(new Date()) || '';

const getPatientProfessional = (pt) =>
  pt?.profissional ||
  pt?.medico ||
  pt?.responsavel ||
  pt?.consultorio ||
  'Recepção / Não atribuído';

const isFinalizedStatus = (status) => {
  const normalized = String(status || '').toUpperCase();
  return (
    normalized === 'FINALIZADO' ||
    normalized === 'CONCLUÍDO' ||
    normalized === 'CONCLUIDO' ||
    normalized === 'ATENDIDO'
  );
};

const isWaitingStatus = (status) => {
  if (!status) return true;
  const normalized = String(status).toUpperCase();
  return normalized === 'AGUARDANDO' || normalized === 'AGUARDANDO ATENDIMENTO';
};

export default function DashboardPage() {
  const [dataInicio, setDataInicio] = useState(getTodayDate);
  const [dataFim, setDataFim] = useState(getTodayDate);
  const [profissional, setProfissional] = useState('Todos');
  const [prioridade, setPrioridade] = useState('Todas');

  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    try {
      const data = await patientService.getWaitingQueue();
      setPatients(Array.isArray(data) ? data : data.pacientes || []);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error.friendlyMessage || error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();

    const socket = io(SOCKET_URL);

    socket.on('novaSenha', () => loadDashboardData());
    socket.on('chamarPaciente', () => loadDashboardData());
    socket.on('atendimentoFinalizado', () => loadDashboardData());

    return () => {
      socket.disconnect();
    };
  }, [loadDashboardData]);

  const professionals = useMemo(() => {
    const names = patients
      .map((pt) => pt.profissional || pt.medico || pt.responsavel || pt.consultorio)
      .filter(Boolean);

    return [...new Set(names)];
  }, [patients]);

  const filteredPatients = useMemo(() => {
    return patients.filter((pt) => {
      if (dataInicio || dataFim) {
        const createdKey = toLocalDateKey(pt.criadoEm);
        if (!createdKey) return false;
        if (dataInicio && createdKey < dataInicio) return false;
        if (dataFim && createdKey > dataFim) return false;
      }

      if (prioridade !== 'Todas') {
        const ptPriority = String(pt.prioridade || '').toUpperCase();
        const selectedPriority = String(prioridade).toUpperCase();
        if (ptPriority !== selectedPriority) {
          return false;
        }
      }

      if (profissional !== 'Todos') {
        const patientProfessional = getPatientProfessional(pt);
        if (patientProfessional !== profissional) {
          return false;
        }
      }

      return true;
    });
  }, [patients, dataInicio, dataFim, prioridade, profissional]);

  const metrics = useMemo(() => {
    const emEspera = filteredPatients.filter((pt) => isWaitingStatus(pt.status)).length;
    const atendidos = filteredPatients.filter((pt) => isFinalizedStatus(pt.status)).length;

    return {
      atendidos,
      emEspera,
      tempoMedio: filteredPatients.length > 0 ? 'Em cálculo' : '0 min',
    };
  }, [filteredPatients]);

  const productivityData = useMemo(() => {
    const grouped = new Map();

    filteredPatients.forEach((pt) => {
      const nomeProfissional = getPatientProfessional(pt);
      const especialidade =
        pt.especialidade ||
        (pt.consultorio ? `Consultório (${pt.consultorio})` : 'Atendimento Geral');

      if (!grouped.has(nomeProfissional)) {
        grouped.set(nomeProfissional, {
          id: nomeProfissional,
          profissional: nomeProfissional,
          especialidade,
          atendimentos: 0,
          totalRegistros: 0,
          duracaoSomaMin: 0,
          duracaoAmostras: 0,
        });
      }

      const entry = grouped.get(nomeProfissional);
      entry.totalRegistros += 1;

      if (isFinalizedStatus(pt.status)) {
        entry.atendimentos += 1;

        const inicioRaw = pt.chamadoEm || pt.iniciadoEm || pt.criadoEm;
        const fimRaw = pt.finalizadoEm || pt.concluidoEm || pt.atualizadoEm;

        if (inicioRaw && fimRaw) {
          const inicioMs = new Date(inicioRaw).getTime();
          const fimMs = new Date(fimRaw).getTime();
          if (!Number.isNaN(inicioMs) && !Number.isNaN(fimMs) && fimMs >= inicioMs) {
            entry.duracaoSomaMin += (fimMs - inicioMs) / 60000;
            entry.duracaoAmostras += 1;
          }
        }
      }
    });

    return Array.from(grouped.values())
      .map((item) => {
        const tempoMedio =
          item.duracaoAmostras > 0
            ? `${Math.max(1, Math.round(item.duracaoSomaMin / item.duracaoAmostras))} min`
            : item.atendimentos > 0
              ? '—'
              : '0 min';

        return {
          id: item.id,
          profissional: item.profissional,
          especialidade: item.especialidade,
          atendimentos: item.atendimentos,
          tempoMedio,
        };
      })
      .sort((a, b) => b.atendimentos - a.atendimentos);
  }, [filteredPatients]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      <Header />

      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Indicadores de Hoje
          </h1>
          {isLoading && (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Sincronizando...
            </span>
          )}
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
              professionals={professionals}
            />
          </div>

          {/* Coluna de Gráficos e Tabelas à Direita */}
          <div className="lg:col-span-7 space-y-6">
            <HourlyChart patients={filteredPatients} />
            <ProductivityTable data={productivityData} />
          </div>
        </div>
      </main>
    </div>
  );
}