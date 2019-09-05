import React from 'react';
import './message.css'

const messageComponent = (props) => {
    let message = props.message;    
    return(
        <span id='message-text' className={(props.gameOver ? 'fly-in' : '')}>{message}</span>
    )
}

export default messageComponent;