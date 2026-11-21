import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import PatientForm from '../components/PatientForm';
import WaitingQueueTable from '../components/WaitingQueueTable';
import { patientService } from '../services/patientService';

// Aponta para a raiz do servidor (sem o /api)
const SOCKET_URL = 'http://localhost:3001';

export default function ReceptionPage() {
  const [patients, setPatients] = useState([]);
  const [isLoadingQueue, setIsLoadingQueue] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Busca a fila real na API (Tarefa 5)
  const fetchQueue = useCallback(async () => {
    try {
      const data = await patientService.getWaitingQueue();
      setPatients(Array.isArray(data) ? data : data.pacientes || []);
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.friendlyMessage || 'Erro ao carregar a fila de pacientes.',
      });
    } finally {
      setIsLoadingQueue(false);
    }
  }, []);

  // Carrega ao abrir a página e conecta o Socket.io para tempo real
  useEffect(() => {
    fetchQueue();

    const socket = io(SOCKET_URL);

    socket.on('novaSenha', () => {
      fetchQueue();
    });

    socket.on('chamarPaciente', () => {
      fetchQueue();
    });

    socket.on('atendimentoFinalizado', () => {
      fetchQueue();
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchQueue]);

  // Cadastra novo paciente real na API (Tarefa 4 e Tarefa 7)
  const handleAddPatient = async (newPt) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      await patientService.createPatient({
        nome: newPt.nome.trim(),
        cpf: newPt.cpf,
        prioridade: newPt.prioridade,
      });

      setFeedback({
        type: 'success',
        message: `Paciente ${newPt.nome} adicionado à fila com sucesso!`,
      });

      // Atualiza a tabela imediatamente
      await fetchQueue();
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.friendlyMessage || 'Não foi possível cadastrar o paciente.',
      });
      throw error; // Permite que o PatientForm saiba que deu erro e não limpe os campos
    } finally {
      setIsSubmitting(false);
    }
  };

  // Chama paciente direto da recepção (se o botão estiver ativo na tabela)
  const handleCallPatient = async (id) => {
    try {
      await patientService.callPatient(id, 'Consultório 01');
      await fetchQueue();
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.friendlyMessage || 'Erro ao chamar paciente.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      <Header />

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto flex flex-col gap-4">
        {/* Banner de feedback (Sucesso ou Erro da API - Tarefas 7 e 8) */}
        {feedback.message && (
          <div
            role="alert"
            className={`px-4 py-3 rounded-xl border text-sm font-medium ${
              feedback.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-900 dark:text-red-300'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300'
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
          {/* Coluna Esquerda: Formulário (4 colunas) */}
          <div className="md:col-span-4">
            <PatientForm
              onAddPatient={handleAddPatient}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Coluna Direita: Tabela da Fila (8 colunas) */}
          <div className="md:col-span-8">
            <WaitingQueueTable
              patients={patients}
              isLoading={isLoadingQueue}
              onCallPatient={handleCallPatient}
            />
          </div>
        </div>
      </main>
    </div>
  );
}