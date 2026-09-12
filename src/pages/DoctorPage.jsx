import React, { useState } from 'react';
import { Users } from 'lucide-react';
import Header from '../components/Header';
import NextPatientCard from '../components/NextPatientCard';
import CurrentAttendanceCard from '../components/CurrentAttendanceCard';
import DoctorQueueTable from '../components/DoctorQueueTable';

export default function DoctorPage() {
  const [nextPatient, setNextPatient] = useState({
    senha: '002',
    nome: 'Maria Santos',
    prioridade: 'PREFERENCIAL',
  });

  const [currentPatient, setCurrentPatient] = useState({
    senha: '000',
    nome: 'Carlos Souza',
    tempo: '12 min',
    consultorio: 'Consultório 02',
  });

  const [queue, setQueue] = useState([
    { id: '001', nome: 'João Silva', prioridade: 'GERAL', status: 'Aguardando' },
    { id: '002', nome: 'Maria Santos', prioridade: 'PREFERENCIAL', status: 'Aguardando' },
    { id: '003', nome: 'José Alves', prioridade: 'GERAL', status: 'Aguardando' },
    { id: '004', nome: 'Ana Oliveira', prioridade: 'PREFERENCIAL', status: 'Aguardando' },
    { id: '005', nome: 'Antonio Souza', prioridade: 'GERAL', status: 'Aguardando' },
    { id: '006', nome: 'Francisca Silva', prioridade: 'PREFERENCIAL', status: 'Aguardando' },
  ]);

  const handleCallNext = () => {
    if (nextPatient) {
      setCurrentPatient({
        senha: nextPatient.senha || nextPatient.id,
        nome: nextPatient.nome,
        tempo: '0 min',
        consultorio: 'Consultório 02',
      });
      setQueue((prev) => prev.filter((p) => p.id !== (nextPatient.senha || nextPatient.id)));
      setNextPatient(null);
    }
  };

  const handleFinish = () => {
    setCurrentPatient(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      {/* Header padronizado */}
      <Header />

      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        
        {/* Painel do Consultório / Status da Fila */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight">
              Fila de Atendimento
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Painel do Profissional de Saúde — Consultório 02
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl border border-blue-200 dark:border-blue-900/50 text-sm font-semibold">
            <Users size={18} />
            <span>Aguardando: {queue.length} pacientes</span>
          </div>
        </div>

        {/* Cards Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NextPatientCard patient={nextPatient} onCallNext={handleCallNext} />
          <CurrentAttendanceCard patient={currentPatient} onFinish={handleFinish} />
        </div>

        {/* Tabela Inferior */}
        <DoctorQueueTable
          queue={queue}
          onSelectPatient={(item) =>
            setNextPatient({
              senha: item.id,
              nome: item.nome,
              prioridade: item.prioridade,
            })
          }
        />

      </main>
    </div>
  );
}
