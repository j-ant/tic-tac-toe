class TicTacToe {
  constructor() {
    this._board = ['', '', '', '', '', '', '', '', ''];
  }

  getBoard() {
    return this._board;
  }

  setTileValue(index, marker) {
    this._board[index] = marker;
  }
}

class Player {
  constructor(name, marker) {
    this._name = name;
    this._marker = marker;
  }

  getMarker() {
    return this._marker;
  }
}

class DisplayController {
  handleTileClick(marker) {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        tile.innerHTML = 'X';
      });
    });

    const setTileValue = (e) => {
      e.target.innerHTML = marker;
    };
  }
}

class GameController {
  constructor(board, playerOne, playerTwo) {
    this._board = board;
    this._playerOne = playerOne;
    this._playerTwo = playerTwo;
    this._playerTurn = playerOne;
  }

  handlePlayerTurn() {
    const marker = this._playerTurn.getMarker();
  }

  checkWinner(board) {
    return (
      this._checkRows(board) ||
      this._checkColumns(board) ||
      this._checkDiagonals(board)
    );
  }

  _checkRows(board) {
    const rowOne = [board[0], board[1], board[2]];
    const rowTwo = [board[3], board[4], board[5]];
    const rowThree = [board[6], board[7], board[8]];

    return (
      this._checkTriplet(rowOne) ||
      this._checkTriplet(rowTwo) ||
      this._checkTriplet(rowThree)
    );
  }

  _checkColumns(board) {
    const colOne = [board[0], board[3], board[6]];
    const colTwo = [board[1], board[4], board[7]];
    const colThree = [board[2], board[5], board[8]];
    return (
      this._checkTriplet(colOne) ||
      this._checkTriplet(colTwo) ||
      this._checkTriplet(colThree)
    );
  }

  _checkDiagonals(board) {
    const diagonal = [board[0], board[4], board[8]];
    const antiDiagonal = [board[2], board[4], board[6]];
    return this._checkTriplet(diagonal) || this._checkTriplet(antiDiagonal);
  }

  _checkTriplet(array) {
    return (
      array.every((tile) => tile === 'X') || array.every((tile) => tile === 'O')
    );
  }
}

const main = (() => {
  const game = new TicTacToe();
  const controller = new GameController();
  const displayController = new DisplayController();
  displayController.handleTileClick();
})();
