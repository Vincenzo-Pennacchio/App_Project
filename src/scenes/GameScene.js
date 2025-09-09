export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.board = Array(3).fill().map(() => Array(3).fill(null));
    this.currentPlayer = 'X';
  }

  // Disegna una O centrata usando un container (con fade-in)
  drawO(x, y) {
    const radius = 70;
    const container = this.add.container(x, y);        // container centrato nella cella
    const g = this.add.graphics();                     // graphics posizionato relativo al container
    g.lineStyle(8, 0x00aaff);
    g.strokeCircle(0, 0, radius);                     // cerchio centrato su (0,0) del container
    container.add(g);

    // animazione fade-in
    container.alpha = 0;
    this.tweens.add({
      targets: container,
      alpha: 1,
      duration: 300,
      ease: 'Power2'
    });
  }

  // Disegna una X centrata usando un container (con zoom-in)
  drawX(x, y) {
    const size = 70;
    const container = this.add.container(x, y);        // container centrato nella cella
    const g = this.add.graphics();
    g.lineStyle(8, 0xff5555);

    // linee disegnate relative al centro (0,0) del container
    g.strokeLineShape(new Phaser.Geom.Line(-size, -size, size, size));
    g.strokeLineShape(new Phaser.Geom.Line(-size, size, size, -size));
    container.add(g);

    // animazione scale (zoom in) — lavora sul container, quindi il centro è corretto
    container.setScale(0);
    this.tweens.add({
      targets: container,
      scale: 1,
      duration: 300,
      ease: 'Back.Out'
    });
  }

  create() {
    const graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xffffff } });
    // griglia 600x600, celle da 200
    graphics.strokeLineShape(new Phaser.Geom.Line(200, 0, 200, 600));
    graphics.strokeLineShape(new Phaser.Geom.Line(400, 0, 400, 600));
    graphics.strokeLineShape(new Phaser.Geom.Line(0, 200, 600, 200));
    graphics.strokeLineShape(new Phaser.Geom.Line(0, 400, 600, 400));

    this.input.on('pointerdown', (pointer) => {
      const col = Math.floor(pointer.x / 200);
      const row = Math.floor(pointer.y / 200);

      if (!this.board[row][col]) {
        this.board[row][col] = this.currentPlayer;

        const cx = col * 200 + 100;
        const cy = row * 200 + 100;

        if (this.currentPlayer === 'X') {
          this.drawX(cx, cy);
        } else {
          this.drawO(cx, cy);
        }

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
