import React from 'react';

const messageComponent = (props) => {
    let message = props.message;
    return(
        <span>{message}</span>
    )
}

export default messageComponent;