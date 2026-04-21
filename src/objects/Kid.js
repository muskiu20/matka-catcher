export default class Kid {
  constructor(scene, x, y, gender) {
    this.scene = scene;
    this.sprite = scene.add.image(x, y, `kid_${gender}`).setScale(2).setDepth(2);
    this.speed = 180;
    this.direction = 1;
    this.stopped = false;

    this._onDown = () => { this.stopped = true; };
    this._onUp   = () => { this.stopped = false; };

    scene.input.on('pointerdown', this._onDown);
    scene.input.on('pointerup',   this._onUp);
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }

  update(delta) {
    if (this.stopped) return;

    const W    = this.scene.scale.width;
    const half = this.sprite.displayWidth / 2;

    this.sprite.x += this.direction * this.speed * (delta / 1000);
    this.sprite.flipX = this.direction < 0;

    if (this.sprite.x + half >= W) {
      this.sprite.x  = W - half;
      this.direction = -1;
    } else if (this.sprite.x - half <= 0) {
      this.sprite.x  = half;
      this.direction = 1;
    }
  }

  destroy() {
    this.scene.input.off('pointerdown', this._onDown);
    this.scene.input.off('pointerup',   this._onUp);
    this.sprite.destroy();
  }
}
