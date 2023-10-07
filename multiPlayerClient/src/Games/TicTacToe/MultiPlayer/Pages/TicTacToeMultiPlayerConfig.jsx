/*IMPORTS*/
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import './TicTacToeMultiPlayerConfig.css'
import { baseUrl } from '../../../../services/api';
import { useSelector } from 'react-redux';
import Board from '../Components/TicTacToeBoard/Board';
import Loading from "../Components/Loading/Loading"

let socket;
const TicTacToeMultiPlayerConfig = () => {

    const navigate = useNavigate()
    const ENDPT = `${baseUrl}/`
    const user = useSelector(state => state.user.userName)
    const room_id = useSelector(state => state.roomId)


    const [socketHasBeenInitialized, setSocketHasBeenInitialized] = useState(false)
    const [playNow, setPlayNow] = useState(false);

    useEffect(() => {
        socket = io(ENDPT);
        setSocketHasBeenInitialized(true);
        if (!user) {
            return;
        }
        socket.emit('join', room_id);
        console.log(user + " " + " " + room_id);

    }, [ENDPT])



    useEffect(() => {
        socket.on('youCanPLayNow', () => {
            setPlayNow(true);
        })
    }, [])

    //No point in countinuing if user does not exist
    if (!user) {
        return navigate('/');
    }

    return (
        <div>
            {(
                playNow && socketHasBeenInitialized) ? (
                <div >
                    <Board socket={socket} room_id={room_id ? room_id : ''} />
                </div>
            ) : (
                <div><Loading room_id={room_id} /></div>
            )}
        </div>
    )
}

export default TicTacToeMultiPlayerConfig
