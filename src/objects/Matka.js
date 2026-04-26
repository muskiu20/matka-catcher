const MATKA_Y_OFFSET = 36;
const BASE_SCALE     = 1.6;

export default class Matka {
  constructor(scene, kid) {
    this.scene       = scene;
    this.kid         = kid;
    this.cracks      = 0;
    this._shakeOff   = 0;

    this.sprite = scene.add.image(kid.x, kid.y + MATKA_Y_OFFSET, 'matka_0')
      .setScale(BASE_SCALE)
      .setDepth(3);
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }

  update() {
    this.sprite.x = this.kid.x + this._shakeOff;
  }

  // ── Crack state ──────────────────────────────────────────────

  setCracks(n) {
    this.cracks = Phaser.Math.Clamp(n, 0, 4);
    this.sprite.setTexture(`matka_${this.cracks}`);
  }

  // Returns true if the matka (in its current crack state) can hold an item of this weight
  canCatch(weight) {
    if (this.cracks === 0) return true;
    if (this.cracks <= 2) return weight !== 'heavy';
    return weight === 'light';
  }

  // ── Visual feedback ──────────────────────────────────────────

  bounce() {
    this.scene.tweens.killTweensOf(this.sprite);
    this.scene.tweens.add({
      targets:  this.sprite,
      scaleX:   BASE_SCALE * 1.25,
      scaleY:   BASE_SCALE * 0.80,
      duration: 80,
      yoyo:     true,
      onComplete: () => this.sprite.setScale(BASE_SCALE),
    });
  }

  // Horizontal shake — signals "can't catch this item"
  rejectShake() {
    this.scene.tweens.add({
      targets:  { val: 0 },
      val:      1,
      duration: 180,
      onUpdate: (tween) => {
        this._shakeOff = Math.sin(tween.progress * Math.PI * 4) * 7;
      },
      onComplete: () => { this._shakeOff = 0; },
    });
  }

  // ── Bounds ───────────────────────────────────────────────────

  getCatchBounds() {
    const hw = this.sprite.displayWidth  / 2;
    const hh = this.sprite.displayHeight / 2;
    return {
      left:   this.sprite.x - hw,
      right:  this.sprite.x + hw,
      catchY: this.sprite.y - hh,
    };
  }

  destroy() { this.sprite.destroy(); }
}
