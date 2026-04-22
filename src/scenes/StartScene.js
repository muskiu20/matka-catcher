import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
  constructor() { super('StartScene'); }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // Sky background
    this.add.rectangle(W / 2, H / 2, W, H, 0x87CEEB);

    // Sun
    this.add.circle(W - 55, 55, 38, 0xFFD700);
    this.add.circle(W - 55, 55, 28, 0xFFEC60);

    // Clouds
    [[70, 90, 100, 38], [105, 72, 78, 30], [260, 105, 115, 40], [295, 84, 85, 30]]
      .forEach(([x, y, w, h]) => this.add.ellipse(x, y, w, h, 0xFFFFFF, 0.88));

    // Ground
    this.add.rectangle(W / 2, H - 40, W, 80, 0xC1440E);
    this.add.rectangle(W / 2, H - 80, W, 6, 0x5D8A3C);

    // Title
    this.add.text(W / 2, H * 0.20, 'Matka www', {
      fontSize:        '38px',
      fontFamily:      'Georgia, serif',
      color:           '#8B0000',
      stroke:          '#FFD700',
      strokeThickness: 5,
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.28, '✦  Akshay Tritiya Special  ✦', {
      fontSize:   '17px',
      fontFamily: 'Georgia, serif',
      color:      '#CC6600',
    }).setOrigin(0.5);

    // Instruction
    this.add.text(W / 2, H * 0.38, 'Choose your character', {
      fontSize:   '19px',
      fontFamily: 'Arial, sans-serif',
      color:      '#333333',
    }).setOrigin(0.5);

    // Boy card
    this._makeCharCard(W * 0.28, H * 0.57, 'kid_boy',  'Boy',  0x3A6BC7, () => this._start('boy'));

    // Girl card
    this._makeCharCard(W * 0.72, H * 0.57, 'kid_girl', 'Girl', 0xD44C8A, () => this._start('girl'));

    // Controls hint
    this.add.text(W / 2, H * 0.82, 'Hold left  ◄ ►  Hold right to move', {
      fontSize:   '15px',
      fontFamily: 'Arial, sans-serif',
      color:      '#555555',
    }).setOrigin(0.5);
  }

  _makeCharCard(cx, cy, spriteKey, label, borderColor, onSelect) {
    const bg = this.add.rectangle(cx, cy, 118, 140, 0xFFFAF0, 1)
      .setStrokeStyle(3, borderColor)
      .setInteractive({ useHandCursor: true });

    this.add.image(cx, cy - 22, spriteKey).setScale(2.6);

    this.add.text(cx, cy + 44, label, {
      fontSize:   '20px',
      fontFamily: 'Georgia, serif',
      color:      `#${borderColor.toString(16).padStart(6, '0')}`,
      fontStyle:  'bold',
    }).setOrigin(0.5);

    bg.on('pointerover',  () => bg.setFillStyle(0xFFF0D0));
    bg.on('pointerout',   () => bg.setFillStyle(0xFFFAF0));
    bg.on('pointerdown',  () => onSelect());
  }

  _start(gender) {
    this.scene.start('GameScene', { gender });
  }
}
