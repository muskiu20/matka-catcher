import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  preload() {
    this.load.image('bg',            'assets/Game Environment.png');
    this.load.image('kid_boy',       'assets/kid male static.png');
    this.load.image('kid_boy_move',  'assets/kid male right moving.png');
    this.load.image('kid_girl',      'assets/kid female static.png');
    this.load.image('kid_girl_move', 'assets/kid female right moving.png');
    this.load.image('coin',          'assets/gold coin.png');
    this.load.image('flower',        'assets/lotus flower.png');
    this.load.image('mango_leaf',    'assets/mango leaves.png');
    this.load.image('grain',         'assets/grain.png');
    this.load.image('cash',          'assets/cash.png');
    this.load.image('broken_coins',  'assets/broken coin.png');
    this.load.image('empty_wallet',  'assets/empty wallet.png');
    this.load.image('powerup_2x',    'assets/2x powerup.png');
    this.load.image('matka_repair',  'assets/matka repair.png');
  }

  create() {
    for (let c = 0; c <= 4; c++) this._makeMatka(c);
    this._makeHeart('heart',       0xE63030);
    this._makeHeart('heart_empty', 0x666666);

    this.scene.start('StartScene');
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

  // ── Heart ────────────────────────────────────────────────────

  _makeHeart(key, color) {
    const g = this.make.graphics({ add: false });
    g.fillStyle(color, 1);
    g.fillCircle(7, 8, 7); g.fillCircle(17, 8, 7);
    g.fillTriangle(2, 12, 22, 12, 12, 24);
    g.generateTexture(key, 24, 24); g.destroy();
  }
}
