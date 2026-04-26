import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    this._makeKid('kid_boy',  0x3A6BC7);
    this._makeKid('kid_girl', 0xD44C8A);

    // Generate 5 matka crack states (matka_0 = pristine … matka_4 = heavily cracked)
    for (let c = 0; c <= 4; c++) this._makeMatka(c);

    this._makeCoin();
    this._makeFlower();
    this._makeMangoLeaf();
    this._makeDiya();
    this._makeRing();
    this._makeBee();
    this._makeBrokenCoins();
    this._makeEmptyWallet();
    this._makeBrokenGlass();
    this._makeBroom();
    this._makeBooster();
    this._makeHeart('heart',       0xE63030);
    this._makeHeart('heart_empty', 0x666666);

    this.scene.start('StartScene');
  }

  // ── Kid ──────────────────────────────────────────────────────

  _makeKid(key, bodyColor) {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xF5C87E, 1);  g.fillCircle(16, 10, 10);
    g.fillStyle(bodyColor, 1); g.fillRect(6, 18, 20, 22);
    g.fillStyle(0xF5C87E, 1);  g.fillRect(7, 40, 7, 8); g.fillRect(18, 40, 7, 8);
    g.generateTexture(key, 32, 48);
    g.destroy();
  }

  // ── Matka (5 crack states) ───────────────────────────────────

  _drawMatkaBase(g) {
    g.fillStyle(0xC1440E, 1);  g.fillEllipse(25, 33, 46, 30);
    g.fillStyle(0xA03010, 1);  g.fillRect(18, 12, 14, 18);
    g.fillStyle(0xC1440E, 1);  g.fillEllipse(25, 12, 28, 14);
    g.fillStyle(0xE0622A, 0.55); g.fillEllipse(19, 28, 14, 18);
  }

  _makeMatka(cracks) {
    const g = this.make.graphics({ add: false });
    this._drawMatkaBase(g);

    if (cracks > 0) {
      g.lineStyle(1.5, 0x5C1A00, 1);
      g.beginPath(); g.moveTo(33, 17); g.lineTo(39, 27); g.lineTo(36, 35); g.strokePath();
    }
    if (cracks > 1) {
      g.beginPath(); g.moveTo(13, 19); g.lineTo(8, 32); g.strokePath();
    }
    if (cracks > 2) {
      g.beginPath(); g.moveTo(26, 13); g.lineTo(21, 27); g.lineTo(28, 42); g.strokePath();
    }
    if (cracks > 3) {
      g.beginPath(); g.moveTo(10, 25); g.lineTo(16, 38); g.strokePath();
      g.beginPath(); g.moveTo(38, 22); g.lineTo(44, 34); g.strokePath();
    }

    g.generateTexture(`matka_${cracks}`, 50, 48);
    g.destroy();
  }

  // ── Auspicious items ─────────────────────────────────────────

  _makeCoin() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xFFD700, 1); g.fillCircle(12, 12, 12);
    g.fillStyle(0xFFA500, 1); g.fillCircle(12, 12, 8);
    g.fillStyle(0xFFEC40, 1); g.fillCircle(10, 9, 3);
    g.generateTexture('coin', 24, 24); g.destroy();
  }

  _makeFlower() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xFF69B4, 1);
    g.fillCircle(12, 5, 6); g.fillCircle(19, 12, 6);
    g.fillCircle(12, 19, 6); g.fillCircle(5, 12, 6);
    g.fillStyle(0xFFFF00, 1); g.fillCircle(12, 12, 5);
    g.generateTexture('flower', 24, 24); g.destroy();
  }

  _makeMangoLeaf() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x2E8B22, 1); g.fillEllipse(12, 16, 20, 28);
    g.fillStyle(0x5DBF44, 0.7); g.fillRect(11, 4, 2, 22);
    g.generateTexture('mango_leaf', 24, 32); g.destroy();
  }

  _makeDiya() {
    const g = this.make.graphics({ add: false });
    // Bowl
    g.fillStyle(0xC1440E, 1); g.fillEllipse(14, 22, 28, 13);
    // Flame
    g.fillStyle(0xFF8C00, 1); g.fillEllipse(14, 12, 8, 14);
    g.fillStyle(0xFFFF00, 1); g.fillEllipse(14, 14, 4, 8);
    g.generateTexture('diya', 28, 32); g.destroy();
  }

  _makeRing() {
    const g = this.make.graphics({ add: false });
    g.lineStyle(5, 0xFFD700, 1); g.strokeCircle(16, 17, 11);
    g.fillStyle(0xFF1493, 1);    g.fillRect(12, 4, 8, 7);
    g.fillStyle(0xFF69B4, 0.8);  g.fillRect(14, 5, 4, 4);
    g.generateTexture('ring', 32, 32); g.destroy();
  }

  // ── Inauspicious items ───────────────────────────────────────

  _makeBee() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xFFD700, 1);   g.fillEllipse(12, 14, 18, 22);
    g.fillStyle(0x111111, 0.8);
    g.fillRect(5, 10, 14, 3); g.fillRect(5, 15, 14, 3); g.fillRect(5, 20, 14, 3);
    g.fillStyle(0xBBDDFF, 0.7);
    g.fillEllipse(4, 6, 12, 8); g.fillEllipse(20, 6, 12, 8);
    g.generateTexture('bee', 24, 28); g.destroy();
  }

  _makeBrokenCoins() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x888888, 1); g.fillCircle(10, 10, 8);
    g.fillStyle(0x666666, 1); g.fillCircle(19, 17, 7);
    g.lineStyle(2, 0x333333, 1);
    g.beginPath(); g.moveTo(5, 5);   g.lineTo(15, 15); g.strokePath();
    g.beginPath(); g.moveTo(14, 10); g.lineTo(24, 22); g.strokePath();
    g.generateTexture('broken_coins', 28, 26); g.destroy();
  }

  _makeEmptyWallet() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x5C3317, 1); g.fillRect(2, 6, 28, 18);
    g.fillStyle(0x3D2211, 1); g.fillRect(2, 13, 28, 3);
    // Sad "empty" hint — two small dark rectangles like eyes
    g.fillStyle(0x1A0A00, 0.6);
    g.fillRect(9, 9, 4, 3); g.fillRect(19, 9, 4, 3);
    g.generateTexture('empty_wallet', 32, 30); g.destroy();
  }

  _makeBrokenGlass() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x88CCFF, 0.85); g.fillTriangle(14, 0, 28, 22, 0, 28);
    g.fillStyle(0x44AAEE, 0.65); g.fillTriangle(14, 4, 24, 19, 4, 24);
    g.lineStyle(1.5, 0xFFFFFF, 0.9);
    g.beginPath(); g.moveTo(8, 6); g.lineTo(20, 22); g.strokePath();
    g.beginPath(); g.moveTo(14, 2); g.lineTo(22, 14); g.strokePath();
    g.generateTexture('broken_glass', 28, 28); g.destroy();
  }

  _makeBroom() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x8B4513, 1);  g.fillRect(10, 0, 5, 22);
    g.fillStyle(0xDAA520, 1);  g.fillTriangle(2, 22, 23, 22, 12, 38);
    g.fillStyle(0xC8920A, 1);  g.fillRect(4, 22, 17, 4);
    g.generateTexture('broom', 25, 38); g.destroy();
  }

  // ── Booster (Kumhar's Wheel) ─────────────────────────────────

  _makeBooster() {
    const g = this.make.graphics({ add: false });
    // Glow
    g.fillStyle(0xFFD700, 0.28); g.fillCircle(16, 16, 16);
    // Wheel body
    g.fillStyle(0xC1440E, 1); g.fillCircle(16, 16, 12);
    g.fillStyle(0x8B3010, 1); g.fillCircle(16, 16, 5);
    // Spokes
    g.lineStyle(2, 0xA04020, 1);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      g.beginPath();
      g.moveTo(16 + Math.cos(a) * 5, 16 + Math.sin(a) * 5);
      g.lineTo(16 + Math.cos(a) * 12, 16 + Math.sin(a) * 12);
      g.strokePath();
    }
    // Centre jewel
    g.fillStyle(0xFFD700, 1); g.fillCircle(16, 16, 3);
    g.generateTexture('booster', 32, 32); g.destroy();
  }

  // ── Heart ────────────────────────────────────────────────────

  _makeHeart(key, color) {
    const g = this.make.graphics({ add: false });
    g.fillStyle(color, 1);
    g.fillCircle(7, 8, 7); g.fillCircle(17, 8, 7);
    g.fillTriangle(2, 12, 22, 12, 12, 24);
    g.generateTexture(key, 24, 24); g.destroy();
  }
}
