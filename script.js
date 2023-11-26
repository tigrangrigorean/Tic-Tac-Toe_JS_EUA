let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let winPosition = [];
let xOrO = true;

function handleClick(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;

    if (!checkWinner()) {
      currentPlayer = 'O';
      xOrO == true;
      makeRandomMove();
    }
  }
    if(checkWinner() && winPosition[0] == 3 && winPosition[1] == 4 && winPosition[2] == 5 && xOrO != false) {
      document.getElementById("status").innerHTML = currentPlayer + " wins";
      gameActive = false;
    } else if(checkWinner() && xOrO == false) {
      gameActive = false;
    } else if (checkWinner()) {
      gameActive = false;
    }
}

function makeRandomMove() {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyCells.length > 0) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomIndex] = 'O';
    document.getElementById('board').children[randomIndex].innerText = 'O';

    currentPlayer = 'X';

    if (checkWinner()) {
      document.getElementById("status").innerHTML = "O wins";
      xOrO = false;
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      document.getElementById("status").innerHTML = "Draw";
      gameActive = false;
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winPosition[0] = a;
      winPosition[1] = b;
      winPosition[2] = c;
      return true;
    }
  }

  return false;
}
