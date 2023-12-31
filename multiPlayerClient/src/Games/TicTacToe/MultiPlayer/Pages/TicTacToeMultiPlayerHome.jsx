import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../../../services/api';
import { setRoomId } from '../../../../redux/reducers';
import axios from 'axios';
import './TicTacToeMultiPlayerConfig.css'

const TicTacToeMultiPlayerHome = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user.userName)
  const [room_id, setRoom_id] = useState('');
  const [error, setError] = useState('')


  const joinRoom = async () => {

    const options = {
      url: `${baseUrl}/join_room`,
      method: 'POST',
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        room_id
      }
    };

    const res = await axios(options)

    if (res.data.err) {
      console.log("ErrressRooommm")

      setError(res.data.err);
    } else if (res.data.doc) {
      console.log("ressRooommm")
      dispatch(setRoomId(room_id))
      navigate('/TicTacToeMultiPlayerConfig')
    }
  }

  //Function to call server and get new Room id 
  const genereateUniqueID = async () => {
    const res = await axios.get(`${baseUrl}/create_room`)
    dispatch(setRoomId(res.data))
    navigate('/TicTacToeMultiPlayerConfig')
  }

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [])

  return (
    <div className="ticTacToeMultiPlayerConfig">
      <div className='joinRoom'>
        <div className="error" style={{ display: !error ? 'none' : 'flex' }} >{error}</div>
        <div className='inputRoomContainer'>
          <input
            type="text"
            value={room_id}
            onChange={e => { setError(''); setRoom_id(e.target.value) }}
            placeholder='Enter Room ID' />
          <button onClick={() => joinRoom()}>Join Room</button>
        </div>
      </div>
      <button onClick={() => genereateUniqueID()}>Create Room</button>
    </div>
  )
}

export default TicTacToeMultiPlayerHome;
