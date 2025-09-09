export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.board = Array(3).fill().map(() => Array(3).fill(null));
    this.currentPlayer = 'X';
    this.scoreX = 0;
    this.scoreO = 0;
    this.moves = [];
    this.gridOffsetY = 100; // sposta la griglia più in basso
    this.winText = null;
  }

  create() {
    this.drawGrid();

    // Leaderboard in alto
    this.scoreText = this.add.text(300, 40, this.getScoreText(), {
      fontSize: '28px',
      color: '#fff'
    }).setOrigin(0.5);

    // Bottone Restart in basso
    this.restartButton = this.add.text(300, 710, "Restart", {
      fontSize: '28px',
      color: '#0f0',
      backgroundColor: '#222',
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setInteractive();

    this.restartButton.on('pointerdown', () => {
      this.resetBoard();
    });

    // Attiva input per giocare
    this.enableInput();
  }

  drawGrid() {
    const graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });
    for (let i = 1; i < 3; i++) {
      // Verticali
      graphics.strokeLineShape(new Phaser.Geom.Line(i * 200, this.gridOffsetY, i * 200, 600 + this.gridOffsetY));
      // Orizzontali
      graphics.strokeLineShape(new Phaser.Geom.Line(0, i * 200 + this.gridOffsetY, 600, i * 200 + this.gridOffsetY));
    }
  }

  getScoreText() {
    return `X: ${this.scoreX} | O: ${this.scoreO}`;
  }

  resetBoard() {
    // Reset logica griglia
    this.board = Array(3).fill().map(() => Array(3).fill(null));
    this.currentPlayer = 'X';

    // Elimino tutte le mosse disegnate
    this.moves.forEach(move => move.destroy());
    this.moves = [];

    // Elimino eventuale messaggio di vittoria
    if (this.winText) {
      this.winText.destroy();
      this.winText = null;
    }

    // Riattivo input
    this.input.removeAllListeners();
    this.enableInput();
  }

  enableInput() {
    this.input.on('pointerdown', (pointer) => {
      const col = Math.floor(pointer.x / 200);
      const row = Math.floor((pointer.y - this.gridOffsetY) / 200);

      if (row < 0 || row > 2 || col < 0 || col > 2) return;
      if (this.board[row][col]) return;

      this.board[row][col] = this.currentPlayer;
      const cx = col * 200 + 100;
      const cy = row * 200 + 100 + this.gridOffsetY;

      if (this.currentPlayer === 'X') {
        this.moves.push(this.drawX(cx, cy));
      } else {
        this.moves.push(this.drawO(cx, cy));
      }

      if (this.checkWinner()) {
        this.winText = this.add.text(300, 660, this.currentPlayer + ' ha vinto!', {
          fontSize: '24px',
          color: '#ff0'
        }).setOrigin(0.5);

        if (this.currentPlayer === 'X') this.scoreX++;
        else this.scoreO++;
        this.scoreText.setText(this.getScoreText());

        this.input.removeAllListeners();
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    });
  }

  drawO(x, y) {
    const radius = 70;
    const container = this.add.container(x, y);
    const g = this.add.graphics();
    g.lineStyle(8, 0x00aaff);
    g.strokeCircle(0, 0, radius);
    container.add(g);

    container.alpha = 0;
    this.tweens.add({ targets: container, alpha: 1, duration: 300, ease: 'Power2' });
    return container;
  }

  drawX(x, y) {
    const size = 70;
    const container = this.add.container(x, y);
    const g = this.add.graphics();
    g.lineStyle(8, 0xff5555);
    g.strokeLineShape(new Phaser.Geom.Line(-size, -size, size, size));
    g.strokeLineShape(new Phaser.Geom.Line(-size, size, size, -size));
    container.add(g);

    container.setScale(0);
    this.tweens.add({ targets: container, scale: 1, duration: 300, ease: 'Back.Out' });
    return container;
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
