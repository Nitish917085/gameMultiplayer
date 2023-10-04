import React, { useState, useEffect } from 'react';
import './Game.css';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const TicTacToeSinglePlayer = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!isXNext && !winner) {
      // Simulate computer's move (randomly)
      const emptySquares = squares.map((square, index) => square === null ? index : null).filter(x => x !== null);
      if (emptySquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const computerMove = emptySquares[randomIndex];
        const newSquares = [...squares];
        newSquares[computerMove] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }
    }
  }, [squares, isXNext, winner]);

  useEffect(() => {
    const gameWinner = calculateWinner(squares);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  }, [squares]);

  const handleClick = (i) => {
    if (squares[i] || winner) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (i) => (
    <div onClick={() => handleClick(i)}>{squares[i]}</div>
  );

  const status = winner ? `Winner: ${winner}` : (isXNext ? 'Your Turn' : 'Computer\'s Turn');

  return (
    <div className="boardContainer">
      <div className='boardSlate'>
        <div className="status">{status}</div>
        <div className="Board_game">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <br />
        <div className='playAgainButton' ><div onClick={() => window.location.reload()}>Play Again</div></div>
      </div>
    </div>
  );
};

export default TicTacToeSinglePlayer;
