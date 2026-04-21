import Phaser from 'phaser';
import BootScene    from './scenes/BootScene';
import StartScene   from './scenes/StartScene';
import GameScene    from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';

new Phaser.Game({
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
});
