import StartScene from "./scenes/StartScene.js";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 750,
  backgroundColor: "#1a1a1a",
  scene: [StartScene, GameScene],
  dom: {
    createContainer: true   // 👈 serve per usare this.add.dom()
  }
};

new Phaser.Game(config);
