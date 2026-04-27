import Phaser from 'phaser';
import { getHighScore } from '../utils/scoreManager';

export default class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOverScene'); }

  init(data) {
    this.finalScore = data.score  || 0;
    this.gender     = data.gender || 'boy';
  }

  create() {
    const W  = this.scale.width;
    const H  = this.scale.height;
    const hs = getHighScore();

    // Background with dark overlay
    this.add.image(W / 2, H / 2, 'start_bg').setDisplaySize(W, H);
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.65);

    // Character sprite — scale to fixed height
    const kid = this.add.image(W / 2, H * 0.22, `kid_${this.gender}`);
    const kidH = 160;
    kid.setDisplaySize(Math.round((kid.width / kid.height) * kidH), kidH)
       .setAlpha(0.95);

    // Game Over title
    this.add.text(W / 2, H * 0.38, 'Game Over', {
      fontSize:        '46px',
      fontFamily:      'Georgia, serif',
      color:           '#FF4444',
      stroke:          '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Score
    this.add.text(W / 2, H * 0.50, `Score: ${this.finalScore}`, {
      fontSize:   '30px',
      fontFamily: '"Courier New", monospace',
      color:      '#FFD700',
      stroke:     '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    // High score
    const isNew = this.finalScore > 0 && this.finalScore === hs;
    this.add.text(W / 2, H * 0.59, isNew ? '⭐  New Best!  ⭐' : `Best: ${hs}`, {
      fontSize:   '20px',
      fontFamily: '"Courier New", monospace',
      color:      isNew ? '#FFD700' : '#AAAAAA',
      stroke:     '#000000',
      strokeThickness: 2,
    }).setOrigin(0.5);

    // Play Again button
    const btn = this.add.rectangle(W / 2, H * 0.72, 210, 58, 0xFF8C00)
      .setInteractive({ useHandCursor: true });
    this.add.text(W / 2, H * 0.72, 'Play Again', {
      fontSize:   '24px',
      fontFamily: 'Georgia, serif',
      color:      '#FFFFFF',
      fontStyle:  'bold',
    }).setOrigin(0.5);

    btn.on('pointerover',  () => btn.setFillStyle(0xFF6600));
    btn.on('pointerout',   () => btn.setFillStyle(0xFF8C00));
    btn.on('pointerdown',  () => this.scene.start('StartScene'));
  }
}
