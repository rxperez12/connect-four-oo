/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie).
 */


/**
 * Create new game object which includes height, width with empty game board,
 * and current Player.
 * Includes methods switchPlayer, makeBoard, findSpotInCol,and checkForWin
 */

class Game {
  constructor(height = 6, width = 7) {
    this.height = height;
    this.width = width;
    this.board = Array(height);
    this.makeBoard();
    this.currPlayer = 1;
  }

  switchCurrPlayer() {
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array(this.width).fill(null);
      this.board[y] = emptyRow;
    }
  }

  findSpotInCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.board[y][x] === null) {
        return y;
      }
    }
    return null;
  }

  checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    };

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "checklist" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
    return false;
  }
}

let tryGame = new Game(6, 7);
tryGame.makeBoard();
tryGame.board[0][0] = 1;
console.log(tryGame.board);
console.log(tryGame.board.length);
console.log(tryGame.board[0].length);


export {
  Game,
};
