import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, PlusCircle } from 'lucide-react';

export default function LoginForm({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ usuario: '', senha: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(credentials);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 flex flex-col items-center">
      {/* Ícone do Topo */}
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-700 mb-4 border border-slate-200">
        <PlusCircle size={26} />
      </div>

      {/* Cabeçalho */}
      <h1 className="text-xl font-bold text-slate-800 tracking-wide text-center uppercase">
        UBS ROSALINA ROSAL
      </h1>
      <p className="text-[11px] text-slate-400 mb-8 font-medium uppercase tracking-wider">
        Sistema de Chamada Digital
      </p>

      {/* Formulário de Autenticação */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        {/* Campo Usuário */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">
            Usuário
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 text-slate-400" size={18} />
            <input
              type="text"
              name="usuario"
              value={credentials.usuario}
              onChange={handleChange}
              placeholder="Digite seu usuário"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        {/* Campo Senha */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-600">
            Senha
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-slate-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="senha"
              value={credentials.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Botão Entrar */}
        <button
          type="submit"
          className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm shadow-md shadow-blue-500/20 transition-all uppercase tracking-wider"
        >
          ENTRAR
        </button>
      </form>

      {/* Link de Recuperação */}
      <button 
        type="button"
        className="mt-6 text-xs text-slate-500 hover:text-slate-700 underline font-medium transition-colors"
      >
        Esqueci minha senha
      </button>
    </div>
  );
}