import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import CurrentCallCard from '../components/CurrentCallCard';
import RecentCallsList from '../components/RecentCallsList';
import AudioAlert from '../components/AudioAlert';
import { patientService } from '../services/patientService';

const SOCKET_URL = 'http://localhost:3001';

export default function DisplayPage() {
  const [currentCall, setCurrentCall] = useState(null);
  const [lastCalls, setLastCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Busca dados reais na API e organiza quem está em atendimento e o histórico recente
  const loadDisplayData = useCallback(async () => {
    try {
      const data = await patientService.getWaitingQueue();
      const list = Array.isArray(data) ? data : data.pacientes || [];

      // Quem está sendo chamado/atendido agora
      const active =
        list.find(
          (item) =>
            item.status === 'CHAMADO' ||
            item.status === 'Chamado' ||
            item.status === 'Em Atendimento' ||
            item.status === 'EM_ATENDIMENTO'
        ) || null;

      // Histórico de chamadas/concluídos recentes (exclui o card principal para não duplicar)
      const recent = list
        .filter(
          (item) =>
            item.id !== active?.id &&
            (item.status === 'CHAMADO' ||
              item.status === 'Chamado' ||
              item.status === 'Em Atendimento' ||
              item.status === 'Concluído' ||
              item.status === 'FINALIZADO')
        )
        .slice(0, 4);

      setCurrentCall(active);
      setLastCalls(recent);
    } catch (error) {
      console.error('Erro ao atualizar painel de chamada:', error.friendlyMessage || error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDisplayData();

    const socket = io(SOCKET_URL);

    // Quando o médico chama um paciente, atualiza o telão e dispara o alerta sonoro
    socket.on('chamarPaciente', (chamadaPayload) => {
      if (chamadaPayload && (chamadaPayload.nome || chamadaPayload.senha)) {
        setCurrentCall((prev) => {
          if (prev && prev.id !== chamadaPayload.id) {
            setLastCalls((oldHistory) => [prev, ...oldHistory].slice(0, 4));
          }
          return chamadaPayload;
        });
      }
      loadDisplayData();
    });

    socket.on('atendimentoFinalizado', () => {
      loadDisplayData();
    });

    socket.on('novaSenha', () => {
      loadDisplayData();
    });

    return () => {
      socket.disconnect();
    };
  }, [loadDisplayData]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 md:p-8 flex flex-col justify-between transition-colors">
      {/* Alerta Sonoro de Chamada quando há paciente ativo */}
      {currentCall && (
        <AudioAlert
          triggerKey={currentCall.id || currentCall.senha || currentCall.nome}
        />
      )}

      {/* Chamada Principal */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto">
        {isLoading && !currentCall ? (
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Carregando painel de chamadas...
          </p>
        ) : currentCall ? (
          <CurrentCallCard call={currentCall} />
        ) : (
          <div className="text-center p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-base font-bold text-slate-700 dark:text-slate-200 uppercase">
              Aguardando próxima chamada
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              O painel será atualizado automaticamente em tempo real
            </p>
          </div>
        )}
      </div>

      {/* Lista do Rodapé */}
      <RecentCallsList calls={lastCalls} />
    </div>
  );
}
