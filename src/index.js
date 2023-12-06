'use strict';

const GameBoard = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const setElementValue = (index, marker) => {
    board[index] = marker;
  };

  const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
  };

  return { getBoard, setElementValue, resetBoard };
})();

const GameController = (() => {
  let currentPlayer;
  let turnCount = 0;

  const checkWinner = (board = GameBoard.getBoard()) =>
    checkRows(board) || checkColumns(board) || checkDiagonals(board);

  const checkRows = (board) =>
    [0, 3, 6].some((start) => checkTriplet(board.slice(start, start + 3)));

  const checkColumns = (board) =>
    [0, 1, 2].some((start) =>
      checkTriplet([board[start], board[start + 3], board[start + 6]])
    );

  const checkDiagonals = (board) =>
    checkTriplet([board[0], board[4], board[8]]) ||
    checkTriplet([board[2], board[4], board[6]]);

  const checkTriplet = (array) =>
    array.every((tile) => tile === 'X') || array.every((tile) => tile === 'O');

  const getCurrentPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return currentPlayer;
  };

  const playTurn = (index, marker) => {
    GameBoard.setElementValue(index, marker);

    if (checkWinner()) {
      DisplayController.endGameResult(currentPlayer, false);
      DisplayController.disableTiles();
    } else if (turnCount === 8) {
      DisplayController.endGameResult(currentPlayer, true);
      DisplayController.disableTiles();
    }

    turnCount++;
  };

  const newGame = () => {
    GameBoard.resetBoard();
    currentPlayer = '';
    turnCount = 0;
  };

  return { playTurn, getCurrentPlayer, newGame };
})();

const DisplayController = (() => {
  const tiles = document.querySelectorAll('.tile');
  const resetBtn = document.getElementById('reset');
  const resultMessage = document.getElementById('message');
  const board = document.getElementById('gameboard');

  const setTileValue = (e) => {
    const player = GameController.getCurrentPlayer();
    e.target.textContent = player;
    GameController.playTurn(e.target.dataset.index, player);
    e.target.disabled = true;
  };

  const resetBoard = () => {
    tiles.forEach((tile) => {
      tile.textContent = '';
      tile.disabled = false;
    });
    resultMessage.classList.add('hidden');
    board.style.filter = 'blur(0px)';
    GameController.newGame();
  };

  const endGameResult = (player, isDraw) => {
    resultMessage.textContent = isDraw ? "It's a draw!" : `${player} Wins!`;
    resultMessage.classList.remove('hidden');
    board.style.filter = 'blur(8px)';
  };

  tiles.forEach((tile) => {
    tile.addEventListener('click', setTileValue);
  });

  const disableTiles = () => {
    tiles.forEach((tile) => {
      tile.disabled = true;
    });
  };

  resetBtn.addEventListener('click', resetBoard);

  return { endGameResult, disableTiles };
})();
