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
    startBtn.node.disabled = true;

    // Bottone Testa o Croce
    const coinBtn = this.add.dom(300, 380, "button", {
      fontSize: "20px",
      padding: "6px 12px",
      cursor: "pointer"
    }, "Testa o Croce");

    // Testo risultato
    this.coinResultText = this.add.text(300, 430, "", {
      fontSize: "24px",
      color: "#fff"
    }).setOrigin(0.5);

    let firstPlayer = null;

    coinBtn.addListener("click");
    coinBtn.on("click", () => {
  // Testa = X, Croce = O
  const result = Math.random() < 0.5 ? "X" : "O";
  firstPlayer = result;
  const name = result === "X" ? (this.playerXInput.node.value || "Giocatore X") : (this.playerOInput.node.value || "Giocatore O");
  this.coinResultText.setText(`Inizia: ${name} (${result})`);
  startBtn.node.disabled = false;
  startBtn.node.style.backgroundColor = "";
    });

    // Logica avvio
    startBtn.addListener("click");
    startBtn.on("click", () => {
      const playerX = this.playerXInput.node.value || "Giocatore X";
      const playerO = this.playerOInput.node.value || "Giocatore O";

      // Passa il giocatore che deve iniziare
      this.scene.start("GameScene", { playerX, playerO, firstPlayer });
    });
  }
}
