import { useEffect } from 'react';

export default function AudioAlert({ triggerKey }) {
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      const playNote = (freq, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = audioCtx.currentTime;
      playNote(523.25, now, 0.3);       // Nota C5
      playNote(659.25, now + 0.25, 0.4); // Nota E5
    } catch (e) {
      console.warn('Erro ao tocar áudio:', e);
    }
  };

  useEffect(() => {
    if (triggerKey) {
      playBeep();
    }
  }, [triggerKey]);

  return null; // Componente invisível
}