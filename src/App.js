import React from 'react';
import './App.css';
import TileComponent from './TileComponent/TileComponent';
import MessageComponent from './MessageComponent/MessageComponent';
import Rules from './RulesComponent/RulesComponent';

class App extends React.Component {
  state = {
    isInitialLoad: true,
    boardSize: [3,3],
    gameTiles: [],
    tilePick: true,
    message: ''
  }

  setBoardXY = () => {
    let boardSize = this.state.boardSize;
    let gameTiles = this.state.gameTiles;
    if(this.state.boardSize) {
      let boardX = boardSize[0];
      let boardY = boardSize[1];
      for(let x = 0; x < boardX; x++) {
        let gameTileRow = [];
        for(let y = 0; y < boardY; y++) {
          gameTileRow.push('-');
        }
        gameTiles.push(gameTileRow);
      }
    }
    this.setState({isInitialLoad: false});
  }


  placeTileHandler = (boardIndex) => {
    console.log(boardIndex);
    let xIndex = boardIndex[0];
    let yIndex = boardIndex[1];
    let tilePick = this.state.tilePick;
    let message = '';
    const gameTiles = [...this.state.gameTiles];

    if(gameTiles[xIndex][yIndex] === '-') {
      if(this.state.tilePick) {
        gameTiles[xIndex][yIndex] = 'O';
      } else gameTiles[xIndex][yIndex] = 'X';
      tilePick = !tilePick;
      message = '';
    } else message = `Choose a new tile`;

    let checking = Rules.checkLeft();
    console.log(checking);

    this.setState({
      gameTiles: gameTiles,
      tilePick: tilePick,
      message: message
    });

  }
  render() {
    if(this.state.isInitialLoad) this.setBoardXY();

    let gameBoard = null;

    if(this.state.gameTiles) {
      gameBoard = (
        <span>
          {
            this.state.gameTiles.map((tileX, xIndex) => {
              let tileRow = [];
                tileX.map((tileY, yIndex) => {
                  tileRow.push(
                    <TileComponent
                      click = {() => this.placeTileHandler([xIndex,yIndex])} 
                      tile = {tileY}
                      key = {xIndex + '-' + yIndex}/>
                  )
                  return tileRow;
                })
                
              return <div>{tileRow}</div>
            })
          }
        </span>
      )
    }

    return (
      <div className="App">
        <div className="App-container">
          <h1 id="title">Tic-Tac-Toe</h1>        
          <div id="game-board">
            {gameBoard}
          </div>
          <div>
            <MessageComponent 
              message = {this.state.message}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
