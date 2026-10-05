import React, { useState } from 'react';
import Header from '../components/Header';
import PatientForm from '../components/PatientForm';
import WaitingQueueTable from '../components/WaitingQueueTable';

export default function ReceptionPage() {
  // Dados iniciais baseados na imagem do protótipo
  const [patients, setPatients] = useState([
    { id: 1, senha: '001', nome: 'João Silva', cpf: '000.000.000-00', prioridade: 'Geral', status: 'Aguardando' },
    { id: 2, senha: '002', nome: 'Maria Santos', cpf: '000.000.000-00', prioridade: 'Preferencial', status: 'Em Atendimento' },
    { id: 3, senha: '003', nome: 'José Alves', cpf: '000.000.000-00', prioridade: 'Geral', status: 'Concluído' },
  ]);

  const handleAddPatient = (newPt) => {
    const nextId = patients.length + 1;
    const formattedSenha = String(nextId).padStart(3, '0');
    setPatients([
      ...patients,
      {
        id: Date.now(),
        senha: formattedSenha,
        nome: newPt.nome,
        cpf: newPt.cpf,
        prioridade: newPt.prioridade,
        status: 'Aguardando',
      },
    ]);
  };

  const handleCallPatient = (id) => {
    console.log('Chamando paciente id:', id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      {/* Header limpo, sem responsabilidade de logout */}
      <Header />
      
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl w-full mx-auto">
        {/* Coluna Esquerda: Formulário (4 colunas) */}
        <div className="md:col-span-4">
          <PatientForm onAddPatient={handleAddPatient} />
        </div>

        {/* Coluna Direita: Tabela da Fila (8 colunas) */}
        <div className="md:col-span-8">
          <WaitingQueueTable patients={patients} onCallPatient={handleCallPatient} />
        </div>
      </main>
    </div>
  );
}