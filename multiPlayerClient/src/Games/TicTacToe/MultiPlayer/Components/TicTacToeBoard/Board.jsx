import React, { useState, useEffect } from 'react';
import '../../../TicTacToe.css'
import { useSelector } from 'react-redux';

const calculateWinner = (squares) => {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board = ({ socket, room_id }) => {
  const user = useSelector(state => state.user);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [chance, setChance] = useState(1);
  const [player, setPlayer] = useState('');
  
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = (player === user.userName) ? 'You won' : 'Better Luck Next Time';
  } else {
    status = (player !== user.userName) ? 'Your Chance' : 'Opponent Chance';
  }

  useEffect(() => {
    socket.on('squareClickedReceived', click => {
      const i = click.i;
      const updatedSquares = [...squares]; // Create a new array to avoid mutating state directly
      if (!calculateWinner(updatedSquares) && !updatedSquares[i]) {
        updatedSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(updatedSquares);
        setXIsNext(!xIsNext);
        setPlayer(click.user_id);
        if (chance === 2) {
          setChance(1);
        } else if (chance === -1) {
          setChance(2);
        }
      }
    });
  }, [squares, xIsNext, chance]);

  useEffect(() => {
    socket.on('playAgainReceived', () => {
      setSquares(Array(9).fill(null));
      setChance(1);
      setPlayer('');
    });
  }, []);

  const handleClick = (i) => {
    if (chance === 2 || chance === -1 || calculateWinner(squares) || squares[i]) {
      return;
    }
    const click = {
      i,
      name: user.nickName,
      user_id: user.userName,
      room_id
    };
    socket.emit('squareClicked', click);
    setChance(-1);
  }

  const PlayAgain = () => {
    socket.emit('playAgain', room_id);
  }

  const renderSquare = (i) => {
    return (
      <div onClick={() => handleClick(i)}>
        {squares[i] ? squares[i] : ''}
      </div>
    );
  }

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
        <br/>
        <div className='playAgainButton'><div onClick={PlayAgain}>Play Again</div></div>
      </div>
    </div>
  );
}

export default Board;
