export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.board = Array(3).fill().map(() => Array(3).fill(null));
    this.currentPlayer = 'X';
  }

  create() {
    const graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });

    // Disegno la griglia
    graphics.strokeLineShape(new Phaser.Geom.Line(200, 0, 200, 600));
    graphics.strokeLineShape(new Phaser.Geom.Line(400, 0, 400, 600));
    graphics.strokeLineShape(new Phaser.Geom.Line(0, 200, 600, 200));
    graphics.strokeLineShape(new Phaser.Geom.Line(0, 400, 600, 400));

    // Input click
    this.input.on('pointerdown', (pointer) => {
      const col = Math.floor(pointer.x / 200);
      const row = Math.floor(pointer.y / 200);

      if (!this.board[row][col]) {
        this.board[row][col] = this.currentPlayer;
        this.add.text(col * 200 + 100, row * 200 + 100, this.currentPlayer, {
          fontSize: '96px',
          color: '#fff'
        }).setOrigin(0.5);

        if (this.checkWinner()) {
          this.add.text(300, 570, this.currentPlayer + ' ha vinto!', {
            fontSize: '32px',
            color: '#ff0'
          }).setOrigin(0.5);
          this.input.removeAllListeners();
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    });
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
