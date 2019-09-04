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

        this.startChecking();

        let response = {
            message: this.message,
            gameOver: this.gameOver,
            isWinner: this.isWinner
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
        console.log('checking row');
        for(let i = 0; i < this.gameTiles.length; i++) {
            console.log('checking: ', this.xIndex,i);
            if(this.gameTiles[this.xIndex][i] !== this.picked) {
                break;
            }
            if(i === (this.gameTiles.length-1)) {
                this.winnerText();
                return;
            }
        } 
    }

    checkColumn() {
        console.log('checking column');
        for(let i = 0; i < this.gameTiles.length; i++) {
            console.log('checking: ', i, this.yIndex);
            if(this.gameTiles[i][this.yIndex] !== this.picked) {
                break;
            }
            if(i === (this.gameTiles.length-1)) {
                this.winnerText();
                return;
            }
        } 
    }

    checkDiag() {
        console.log('checking diag');
        for(let i = 0; i < this.gameTiles.length; i++) {
            console.log('checking: ', i,i);
            if(this.gameTiles[i][i] !== this.picked) {
                break;
            }
            if(i === (this.gameTiles.length-1)) {
                console.log('inside diag winner')
                this.winnerText();
                return;
            }
        } 
    }
    checkReverseDiag() {
        console.log('checking reverse diag')
        for(let i = 0; i < this.gameTiles.length; i++) {
            console.log('reverse check: ', i,((this.gameTiles.length-1)-i))
            if(this.gameTiles[i][(this.gameTiles.length-1)-i] !== this.picked) {
                break;
            }
            if(i === (this.gameTiles.length-1)) {
                this.winnerText();
                return
            }
        }
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
}

const rules = new Rules();
export default rules;