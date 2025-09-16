import StartScene from "./scenes/StartScene.js";
import GameScene from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  backgroundColor: "#1a1a1a",
  scene: [StartScene, GameScene],
  parent: "game", // opzionale: se hai un <div id="game"></div> in index.html
  dom: {
    createContainer: true // 👈 necessario per usare elementi DOM
  }
};

new Phaser.Game(config);
