import {Board, BoardTable, Piece, DispatchAction, ClassicChessPiece} from './globalTypes';
import React from 'react';
const typeNotations : { [key : string] : string } = {
    pawn : 'P',
    bishop : 'B',
    knight : 'N',
    rook : 'R',
    king : 'K',
    queen : 'Q',
}
Object.freeze(typeNotations);

class ChessPieceProperties {
    type : string = '';
    boardPosition : string = ''
    color : string = '';
    ranks : string[] = ['1', '2', '3' , '4' , '5' , '6' , '7', '8'];
    files : string[] = ['a','b','c','d','e','f','g','h'];

    protected _board : BoardTable = {};

    constructor(type : string, boardPosition : string, color : string) {
        this.boardPosition = boardPosition;
        this.color = color;
        this.type = type;
    }

    set board(board : BoardTable) {
        this._board = board;
    }
    get boardY() {
        return this.ranks.indexOf(this.boardPosition[1]);
    }
    get boardX() {
        return this.files.indexOf(this.boardPosition[0]);
    }
    get axisXLeft() {
        return this.files.slice(0, this.boardX).reverse();
    }
    get axisXright(){
        return this.files.slice(this.boardX + 1);
    } 
    get rank() {
        return this.boardPosition[1];
    }
    get file() {
        return this.boardPosition[0];
    }
}
export class ChessPiece extends ChessPieceProperties implements Piece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color)
    }

    protected getMovementPattern(movementLines : string[][]) :  string[][] {
        return movementLines.map(this.getEmptyFieldsInLine);
    }

    protected getEmptyFieldsInLine(line : string[]) {
        for (let i = 0; i < line.length; i++) {
            let field = line[i];
            let fieldPiece = this._board[field];
            if(fieldPiece) {
                return line.slice(0, i); 
            } 
        }
        return line.slice();
    }

    protected getPossibleTakes(movementLines : string[][]) : string[][] {
        return movementLines.map(this.getOpponentFieldsInLine);
    }

    protected getOpponentFieldsInLine(line : string[]) : string[] {
        for (let i = 0; i < line.length; i++) {
            let field = line[i];
            let fieldPiece = this._board[field];
            if(fieldPiece) {
                return fieldPiece.color === this.color ? [] : [field]
            } 
        }
        return [];
     }

    static getStartPositions() : { boardTop : string[], boardBottom : string[]} {
        let notations = ChessBoard.getFieldNotations();
        let topOfBoard = notations.filter(filterNotationsByRank(['7', '8']));
        let bottomOfBoard = notations.filter(filterNotationsByRank(['1', '2']));
        topOfBoard = topOfBoard.map(setPiecePosition('7'));
        bottomOfBoard = bottomOfBoard.map(setPiecePosition('2'))

        function filterNotationsByRank(ranks : string[]) : (val : string) => boolean {
            return (notation) : boolean => {
                let rank : string = notation[1];
                return ranks.includes(rank)
            }
        }
        function setPiecePosition(pawnsAreAt : string ) : (val : string) => string {
            let highValueFiles : { [index : string] : string } = {
                a : 'R',
                b : 'N',
                c : 'B',
                d : 'Q',
                e : 'K',
                f : 'B',
                g : 'N',
                h : 'R' 
            }
            return (notation : string) : string  => {
                let rank : string = notation[1];
                let file : string = notation[0];
                return rank === pawnsAreAt ? `P${notation}` : `${highValueFiles[file]}${notation}`
            }
        }
        return {
            boardTop :topOfBoard,
            boardBottom : bottomOfBoard
        }
    }
}

export class Pawn extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
        let possibleMovments = [`${this.file}${this.ranks[this.boardY + 1]}`];
        if(this.rank === '2') {
             possibleMovments.push(`${this.file}${this.ranks[this.boardY + 2]}`);
        } 
        return this.getMovementPattern([possibleMovments]);
     }

     canTake() {
        let possibleTakes = [`${this.files[this.boardX - 1]}${this.ranks[this.boardY + 1]}`,
                             `${this.files[this.boardX + 1]}${this.ranks[this.boardY + 1]}`];
        return this.getPossibleTakes([possibleTakes]);
     }
}
class SidewaysPattern {
    scan(piece : ChessPiece) : string[][] {
        const runByRank = function (currentRank : string | number, direction : number) {
            return (file : string, i : number) => `${file}${Number(currentRank) + ((i + 1) *  direction)}`
        }
        
        let leftTopLine = piece.axisXLeft.map( runByRank(piece.rank, 1) )
        let rightTopLine = piece.axisXright.map( runByRank(piece.rank, 1) )
        let bottomRightLine = piece.axisXright.map( runByRank(piece.rank, -1) )
        let bottomLeftLine = piece.axisXLeft.map( runByRank(piece.rank, -1) )
        
        return [leftTopLine, rightTopLine, bottomRightLine, bottomLeftLine].map( line => {
            return line.filter( position => {
                let rank = Number(position.slice(1));
                return rank >= 1 && rank <= 8
            } )
        })
    }
}
class HorizontalPattern {
    scan(piece : ChessPiece) : string[][] {
        return []
    }
} 
export class Bishop extends ChessPiece implements ClassicChessPiece {
    movePatterns : any[];
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
        this.movePatterns = [new SidewaysPattern()]
    }
    canMoveTo() {
        return this.movePatterns.reduce( (prev, movePattern) => [...prev, ...movePattern.scan()]  , [] );
    }
   
    canTake() {
    
    }
}
export class Rook extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
        
     }

     canTake() {
       
     }
}
export class Knight extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
      
     }

     canTake() {
       
     }
}
export class Queen extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
      
     }

     canTake() {
       
     }
}
export class King extends ChessPiece implements ClassicChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
      
     }

     canTake() {
       
     }
}

export class ChessPieceFactory  {
    createPiece(type : string, boardPosition : string, color : string) : ClassicChessPiece {
        let types = typeNotations;
        switch (type) {
            case types.bishop:
                return this.createBishop(boardPosition, color);
            case types.rook:
                return this.createRook(boardPosition, color);
            case types.knight:
                return this.createKnight(boardPosition, color);
            case types.king:
                return this.createKing(boardPosition, color);
            case types.queen:
                return this.createQueen(boardPosition, color);
            default:
                return this.createPawn(boardPosition, color);
        }
    }

    createPawn( boardPosition : string, color : string) {
        return new Pawn('P', boardPosition, color)
    }

    createBishop( boardPosition : string, color : string) {
        return new Bishop('B', boardPosition, color)
    }

    createRook( boardPosition : string, color : string) {
        return new Rook('R', boardPosition, color)
    }

    createKnight( boardPosition : string, color : string) {
        return new Knight('N', boardPosition, color)
    }

    createKing( boardPosition : string, color : string) {
        return new King('K', boardPosition, color)
    }

    createQueen( boardPosition : string, color : string) {
        return new Queen('Q', boardPosition, color)
    }
}

export class ChessBoard implements Board {
    [key : string] : any;
    private _state : BoardTable;

    constructor(boardState : BoardTable) {
        this._state = {...boardState};
    }

    movePiece(piece : ChessPiece, position : string)  {
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
    }

    setPieces(white : string[], black :string[])  {
        white.forEach(piece => {
            this.setPiece(piece);
        })
        black.forEach(piece => {
            this.setPiece(piece);
        })
    }

    setPiece(standardNotation : string) {
        const chessPieceFactory = new ChessPieceFactory();
        let type = standardNotation[0];
        let position = standardNotation.slice(1);
        let chessPiece =  chessPieceFactory.createPiece(type, position, 'white');
        this.state[position] = chessPiece;
        chessPiece.board = this.state;
    }

    get state() {
        return this._state
    }
  
    static getFieldNotations() : string[] {
        const fieldLetters = ['a','b','c','d','e','f','g','h'];
        let notations : string[] = [];
        fieldLetters.forEach((val, i) => {
            fieldLetters.forEach((letter) => {
                notations.push(`${letter}${fieldLetters.length - i}`)
            })
        })
        return notations
    }
    
    static createBoardTable() : BoardTable {
        const board : BoardTable = {};
        this.getFieldNotations().forEach( notation => board[notation] = null )
        return board;
    }
}

export class BoardDispatch implements Board {
    dispatcher : React.Dispatch<DispatchAction>;

    constructor(dispatcher : React.Dispatch<DispatchAction>) {
        this.dispatcher = dispatcher;
    }

    movePiece(piece : ChessPiece, position : string)  {
        this.dispatcher(new Action(this.movePiece.name, [piece, position]));
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
        this.dispatcher(new Action(this.pieceTakesPiece.name, [piece1, piece2]));
    }

    setPieces(white : string[], black :string[]) {
        this.dispatcher(new Action(this.setPieces.name, [white, black]));
    }
}
export class Action implements DispatchAction {
    type : string;
    payload : any;

    constructor(type : string, payload : any) {
        this.type = type;
        this.payload = payload;
    }
}