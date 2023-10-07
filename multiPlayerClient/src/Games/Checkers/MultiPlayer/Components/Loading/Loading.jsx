import React, { useState } from 'react';

import './Loading.css'
import { useSelector } from 'react-redux';

const Loading = () => {

    const [copySuccess, setCopySuccess] = useState('');

    const room_id = useSelector(state => state.roomId)

    const copyToClipBoard = async e => {
        try {
            await navigator.clipboard.writeText(room_id);
            setCopySuccess('Copied!');
        } catch (err) {
            try {
                e.preventDefault();
                e.clipboardData.setData('text/plain', room_id)
                setCopySuccess('Copied!');
            } catch (error) {
                setCopySuccess('Failed to copy!');
            }
        }
    };

    return (
        <div className='loadingContainerCheckers'>
            Click Below to Copy Room Id and Share it with another player to join room
            <div className='loadingroom_idcontainer'>
                <div onClick={copyToClipBoard} className='loadingroom_id'>
                    {room_id}
                </div>
                <div>
                {copySuccess}
                </div>
                    
            </div>
        </div>
    )
}

export default Loading
