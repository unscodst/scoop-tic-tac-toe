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
    tilePick: true,
    message: '',
    movesMade: 0,
    maxMoves: 0,
    showButton: false,
    gameOver: false,
    isWinner: false
  }

  resetState = () => {
    this.setState({
      isInitialLoad: true,
      boardSize: 3,
      gameTiles: [],
      tilePick: true,
      message: '',
      movesMade: 0,
      showButton: false,
      gameOver: false,
      isWinner: false
    })
  }
  setBoardXY = () => {
    let boardSize = this.state.boardSize;
    let gameTiles = this.state.gameTiles;
    if(this.state.boardSize) {
      for(let x = 0; x < boardSize; x++) {
        let gameTileRow = [];
        for(let y = 0; y < boardSize; y++) {
          gameTileRow.push('');
        }
        gameTiles.push(gameTileRow);
      }
    }
    this.setState({
      isInitialLoad: false,
      maxMoves: Math.pow(boardSize,2)
    });
  }


  placeTileHandler = (boardIndex) => {
    let xIndex = boardIndex[0];
    let yIndex = boardIndex[1];
    let tilePick = this.state.tilePick;
    let movesMade = this.state.movesMade;
    let message = '';
    
    const gameTiles = [...this.state.gameTiles];

    if(gameTiles[xIndex][yIndex] === '') {
      if(this.state.tilePick) {
        gameTiles[xIndex][yIndex] = 'X';
      } else gameTiles[xIndex][yIndex] = 'O';
      tilePick = !tilePick;
      message = '';
      movesMade++;
    } else message = `Choose a new tile`;
    

    this.setState({
      gameTiles: gameTiles,
      tilePick: tilePick,
      message: message,
      movesMade: movesMade
    });

    if(this.state.movesMade > 3 && message !== 'Choose a new tile') {
      let checkPick = {
        gameTiles: gameTiles,
        xIndex: xIndex,
        yIndex: yIndex,
        movesMade: movesMade,
        maxMoves: this.state.maxMoves
      }

      let ruleCheck = Rules.initialCheck(checkPick);

      this.setState({
        message: ruleCheck.message,
        gameOver: ruleCheck.gameOver,
        isWinner: ruleCheck.isWinner
      })

    }



  }



  render() {
    if(this.state.isInitialLoad) this.setBoardXY();

    let gameBoard = null;
    let showButton = null;
    let showMessage = null;

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
                      key = {xIndex + '-' + yIndex}/>
                  )
                  return tileRow;
                })
              return <div className='tile-row'>{tileRow}</div>
            })
          }
        </div>
      )
    }
    
    if(this.state.gameOver) {
      showButton = (
        <Button
          click = {this.resetState}
          isWinner = {this.state.isWinner}
        />
      )
    }

    if(this.state.message !== '') {
      showMessage = (
        <MessageComponent 
          message = {this.state.message}
          gameOver = {this.state.gameOver}
        />
      )
    }

    return (
      <div className='App'>
        <div className='App-container'>
          <h1 id='title'>Tic-Tac-Toe</h1>        
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
