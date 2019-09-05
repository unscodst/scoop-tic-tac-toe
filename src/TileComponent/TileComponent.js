import React from 'react';
import './tile.css'

const tileComponent = (props) => {
    return (
        <span
            className = { props.gameOver && props.winningTile ? 'winning-tile tile-piece' : 'tile-piece'}
            onClick = {props.click}
        >
            {props.tile}
        </span>
    )
}

export default tileComponent;