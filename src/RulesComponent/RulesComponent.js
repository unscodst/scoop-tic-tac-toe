class Rules {
    constructor() {
        this.xIndex = 0;
        this.yIndex = 0;
        this.gameTiles = [];
        this.picked = '';
        this.message = '';
        this.finishedChecking = false;
        this.gameOver = false;
        this.movesMade = 0;
        this.maxMoves = 0;
        this.isWinner = false;
        this.winningArray = [];
        this.defaultWinning = [];
    }
    initialCheck(checkPick) {
        this.xIndex = checkPick.xIndex;
        this.yIndex = checkPick.yIndex;
        this.gameTiles = checkPick.gameTiles;
        this.picked = this.gameTiles[this.xIndex][this.yIndex];
        this.message = '';
        this.finishedChecking = false;
        this.gameOver = false;
        this.movesMade = checkPick.movesMade;
        this.maxMoves = checkPick.maxMoves;
        this.winningArray = [...checkPick.winningArray];  
        this.defaultWinning = [...checkPick.winningArray];

        this.startChecking();

        let response = {
            message: this.message,
            gameOver: this.gameOver,
            isWinner: this.isWinner,
            winningArray: this.winningArray
        }

        return(response);
    }
    startChecking() {
        this.checkRow();
        if(!this.finishedChecking) this.checkColumn();
        if(!this.finishedChecking && (this.xIndex === this.yIndex)) this.checkDiag();
        if(!this.finishedChecking && ((this.xIndex + this.yIndex) === (this.gameTiles.length -1))) this.checkReverseDiag();

        if(this.movesMade === this.maxMoves && !this.gameOver) {
            this.TieText();
        }
    }

    checkRow() {
        for(let i = 0; i < this.gameTiles.length; i++) {
            if(this.gameTiles[this.xIndex][i] !== this.picked) {
                break;
            } else this.winningArray[this.xIndex][i] = true;
            if(i === (this.gameTiles.length-1)) {
                this.winnerText();
                return;
            }
        }
        if(!this.finishedChecking) this.resetWinning();
    }

    checkColumn() {
        for(let i = 0; i < this.gameTiles.length; i++) {
            if(this.gameTiles[i][this.yIndex] !== this.picked) {
                break;
            } else this.winningArray[i][this.yIndex] = true;
            if(i === (this.gameTiles.length-1)) {
                this.winnerText();
                return;
            }
        }
        if(!this.finishedChecking) this.resetWinning(); 
    }

    checkDiag() {
        for(let i = 0; i < this.gameTiles.length; i++) {
            if(this.gameTiles[i][i] !== this.picked) {
                break;
            } else this.winningArray[i][i] = true;
            if(i === (this.gameTiles.length-1)) {
                this.winnerText();
                return;
            }
        }
        if(!this.finishedChecking) this.resetWinning(); 
    }
    
    checkReverseDiag() {
        for(let i = 0; i < this.gameTiles.length; i++) {
            if(this.gameTiles[i][(this.gameTiles.length-1)-i] !== this.picked) {
                break;
            } else this.winningArray[i][(this.gameTiles.length-1)-i] = true;
            if(i === (this.gameTiles.length-1)) {
                this.winnerText();
                return
            }
        }
        if(!this.finishedChecking) this.resetWinning();
    }

    winnerText() {
        this.message = `The player ${this.picked} is the Winner!`;
        this.finishedChecking = true;
        this.gameOver = true;
        this.isWinner = true;
    }
    TieText() {
        this.message = `There is no winner, try again to see who is the best!`;
        this.finishedChecking = true;
        this.gameOver = true;
        this.isWinner = false;
    }
    resetWinning() {
        this.winningArray = this.defaultWinning.map(row => {
            return row.map(cell => false);
        });
    }
}

const rules = new Rules();
export default rules;