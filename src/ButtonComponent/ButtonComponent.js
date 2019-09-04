import React from 'react';
import './button.css';

const buttonComponent = (props) => {
    let buttonText = '';

    buttonText = props.isWinner ? 'Play Again' : 'Try Again';

    return(
        <button 
        onClick={props.click}
        className='better-button'>
            {buttonText}
        </button>
    )
}

export default buttonComponent;