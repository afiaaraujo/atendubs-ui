import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { authService } from '../services/authService';

export default function LoginPage({ onLoginSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(creds) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const userData = await authService.login(creds);
      localStorage.setItem('atendubs_user', JSON.stringify(userData));

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
    } catch (error) {
      setErrorMessage(
        error.friendlyMessage ||
          error.response?.data?.error ||
          'Falha ao realizar login. Verifique suas credenciais.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 gap-3">
      {errorMessage && (
        <div
          role="alert"
          className="w-full max-w-md rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <LoginForm
        onLogin={handleLogin}
        isSubmitting={isSubmitting}
        error={errorMessage}
      />
    </div>
  );
}
