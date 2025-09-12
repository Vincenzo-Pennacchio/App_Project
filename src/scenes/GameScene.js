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
  }

  create() {
    this.drawGrid();

    this.scoreText = this.add.text(300, 40, this.getScoreText(), {
      fontSize: "28px",
      color: "#fff"
    }).setOrigin(0.5);

    this.enableInput();
  }

  drawGrid() {
    const g = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });
    for (let i = 1; i < 3; i++) {
      g.strokeLineShape(new Phaser.Geom.Line(i * 200, this.gridOffsetY, i * 200, 600 + this.gridOffsetY));
      g.strokeLineShape(new Phaser.Geom.Line(0, i * 200 + this.gridOffsetY, 600, i * 200 + this.gridOffsetY));
    }
  }

  getScoreText() {
    return `${this.playerXName}: ${this.scoreX} | ${this.playerOName}: ${this.scoreO}`;
  }

  resetBoard() {
    this.board = Array(3).fill().map(() => Array(3).fill(null));
    this.currentPlayer = "X";
    this.moves.forEach(m => m.destroy());
    this.moves = [];
    this.moveCount = 0;
    this.enableInput();
  }

  enableInput() {
    this.input.on("pointerdown", (pointer) => {
      if (this.isModalOpen) return; // 👈 blocca input se modale aperta

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
      this.resetBoard(); // 👈 restart automatico
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
