import Phaser from 'phaser';
import Kid          from '../objects/Kid';
import FallingItem  from '../objects/FallingItem';
import { ITEMS, M2_SPAWN_POOL } from '../data/items';
import { saveHighScore }        from '../utils/scoreManager';
import SoundManager             from '../utils/SoundManager';
import { KID_Y }                 from '../constants.js';

const DIFFICULTY = [
  { afterSecs: 0,  spawnMs: 1500, speed: 210 },
  { afterSecs: 20, spawnMs: 1100, speed: 250 },
  { afterSecs: 40, spawnMs: 800,  speed: 280 },
  { afterSecs: 60, spawnMs: 600,  speed: 320 },
];

const GET_READY_DELAY = 2200;
const BURST_COLORS    = [0xFFD700, 0xFF69B4, 0xFFFFFF, 0xFF8C00];

export default class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  init(data) { this.gender = data.gender || 'boy'; }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    this.score        = 0;
    this.lastPoints   = 0;
    this.lives        = 3;
    this.elapsed      = 0;
    this.fallingItems = [];
    this.spawnTimer   = -GET_READY_DELAY;
    this.gameActive   = true;

    this.sfx = new SoundManager(this);

    // Ensure canvas has focus for keyboard input on desktop
    this.sys.game.canvas.focus();

    // ── Background ──────────────────────────────────────────────
    this.add.image(W / 2, H / 2, 'bg').setDisplaySize(W, H).setDepth(0);

    // ── Game objects ────────────────────────────────────────────
    this.kid = new Kid(this, W / 2, KID_Y, this.gender);

    // ── UI ──────────────────────────────────────────────────────
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize:        '22px',
      fontFamily:      '"Courier New", monospace',
      color:           '#1a0800',
      stroke:          '#FFFFFF',
      strokeThickness: 3,
    }).setDepth(10);

    this.heartSprites = [];
    for (let i = 0; i < 3; i++) {
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
      targets: banner, alpha: 0, scaleX: 1.3, scaleY: 1.3,
      duration: 900, delay: 1000,
      onComplete: () => banner.destroy(),
    });
  }

  update(_time, delta) {
    if (!this.gameActive) return;

    this.elapsed += delta;
    this.kid.update(delta);

    this.spawnTimer += delta;
    if (this.spawnTimer >= this._spawnInterval()) {
      this.spawnTimer = 0;
      this._spawnItem();
    }

    this._processItems(delta);
  }

  // ── Difficulty ───────────────────────────────────────────────

  _tier() {
    const secs = this.elapsed / 1000;
    let tier = DIFFICULTY[0];
    for (const d of DIFFICULTY) { if (secs >= d.afterSecs) tier = d; }
    return tier;
  }
  _spawnInterval() { return this._tier().spawnMs; }
  _itemSpeed()     { return this._tier().speed + Phaser.Math.Between(-20, 30); }

  // ── Spawning ─────────────────────────────────────────────────

  _spawnItem() {
    const W = this.scale.width;
    const x = Phaser.Math.Between(40, W - 40);

    let key;
    do {
      key = M2_SPAWN_POOL[Phaser.Math.Between(0, M2_SPAWN_POOL.length - 1)];
    } while (key === 'matka_repair' && this.lives === 3);

    const data = ITEMS.find(i => i.key === key);
    this.fallingItems.push(new FallingItem(this, x, data, this._itemSpeed()));
  }

  // ── Item processing ──────────────────────────────────────────

  _processItems(delta) {
    const b = this.kid.catchBounds;

    for (let i = this.fallingItems.length - 1; i >= 0; i--) {
      const item = this.fallingItems[i];
      item.update(delta);

      let remove = false;

      // Item enters the kid's horizontal radius at head level → catch and vanish
      // item.y is center of 64px sprite, so +32 gives its bottom edge
      if (!item.caught && item.y + 32 >= b.headY &&
          item.x >= b.left && item.x <= b.right) {
        item.caught = true;
        this._onCatch(item);
        remove = true;
      } else if (item.y >= b.torsoY) {
        // Outside catch radius — silently vanish at torso level
        remove = true;
      }

      if (remove) {
        item.destroy();
        this.fallingItems.splice(i, 1);
      }
    }
  }

  // ── Catch handling ───────────────────────────────────────────

  _onCatch(item) {
    if (item.data.type === 'powerup_2x') {
      this._catch2xPowerup(item);
      return;
    }
    if (item.data.type === 'matka_repair') {
      this._catchMatkaRepair(item);
      return;
    }

    if (item.data.type === 'auspicious') {
      const pts = item.data.points;
      this.lastPoints = pts;
      this.score += pts;
      this.scoreText.setText(`Score: ${this.score}`);
      this.sfx.catchAuspicious();
      this._burstParticles(item.x, item.y);
      this._feedback(`+${pts}`, '#FFD700', item.x, item.y);
    } else {
      this._loseLife(item);
    }
  }

  _catch2xPowerup(item) {
    const bonus = this.lastPoints;
    this.score += bonus;
    this.scoreText.setText(`Score: ${this.score}`);
    this.sfx.boosterCaught();
    this._burstParticles(item.x, item.y);
    this._feedback(bonus > 0 ? `×2  +${bonus}` : '×2', '#FFD700', item.x, item.y);
  }

  _catchMatkaRepair(item) {
    this.lives = Math.min(this.lives + 1, 3);
    this.kid.setCrackState(this.lives);
    for (let i = 0; i < 3; i++) {
      this.heartSprites[i].setTexture(i < this.lives ? 'heart' : 'heart_empty');
    }
    this.sfx.boosterCaught();
    this._burstParticles(item.x, item.y);
    this._feedback('✦ +1 Life!', '#FFD700', item.x, item.y);
  }

  _loseLife(item) {
    this.sfx.catchInauspicious();
    this.cameras.main.shake(200, 0.008);
    this._redFlash();
    this._feedback('✗', '#FF3333', item.x, item.y);

    this.lives--;
    this.kid.setCrackState(this.lives);
    for (let i = 0; i < 3; i++) {
      this.heartSprites[i].setTexture(i < this.lives ? 'heart' : 'heart_empty');
    }

    if (this.lives <= 0) {
      this.sfx.gameOver();
      this.gameActive = false;
      this.time.delayedCall(900, () => this._endGame());
    }
  }

  // ── Visual feedback ──────────────────────────────────────────

  _burstParticles(x, y) {
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const dot   = this.add.circle(x, y, 5, BURST_COLORS[i % BURST_COLORS.length]).setDepth(20);
      this.tweens.add({
        targets: dot,
        x: x + Math.cos(angle) * 52,
        y: y + Math.sin(angle) * 52,
        alpha: 0, scale: 0.2, duration: 420, ease: 'Power2',
        onComplete: () => dot.destroy(),
      });
    }
  }

  _redFlash() {
    const overlay = this.add.rectangle(
      this.scale.width / 2, this.scale.height / 2,
      this.scale.width, this.scale.height,
      0xFF0000, 0.22
    ).setDepth(25);
    this.tweens.add({
      targets: overlay, alpha: 0, duration: 350,
      onComplete: () => overlay.destroy(),
    });
  }

  _feedback(text, color, x, y) {
    const label = this.add.text(x, y, text, {
      fontSize: '26px', fontFamily: '"Courier New", monospace',
      color, stroke: '#000000', strokeThickness: 3,
    }).setOrigin(0.5).setDepth(20);
    this.tweens.add({
      targets: label, y: y - 70, alpha: 0, duration: 700,
      onComplete: () => label.destroy(),
    });
  }

  _endGame() {
    saveHighScore(this.score);
    this.kid.destroy();
    this.fallingItems.forEach(i => i.destroy());
    this.fallingItems = [];
    this.scene.start('GameOverScene', { score: this.score, gender: this.gender });
  }
}
