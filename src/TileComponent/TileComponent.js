import React from 'react';

const tileComponent = (props) => {

    return (
        <span
            className = 'tile-piece'
            onClick = {props.click}
        >
            {props.tile}
        </span>
    )
}

export default tileComponent;