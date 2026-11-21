import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Users, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import NextPatientCard from '../components/NextPatientCard';
import CurrentAttendanceCard from '../components/CurrentAttendanceCard';
import DoctorQueueTable from '../components/DoctorQueueTable';
import { patientService } from '../services/patientService';

const SOCKET_URL = 'http://localhost:3001';
const CONSULTORIO_PADRAO = 'Consultório 02';

const isPriority = (prioridade = '') => {
  const normalized = String(prioridade).toUpperCase();
  return (
    normalized === 'PREFERENCIAL' ||
    normalized === 'PRIORITÁRIO' ||
    normalized === 'PRIORITARIO'
  );
};

export default function DoctorPage() {
  const [queue, setQueue] = useState([]);
  const [nextPatient, setNextPatient] = useState(null);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadQueueData = useCallback(async () => {
    try {
      const data = await patientService.getWaitingQueue();
      const allPatients = Array.isArray(data) ? data : data.pacientes || [];

      const active = allPatients.find(
        (pt) =>
          pt.status === 'CHAMADO' ||
          pt.status === 'Em Atendimento' ||
          pt.status === 'EM_ATENDIMENTO'
      );

      if (active) {
        setCurrentPatient({
          id: active.id,
          senha: active.senha || String(active.id).padStart(3, '0'),
          nome: active.nome,
          prioridade: active.prioridade,
          tempo: active.tempo || 'Em atendimento',
          consultorio: active.consultorio || CONSULTORIO_PADRAO,
        });
      } else {
        setCurrentPatient(null);
      }

      const waiting = allPatients
        .filter((pt) => !pt.status || pt.status === 'AGUARDANDO' || pt.status === 'Aguardando')
        .map((pt) => ({
          ...pt,
          senha: pt.senha || String(pt.id).padStart(3, '0'),
          status: 'AGUARDANDO',
        }));

      setQueue(waiting);

      setNextPatient((prevSelected) => {
        if (waiting.length === 0) return null;

        if (prevSelected) {
          const stillWaiting = waiting.find((pt) => pt.id === prevSelected.id);
          if (stillWaiting) {
            return {
              id: stillWaiting.id,
              senha: stillWaiting.senha,
              nome: stillWaiting.nome,
              prioridade: stillWaiting.prioridade,
            };
          }
        }

        const suggested = waiting.find((pt) => isPriority(pt.prioridade)) || waiting[0];
        return {
          id: suggested.id,
          senha: suggested.senha,
          nome: suggested.nome,
          prioridade: suggested.prioridade,
        };
      });

      setErrorMessage('');
    } catch (error) {
      console.error('Erro ao carregar fila do médico:', error);
      setErrorMessage(error.friendlyMessage || 'Não foi possível carregar a fila de atendimento.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQueueData();

    const socket = io(SOCKET_URL);

    socket.on('novaSenha', () => loadQueueData());
    socket.on('chamarPaciente', () => loadQueueData());
    socket.on('atendimentoFinalizado', () => loadQueueData());

    return () => {
      socket.disconnect();
    };
  }, [loadQueueData]);

  const handleCallNext = async () => {
    if (!nextPatient || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await patientService.callPatient(nextPatient.id, CONSULTORIO_PADRAO);
      setNextPatient(null);
      await loadQueueData();
    } catch (error) {
      console.error('Erro ao chamar paciente:', error);
      setErrorMessage(error.friendlyMessage || 'Erro ao chamar o próximo paciente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = async () => {
    if (!currentPatient || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await patientService.finishPatient(currentPatient.id);
      setCurrentPatient(null);
      await loadQueueData();
    } catch (error) {
      console.error('Erro ao finalizar atendimento:', error);
      setErrorMessage(error.friendlyMessage || 'Erro ao finalizar o atendimento.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      <Header />

      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">
              Fila de Atendimento
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Painel do Profissional de Saúde — {CONSULTORIO_PADRAO}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isLoading && (
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Sincronizando...
              </span>
            )}
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl border border-blue-200 dark:border-blue-900/50 text-sm font-semibold">
              <Users size={18} />
              <span>Aguardando: {queue.length} pacientes</span>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NextPatientCard
            patient={nextPatient}
            onCallNext={handleCallNext}
            disabled={isSubmitting || !nextPatient}
          />
          <CurrentAttendanceCard
            patient={currentPatient}
            onFinish={handleFinish}
            disabled={isSubmitting || !currentPatient}
          />
        </div>

        <DoctorQueueTable
          queue={queue}
          onSelectPatient={(item) =>
            setNextPatient({
              id: item.id,
              senha: item.senha || String(item.id).padStart(3, '0'),
              nome: item.nome,
              prioridade: item.prioridade,
            })
          }
        />
      </main>
    </div>
  );
}