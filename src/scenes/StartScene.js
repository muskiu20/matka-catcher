import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() { super('StartScene'); }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // Start background music if not already playing
    if (!this.sound.get('bg_music')) {
      this.sound.add('bg_music', { loop: true, volume: 0.5 }).play();
    }

    // Background
    this.add.image(W / 2, H / 2, 'start_bg').setDisplaySize(W, H);

    // Title
    this.add.text(W / 2, H * 0.12, 'Matka Catcher', {
      fontSize:        '38px',
      fontFamily:      'Georgia, serif',
      color:           '#8B0000',
      stroke:          '#FFD700',
      strokeThickness: 5,
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.20, '✦  Akshay Tritiya Special  ✦', {
      fontSize:   '17px',
      fontFamily: 'Georgia, serif',
      color:      '#CC6600',
    }).setOrigin(0.5);

    // Instruction
    this.add.text(W / 2, H * 0.30, 'Choose your character', {
      fontSize:   '19px',
      fontFamily: 'Arial, sans-serif',
      color:      '#333333',
    }).setOrigin(0.5);

    // Character cards
    this._makeCharCard(W * 0.28, H * 0.52, 'kid_boy',  'Boy',  0x3A6BC7, () => this._start('boy'));
    this._makeCharCard(W * 0.72, H * 0.52, 'kid_girl', 'Girl', 0xD44C8A, () => this._start('girl'));

    // Controls hint
    this.add.text(W / 2, H * 0.80, 'Tap anywhere to move the kid', {
      fontSize:   '15px',
      fontFamily: 'Arial, sans-serif',
      color:      '#333333',
      stroke:     '#FFFFFF',
      strokeThickness: 2,
    }).setOrigin(0.5);
  }

  _makeCharCard(cx, cy, spriteKey, label, borderColor, onSelect) {
    const cardW = 150;
    const cardH = 190;

    const bg = this.add.rectangle(cx, cy, cardW, cardH, 0xFFFAF0, 0.92)
      .setStrokeStyle(3, borderColor)
      .setInteractive({ useHandCursor: true });

    // Scale sprite to fit card while preserving aspect ratio
    const img = this.add.image(cx, cy - 28, spriteKey);
    const maxH = cardH * 0.6;
    const maxW = cardW * 0.8;
    const scale = Math.min(maxW / img.width, maxH / img.height);
    img.setScale(scale);

    this.add.text(cx, cy + (cardH / 2) - 28, label, {
      fontSize:   '20px',
      fontFamily: 'Georgia, serif',
      color:      `#${borderColor.toString(16).padStart(6, '0')}`,
      fontStyle:  'bold',
    }).setOrigin(0.5);

    bg.on('pointerover',  () => bg.setFillStyle(0xFFF0D0, 0.92));
    bg.on('pointerout',   () => bg.setFillStyle(0xFFFAF0, 0.92));
    bg.on('pointerdown',  () => onSelect());
  }

  _start(gender) {
    this.scene.start('GameScene', { gender });
  }
}
