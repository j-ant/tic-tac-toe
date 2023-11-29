class GameBoard {
  constructor() {
    this._tiles = ['', '', '', '', '', '', '', '', ''];
  }

  getTiles() {
    return this._tiles;
  }
}

class Player {
  constructor(name, marker) {
    this._name = name;
    this._marker = marker;
  }
}

class GameController {
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
    const diagonalOne = [board[0], board[4], board[8]];
    const diagonalTwo = [board[2], board[4], board[6]];
    return this._checkTriplet(diagonalOne) || this._checkTriplet(diagonalTwo);
  }

  _checkTriplet(array) {
    return (
      array.every((tile) => tile === 'X') || array.every((tile) => tile === 'O')
    );
  }
}
