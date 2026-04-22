export default class Kid {
  constructor(scene, x, y, gender) {
    this.scene  = scene;
    this.sprite = scene.add.image(x, y, `kid_${gender}`).setScale(2).setDepth(2);
    this.speed  = 240;
    this.direction = 0; // -1 left | 0 stopped | 1 right

    this._onDown = (p) => this._setDir(p);
    this._onMove = (p) => { if (p.isDown) this._setDir(p); };
    this._onUp   = ()  => { this.direction = 0; };

    scene.input.on('pointerdown', this._onDown);
    scene.input.on('pointermove', this._onMove);
    scene.input.on('pointerup',   this._onUp);
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }

  _setDir(pointer) {
    const newDir = pointer.x < this.scene.scale.width / 2 ? -1 : 1;
    if (newDir !== this.direction) {
      this.direction    = newDir;
      this.sprite.flipX = newDir < 0;
    }
  }

  update(delta) {
    if (this.direction === 0) return;

    const W    = this.scene.scale.width;
    const half = this.sprite.displayWidth / 2;

    this.sprite.x = Phaser.Math.Clamp(
      this.sprite.x + this.direction * this.speed * (delta / 1000),
      half,
      W - half
    );
  }

  destroy() {
    this.scene.input.off('pointerdown', this._onDown);
    this.scene.input.off('pointermove', this._onMove);
    this.scene.input.off('pointerup',   this._onUp);
    this.sprite.destroy();
  }
}
