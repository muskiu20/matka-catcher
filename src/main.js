import Phaser from 'phaser';
import BootScene    from './scenes/BootScene';
import StartScene   from './scenes/StartScene';
import GameScene    from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';

const game = new Phaser.Game({
  type:            Phaser.AUTO,
  width:           390,
  height:          844,
  backgroundColor: '#87CEEB',
  parent:          'game-container',
  pixelArt:        true,
  scene:           [BootScene, StartScene, GameScene, GameOverScene],
  scale: {
    mode:       Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    keyboard: true,
  },
});

// Give the canvas keyboard focus so arrow keys work on desktop
game.events.once('ready', () => {
  const canvas = game.canvas;
  canvas.setAttribute('tabindex', '0');
  canvas.style.outline = 'none';
  canvas.focus();
});
