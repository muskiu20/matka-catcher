const MATKA_Y_OFFSET = 36; // matka centre is 36px below kid centre

export default class Matka {
  constructor(scene, kid) {
    this.kid = kid;
    this.sprite = scene.add.image(kid.x, kid.y + MATKA_Y_OFFSET, 'matka')
      .setScale(1.6)
      .setDepth(3);
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }

  update() {
    this.sprite.x = this.kid.x;
  }

  // Returns the catch window: items are caught when their y >= catchY and x within [left, right]
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
