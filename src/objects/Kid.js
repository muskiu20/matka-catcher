const DISPLAY_HEIGHT = 160;

// Crack textures only exist for the boy sprite
const CRACK_TEXTURES = ['kid_boy', 'kid_boy_crack1', 'kid_boy_crack2'];

export default class Kid {
  constructor(scene, x, y, gender) {
    this.scene        = scene;
    this.gender       = gender;
    this._staticKey   = `kid_${gender}`;
    this.sprite       = scene.add.image(x, y, this._staticKey).setDepth(2);
    this._sizeSprite();
    this.speed   = 320;
    this.targetX = x;

    this._onDown = (p) => {
      const margin = 24;
      this.targetX = Phaser.Math.Clamp(p.x, margin, scene.scale.width - margin);
    };

    scene.input.on('pointerdown', this._onDown);
  }

  get x()     { return this.sprite.x; }
  get y()     { return this.sprite.y; }
  get headY() { return this.sprite.y - this.sprite.displayHeight / 2; }

  get catchBounds() {
    const catchRadius = 28;
    const dh = this.sprite.displayHeight;
    return {
      left:    this.sprite.x - catchRadius,
      right:   this.sprite.x + catchRadius,
      topY:    this.sprite.y - dh / 2,
      bottomY: this.sprite.y,
    };
  }

  // lives: 3 = no crack, 2 = crack1, 1 = crack2
  setCrackState(lives) {
    if (this.gender !== 'boy') return;
    const idx = Math.min(Math.max(0, 3 - lives), CRACK_TEXTURES.length - 1);
    this._staticKey = CRACK_TEXTURES[idx];
    this.sprite.setTexture(this._staticKey);
    this._sizeSprite();
  }

  _sizeSprite() {
    const h = DISPLAY_HEIGHT;
    const w = Math.round((this.sprite.width / this.sprite.height) * h);
    this.sprite.setDisplaySize(w, h);
  }

  update(delta) {
    const dx = this.targetX - this.sprite.x;
    if (Math.abs(dx) < 2) {
      this.sprite.x  = this.targetX;
      this.sprite.flipX = false;
      if (this.sprite.texture.key !== this._staticKey) {
        this.sprite.setTexture(this._staticKey);
        this._sizeSprite();
      }
      return;
    }
    const moveKey = `kid_${this.gender}_move`;
    const dir = Math.sign(dx);
    this.sprite.flipX = dir < 0;
    if (this.sprite.texture.key !== moveKey) {
      this.sprite.setTexture(moveKey);
      this._sizeSprite();
    }
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
