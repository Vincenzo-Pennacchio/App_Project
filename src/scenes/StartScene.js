export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    // Titolo
    this.add.text(300, 100, "Tic Tac Toe", {
      fontSize: "48px",
      color: "#fff"
    }).setOrigin(0.5);

    // Input HTML per i nomi
    const playerXInput = document.createElement("input");
    playerXInput.type = "text";
    playerXInput.placeholder = "Nome Giocatore X";
    playerXInput.style.position = "absolute";
    playerXInput.style.top = "200px";
    playerXInput.style.left = "50%";
    playerXInput.style.transform = "translateX(-50%)";
    playerXInput.style.fontSize = "20px";

    const playerOInput = document.createElement("input");
    playerOInput.type = "text";
    playerOInput.placeholder = "Nome Giocatore O";
    playerOInput.style.position = "absolute";
    playerOInput.style.top = "250px";
    playerOInput.style.left = "50%";
    playerOInput.style.transform = "translateX(-50%)";
    playerOInput.style.fontSize = "20px";

    const startBtn = document.createElement("button");
    startBtn.innerText = "Start Game";
    startBtn.style.position = "absolute";
    startBtn.style.top = "310px";
    startBtn.style.left = "50%";
    startBtn.style.transform = "translateX(-50%)";
    startBtn.style.fontSize = "20px";
    startBtn.style.padding = "6px 12px";

    document.body.appendChild(playerXInput);
    document.body.appendChild(playerOInput);
    document.body.appendChild(startBtn);

    startBtn.onclick = () => {
      const playerX = playerXInput.value || "Giocatore X";
      const playerO = playerOInput.value || "Giocatore O";

      // Salviamo i nomi nei dati della scena
      this.scene.start("GameScene", { playerX, playerO });

      // Rimuoviamo gli elementi HTML
      playerXInput.remove();
      playerOInput.remove();
      startBtn.remove();
    };
  }
}
