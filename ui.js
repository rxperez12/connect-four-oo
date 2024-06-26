import {
  Game,
  Player
} from "./connect4.js";


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard(game) {
  const $htmlBoard = document.querySelector("#board");
  $htmlBoard.innerHTML = '';

  // create top row of game to hold clickable cells
  const $top = document.createElement("tr");
  $top.setAttribute("id", "column-top");

  // fill top row with clickable cells
  for (let x = 0; x < game.width; x++) {
    const $headCell = document.createElement("td");
    $headCell.setAttribute("id", `top-${x}`);
    $headCell.setAttribute("class", `top-row`);
    $headCell.addEventListener("click", handleClick);
    $top.append($headCell);
  }
  $htmlBoard.append($top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < game.height; y++) {
    const $row = document.createElement('tr');

    for (let x = 0; x < game.width; x++) {
      const $cell = document.createElement('td');
      $cell.setAttribute('id', `c-${y}-${x}`);
      $row.append($cell);
    }

    $htmlBoard.append($row);
  }
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x, currPlayer) {
  const $piece = document.createElement('div');
  $piece.classList.add('piece');
  $piece.style.backgroundColor = currPlayer.color;
  const $spot = document.querySelector(`#c-${y}-${x}`);
  $spot.append($piece);
}


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** stopGameMoves: prohibits players from making further moves */

function stopGameMoves() {
  const $topRowCells = document.querySelectorAll('.top-row');
  for (let i = 0; i < $topRowCells.length; i++) {
    $topRowCells[i].removeEventListener('click', handleClick);
  }
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  const { board, currPlayer } = game;

  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = game.findSpotInCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x, currPlayer);

  // check for win
  if (game.checkForWin()) {
    stopGameMoves();
    return endGame(`Player ${currPlayer.color} won!`);
  }

  // check for tie: if top row is filled, board is filled
  if (board[0].every(cell => cell !== null)) {
    stopGameMoves();
    return endGame('Tie!');
  }

  //if game.currPlayer === player1:
  game.switchCurrPlayer();
}

let player1, player2;
let game;

/** Start game. */

function buildGame() {
  player1 = new Player(document.querySelector('#player-1').value);
  player2 = new Player(document.querySelector('#player-2').value);
  game = new Game(player1, player2, undefined, undefined);
  makeHtmlBoard(game);
}

function start() {
  const button = document.querySelector('button');
  button.addEventListener('click', e => {
    buildGame();
  });
}


export { start };
