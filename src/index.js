'use strict';

const Player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

const GameBoard = (() => {
  let board = ['X', 'X', 'X', '', '', '', '', '', ''];

  const getBoard = () => board;

  const setTileValue = (index, marker) => {
    board[index] = marker;
  };

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return { getBoard, setTileValue, resetBoard };
})();

const GameController = (() => {
  const checkWinner = (board) =>
    checkRows(board) || checkColumns(board) || checkDiagonals(board);

  const checkRows = (board) => {
    const rowOne = [board[0], board[1], board[2]];
    const rowTwo = [board[3], board[4], board[5]];
    const rowThree = [board[6], board[7], board[8]];

    return (
      checkTriplet(rowOne) || checkTriplet(rowTwo) || checkTriplet(rowThree)
    );
  };

  const checkColumns = (board) => {
    const colOne = [board[0], board[3], board[6]];
    const colTwo = [board[1], board[4], board[7]];
    const colThree = [board[2], board[5], board[8]];
    return (
      checkTriplet(colOne) || checkTriplet(colTwo) || checkTriplet(colThree)
    );
  };

  const checkDiagonals = (board) => {
    const diagonal = [board[0], board[4], board[8]];
    const antiDiagonal = [board[2], board[4], board[6]];
    return checkTriplet(diagonal) || checkTriplet(antiDiagonal);
  };

  const checkTriplet = (array) =>
    array.every((tile) => tile === 'X') || array.every((tile) => tile === 'O');

  return { checkWinner };
})();
