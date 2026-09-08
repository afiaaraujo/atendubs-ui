import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <LoginForm onLogin={(creds) => console.log('Login:', creds)} />
    </div>
  );
}