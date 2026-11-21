import { useEffect } from 'react';

export default function AudioAlert({ triggerKey }) {
  useEffect(() => {
    if (!triggerKey) return;

    let audioCtx;
    let closeTimer;

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();

      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }

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

      closeTimer = setTimeout(() => {
        audioCtx.close().catch(() => {});
      }, 900);
    } catch (e) {
      console.warn('Erro ao tocar áudio:', e);
    }

    return () => {
      if (closeTimer) clearTimeout(closeTimer);
      if (audioCtx && audioCtx.state !== 'closed') {
        audioCtx.close().catch(() => {});
      }
    };
  }, [triggerKey]);

  return null; // Componente invisível
}
