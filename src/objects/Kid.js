const DISPLAY_HEIGHT = 120;

export default class Kid {
  constructor(scene, x, y, gender) {
    this.scene   = scene;
    this.gender  = gender;
    this.sprite  = scene.add.image(x, y, `kid_${gender}`).setDepth(2);
    this._sizeSprite();
    this.speed   = 320;
    this.targetX = x;

    this._onDown = (p) => {
      const half   = this.sprite.displayWidth / 2;
      this.targetX = Phaser.Math.Clamp(p.x, half, scene.scale.width - half);
    };

    scene.input.on('pointerdown', this._onDown);
  }

  get x()     { return this.sprite.x; }
  get y()     { return this.sprite.y; }
  get headY() { return this.sprite.y - this.sprite.displayHeight / 2; }

  get catchBounds() {
    const hw = this.sprite.displayWidth / 2;
    return {
      left:   this.sprite.x - hw,
      right:  this.sprite.x + hw,
      catchY: this.headY,
    };
  }

  _sizeSprite() {
    const h = DISPLAY_HEIGHT;
    const w = Math.round((this.sprite.width / this.sprite.height) * h);
    this.sprite.setDisplaySize(w, h);
  }

  update(delta) {
    const dx = this.targetX - this.sprite.x;
    if (Math.abs(dx) < 2) {
      this.sprite.x = this.targetX;
      this.sprite.setTexture(`kid_${this.gender}`);
      this._sizeSprite();
      return;
    }
    const dir = Math.sign(dx);
    this.sprite.flipX = dir < 0;
    this.sprite.setTexture(`kid_${this.gender}_move`);
    this._sizeSprite();
    this.sprite.x += dir * this.speed * (delta / 1000);

    if (Math.sign(this.targetX - this.sprite.x) !== dir) {
      this.sprite.x = this.targetX;
    }
  }

  destroy() {
    this.scene.input.off('pointerdown', this._onDown);
    this.sprite.destroy();
  }
}
