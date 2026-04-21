import { GROUND_Y } from '../constants.js';

export default class FallingItem {
  constructor(scene, x, data, speed) {
    this.data  = data;
    this.speed = speed;

    this.sprite = scene.add.image(x, -40, data.key).setScale(1.5).setDepth(4);

    // Ground shadow — small ellipse that tracks the item's x, stays on the ground.
    // Scales and fades in as the item approaches.
    this.shadow = scene.add.ellipse(x, GROUND_Y - 2, 36, 10, 0x000000, 0).setDepth(1.5);
  }

  get x() { return this.sprite.x; }
  get y() { return this.sprite.y; }

  update(delta) {
    this.sprite.y += this.speed * (delta / 1000);

    // Shadow tracks x; grows and darkens as item nears the ground
    const dist    = Math.max(0, GROUND_Y - this.sprite.y);
    const maxDist = GROUND_Y + 40;
    const t       = 1 - Math.min(dist / maxDist, 1);
    this.shadow.x         = this.sprite.x;
    this.shadow.scaleX    = 0.4 + t * 0.6;
    this.shadow.fillAlpha = t * 0.3;
  }

  destroy() {
    this.sprite.destroy();
    this.shadow.destroy();
  }
}
