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

    // Dim overlay
    this.add.rectangle(W / 2, H / 2, W, H, 0x0A0500, 0.88);

    // Broken matka illustration (tilted)
    this.add.image(W / 2, H * 0.18, 'matka_4')
      .setScale(3)
      .setAngle(25)
      .setAlpha(0.55)
      .setTint(0x666666);

    // Character sprite
    this.add.image(W / 2, H * 0.18, `kid_${this.gender}`)
      .setScale(2.8)
      .setAlpha(0.9);

    // Game Over title
    this.add.text(W / 2, H * 0.33, 'Game Over', {
      fontSize:        '46px',
      fontFamily:      'Georgia, serif',
      color:           '#FF4444',
      stroke:          '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Score
    this.add.text(W / 2, H * 0.46, `Score: ${this.finalScore}`, {
      fontSize:   '30px',
      fontFamily: '"Courier New", monospace',
      color:      '#FFD700',
    }).setOrigin(0.5);

    // High score
    const isNew = this.finalScore > 0 && this.finalScore === hs;
    this.add.text(W / 2, H * 0.54, isNew ? '⭐  New Best!  ⭐' : `Best: ${hs}`, {
      fontSize:   '20px',
      fontFamily: '"Courier New", monospace',
      color:      isNew ? '#FFD700' : '#AAAAAA',
    }).setOrigin(0.5);

    // Play Again button
    const btn = this.add.rectangle(W / 2, H * 0.68, 210, 58, 0xFF8C00, 1)
      .setInteractive({ useHandCursor: true });
    this.add.text(W / 2, H * 0.68, 'Play Again', {
      fontSize:   '24px',
      fontFamily: 'Georgia, serif',
      color:      '#FFFFFF',
      fontStyle:  'bold',
    }).setOrigin(0.5);

    btn.on('pointerover',  () => btn.setFillStyle(0xFF6600));
    btn.on('pointerout',   () => btn.setFillStyle(0xFF8C00));
    btn.on('pointerdown',  () => this.scene.start('StartScene'));

    // Tip
    this.add.text(W / 2, H * 0.82,
      'Tip: tap & hold to stop the kid\nunder a falling item!', {
        fontSize:  '14px',
        fontFamily:'Arial, sans-serif',
        color:     '#888888',
        align:     'center',
      }).setOrigin(0.5);
  }
}
