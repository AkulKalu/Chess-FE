import {Board, BoardTable, Piece, DispatchAction} from './globalTypes';
import React from 'react';
class PieceProperties {
    type : string;
    boardPosition : string
    color : string;
    ranks : string[] = ['1' , '2', '3' , '4' , '5' , '6' , '7', '8'];
    files : string[] = ['a','b','c','d','e','f','g','h'];
    protected can : {moveTo : string[], take : string[]} ={
        moveTo : [],
        take : [],
    }
    protected _board : BoardTable | null = null
    protected filterMovePattern(posibleMovments : string[]) : string[] {
       for (let i = 0; i < posibleMovments.length; i++) {
           let field = posibleMovments[i];
           let onBoardIsEmpty = this._board[field];
           if(!onBoardIsEmpty) {
            return posibleMovments.slice(0, i)
           } 
       }
    }
    protected filterPossibleTakes(possibleTakes : string[]) : string[] {
        for (let i = 0; i < possibleTakes.length; i++) {
            let field = possibleTakes[i];
            let onBoardIsEmpty = this._board[field];
            if(!onBoardIsEmpty) {
                return [field]
            } 
        }
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
}
export class ChessPiece extends PieceProperties implements Piece  {
    constructor(type : string, boardPosition : string, color : string) {
        super()
        this.type = type;
        this.boardPosition = boardPosition;
        this.color = color;
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
class ChessPieceFactory extends PieceProperties {
    
    constructor() {
        super();
    }

    create(type : string, boardPosition : string, color : string) {
        let piece = class extends ChessPiece {
                canMoveTo: () => string[];
                constructor() {
                    super(type, boardPosition, color)
                    this.canMoveTo = ChessPieceFactory.prototype.pawn
                }
        }
        return piece
        
    }
    pawn() {
       let possibleTakes = [];
       let possibleMovments = [];
       if(this.rank === '2') {
            possibleMovments.push(`${this.file}${this.ranks[this.boardY + 2]}`);
       }
       possibleMovments.push(`${this.file}${this.ranks[this.boardY + 1]}`);
       possibleMovments.push(`${this.files[this.boardX - 1]}${this.ranks[this.boardY + 1]}`);
       possibleTakes.push(`${this.files[this.boardX + 1]}${this.ranks[this.boardY + 1]}`);
       this.can.moveTo = this.filterMovePattern(possibleMovments);
   

       return  []
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