import React, { useState } from 'react';

export default function PatientForm({ onAddPatient }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [prioridade, setPrioridade] = useState('Geral');
  const [cpfError, setCpfError] = useState('');

  // Aplica a máscara 000.000.000-00 dinamicamente
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14); // Limita a 14 caracteres com pontuação
  };

  // Valida o algoritmo oficial dos dígitos verificadores do CPF
  const validateCPF = (cpfString) => {
    const cleanCPF = cpfString.replace(/\D/g, '');

    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false; // Bloqueia CPFs com dígitos repetidos (ex: 111.111.111-11)

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

    return true;
  };

  const handleCpfChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    if (cpfError) setCpfError(''); // Limpa a mensagem de erro enquanto o usuário digita
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim()) return;

    // Valida o CPF antes de enviar
    if (!validateCPF(cpf)) {
      setCpfError('CPF inválido. Verifique os números informados.');
      return;
    }

    onAddPatient({
      nome,
      cpf,
      prioridade,
    });

    // Reseta o formulário
    setNome('');
    setCpf('');
    setPrioridade('Geral');
    setCpfError('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full transition-colors">
      {/* Título e Subtítulo */}
      <div className="mb-5">
        <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide">
          CADASTRAR PACIENTE
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Insira os dados do paciente para gerar a senha de atendimento
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        {/* Nome do Paciente */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Nome do Paciente
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome completo"
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            required
          />
        </div>

        {/* CPF */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            CPF
          </label>
          <input
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
              cpfError
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-600'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-600'
            }`}
            required
          />
          {cpfError && (
            <span className="text-[11px] text-red-500 dark:text-red-400 font-semibold mt-0.5">
              {cpfError}
            </span>
          )}
        </div>

        {/* Prioridade de Atendimento */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Prioridade de Atendimento
          </label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {/* Opção Geral */}
            <button
              type="button"
              onClick={() => setPrioridade('Geral')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                prioridade === 'Geral'
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-400 ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <span className="font-bold text-xs uppercase">Geral</span>
              <span className="text-[10px] opacity-80 mt-1 font-normal leading-tight">
                Atendimento padrão por ordem de chegada
              </span>
            </button>

            {/* Opção Prioritário */}
            <button
              type="button"
              onClick={() => setPrioridade('Prioritário')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                prioridade === 'Prioritário'
                  ? 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-600 dark:text-red-400 ring-2 ring-red-500/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <span className="font-bold text-xs uppercase">Prioritário</span>
              <span className="text-[10px] opacity-80 mt-1 font-normal leading-tight">
                Gestantes, idosos, PCD e crianças de colo
              </span>
            </button>
          </div>
        </div>

        {/* Botão Cadastrar na Fila */}
        <button
          type="submit"
          className="w-full mt-auto py-3 bg-[#005296] hover:bg-[#004077] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-md transition-all uppercase tracking-wider"
        >
          CADASTRAR NA FILA
        </button>
      </form>
    </div>
  );
}
