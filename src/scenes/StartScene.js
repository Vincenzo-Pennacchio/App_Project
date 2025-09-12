export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    // Titolo
    this.add.text(300, 80, "Tic Tac Toe", {
      fontSize: "48px",
      color: "#fff"
    }).setOrigin(0.5);

    // Input per Giocatore X
    this.playerXInput = this.add.dom(300, 180, "input", {
      type: "text",
      fontSize: "20px",
      padding: "6px",
      textAlign: "center"
    });
    this.playerXInput.node.placeholder = "Nome Giocatore X";

    // Input per Giocatore O
    this.playerOInput = this.add.dom(300, 240, "input", {
      type: "text",
      fontSize: "20px",
      padding: "6px",
      textAlign: "center"
    });
    this.playerOInput.node.placeholder = "Nome Giocatore O";

    // Bottone Start
    const startBtn = this.add.dom(300, 320, "button", {
      fontSize: "20px",
      padding: "6px 12px",
      cursor: "pointer",
      backgroundColor: "#888"
    }, "Start Game");
  startBtn.node.disabled = false;
  startBtn.node.style.backgroundColor = "";

    // ...heads or tails button and animation removed...

    // Logica avvio
    startBtn.addListener("click");
    startBtn.on("click", () => {
      const playerX = this.playerXInput.node.value || "Giocatore X";
      const playerO = this.playerOInput.node.value || "Giocatore O";
      // Scegli casualmente chi inizia
      const chosenPlayer = Math.random() < 0.5 ? "X" : "O";
      this.scene.start("GameScene", { playerX, playerO, firstPlayer: chosenPlayer });
    });
  }
}
