import {Board, BoardTable, Piece, DispatchAction} from './globalTypes';
import React from 'react';
export class ChessPiece implements Piece {
    type : string = '';
    boardPosition : string = ''
    color : string = '';
    ranks : string[] = ['1' , '2', '3' , '4' , '5' , '6' , '7', '8'];
    files : string[] = ['a','b','c','d','e','f','g','h'];
    protected _board : BoardTable = {};

    constructor(type : string, boardPosition : string, color : string) {
        this.boardPosition = boardPosition;
        this.color = color;
        this.type = type;
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

    set board(board : BoardTable) {
        this._board = board;
    }
    get boardY() {
        return this.ranks.indexOf(this.boardPosition[1]);
    }
    get boardX() {
        return this.files.indexOf(this.boardPosition[0]);
    }
    get rank() {
        return this.boardPosition[1];
    }
    get file() {
        return this.boardPosition[0];
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

export class Pawn extends ChessPiece {
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
export class Bishop extends ChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
      
     }

     canTake() {
       
     }
}
export class Rook extends ChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
      
     }

     canTake() {
       
     }
}
export class Knight extends ChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
      
     }

     canTake() {
       
     }
}
export class Queen extends ChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
      
     }

     canTake() {
       
     }
}
export class King extends ChessPiece {
    constructor(type : string, boardPosition : string, color : string) {
        super(type, boardPosition, color);
    }
    canMoveTo() {
      
     }

     canTake() {
       
     }
}

export class ChessPieceFactory  {
    pieces : {[key : string] : any} = {
        'P' : Pawn
    }
    createPiece(type : string, boardPosition : string, color : string) {
        let piece = new this.pieces[type](type, boardPosition, color)
        return piece
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
    state : BoardTable;

    constructor(boardState : BoardTable) {
        this.state = {...boardState};
    }

    movePiece(piece : ChessPiece, position : string)  {
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
    }

    setPieces(white : string[], black :string[]) {
        white.forEach(piece => {
            let type = piece[0];
            let position = piece.slice(1);
            let chessPiece =  new ChessPiece(type, position, 'white')
            this.state[position] = chessPiece;
            chessPiece.board = this.state;
        })
        black.forEach(piece => {
            let type = piece[0];
            let position = piece.slice(1);
            let chessPiece =   new ChessPiece(type, position, 'black');
            this.state[position] = chessPiece;
            chessPiece.board = this.state;
        })
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