import Phaser from 'phaser';
import Kid         from '../objects/Kid';
import Matka       from '../objects/Matka';
import FallingItem from '../objects/FallingItem';
import { ITEMS, M1_SPAWN_POOL } from '../data/items';
import { saveHighScore } from '../utils/scoreManager';
import { GROUND_Y, KID_Y } from '../constants.js';

const SPAWN_INTERVAL  = 1800;   // ms between item spawns
const ITEM_SPEED      = 200;    // px / s base fall speed
const GET_READY_DELAY = 2200;   // ms before first item spawns

export default class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  init(data) {
    this.gender = data.gender || 'boy';
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    this.score      = 0;
    this.lives      = 5;
    this.fallingItems  = [];
    this.spawnTimer = -GET_READY_DELAY;  // negative = grace period before first spawn
    this.gameActive = true;

    // ── Background ──────────────────────────────────────────────
    this.add.rectangle(W / 2, H / 2, W, H, 0x87CEEB).setDepth(0);
    this.add.circle(W - 55, 55, 38, 0xFFD700).setDepth(0);
    this.add.circle(W - 55, 55, 28, 0xFFEC60).setDepth(0);
    [[70, 90, 100, 38], [105, 72, 78, 30], [260, 105, 115, 40], [295, 84, 85, 30]]
      .forEach(([x, y, w, h]) => this.add.ellipse(x, y, w, h, 0xFFFFFF, 0.88).setDepth(0));

    // Ground
    this.add.rectangle(W / 2, GROUND_Y + 42, W, 84, 0xC1440E).setDepth(1);
    this.add.rectangle(W / 2, GROUND_Y,      W, 5,  0x5D8A3C).setDepth(1);

    // ── Game objects ────────────────────────────────────────────
    this.kid   = new Kid(this, W / 2, KID_Y, this.gender);
    this.matka = new Matka(this, this.kid);

    // ── UI ──────────────────────────────────────────────────────
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize:        '22px',
      fontFamily:      '"Courier New", monospace',
      color:           '#1a0800',
      stroke:          '#FFFFFF',
      strokeThickness: 3,
    }).setDepth(10);

    // Hearts — index 0 = leftmost, index 4 = rightmost.
    // Lives are lost from the rightmost (index 4) inward.
    this.heartSprites = [];
    for (let i = 0; i < 5; i++) {
      this.heartSprites.push(
        this.add.image(16 + i * 32, 56, 'heart').setScale(0.9).setDepth(10)
      );
    }

    // ── Get Ready banner ────────────────────────────────────────
    const banner = this.add.text(W / 2, H * 0.44, 'Get Ready!', {
      fontSize:        '42px',
      fontFamily:      'Georgia, serif',
      color:           '#8B0000',
      stroke:          '#FFD700',
      strokeThickness: 5,
    }).setOrigin(0.5).setDepth(15);

    this.tweens.add({
      targets:  banner,
      alpha:    0,
      scaleX:   1.3,
      scaleY:   1.3,
      duration: 900,
      delay:    1000,
      onComplete: () => banner.destroy(),
    });
  }

  update(_time, delta) {
    if (!this.gameActive) return;

    this.kid.update(delta);
    this.matka.update();

    this.spawnTimer += delta;
    if (this.spawnTimer >= SPAWN_INTERVAL) {
      this.spawnTimer = 0;
      this._spawnItem();
    }

    this._processItems(delta);
  }

  // ── Private ──────────────────────────────────────────────────

  _spawnItem() {
    const W    = this.scale.width;
    const x    = Phaser.Math.Between(40, W - 40);
    const key  = M1_SPAWN_POOL[Phaser.Math.Between(0, M1_SPAWN_POOL.length - 1)];
    const data = ITEMS.find(i => i.key === key);
    const spd  = ITEM_SPEED + Phaser.Math.Between(-25, 35);
    this.fallingItems.push(new FallingItem(this, x, data, spd));
  }

  _processItems(delta) {
    const bounds = this.matka.getCatchBounds();

    for (let i = this.fallingItems.length - 1; i >= 0; i--) {
      const item = this.fallingItems[i];
      item.update(delta);

      if (item.y >= bounds.catchY) {
        const inRange = item.x >= bounds.left && item.x <= bounds.right;
        if (inRange) {
          this._onCatch(item);
        }
        item.destroy();
        this.fallingItems.splice(i, 1);
      }
    }
  }

  _onCatch(item) {
    if (item.data.type === 'auspicious') {
      this.score += item.data.points;
      this.scoreText.setText(`Score: ${this.score}`);
      this._feedback(`+${item.data.points}`, '#FFD700', item.x, item.y);
    } else {
      this._loseLife(item);
    }
  }

  _loseLife(item) {
    this.cameras.main.shake(200, 0.008);
    this._feedback('✗', '#FF3333', item.x, item.y);

    // Decrement first, then update all hearts — avoids any index arithmetic bugs.
    this.lives--;
    for (let i = 0; i < 5; i++) {
      this.heartSprites[i].setTexture(i < this.lives ? 'heart' : 'heart_empty');
    }

    if (this.lives <= 0) {
      this.gameActive = false;
      this.time.delayedCall(900, () => this._endGame());
    }
  }

  _feedback(text, color, x, y) {
    const label = this.add.text(x, y, text, {
      fontSize:        '26px',
      fontFamily:      '"Courier New", monospace',
      color,
      stroke:          '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(20);

    this.tweens.add({
      targets:  label,
      y:        y - 70,
      alpha:    0,
      duration: 700,
      onComplete: () => label.destroy(),
    });
  }

  _endGame() {
    saveHighScore(this.score);
    this.kid.destroy();
    this.matka.destroy();
    this.fallingItems.forEach(i => i.destroy());
    this.fallingItems = [];
    this.scene.start('GameOverScene', { score: this.score, gender: this.gender });
  }
}
