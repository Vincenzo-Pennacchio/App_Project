import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 750, // più alta per lasciare spazio
  backgroundColor: '#1a1a1a',
  scene: [GameScene]
};

new Phaser.Game(config);
