import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CheckersRules.css'

const CheckersRules = ({ closeModal }) => {

    const navigate = useNavigate()


    const closePopModal = () => {

        closeModal(false)
    };

    return (
        <div className="modal-checkers">
            <div className="modal-content-checkers">
                <span className="close" onClick={closePopModal}>
                    &times;
                </span>
                <div className='rulesContainer'>
                    <ul className='rulesList'>
                        <li>Rule 1: Checkers is played on an 8x8 board.</li>
                        <li>Rule 2: Each player starts with 12 pieces placed on the dark squares of the three rows closest to them.</li>
                        <li>Rule 3: Pieces can move diagonally forward, but they can only move one square at a time.</li>
                        <li>Rule 4: If a player's piece reaches the opposite end of the board, it is crowned as a "king" and can move both forwards and backwards.</li>
                        <li>Rule 5: Capturing is done by jumping over the opponent's piece diagonally.</li>
                        <li>Rule 6: A king can move and capture diagonally in any direction.</li>
                        <li>Rule 7: The game is won when a player captures all of the opponent's pieces or blocks them in such a way that they cannot make any legal moves or opponent player time out.</li>
                    </ul>
                </div>


            </div>
        </div>
    )
}

export default CheckersRules