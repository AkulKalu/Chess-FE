import {Board, BoardTable, Piece, DispatchAction} from './globalTypes';
import React from 'react';

export class ChessPiece implements Piece {

    type : string;
    boardPosition : string
    color : string;
    protected _board : BoardTable | null = null

    constructor(type : string, boardPosition : string, color : string) {
        this.type = type;
        this.boardPosition = boardPosition;
        this.color = color;
    }

    set board(board : BoardTable) {
        this._board = board;
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
class ChessPieceFactory {
    board : BoardTable | null = null;
    boardPosition : string = '';

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
       let rank = Number(this.boardPosition[1]);
       let file = this.boardPosition[0];
       let pattern = [`${file}${rank + 1}`, `${file}${rank + 2}`];

       return  pattern.filter( field => {
                    return this.board[field] === null;
                } )
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