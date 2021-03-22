import {Board, BoardTable, Piece, DispatchAction} from './globalTypes';
import React from 'react';

export class ChessPiece implements Piece {

    type : string;
    boardPosition : string
    color : string;
    board : any

    static getStartPositions() : { white : string[], black : string[]} {
        let positions = ChessBoard.getFieldNotations().map( (pos, i) => {
            const rank : string = pos[1];
            const file : string  = pos[0];
    
            if( rank === '7' || rank === '2' ) {
                return `P${pos}`;
            }else if ( rank === '8' || rank === '1') {
                let pieceAtFile : { [index : string] : string } = {
                    a : 'R',
                    b : 'N',
                    c : 'B',
                    d : 'Q',
                    e : 'K',
                    f : 'B',
                    g : 'N',
                    h : 'R' 
                }
                return `${pieceAtFile[file]}${pos}`
            }
            return pos
        })
        // let top = positions.slice(0 , )
        return {
            white : [],
            black : []
        }
    }

    constructor(type : string, boardPosition : string, color : string , board : any) {
        this.type = type;
        this.boardPosition = boardPosition;
        this.color = color;
        this.board = board;
    }
    moveTo() : void {
        this.board.actions.movePieceTo()
    }
    takePiece() : void {
        this.board.actions.takePiece()
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
    boardState : BoardTable;

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

    constructor(boardState : BoardTable) {
        this.boardState = boardState;
    }

    movePiece(piece : ChessPiece, position : string)  {
      
    }

    pieceTakesPiece(piece1 : ChessPiece, piece2 : ChessPiece) {
        
    }

    setPieces(white : string[], black :string[]) {

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