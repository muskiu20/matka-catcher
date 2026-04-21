import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    this._makeKid('kid_boy',  0x3A6BC7);
    this._makeKid('kid_girl', 0xD44C8A);
    this._makeMatka();
    this._makeCoin();
    this._makeFlower();
    this._makeMangoLeaf();
    this._makeBee();
    this._makeBroom();
    this._makeHeart('heart',       0xE63030);
    this._makeHeart('heart_empty', 0x666666);
    this.scene.start('StartScene');
  }

  // ── helpers ──────────────────────────────────────────────────

  _makeKid(key, bodyColor) {
    const g = this.make.graphics({ add: false });
    // Head
    g.fillStyle(0xF5C87E, 1);
    g.fillCircle(16, 10, 10);
    // Body (kurta / lehenga)
    g.fillStyle(bodyColor, 1);
    g.fillRect(6, 18, 20, 22);
    // Legs
    g.fillStyle(0xF5C87E, 1);
    g.fillRect(7,  40, 7, 8);
    g.fillRect(18, 40, 7, 8);
    g.generateTexture(key, 32, 48);
    g.destroy();
  }

  _makeMatka() {
    const g = this.make.graphics({ add: false });
    // Body
    g.fillStyle(0xC1440E, 1);
    g.fillEllipse(25, 33, 46, 30);
    // Neck
    g.fillStyle(0xA03010, 1);
    g.fillRect(18, 12, 14, 18);
    // Rim
    g.fillStyle(0xC1440E, 1);
    g.fillEllipse(25, 12, 28, 14);
    // Highlight
    g.fillStyle(0xE0622A, 0.55);
    g.fillEllipse(19, 28, 14, 18);
    g.generateTexture('matka', 50, 48);
    g.destroy();
  }

  _makeCoin() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0xFFD700, 1);
    g.fillCircle(12, 12, 12);
    g.fillStyle(0xFFA500, 1);
    g.fillCircle(12, 12, 8);
    g.fillStyle(0xFFEC40, 1);
    g.fillCircle(10, 9, 3);
    g.generateTexture('coin', 24, 24);
    g.destroy();
  }

  _makeFlower() {
    const g = this.make.graphics({ add: false });
    // Petals
    g.fillStyle(0xFF69B4, 1);
    g.fillCircle(12, 5,  6);
    g.fillCircle(19, 12, 6);
    g.fillCircle(12, 19, 6);
    g.fillCircle(5,  12, 6);
    // Centre
    g.fillStyle(0xFFFF00, 1);
    g.fillCircle(12, 12, 5);
    g.generateTexture('flower', 24, 24);
    g.destroy();
  }

  _makeMangoLeaf() {
    const g = this.make.graphics({ add: false });
    g.fillStyle(0x2E8B22, 1);
    g.fillEllipse(12, 16, 20, 28);
    // Vein
    g.fillStyle(0x5DBF44, 0.7);
    g.fillRect(11, 4, 2, 22);
    g.generateTexture('mango_leaf', 24, 32);
    g.destroy();
  }

  _makeBee() {
    const g = this.make.graphics({ add: false });
    // Body
    g.fillStyle(0xFFD700, 1);
    g.fillEllipse(12, 14, 18, 22);
    // Stripes
    g.fillStyle(0x111111, 0.8);
    g.fillRect(5, 10, 14, 3);
    g.fillRect(5, 15, 14, 3);
    g.fillRect(5, 20, 14, 3);
    // Wings
    g.fillStyle(0xBBDDFF, 0.7);
    g.fillEllipse(4,  6, 12, 8);
    g.fillEllipse(20, 6, 12, 8);
    g.generateTexture('bee', 24, 28);
    g.destroy();
  }

  _makeBroom() {
    const g = this.make.graphics({ add: false });
    // Handle
    g.fillStyle(0x8B4513, 1);
    g.fillRect(10, 0, 5, 22);
    // Bristles
    g.fillStyle(0xDAA520, 1);
    g.fillTriangle(2, 22, 23, 22, 12, 38);
    g.fillStyle(0xC8920A, 1);
    g.fillRect(4, 22, 17, 4);
    g.generateTexture('broom', 25, 38);
    g.destroy();
  }

  _makeHeart(key, color) {
    const g = this.make.graphics({ add: false });
    g.fillStyle(color, 1);
    g.fillCircle(7,  8, 7);
    g.fillCircle(17, 8, 7);
    g.fillTriangle(2, 12, 22, 12, 12, 24);
    g.generateTexture(key, 24, 24);
    g.destroy();
  }
}
