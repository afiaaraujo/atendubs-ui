import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function PatientForm({ onAddPatient, isSubmitting = false }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [prioridade, setPrioridade] = useState('Geral');
  const [nomeError, setNomeError] = useState('');
  const [cpfError, setCpfError] = useState('');

  // Aplica a máscara 000.000.000-00 dinamicamente
  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  };

  // Valida o algoritmo oficial dos dígitos verificadores do CPF
  const validateCPF = (cpfString) => {
    const cleanCPF = cpfString.replace(/\D/g, '');

    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i), 10) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10), 10)) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCPF.substring(i - 1, i), 10) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11), 10)) return false;

    return true;
  };

  const handleNomeChange = (e) => {
    setNome(e.target.value);
    if (nomeError) setNomeError('');
  };

  const handleCpfChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setCpf(formatted);
    if (cpfError) setCpfError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    let hasError = false;

    if (!nome.trim()) {
      setNomeError('Informe o nome completo do paciente.');
      hasError = true;
    }

    if (!validateCPF(cpf)) {
      setCpfError('CPF inválido. Verifique os números informados.');
      hasError = true;
    }

    if (hasError) return;

    try {
      if (onAddPatient) {
        await onAddPatient({
          nome: nome.trim(),
          cpf,
          prioridade: prioridade === 'Prioritário' ? 'PREFERENCIAL' : 'GERAL',
        });
      }

      // Só limpa o formulário se o cadastro na API for concluído sem erro
      setNome('');
      setCpf('');
      setPrioridade('Geral');
      setNomeError('');
      setCpfError('');
    } catch {
      // O erro já é exibido no banner da ReceptionPage; mantém os campos preenchidos
    }
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

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 flex-1">
        {/* Nome do Paciente */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Nome do Paciente
          </label>
          <input
            type="text"
            value={nome}
            onChange={handleNomeChange}
            disabled={isSubmitting}
            placeholder="Digite o nome completo"
            className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-60 ${
              nomeError
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-600'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-600'
            }`}
          />
          {nomeError && (
            <span className="text-[11px] text-red-500 dark:text-red-400 font-semibold mt-0.5">
              {nomeError}
            </span>
          )}
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
            disabled={isSubmitting}
            placeholder="000.000.000-00"
            className={`w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-60 ${
              cpfError
                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-600'
                : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-600'
            }`}
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
              disabled={isSubmitting}
              onClick={() => setPrioridade('Geral')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all disabled:opacity-60 cursor-pointer ${
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
              disabled={isSubmitting}
              onClick={() => setPrioridade('Prioritário')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all disabled:opacity-60 cursor-pointer ${
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
          disabled={isSubmitting}
          className="w-full mt-auto py-3 bg-[#005296] hover:bg-[#004077] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-md transition-all uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>CADASTRANDO...</span>
            </>
          ) : (
            <span>CADASTRAR NA FILA</span>
          )}
        </button>
      </form>
    </div>
  );
}
