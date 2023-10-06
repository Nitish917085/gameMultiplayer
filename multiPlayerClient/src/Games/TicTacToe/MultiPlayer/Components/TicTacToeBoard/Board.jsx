import React, { useState, useEffect, useRef } from 'react';
import './Game.css'
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

	const user = useSelector(state => state.user)

	const [squares, setSquares] = useState(Array(9).fill(null))
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const xIsNext = useRef(true);
	const Chance = useRef(1);
	const Player = useRef('');

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = (Player.current === user.userName) ? 'You winned ' : 'Better Luck Next Time';
		// status = 'Better Luck Next Time:' +Player.current;
	} else {
		status = (Player.current !== user.userName) ? 'Your Chance' : 'Opponent Chance';
	}

	useEffect(() => {
		socket.on('squareClickedReceived', click => {
			const i = click.i;
			squares[i] = xIsNext.current ? 'X' : 'O';
			xIsNext.current = !xIsNext.current;
			setSquares(squares);

			Player.current = click.user_id;

			if (Chance.current === 2) Chance.current = 1;
			if (Chance.current === -1) Chance.current = 2;
			console.log(squares);
			forceUpdate();
		})
	}, [squares, xIsNext])


	useEffect(() => {
		socket.on('playAgainReceived', () => {
			squares.fill(null);
			setSquares(squares)
			console.log(squares);
			Chance.current = 1;
			Player.current = '';
			forceUpdate();
		})
	}, [squares])


	const handleClick = (i) => {

		if (Chance.current === 2 || Chance.current === -1 || calculateWinner(squares) || squares[i]) {
			return;
		}
		// console.log('emitting');
		const click = {
			i,
			name: user.nickName,
			user_id: user.userName,
			room_id
		};
		socket.emit('squareClicked', click);
		Chance.current = -1;
	}

	const PlayAgain = () => {
		socket.emit('playAgain', room_id);
	}

	const renderSquare = (i) => {
		return (
			<div onClick={() => handleClick(i)} >
				{squares[i] ? squares[i] : ''}
			</div>
		)
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
				<div className='playAgainButton' ><div onClick={PlayAgain}>Play Again</div></div>
			</div>
		</div>
	)
}

export default Board
