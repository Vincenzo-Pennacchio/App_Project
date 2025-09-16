import StartScene from "./scenes/StartScene.js";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  backgroundColor: "#1a1a1a",
  scene: [StartScene, GameScene],
  parent: "game", // optional: if you have a <div id="game"></div> in index.html
  dom: {
    createContainer: true // necessary to use DOM elements
  }
};

new Phaser.Game(config);
