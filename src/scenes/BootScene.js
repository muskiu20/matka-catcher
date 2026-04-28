import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  preload() {
    const W = this.scale.width;
    const H = this.scale.height;

    // Loading screen
    this.add.rectangle(W / 2, H / 2, W, H, 0x1a0800);
    this.add.text(W / 2, H * 0.42, 'Matka Catcher', {
      fontSize: '28px', fontFamily: 'Georgia, serif',
      color: '#FFD700',
    }).setOrigin(0.5);

    const barW  = 260;
    const barBg = this.add.rectangle(W / 2, H * 0.52, barW + 4, 22, 0x333333).setOrigin(0.5);
    const bar   = this.add.rectangle(W / 2 - barW / 2, H * 0.52, 0, 18, 0xFFD700).setOrigin(0, 0.5);
    this.add.text(W / 2, H * 0.58, 'Loading...', {
      fontSize: '16px', fontFamily: 'Arial', color: '#aaaaaa',
    }).setOrigin(0.5);

    this.load.on('progress', (v) => { bar.width = barW * v; });

    // Assets
    this.load.image('bg',            'assets/bg.png');
    this.load.image('start_bg',      'assets/start_bg.png');
    this.load.image('kid_boy',        'assets/kid_male_static.png');
    this.load.image('kid_boy_move',   'assets/kid_male_moving.png');
    this.load.image('kid_boy_crack1', 'assets/kid_male_crack1.png');
    this.load.image('kid_boy_crack2', 'assets/kid_male_crack2.png');
    this.load.image('kid_girl',      'assets/kid_female_static.png');
    this.load.image('kid_girl_move', 'assets/kid_female_moving.png');
    this.load.image('coin',          'assets/gold_coin.png');
    this.load.image('flower',        'assets/lotus_flower.png');
    this.load.image('mango_leaf',    'assets/mango_leaves.png');
    this.load.image('grain',         'assets/grain.png');
    this.load.image('cash',          'assets/cash.png');
    this.load.image('broken_coins',  'assets/broken_coin.png');
    this.load.image('wallet',        'assets/wallet.png');
    this.load.image('powerup_2x',    'assets/powerup_2x.png');
    this.load.image('matka_repair',  'assets/matka_repair.png');

    this.load.audio('bg_music', 'assets/bg_music.mp3');

    this.load.on('loaderror', (file) => {
      console.error('Asset failed to load:', file.key, file.src);
    });
  }

  create() {
    this._makeHeart('heart',       0xE63030);
    this._makeHeart('heart_empty', 0x666666);
    this.scene.start('StartScene');
  }

  _makeHeart(key, color) {
    const g = this.make.graphics({ add: false });
    g.fillStyle(color, 1);
    g.fillCircle(7, 8, 7); g.fillCircle(17, 8, 7);
    g.fillTriangle(2, 12, 22, 12, 12, 24);
    g.generateTexture(key, 24, 24); g.destroy();
  }
}
