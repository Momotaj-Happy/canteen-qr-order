// Web Audio API Synthesizer Chime for Instant Kitchen Notification
export const playKitchenChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Two-tone chime (E5 -> B5 pleasant bell sound)
    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Smooth envelope decay
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playNote(659.25, now, 0.4);       // E5 note
    playNote(987.77, now + 0.15, 0.6); // B5 note
  } catch (err) {
    console.warn("Audio chime playback constrained:", err);
  }
};
