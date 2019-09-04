import React from 'react';
import './tile.css'

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