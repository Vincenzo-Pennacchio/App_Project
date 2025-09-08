import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  backgroundColor: '#222',
  scene: [GameScene]
};

new Phaser.Game(config);
