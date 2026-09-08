import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Plus, ShieldCheck, KeyRound, X } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({ usuario: '', senha: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin(credentials);
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-8 flex flex-col items-center transition-colors relative">
      {/* Ícone */}
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
        <Plus size={28} strokeWidth={3} />
      </div>

      {/* Título e Subtítulo */}
      <h1 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight text-center uppercase">
        AtendUBS
      </h1>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-8 font-medium text-center">
        CHAMADA DIGITAL - ROSALINA ROSAL
      </p>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        {/* Campo Usuário */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Usuário
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 text-slate-400 dark:text-slate-500" size={18} />
            <input
              type="text"
              name="usuario"
              value={credentials.usuario}
              onChange={handleChange}
              placeholder="Digite seu CPF ou usuário"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              required
            />
          </div>
        </div>

        {/* Campo Senha */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Senha
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-slate-400 dark:text-slate-500" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="senha"
              value={credentials.senha}
              onChange={handleChange}
              placeholder="Digite sua senha de acesso"
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Botão Entrar */}
        <button
          type="submit"
          className="w-full mt-2 py-3 bg-[#005296] hover:bg-[#004077] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md transition-all uppercase tracking-wider"
        >
          ENTRAR
        </button>
      </form>

      {/* Link Esqueci minha senha */}
      <button 
        type="button"
        onClick={() => setShowModal(true)}
        className="mt-5 text-xs text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-semibold transition-colors"
      >
        Esqueci minha senha
      </button>

      {/* Divisória */}
      <div className="w-full border-t border-slate-100 dark:border-slate-800 my-6"></div>

      {/* Aviso de Segurança */}
      <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
        <ShieldCheck size={16} />
        <span>Acesso restrito a funcionários autorizados</span>
      </div>

      {/* Modal Esqueci a Senha */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400">
              <KeyRound size={22} />
              <h3 className="font-bold text-slate-800 dark:text-white text-base">
                Redefinição de Senha
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              Por motivos de segurança, a recuperação de senha deve ser solicitada diretamente ao Administrador do Sistema ou à Gestão da UBS.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}