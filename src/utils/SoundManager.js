export default class SoundManager {
  constructor(scene) {
    // Phaser exposes the Web Audio context here; null on fallback devices
    this.ctx = scene.sound.context || null;
  }

  // ── Public API ───────────────────────────────────────────────

  catchAuspicious() {
    this._tone(523, 'sine', 0.12, 0.25);
    this._tone(659, 'sine', 0.15, 0.20, 0.08);
  }

  comboUp() {
    this._tone(523, 'sine', 0.10, 0.20);
    this._tone(659, 'sine', 0.10, 0.20, 0.09);
    this._tone(784, 'sine', 0.18, 0.28, 0.18);
  }

  catchInauspicious() {
    this._tone(180, 'square', 0.10, 0.20);
    this._tone(140, 'square', 0.14, 0.15, 0.10);
  }

  matkaCrack() {
    this._tone(220, 'sawtooth', 0.05, 0.28);
    this._tone(160, 'sawtooth', 0.09, 0.20, 0.05);
  }

  tooHeavy() {
    this._tone(310, 'triangle', 0.07, 0.12);
  }

  boosterCaught() {
    this._tone(392, 'sine', 0.10, 0.22);
    this._tone(523, 'sine', 0.10, 0.22, 0.10);
    this._tone(659, 'sine', 0.20, 0.28, 0.20);
  }

  gameOver() {
    this._tone(262, 'sine', 0.30, 0.28);
    this._tone(220, 'sine', 0.30, 0.22, 0.28);
    this._tone(175, 'sine', 0.55, 0.18, 0.55);
  }

  // ── Internal ─────────────────────────────────────────────────

  _ensure() {
    if (this.ctx?.state === 'suspended') this.ctx.resume().catch(() => {});
  }

  _tone(freq, type, duration, vol, delay = 0) {
    if (!this.ctx) return;
    this._ensure();
    try {
      const t    = this.ctx.currentTime + delay;
      const osc  = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type           = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      osc.start(t);
      osc.stop(t + duration + 0.02);
    } catch (_) { /* silently ignore audio errors */ }
  }
}
