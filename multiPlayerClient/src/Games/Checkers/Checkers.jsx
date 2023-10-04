import React, { useState, useEffect } from 'react';
import './Checkers.css';

const initialBoard = [
  ['_', 'B', '_', 'B', '_', 'B', '_', 'B'],
  ['B', '_', 'B', '_', 'B', '_', 'B', '_'],
  ['_', 'B', '_', 'B', '_', 'B', '_', 'B'],
  ['_', '_', '_', '_', '_', '_', '_', '_'],
  ['_', '_', '_', '_', '_', '_', '_', '_'],
  ['W', '_', 'W', '_', 'W', '_', 'W', '_'],
  ['_', 'W', '_', 'W', '_', 'W', '_', 'W'],
  ['W', '_', 'W', '_', 'W', '_', 'W', '_'],
];

const pieceColors = {
  'B': 'black',
  'W': 'white',
  'KB':'kingBlack',
  'KW': 'kingWhite'
};

const Checkers = () => {
  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState('W');
  const [message, setMessage] = useState('');
  const [isBlackWin, setIsBlaclWins] = useState(0)

  const handlePieceDragStart = (event, row, col, piece) => {
    event.dataTransfer.setData('piece', piece);
    event.dataTransfer.setData('row', row.toString());
    event.dataTransfer.setData('col', col.toString());
  };

  const handleSquareDragOver = (event) => {
    event.preventDefault();
  };

  const handleSquareDrop = (event, row, col) => {
    event.preventDefault();
    let droppedPiece = event.dataTransfer.getData('piece');
    const startRow = parseInt(event.dataTransfer.getData('row'));
    const startCol = parseInt(event.dataTransfer.getData('col'));

    if (isValidMove(startRow, startCol, row, col, droppedPiece)) {
      if ((droppedPiece === 'W' && row === 0) || (droppedPiece === 'B' && row === 7)) {
        droppedPiece = `K${droppedPiece}`;
      }
      const updatedBoard = [...board];
      updatedBoard[row][col] = droppedPiece;
      updatedBoard[startRow][startCol] = '_';
      setBoard(updatedBoard);
      setTurn(turn === 'W' ? 'B' : 'W');
      setMessage('');
    } else
      setMessage('Invalid Move! Try again.');
  };

  const isValidMove = (startRow, startCol, endRow, endCol, piece) => {
    if (board[endRow][endCol] !== '_')
      return false;

    if (!piece.includes(turn))
      return false;

    // Allow normal pieces to move diagonally forward
    if ((piece === 'W' && endRow < startRow) || (piece === 'B' && endRow > startRow)) {
      if (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 1) {
        return true;
      }
      // Allow capturing
      if (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 2) {
        const capturedPiece = board[(startRow + endRow) / 2][(startCol + endCol) / 2];
        if ((piece === 'W' && (capturedPiece === 'B' || capturedPiece === 'KB')) ||
          (piece === 'B' && (capturedPiece === 'W' || capturedPiece === 'KW'))) {
          board[(startRow + endRow) / 2][(startCol + endCol) / 2] = '_';
          return true;
        }
      }
    }

    // Allow kings to move diagonally both forward and backward
    if (piece === 'KW' || piece === 'KB') {
      if (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 1) {
        return true;
      }
      // Allow capturing
      if (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 2) {
        const capturedPiece = board[(startRow + endRow) / 2][(startCol + endCol) / 2];
        if ((piece === 'KW' && (capturedPiece === 'B' || capturedPiece === 'KB')) ||
          (piece === 'KB' && (capturedPiece === 'W' || capturedPiece === 'KB'))) {
          board[(startRow + endRow) / 2][(startCol + endCol) / 2] = '_';
          return true;
        }
      }
    }

    return false;
  };

  const isPlayerWin = () => {
    let white = 0;
    let black = 0;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (board[i][j] == 'W' || board[i][j] == "KW")
          white++;
        if (board[i][j] == 'B' || board[i][j] == "KB")
          black++;
      }
    }
    if (!white)   // set if black wins to -1 if white to 1 other wise zero
      setIsBlaclWins(1)
    if (!black)
      setIsBlaclWins(-1)
  }

  const playAgain = () => {
    setIsBlaclWins(0)
    setBoard(initialBoard)
  }

  useEffect(() => {
    isPlayerWin();
  }, [board])

  return (
    <div className="checkers">
      {
        isBlackWin == 0 ? <div>

          <h1>Checkers</h1>
          <h5>Current Turn: {turn === 'W' ? 'White' : 'Black'}</h5>
          <div className="board">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((piece, colIndex) => (
                  <div
                    key={colIndex}
                    className={`square ${pieceColors[piece]}`}
                    style={{backgroundColor:((rowIndex+colIndex)%2!=0)?"gray":"white"}}
                    onDragOver={handleSquareDragOver}
                    onDrop={(e) => handleSquareDrop(e, rowIndex, colIndex)}
                    draggable={piece !== '_'}
                    onDragStart={(e) => handlePieceDragStart(e, rowIndex, colIndex, piece)}
                  >
                    {piece === '_' ? null : <div className="piece"></div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="message">{' '}{message}</div>
        </div> : <div className='result'>
          {isBlackWin == -1 ? "Black Wins" : "White Wins"}
          <div className="playAgain" onClick={() => playAgain()}>Play Again</div>
        </div>
      }

    </div>
  );
};

export default Checkers;
