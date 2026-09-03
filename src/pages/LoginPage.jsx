import React from 'react';
import LoginForm from '../components/LoginForm';
import { PlusCircle } from 'lucide-react';

export default function LoginPage() {
  const handleLogin = (credentials) => {
    console.log('Dados do login:', credentials);
  };

  return (
    <div className="min-h-screen bg-slate-100/80 flex flex-col justify-center items-center p-4">
      <LoginForm onLogin={handleLogin} />

      {/* Rodapé Informativo */}
      <footer className="mt-8 text-xs text-slate-400 flex items-center gap-2">
        <PlusCircle size={14} />
        <span>AtendUBS - Sistema de Gestão de Filas</span>
      </footer>
    </div>
  );
}