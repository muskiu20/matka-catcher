const MATKA_Y_OFFSET = 36;
const BASE_SCALE     = 1.6;

export default class Matka {
  constructor(scene, kid) {
    this.scene  = scene;
    this.kid    = kid;
    this.sprite = scene.add.image(kid.x, kid.y + MATKA_Y_OFFSET, 'matka')
      .setScale(BASE_SCALE)
      .setDepth(3);
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }

  update() {
    this.sprite.x = this.kid.x;
  }

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

  getCatchBounds() {
    const hw = this.sprite.displayWidth  / 2;
    const hh = this.sprite.displayHeight / 2;
    return {
      left:   this.sprite.x - hw,
      right:  this.sprite.x + hw,
      catchY: this.sprite.y - hh,
    };
  }

  destroy() {
    this.sprite.destroy();
  }
}
