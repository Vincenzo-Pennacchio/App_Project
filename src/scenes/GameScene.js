export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.board = Array(3).fill().map(() => Array(3).fill(null));
    this.currentPlayer = "X";
    this.scoreX = 0;
    this.scoreO = 0;
    this.moves = [];
    this.gridOffsetY = 100;
    this.moveCount = 0;
    this.isModalOpen = false;

    this.playerXName = "Giocatore X";
    this.playerOName = "Giocatore O";
  }

  init(data) {
    this.playerXName = data.playerX || "Giocatore X";
    this.playerOName = data.playerO || "Giocatore O";
    if (data.firstPlayer === "X" || data.firstPlayer === "O") {
      this.currentPlayer = data.firstPlayer;
    } else {
      this.currentPlayer = "X";
    }
  }

  create() {
    // Exit button to return to StartScene
    const exitBtn = this.add.text(560, 30, "⟵", {
      fontSize: "32px",
      fontFamily: "Arial Black, Arial, sans-serif",
      color: "#fff700",
      backgroundColor: "#ff1a75",
      padding: { x: 12, y: 6 },
      borderRadius: 12,
      stroke: "#00ffd0",
      strokeThickness: 3,
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#00ffd0",
        blur: 12,
        fill: true
      }
    }).setOrigin(1, 0.5).setInteractive();
    this.tweens.add({
      targets: exitBtn,
      scale: { from: 1, to: 1.15 },
      alpha: { from: 0.7, to: 1 },
      yoyo: true,
      repeat: -1,
      duration: 700
    });
    exitBtn.on("pointerdown", () => {
      this.scene.start("StartScene");
    });
    // Gradient background
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1aff, 1, 0xff1a75, 1, 0x00ffd0, 1, 0xfff700, 1, 1);
    bg.fillRect(0, 0, 600, 750);

    this.drawGrid();

    // Glowing animated score
    this.scoreText = this.add.text(300, 40, this.getScoreText(), {
      fontSize: "32px",
      fontFamily: "Arial Black, Arial, sans-serif",
      color: "#fff",
      stroke: "#fff700",
      strokeThickness: 4,
      shadow: {
        offsetX: 0,
        offsetY: 0,
        color: "#00ffd0",
        blur: 16,
        fill: true
      }
    }).setOrigin(0.5);
    this.tweens.add({
      targets: this.scoreText,
      scale: { from: 1, to: 1.08 },
      alpha: { from: 0.7, to: 1 },
      yoyo: true,
      repeat: -1,
      duration: 900
    });

    // Fade-in animation for grid and score
    this.scoreText.setAlpha(0);
    this.tweens.add({
      targets: this.scoreText,
      alpha: 1,
      y: this.scoreText.y + 10,
      duration: 600,
      delay: 200,
      ease: "Cubic.easeOut"
    });

    this.enableInput();
  }

  drawGrid() {
    const g = this.add.graphics({ lineStyle: { width: 6, color: 0xfff700, alpha: 0.9 } });
    for (let i = 1; i < 3; i++) {
      g.strokeLineShape(new Phaser.Geom.Line(i * 200, this.gridOffsetY, i * 200, 600 + this.gridOffsetY));
      g.strokeLineShape(new Phaser.Geom.Line(0, i * 200 + this.gridOffsetY, 600, i * 200 + this.gridOffsetY));
    }
    // Glow effect for grid
    g.setAlpha(0);
    this.tweens.add({
      targets: g,
      alpha: 1,
      duration: 700,
      delay: 100,
      ease: "Cubic.easeOut"
    });
  }

  getScoreText() {
    return `${this.playerXName}: ${this.scoreX} | ${this.playerOName}: ${this.scoreO}`;
  }

  resetBoard() {
    this.board = Array(3).fill().map(() => Array(3).fill(null));
    // Alterna il giocatore che inizia ogni partita
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.moves.forEach(m => m.destroy());
    this.moves = [];
    this.moveCount = 0;
    this.enableInput();
  }

  enableInput() {
    // Rimuovi eventuali listener precedenti
    this.input.off("pointerdown");
    // Aggiungi listener solo se la modale non è aperta
    this.input.on("pointerdown", (pointer) => {
      if (this.isModalOpen) return;
      const col = Math.floor(pointer.x / 200);
      const row = Math.floor((pointer.y - this.gridOffsetY) / 200);
      if (row < 0 || row > 2 || col < 0 || col > 2) return;
      if (this.board[row][col]) return;
      this.board[row][col] = this.currentPlayer;
      this.moveCount++;
      const cx = col * 200 + 100;
      const cy = row * 200 + 100 + this.gridOffsetY;
      this.moves.push(this.currentPlayer === "X" ? this.drawX(cx, cy) : this.drawO(cx, cy));
      if (this.checkWinner()) {
        const winnerName = this.currentPlayer === "X" ? this.playerXName : this.playerOName;
        if (this.currentPlayer === "X") this.scoreX++; else this.scoreO++;
        this.scoreText.setText(this.getScoreText());
        this.showModal(`${winnerName} ha vinto!`);
      } else if (this.moveCount === 9) {
        this.showModal("Pareggio!");
      } else {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      }
    });
  }

  showModal(message) {
    this.isModalOpen = true;
    // Disabilita input sulla griglia
    this.input.off("pointerdown");

    const modal = this.add.container(300, 400);
    const bg = this.add.rectangle(0, 0, 400, 200, 0x000000, 0.8);
    const text = this.add.text(0, -40, message, { fontSize: "28px", color: "#fff" }).setOrigin(0.5);
    const btn = this.add.text(0, 50, "OK", {
      fontSize: "24px",
      backgroundColor: "#222",
      color: "#0f0",
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setInteractive();

    btn.on("pointerdown", () => {
      modal.destroy();
      this.isModalOpen = false;
      // Delay re-enabling input to avoid accidental click on grid
      setTimeout(() => {
        this.resetBoard(); // 👈 restart automatico
      }, 100);
    });

    modal.add([bg, text, btn]);
  }

  drawO(x, y) {
    const c = this.add.container(x, y);
    const g = this.add.graphics();
    g.lineStyle(8, 0x00aaff).strokeCircle(0, 0, 70);
    c.add(g);
    c.alpha = 0;
    this.tweens.add({ targets: c, alpha: 1, duration: 300 });
    return c;
  }

  drawX(x, y) {
    const c = this.add.container(x, y);
    const g = this.add.graphics();
    g.lineStyle(8, 0xff5555);
    g.strokeLineShape(new Phaser.Geom.Line(-70, -70, 70, 70));
    g.strokeLineShape(new Phaser.Geom.Line(-70, 70, 70, -70));
    c.add(g);
    c.setScale(0);
    this.tweens.add({ targets: c, scale: 1, duration: 300 });
    return c;
  }

  checkWinner() {
    const b = this.board;
    for (let i = 0; i < 3; i++) {
      if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return true;
      if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return true;
    }
    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return true;
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return true;
    return false;
  }
}
