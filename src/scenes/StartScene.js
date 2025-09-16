export default class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
  }

  create() {
    // Gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1aff, 1, 0xff1a75, 1, 0x00ffd0, 1, 0xfff700, 1, 1);
    bg.fillRect(0, 0, 600, 800);

    // Glowing animated title
    const title = this.add.text(300, 80, "Tic Tac Toe", {
      fontSize: "56px",
      fontFamily: "Arial Black, Arial, sans-serif",
      color: "#fff",
      stroke: "#00ffd0",
      strokeThickness: 6,
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#ff1a75",
        blur: 24,
        fill: true
      }
    }).setOrigin(0.5);
    this.tweens.add({
      targets: title,
      scale: { from: 1, to: 1.12 },
      alpha: { from: 0.7, to: 1 },
      yoyo: true,
      repeat: -1,
      duration: 900
    });

    // Input for Player X
    this.playerXInput = this.add.dom(300, 180, "input", {
      type: "text",
      fontSize: "22px",
      padding: "10px",
      textAlign: "center",
      borderRadius: "12px",
      border: "2px solid #00ffd0",
      boxShadow: "0 0 12px #00ffd0, 0 0 4px #fff inset"
    });
    this.playerXInput.node.placeholder = "Player Name X";

    // Input for Player O
    this.playerOInput = this.add.dom(300, 240, "input", {
      type: "text",
      fontSize: "22px",
      padding: "10px",
      textAlign: "center",
      borderRadius: "12px",
      border: "2px solid #ff1a75",
      boxShadow: "0 0 12px #ff1a75, 0 0 4px #fff inset"
    });
    this.playerOInput.node.placeholder = "Player Name O";

    // Start Button
    const startBtn = this.add.dom(300, 320, "button", {
      fontSize: "24px",
      padding: "12px 32px",
      cursor: "pointer",
      background: "linear-gradient(90deg,#00ffd0,#ff1a75,#fff700)",
      color: "#222",
      borderRadius: "16px",
      border: "none",
      boxShadow: "0 0 16px #fff700, 0 0 8px #00ffd0"
    }, "Start Game");
    startBtn.node.disabled = false;
    startBtn.node.style.backgroundColor = "";

    // Fade-in animation for inputs and button
    [this.playerXInput, this.playerOInput, startBtn].forEach((el, i) => {
      el.setAlpha(0);
      this.tweens.add({
        targets: el,
        alpha: 1,
        y: el.y + 10,
        duration: 600,
        delay: 300 + i * 180,
        ease: "Cubic.easeOut"
      });
    });

    // ...heads or tails button and animation removed...

    // Start game logic
    startBtn.addListener("click");
    startBtn.on("click", () => {
      const playerX = this.playerXInput.node.value || "Player X";
      const playerO = this.playerOInput.node.value || "Player O";
      // Randomly choose who starts
      const chosenPlayer = Math.random() < 0.5 ? "X" : "O";
      this.scene.start("GameScene", { playerX, playerO, firstPlayer: chosenPlayer });
    });
  }
}
