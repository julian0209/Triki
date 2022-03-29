import { Status } from "./gamestatus";


export class Gamelogic {
    
    gamefield: Array<number> = [];

    currentTurn!: number;

    gamestatus: Status;

    winSituationsOne: Array<Array<number>> = [
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1]
    ]
    winSituationsTwo: Array<Array<number>> = [
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2]
    ]

    public constructor() {
        this.gamestatus = Status.STOP;
        this.gamefield= [0, 0, 0, 0, 0, 0, 0, 0, 0];

    }

    gameStart(): void {
        this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentTurn = this.randomPlayerStart();
        console.log(this.currentTurn);
        this.gamestatus = Status.START;
    }
    randomPlayerStart() {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }
    setField(position: number, value:number):void{
        this.gamefield[position] = value;

    }
    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }

    arrayEquals(a: Array<any>, b: Array<any>):boolean{
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) => value ===b[index]);
    }
    changePlayer(): void {
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2 ;       
    }
    async checkGameEndWinner(): Promise<boolean>{
        let isWinner = false;

        const checkarray = (this.currentTurn === 1) ? this.winSituationsOne : this.winSituationsTwo;

        const currentarray: any[] = [];

        this.gamefield.forEach((subfield, index) => {
            
            if(subfield !== this.currentTurn){
                currentarray[index] = 0;
            }else{
                currentarray[index] = subfield;
            }
        } );
        checkarray.forEach((checkfield, checkindex) => {
            if (this.arrayEquals(checkfield, currentarray)){
                isWinner = true;
            }
        });

        if (isWinner) {
            this.gameEnd();
            return true;
        }else{
            return false;
        }
    }; 

    async checkGameEndFull(): Promise<boolean>{
        let isFull = true;

        if (this.gamefield.includes(0) ) {
            isFull = false;
        }
        if (isFull) {
            this.gameEnd();
            return true;
        }else{
            return false;
        }
    }; 

    gameEnd(): void{
        this.gamestatus = Status.STOP;
    }
}

