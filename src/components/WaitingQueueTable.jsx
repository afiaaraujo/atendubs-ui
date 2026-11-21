import React from 'react';
import { Loader2 } from 'lucide-react';
import Badge from './Badge';

const isPriorityValue = (prioridade = '') => {
  const normalized = String(prioridade).toUpperCase();
  return (
    normalized === 'PREFERENCIAL' ||
    normalized === 'PRIORITÁRIO' ||
    normalized === 'PRIORITARIO'
  );
};

export default function WaitingQueueTable({
  patients = [],
  isLoading = false,
  onCallPatient,
  callingPatientId = null,
}) {
  // Função auxiliar para mapear o status do paciente para a variante correta do Badge
  const getStatusVariant = (status) => {
    switch (status) {
      case 'CHAMADO':
      case 'Em Atendimento':
      case 'Chamado':
      case 'EM_ATENDIMENTO':
        return 'info'; // Azul
      case 'Concluído':
      case 'Atendido':
      case 'FINALIZADO':
        return 'success'; // Verde
      case 'Aguardando':
      default:
        return 'warning'; // Amarelo
    }
  };

  const waitingCount = patients.filter(
    (pt) => !pt.status || pt.status === 'Aguardando' || pt.status === 'AGUARDANDO'
  ).length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full transition-colors">
      {/* Cabeçalho da Tabela */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide">
            PACIENTES AGUARDANDO
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Lista de pacientes na fila de triagem em tempo real
          </p>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {waitingCount} {waitingCount === 1 ? 'paciente aguardando' : 'pacientes aguardando'}
        </span>
      </div>

      {/* Corpo da Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold uppercase">
              <th className="pb-3 px-2">Senha</th>
              <th className="pb-3 px-2">Paciente</th>
              <th className="pb-3 px-2">CPF</th>
              <th className="pb-3 px-2">Prioridade</th>
              <th className="pb-3 px-2">Status</th>
              <th className="pb-3 px-2 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400 dark:text-slate-500">
                  <div className="inline-flex items-center gap-2 font-medium">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Carregando fila de pacientes...</span>
                  </div>
                </td>
              </tr>
            ) : patients.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400 dark:text-slate-500 font-medium">
                  Nenhum paciente na fila no momento.
                </td>
              </tr>
            ) : (
              patients.map((pt) => {
                const isPrioritario = isPriorityValue(pt.prioridade);
                const statusAtual = pt.status || 'Aguardando';
                const isBusy = callingPatientId === pt.id;
                const isFinished =
                  statusAtual === 'Concluído' ||
                  statusAtual === 'Atendido' ||
                  statusAtual === 'FINALIZADO';

                return (
                  <tr
                    key={pt.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-3 px-2 font-bold text-slate-700 dark:text-slate-300">
                      {pt.senha || pt.numeroSenha || '—'}
                    </td>
                    <td className="py-3 px-2 font-semibold text-slate-800 dark:text-white">
                      {pt.nome}
                    </td>
                    <td className="py-3 px-2 text-slate-400 dark:text-slate-500">
                      {pt.cpf}
                    </td>

                    {/* BADGE DE PRIORIDADE */}
                    <td className="py-3 px-2">
                      <Badge variant={isPrioritario ? 'preferencial' : 'geral'}>
                        {pt.prioridade}
                      </Badge>
                    </td>

                    {/* BADGE DE STATUS DINÂMICO */}
                    <td className="py-3 px-2">
                      <Badge variant={getStatusVariant(statusAtual)}>
                        {statusAtual}
                      </Badge>
                    </td>

                    <td className="py-3 px-2 text-right">
                      <button
                        type="button"
                        disabled={isBusy || isFinished}
                        onClick={() => onCallPatient && onCallPatient(pt.id)}
                        className="px-3 py-1.5 bg-[#005296] hover:bg-[#004077] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-[11px] rounded transition-all uppercase shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isBusy ? 'CHAMANDO...' : 'CHAMAR'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}