export default class Kid {
  constructor(scene, x, y, gender) {
    this.scene   = scene;
    this.sprite  = scene.add.image(x, y, `kid_${gender}`).setScale(2).setDepth(2);
    this.speed   = 320;
    this.targetX = x;

    this._onDown = (p) => {
      const half   = this.sprite.displayWidth / 2;
      this.targetX = Phaser.Math.Clamp(p.x, half, scene.scale.width - half);
    };

    scene.input.on('pointerdown', this._onDown);
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }

  update(delta) {
    const dx = this.targetX - this.sprite.x;
    if (Math.abs(dx) < 2) {
      this.sprite.x = this.targetX;
      return;
    }
    const dir = Math.sign(dx);
    this.sprite.flipX = dir < 0;
    this.sprite.x    += dir * this.speed * (delta / 1000);

    // Don't overshoot
    if (Math.sign(this.targetX - this.sprite.x) !== dir) {
      this.sprite.x = this.targetX;
    }
  }

  destroy() {
    this.scene.input.off('pointerdown', this._onDown);
    this.sprite.destroy();
  }
}
