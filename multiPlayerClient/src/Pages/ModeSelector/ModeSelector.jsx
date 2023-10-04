import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ModeSelector.css'

const ModeSelector = ({ routesName, closeModal }) => {

    const navigate = useNavigate()

    const routes = {
        ticTacToeRoutes: ["/TicTacToeSinglePlayer", "/TicTacToeMultiPlayerHome",],
        checkerRoutes: ["/CheckerSinglePlayer", "/CheckersMultiPlayerHome",],
        chessRoutes: ["/ChessSinglePlayer", "/ChessMultiPlayerHome"],
    }

    const singlePlayer = () => {
        navigate(routes[routesName][0])
    }
    const multiPlayer = () => {
        navigate(routes[routesName][1])
    }

    const closePopModal = () => {
        closeModal()
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closePopModal}>
                    &times;
                </span>
                <div className='gameMode'>
                    <div onClick={() => multiPlayer()}>Multi Player</div>
                    <div onClick={() => singlePlayer()}>Single Player</div>
                </div>
            </div>
        </div>
    )
}

export default ModeSelector