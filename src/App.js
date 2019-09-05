import React from 'react';
import './App.css';
import TileComponent from './TileComponent/TileComponent';
import MessageComponent from './MessageComponent/MessageComponent';
import Rules from './RulesComponent/RulesComponent';
import Button from './ButtonComponent/ButtonComponent';

class App extends React.Component {
  
  state = {
    isInitialLoad: true,
    boardSize: 3,
    gameTiles: [],
    winningArray: [],
    tilePick: true,
    message: '',
    movesMade: 0,
    maxMoves: 0,
    showButton: false,
    gameOver: false,
    isWinner: false,
    showBoardInput: true
  };

  resetState = () => {
    this.setState({
      isInitialLoad: true,
      boardSize: 3,
      gameTiles: [],
      winningArray: [],
      tilePick: true,
      message: '',
      movesMade: 0,
      maxMoves: 0,
      showButton: false,
      gameOver: false,
      isWinner: false,
      showBoardInput: true
    });
  };

  setBoardXY = () => {
    let boardSize = this.state.boardSize;
    const gameTiles = [...this.state.gameTiles];
    let winningArray = [];
    if(this.state.boardSize) {
      for(let x = 0; x < boardSize; x++) {
        let gameTileRow = [];
        for(let y = 0; y < boardSize; y++) {
          gameTileRow.push('');
        };
        gameTiles.push(gameTileRow);
      };
    };
    winningArray = gameTiles.map(row => {
        return row.map(cell => false)
    });
    this.setState({
      isInitialLoad: false,
      maxMoves: Math.pow(boardSize,2),
      gameTiles: gameTiles,
      winningArray: winningArray
    });
  };

  adjustBoardSize(event) {
    let size = event.target.value.length > 1 ? parseInt(event.target.value.split('').pop()) : parseInt(event.target.value);
    if(size === ''){
      size = '';
    } else if(size < 3) {
      size = 3;
    } else if(size > 8) {
      size = 8;
    };
    this.setState({
      isInitialLoad: true,
      boardSize: size,
      gameTiles: []
    });
  };


  placeTileHandler = (boardIndex) => {
    let xIndex = boardIndex[0];
    let yIndex = boardIndex[1];
    let tilePick = this.state.tilePick;
    let movesMade = this.state.movesMade;
    let message = '';
    const filledTileMessage = 'Choose a new tile!'
    const gameTiles = [...this.state.gameTiles];
    if(gameTiles[xIndex][yIndex] === '') {
      if(this.state.tilePick) {
        gameTiles[xIndex][yIndex] = 'X';
      } else gameTiles[xIndex][yIndex] = 'O';
      tilePick = !tilePick;
      message = '';
      movesMade++;
    } else message = filledTileMessage;
    
    this.setState({
      gameTiles: gameTiles,
      tilePick: tilePick,
      message: message,
      movesMade: movesMade,
      showBoardInput: false
    });

    if(this.state.movesMade > 3 && message !== filledTileMessage) {
      let checkPick = {
        gameTiles: gameTiles,
        xIndex: xIndex,
        yIndex: yIndex,
        movesMade: movesMade,
        maxMoves: this.state.maxMoves,
        winningArray: this.state.winningArray
      };

      let ruleCheck = Rules.initialCheck(checkPick);
      this.setState({
        message: ruleCheck.message,
        gameOver: ruleCheck.gameOver,
        isWinner: ruleCheck.isWinner,
        winningArray: ruleCheck.winningArray
      });

    };
  };
  
  render() {
    if(this.state.isInitialLoad) this.setBoardXY();

    let boardInput = null;
    let gameBoard = null;
    let showButton = null;
    let showMessage = null;

    boardInput = (
      <div id="user-settings" className={this.state.showBoardInput ? undefined : 'fade-out'}>
        <label id='instructions'>Please enter a board size between 3 and 8, then click a tile to start!
          <input 
            type='number'
            onChange={(event)=> this.adjustBoardSize(event)}
            value = {this.state.boardSize}
            min='3'
            max='8'
            >        
          </input>
        </label>
      </div>
    );

    if(this.state.gameTiles) {
      gameBoard = (
        <div>
          {
            this.state.gameTiles.map((tileX, xIndex) => {
              let tileRow = [];
                tileX.map((tileY, yIndex) => {
                  tileRow.push(
                    <TileComponent
                      click = {!this.state.gameOver ? () => this.placeTileHandler([xIndex,yIndex]) : undefined} 
                      tile = {tileY}
                      key = {xIndex + '-' + yIndex}
                      winningTile = {this.state.winningArray[xIndex][yIndex]}
                      gameOver = {this.state.gameOver}
                      />
                  );
                  return tileRow;
                });
              return <div className='tile-row'>{tileRow}</div>
            })
          }
        </div>
      );
    };
    
    if(this.state.gameOver) {
      showButton = (
        <Button
          click = {this.resetState}
          isWinner = {this.state.isWinner}
        />
      );
    };

    if(this.state.message !== '') {
      showMessage = (
        <MessageComponent 
          message = {this.state.message}
          gameOver = {this.state.gameOver}
        />
      );
    };

    return (
      <div className='App'>
        <div className='App-container'>
          <h1 id='title'>Tic-Tac-Toe</h1>            
            {boardInput}
          <div id='game-board'>
            {gameBoard}
          </div>          
          <div id='game-info'>
            {showMessage}

            {showButton}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
