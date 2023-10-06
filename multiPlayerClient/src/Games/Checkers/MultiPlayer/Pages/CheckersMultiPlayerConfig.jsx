/*IMPORTS*/
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import './CheckersMultiPlayerConfig.css'
import { useSelector } from 'react-redux';
import Loading from "../Components/Loading/Loading";
import MultiPlayerCheckers from '../Components/CheckersBoard/MultiPlayerCheckers';
import { baseUrl } from '../../../../services/api';

let socket;
const CheckersMultiPlayerConfig = () => {

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
        socket.emit('joinCheckers', room_id);
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
        <div className='CheckersMultiPlayerConfig'>
            {(
                playNow && socketHasBeenInitialized) ? (
                <div >
                    <MultiPlayerCheckers socket={socket} room_id={room_id ? room_id : ''} />
                </div>
            ) : (
                <div><Loading room_id={room_id} /></div>
            )}
        </div>
    )
}

export default CheckersMultiPlayerConfig
