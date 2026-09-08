import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import ReceptionPage from './pages/ReceptionPage';
import DisplayPage from './pages/DisplayPage';
import { Sun, Moon, Tv, Users, LogIn } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Controla a tela ativa no navegador: 'recepcao' | 'painel' | 'login'
  const [currentScreen, setCurrentScreen] = useState('painel');

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleLogin = () => {
    setCurrentScreen('recepcao');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 relative">
      
      {/* Menu de Navegação Rápida no topo */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-1.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-700">
        
        {/* Botão Recepção */}
        <button
          onClick={() => setCurrentScreen('recepcao')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
            currentScreen === 'recepcao'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Users size={14} />
          Recepção
        </button>

        {/* Botão Painel TV */}
        <button
          onClick={() => setCurrentScreen('painel')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
            currentScreen === 'painel'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Tv size={14} />
          Painel TV
        </button>

        {/* Botão Login */}
        <button
          onClick={() => setCurrentScreen('login')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
            currentScreen === 'login'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <LogIn size={14} />
          Login
        </button>

        <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-700 mx-1" />

        {/* Alternar Tema */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          title="Alternar tema"
        >
          {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
        </button>
      </div>

      {/* Renderização Condicional */}
      {currentScreen === 'recepcao' && <ReceptionPage onLogout={handleLogout} />}
      {currentScreen === 'painel' && <DisplayPage />}
      {currentScreen === 'login' && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <LoginPage onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}
